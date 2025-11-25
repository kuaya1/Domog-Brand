import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Product } from '@/lib/products';

// ============================================================================
// Types
// ============================================================================

export interface CartItem {
    /** Product ID */
    productId: string;
    /** Product name (denormalized for display) */
    name: string;
    /** Product price at time of adding */
    price: number;
    /** Selected size */
    size: string;
    /** Quantity in cart */
    quantity: number;
    /** Product image */
    image: string;
    /** Product category */
    category: string;
    /** Maximum available stock (for validation) */
    maxStock: number;
    /** Timestamp when added */
    addedAt: number;
}

export interface PromoCode {
    code: string;
    type: 'percentage' | 'fixed';
    value: number;
    minPurchase?: number;
    maxDiscount?: number;
    expiresAt?: number;
    usageLimit?: number;
    description: string;
}

export interface CartState {
    // State
    items: CartItem[];
    appliedPromoCode: PromoCode | null;
    isLoading: boolean;
    lastError: string | null;
    
    // Computed (not stored, but available)
    _version: number; // For cache busting
}

export interface CartActions {
    // Core actions
    addItem: (product: Product, size: string, quantity?: number) => AddItemResult;
    removeItem: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => UpdateResult;
    clearCart: () => void;
    
    // Promo code actions
    applyPromoCode: (code: string) => PromoResult;
    removePromoCode: () => void;
    
    // Computed getters
    getItemCount: () => number;
    getSubtotal: () => number;
    getDiscount: () => number;
    getTotal: () => number;
    getShippingEstimate: () => number;
    getTaxEstimate: () => number;
    
    // Utility actions
    getItem: (productId: string, size: string) => CartItem | undefined;
    hasItem: (productId: string, size?: string) => boolean;
    validateStock: (productId: string, size: string, requestedQty: number) => StockValidation;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    
    // Debug actions
    _debug: () => CartDebugInfo;
    _reset: () => void;
}

export type CartStore = CartState & CartActions;

// Result types for better error handling
export type AddItemResult = 
    | { success: true; item: CartItem; message: string }
    | { success: false; error: string; code: 'OUT_OF_STOCK' | 'MAX_QUANTITY' | 'INVALID_SIZE' | 'INVALID_PRODUCT' };

export type UpdateResult = 
    | { success: true; newQuantity: number }
    | { success: false; error: string; code: 'NOT_FOUND' | 'MAX_QUANTITY' | 'MIN_QUANTITY' };

export type PromoResult = 
    | { success: true; promo: PromoCode; discount: number }
    | { success: false; error: string; code: 'INVALID' | 'EXPIRED' | 'MIN_PURCHASE' | 'ALREADY_USED' };

export interface StockValidation {
    isValid: boolean;
    availableQuantity: number;
    message?: string;
}

export interface CartDebugInfo {
    itemCount: number;
    subtotal: number;
    discount: number;
    total: number;
    items: CartItem[];
    promoCode: PromoCode | null;
    version: number;
    storageKey: string;
}

// ============================================================================
// Constants
// ============================================================================

const CART_STORAGE_KEY = 'domog-cart-v2';
const MAX_QUANTITY_PER_ITEM = 10;
const MIN_QUANTITY = 1;
const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_RATE = 25;
const TAX_RATE = 0.0875; // 8.75%

// Available promo codes (in production, fetch from API)
const PROMO_CODES: Record<string, PromoCode> = {
    'WELCOME10': {
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        description: '10% off your first order',
    },
    'HOLIDAY25': {
        code: 'HOLIDAY25',
        type: 'percentage',
        value: 25,
        maxDiscount: 200,
        minPurchase: 300,
        description: '25% off orders over $300 (max $200 discount)',
    },
    'FREESHIP': {
        code: 'FREESHIP',
        type: 'fixed',
        value: 25,
        description: 'Free standard shipping',
    },
    'VIP50': {
        code: 'VIP50',
        type: 'fixed',
        value: 50,
        minPurchase: 200,
        description: '$50 off orders over $200',
    },
};

// ============================================================================
// Store Implementation
// ============================================================================

export const useCartStore = create<CartStore>()(
    devtools(
        persist(
            immer((set, get) => ({
                // Initial state
                items: [],
                appliedPromoCode: null,
                isLoading: false,
                lastError: null,
                _version: 1,

                // ============================================================
                // Core Actions
                // ============================================================

                addItem: (product, size, quantity = 1): AddItemResult => {
                    // Validate product
                    if (!product || !product.id) {
                        return { success: false, error: 'Invalid product', code: 'INVALID_PRODUCT' };
                    }

                    // Validate size
                    if (!size || !product.sizes?.includes(size)) {
                        return { success: false, error: 'Invalid size selected', code: 'INVALID_SIZE' };
                    }

                    // Check stock (in production, validate against real inventory)
                    if (product.inStock === false) {
                        return { success: false, error: 'Product is out of stock', code: 'OUT_OF_STOCK' };
                    }

                    const state = get();
                    const existingIndex = state.items.findIndex(
                        item => item.productId === product.id && item.size === size
                    );

                    let newQuantity = quantity;
                    let message = '';

                    if (existingIndex > -1) {
                        const existing = state.items[existingIndex];
                        newQuantity = existing.quantity + quantity;
                        
                        if (newQuantity > MAX_QUANTITY_PER_ITEM) {
                            if (existing.quantity >= MAX_QUANTITY_PER_ITEM) {
                                return { 
                                    success: false, 
                                    error: `Maximum quantity (${MAX_QUANTITY_PER_ITEM}) already in cart`, 
                                    code: 'MAX_QUANTITY' 
                                };
                            }
                            newQuantity = MAX_QUANTITY_PER_ITEM;
                            message = `Quantity adjusted to maximum of ${MAX_QUANTITY_PER_ITEM}`;
                        }
                    } else {
                        newQuantity = Math.min(quantity, MAX_QUANTITY_PER_ITEM);
                        if (quantity > MAX_QUANTITY_PER_ITEM) {
                            message = `Quantity adjusted to maximum of ${MAX_QUANTITY_PER_ITEM}`;
                        }
                    }

                    const cartItem: CartItem = {
                        productId: product.id,
                        name: product.name,
                        price: product.price,
                        size,
                        quantity: newQuantity,
                        image: product.images[0] || '',
                        category: product.category,
                        maxStock: MAX_QUANTITY_PER_ITEM, // In production, get from inventory
                        addedAt: Date.now(),
                    };

                    set(state => {
                        if (existingIndex > -1) {
                            state.items[existingIndex].quantity = newQuantity;
                            state.items[existingIndex].addedAt = Date.now();
                        } else {
                            state.items.push(cartItem);
                        }
                        state.lastError = null;
                    });

                    return { 
                        success: true, 
                        item: cartItem, 
                        message: message || `${product.name} (Size ${size}) added to cart` 
                    };
                },

                removeItem: (productId, size) => {
                    set(state => {
                        const index = state.items.findIndex(
                            item => item.productId === productId && item.size === size
                        );
                        if (index > -1) {
                            state.items.splice(index, 1);
                        }
                        state.lastError = null;
                    });
                },

                updateQuantity: (productId, size, quantity): UpdateResult => {
                    const state = get();
                    const item = state.items.find(
                        i => i.productId === productId && i.size === size
                    );

                    if (!item) {
                        return { success: false, error: 'Item not found in cart', code: 'NOT_FOUND' };
                    }

                    if (quantity < MIN_QUANTITY) {
                        return { success: false, error: 'Minimum quantity is 1', code: 'MIN_QUANTITY' };
                    }

                    const newQuantity = Math.min(quantity, Math.min(item.maxStock, MAX_QUANTITY_PER_ITEM));

                    set(state => {
                        const index = state.items.findIndex(
                            i => i.productId === productId && i.size === size
                        );
                        if (index > -1) {
                            state.items[index].quantity = newQuantity;
                        }
                    });

                    return { 
                        success: true, 
                        newQuantity,
                    };
                },

                clearCart: () => {
                    set(state => {
                        state.items = [];
                        state.appliedPromoCode = null;
                        state.lastError = null;
                    });
                },

                // ============================================================
                // Promo Code Actions
                // ============================================================

                applyPromoCode: (code): PromoResult => {
                    const normalizedCode = code.toUpperCase().trim();
                    const promo = PROMO_CODES[normalizedCode];

                    if (!promo) {
                        return { success: false, error: 'Invalid promo code', code: 'INVALID' };
                    }

                    // Check expiration
                    if (promo.expiresAt && Date.now() > promo.expiresAt) {
                        return { success: false, error: 'Promo code has expired', code: 'EXPIRED' };
                    }

                    // Check minimum purchase
                    const subtotal = get().getSubtotal();
                    if (promo.minPurchase && subtotal < promo.minPurchase) {
                        return { 
                            success: false, 
                            error: `Minimum purchase of $${promo.minPurchase} required`, 
                            code: 'MIN_PURCHASE' 
                        };
                    }

                    // Calculate discount
                    let discount: number;
                    if (promo.type === 'percentage') {
                        discount = subtotal * (promo.value / 100);
                        if (promo.maxDiscount) {
                            discount = Math.min(discount, promo.maxDiscount);
                        }
                    } else {
                        discount = promo.value;
                    }

                    set(state => {
                        state.appliedPromoCode = promo;
                        state.lastError = null;
                    });

                    return { success: true, promo, discount };
                },

                removePromoCode: () => {
                    set(state => {
                        state.appliedPromoCode = null;
                    });
                },

                // ============================================================
                // Computed Getters
                // ============================================================

                getItemCount: () => {
                    return get().items.reduce((sum, item) => sum + item.quantity, 0);
                },

                getSubtotal: () => {
                    return get().items.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                    );
                },

                getDiscount: () => {
                    const { appliedPromoCode } = get();
                    if (!appliedPromoCode) return 0;

                    const subtotal = get().getSubtotal();

                    if (appliedPromoCode.type === 'percentage') {
                        let discount = subtotal * (appliedPromoCode.value / 100);
                        if (appliedPromoCode.maxDiscount) {
                            discount = Math.min(discount, appliedPromoCode.maxDiscount);
                        }
                        return discount;
                    }

                    return appliedPromoCode.value;
                },

                getShippingEstimate: () => {
                    const subtotal = get().getSubtotal();
                    const { appliedPromoCode } = get();

                    // Free shipping promo
                    if (appliedPromoCode?.code === 'FREESHIP') {
                        return 0;
                    }

                    // Free shipping threshold
                    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
                        return 0;
                    }

                    // Empty cart = no shipping
                    if (get().items.length === 0) {
                        return 0;
                    }

                    return SHIPPING_RATE;
                },

                getTaxEstimate: () => {
                    const subtotal = get().getSubtotal();
                    const discount = get().getDiscount();
                    return (subtotal - discount) * TAX_RATE;
                },

                getTotal: () => {
                    const subtotal = get().getSubtotal();
                    const discount = get().getDiscount();
                    const shipping = get().getShippingEstimate();
                    const tax = get().getTaxEstimate();

                    return Math.max(0, subtotal - discount + shipping + tax);
                },

                // ============================================================
                // Utility Actions
                // ============================================================

                getItem: (productId, size) => {
                    return get().items.find(
                        item => item.productId === productId && item.size === size
                    );
                },

                hasItem: (productId, size) => {
                    const { items } = get();
                    if (size) {
                        return items.some(item => item.productId === productId && item.size === size);
                    }
                    return items.some(item => item.productId === productId);
                },

                validateStock: (productId, size, requestedQty): StockValidation => {
                    // In production, this would check real inventory
                    const item = get().getItem(productId, size);
                    const currentQty = item?.quantity || 0;
                    const totalRequested = currentQty + requestedQty;

                    if (totalRequested > MAX_QUANTITY_PER_ITEM) {
                        return {
                            isValid: false,
                            availableQuantity: MAX_QUANTITY_PER_ITEM - currentQty,
                            message: `Maximum ${MAX_QUANTITY_PER_ITEM} items allowed per product`,
                        };
                    }

                    return {
                        isValid: true,
                        availableQuantity: MAX_QUANTITY_PER_ITEM - currentQty,
                    };
                },

                setLoading: (loading) => {
                    set(state => {
                        state.isLoading = loading;
                    });
                },

                setError: (error) => {
                    set(state => {
                        state.lastError = error;
                    });
                },

                // ============================================================
                // Debug Actions
                // ============================================================

                _debug: (): CartDebugInfo => {
                    const state = get();
                    return {
                        itemCount: state.getItemCount(),
                        subtotal: state.getSubtotal(),
                        discount: state.getDiscount(),
                        total: state.getTotal(),
                        items: state.items,
                        promoCode: state.appliedPromoCode,
                        version: state._version,
                        storageKey: CART_STORAGE_KEY,
                    };
                },

                _reset: () => {
                    set(state => {
                        state.items = [];
                        state.appliedPromoCode = null;
                        state.isLoading = false;
                        state.lastError = null;
                    });
                    // Clear localStorage
                    if (typeof window !== 'undefined') {
                        localStorage.removeItem(CART_STORAGE_KEY);
                    }
                },
            })),
            {
                name: CART_STORAGE_KEY,
                storage: createJSONStorage(() => localStorage),
                partialize: (state) => ({
                    items: state.items,
                    appliedPromoCode: state.appliedPromoCode,
                }),
                version: 2,
                migrate: (persistedState: unknown, version: number) => {
                    const state = persistedState as Partial<CartState>;
                    // Handle migrations from older versions
                    if (version === 1) {
                        // Migration from v1 to v2
                        return {
                            ...state,
                            _version: 2,
                        };
                    }
                    return state as CartState;
                },
            }
        ),
        {
            name: 'CartStore',
            enabled: process.env.NODE_ENV === 'development',
        }
    )
);

// ============================================================================
// Selector Hooks (for optimized re-renders)
// ============================================================================

export const useCartItems = () => useCartStore(state => state.items);
export const useCartItemCount = () => useCartStore(state => state.getItemCount());
export const useCartSubtotal = () => useCartStore(state => state.getSubtotal());
export const useCartTotal = () => useCartStore(state => state.getTotal());
export const useCartDiscount = () => useCartStore(state => state.getDiscount());
export const useCartPromo = () => useCartStore(state => state.appliedPromoCode);
export const useCartLoading = () => useCartStore(state => state.isLoading);
export const useCartError = () => useCartStore(state => state.lastError);

// Check if specific product is in cart
export const useIsInCart = (productId: string, size?: string) => 
    useCartStore(state => state.hasItem(productId, size));
