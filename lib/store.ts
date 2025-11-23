import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from './data';

export interface CartItem extends Product {
    quantity: number;
    selectedSize: string;
}

interface CartStore {
    cart: CartItem[];
    addToCart: (product: Product, size: string, quantity: number) => void;
    removeFromCart: (productId: string, size: string) => void;
    updateQuantity: (productId: string, size: string, quantity: number) => void;
    clearCart: () => void;
    getCartCount: () => number;
    getSubtotal: () => number;
}

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (product, size, quantity) => {
                const currentCart = get().cart;
                const existingItemIndex = currentCart.findIndex(
                    (item) => item.id === product.id && item.selectedSize === size
                );

                if (existingItemIndex > -1) {
                    const newCart = [...currentCart];
                    const newQuantity = Math.min(
                        newCart[existingItemIndex].quantity + quantity,
                        10
                    );
                    newCart[existingItemIndex].quantity = newQuantity;
                    set({ cart: newCart });
                } else {
                    set({
                        cart: [
                            ...currentCart,
                            { ...product, selectedSize: size, quantity: Math.min(quantity, 10) },
                        ],
                    });
                }
            },
            removeFromCart: (productId, size) => {
                set({
                    cart: get().cart.filter(
                        (item) => !(item.id === productId && item.selectedSize === size)
                    ),
                });
            },
            updateQuantity: (productId, size, quantity) => {
                const newQuantity = Math.max(1, Math.min(quantity, 10));
                set({
                    cart: get().cart.map((item) =>
                        item.id === productId && item.selectedSize === size
                            ? { ...item, quantity: newQuantity }
                            : item
                    ),
                });
            },
            clearCart: () => set({ cart: [] }),
            getCartCount: () => {
                return get().cart.reduce((total, item) => total + item.quantity, 0);
            },
            getSubtotal: () => {
                return get().cart.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
        }),
        {
            name: 'domog-cart-storage',
        }
    )
);
