import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

// ============================================================================
// Types
// ============================================================================

export type ToastType = 'success' | 'error' | 'info' | 'warning';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

export interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration: number;
    createdAt: number;
    /** Action button config */
    action?: {
        label: string;
        onClick: () => void;
    };
    /** Whether toast can be dismissed by clicking */
    dismissible: boolean;
    /** Custom icon (optional) */
    icon?: React.ReactNode;
}

export interface ModalConfig {
    id: string;
    component: string; // Component name to render
    props?: Record<string, unknown>;
    onClose?: () => void;
    /** Prevent closing on backdrop click */
    persistent?: boolean;
}

export interface UIState {
    // Navigation state
    isMobileMenuOpen: boolean;
    isSearchOpen: boolean;
    
    // Cart drawer
    isCartDrawerOpen: boolean;
    
    // Modals
    activeModals: ModalConfig[];
    
    // Toasts
    toasts: Toast[];
    toastPosition: ToastPosition;
    maxToasts: number;
    
    // Loading states
    globalLoading: boolean;
    loadingMessage: string | null;
    pageLoadingStates: Record<string, boolean>;
    
    // Scroll state
    scrollY: number;
    isScrolled: boolean;
    scrollDirection: 'up' | 'down' | null;
    
    // Viewport
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    
    // Accessibility
    reducedMotion: boolean;
    highContrast: boolean;
    
    // Theme (future)
    theme: 'light' | 'dark' | 'system';
}

export interface UIActions {
    // Navigation
    setMobileMenuOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;
    setSearchOpen: (open: boolean) => void;
    toggleSearch: () => void;
    
    // Cart drawer
    setCartDrawerOpen: (open: boolean) => void;
    toggleCartDrawer: () => void;
    
    // Modals
    openModal: (config: Omit<ModalConfig, 'id'> & { id?: string }) => string;
    closeModal: (id?: string) => void;
    closeAllModals: () => void;
    isModalOpen: (id: string) => boolean;
    
    // Toasts
    addToast: (toast: Omit<Toast, 'id' | 'createdAt'> & { id?: string }) => string;
    removeToast: (id: string) => void;
    clearToasts: () => void;
    setToastPosition: (position: ToastPosition) => void;
    
    // Toast shortcuts
    toast: {
        success: (title: string, message?: string, options?: Partial<Toast>) => string;
        error: (title: string, message?: string, options?: Partial<Toast>) => string;
        info: (title: string, message?: string, options?: Partial<Toast>) => string;
        warning: (title: string, message?: string, options?: Partial<Toast>) => string;
    };
    
    // Loading states
    setGlobalLoading: (loading: boolean, message?: string) => void;
    setPageLoading: (page: string, loading: boolean) => void;
    isPageLoading: (page: string) => boolean;
    
    // Scroll
    updateScroll: (scrollY: number) => void;
    scrollToTop: () => void;
    
    // Viewport
    updateViewport: (width: number) => void;
    
    // Accessibility
    setReducedMotion: (reduced: boolean) => void;
    setHighContrast: (high: boolean) => void;
    
    // Theme
    setTheme: (theme: 'light' | 'dark' | 'system') => void;
    
    // Utility
    closeAllOverlays: () => void;
    
    // Debug
    _debug: () => UIDebugInfo;
}

export type UIStore = UIState & UIActions;

export interface UIDebugInfo {
    mobileMenuOpen: boolean;
    searchOpen: boolean;
    cartDrawerOpen: boolean;
    activeModalCount: number;
    toastCount: number;
    globalLoading: boolean;
    viewport: string;
    reducedMotion: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const BREAKPOINTS = {
    mobile: 640,
    tablet: 1024,
} as const;

const DEFAULT_TOAST_DURATION = 5000;
const MAX_TOASTS = 5;

// ============================================================================
// Helpers
// ============================================================================

const generateId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// ============================================================================
// Store Implementation
// ============================================================================

export const useUIStore = create<UIStore>()(
    devtools(
        immer((set, get) => ({
            // Initial state
            isMobileMenuOpen: false,
            isSearchOpen: false,
            isCartDrawerOpen: false,
            activeModals: [],
            toasts: [],
            toastPosition: 'bottom-right',
            maxToasts: MAX_TOASTS,
            globalLoading: false,
            loadingMessage: null,
            pageLoadingStates: {},
            scrollY: 0,
            isScrolled: false,
            scrollDirection: null,
            isMobile: false,
            isTablet: false,
            isDesktop: true,
            reducedMotion: false,
            highContrast: false,
            theme: 'light',

            // ============================================================
            // Navigation
            // ============================================================

            setMobileMenuOpen: (open) => {
                set(state => {
                    state.isMobileMenuOpen = open;
                    // Close other overlays when opening mobile menu
                    if (open) {
                        state.isSearchOpen = false;
                        state.isCartDrawerOpen = false;
                    }
                });
            },

            toggleMobileMenu: () => {
                const state = get();
                state.setMobileMenuOpen(!state.isMobileMenuOpen);
            },

            setSearchOpen: (open) => {
                set(state => {
                    state.isSearchOpen = open;
                    // Close other overlays when opening search
                    if (open) {
                        state.isMobileMenuOpen = false;
                    }
                });
            },

            toggleSearch: () => {
                const state = get();
                state.setSearchOpen(!state.isSearchOpen);
            },

            // ============================================================
            // Cart Drawer
            // ============================================================

            setCartDrawerOpen: (open) => {
                set(state => {
                    state.isCartDrawerOpen = open;
                    // Close other overlays when opening cart
                    if (open) {
                        state.isMobileMenuOpen = false;
                        state.isSearchOpen = false;
                    }
                });
            },

            toggleCartDrawer: () => {
                const state = get();
                state.setCartDrawerOpen(!state.isCartDrawerOpen);
            },

            // ============================================================
            // Modals
            // ============================================================

            openModal: (config) => {
                const id = config.id || generateId();
                
                set(state => {
                    // Don't open duplicate modals
                    if (!state.activeModals.some(m => m.id === id)) {
                        state.activeModals.push({
                            ...config,
                            id,
                        });
                    }
                });

                return id;
            },

            closeModal: (id) => {
                set(state => {
                    if (id) {
                        const index = state.activeModals.findIndex(m => m.id === id);
                        if (index > -1) {
                            const modal = state.activeModals[index];
                            modal.onClose?.();
                            state.activeModals.splice(index, 1);
                        }
                    } else {
                        // Close topmost modal
                        const modal = state.activeModals.pop();
                        modal?.onClose?.();
                    }
                });
            },

            closeAllModals: () => {
                const state = get();
                state.activeModals.forEach(m => m.onClose?.());
                
                set(state => {
                    state.activeModals = [];
                });
            },

            isModalOpen: (id) => {
                return get().activeModals.some(m => m.id === id);
            },

            // ============================================================
            // Toasts
            // ============================================================

            addToast: (toast) => {
                const id = toast.id || generateId();
                const newToast: Toast = {
                    id,
                    type: toast.type,
                    title: toast.title,
                    message: toast.message,
                    duration: toast.duration ?? DEFAULT_TOAST_DURATION,
                    createdAt: Date.now(),
                    action: toast.action,
                    dismissible: toast.dismissible ?? true,
                    icon: toast.icon,
                };

                set(state => {
                    // Remove oldest toasts if at max
                    while (state.toasts.length >= state.maxToasts) {
                        state.toasts.shift();
                    }
                    state.toasts.push(newToast);
                });

                // Auto-remove after duration
                if (newToast.duration > 0) {
                    setTimeout(() => {
                        get().removeToast(id);
                    }, newToast.duration);
                }

                return id;
            },

            removeToast: (id) => {
                set(state => {
                    const index = state.toasts.findIndex(t => t.id === id);
                    if (index > -1) {
                        state.toasts.splice(index, 1);
                    }
                });
            },

            clearToasts: () => {
                set(state => {
                    state.toasts = [];
                });
            },

            setToastPosition: (position) => {
                set(state => {
                    state.toastPosition = position;
                });
            },

            // Toast shortcuts
            toast: {
                success: (title, message, options = {}) => {
                    return get().addToast({ type: 'success', title, message, duration: DEFAULT_TOAST_DURATION, dismissible: true, ...options });
                },
                error: (title, message, options = {}) => {
                    return get().addToast({ type: 'error', title, message, duration: 7000, dismissible: true, ...options });
                },
                info: (title, message, options = {}) => {
                    return get().addToast({ type: 'info', title, message, duration: DEFAULT_TOAST_DURATION, dismissible: true, ...options });
                },
                warning: (title, message, options = {}) => {
                    return get().addToast({ type: 'warning', title, message, duration: DEFAULT_TOAST_DURATION, dismissible: true, ...options });
                },
            },

            // ============================================================
            // Loading States
            // ============================================================

            setGlobalLoading: (loading, message) => {
                set(state => {
                    state.globalLoading = loading;
                    state.loadingMessage = loading ? (message || null) : null;
                });
            },

            setPageLoading: (page, loading) => {
                set(state => {
                    if (loading) {
                        state.pageLoadingStates[page] = true;
                    } else {
                        delete state.pageLoadingStates[page];
                    }
                });
            },

            isPageLoading: (page) => {
                return get().pageLoadingStates[page] === true;
            },

            // ============================================================
            // Scroll
            // ============================================================

            updateScroll: (scrollY) => {
                set(state => {
                    const previousScrollY = state.scrollY;
                    state.scrollY = scrollY;
                    state.isScrolled = scrollY > 50;
                    
                    if (scrollY > previousScrollY && scrollY > 100) {
                        state.scrollDirection = 'down';
                    } else if (scrollY < previousScrollY) {
                        state.scrollDirection = 'up';
                    }
                });
            },

            scrollToTop: () => {
                if (typeof window !== 'undefined') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            },

            // ============================================================
            // Viewport
            // ============================================================

            updateViewport: (width) => {
                set(state => {
                    state.isMobile = width < BREAKPOINTS.mobile;
                    state.isTablet = width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet;
                    state.isDesktop = width >= BREAKPOINTS.tablet;
                });
            },

            // ============================================================
            // Accessibility
            // ============================================================

            setReducedMotion: (reduced) => {
                set(state => {
                    state.reducedMotion = reduced;
                });
            },

            setHighContrast: (high) => {
                set(state => {
                    state.highContrast = high;
                });
            },

            // ============================================================
            // Theme
            // ============================================================

            setTheme: (theme) => {
                set(state => {
                    state.theme = theme;
                });
            },

            // ============================================================
            // Utility
            // ============================================================

            closeAllOverlays: () => {
                set(state => {
                    state.isMobileMenuOpen = false;
                    state.isSearchOpen = false;
                    state.isCartDrawerOpen = false;
                });
            },

            // ============================================================
            // Debug
            // ============================================================

            _debug: (): UIDebugInfo => {
                const state = get();
                return {
                    mobileMenuOpen: state.isMobileMenuOpen,
                    searchOpen: state.isSearchOpen,
                    cartDrawerOpen: state.isCartDrawerOpen,
                    activeModalCount: state.activeModals.length,
                    toastCount: state.toasts.length,
                    globalLoading: state.globalLoading,
                    viewport: state.isMobile ? 'mobile' : state.isTablet ? 'tablet' : 'desktop',
                    reducedMotion: state.reducedMotion,
                };
            },
        })),
        {
            name: 'UIStore',
            enabled: process.env.NODE_ENV === 'development',
        }
    )
);

// ============================================================================
// Selector Hooks
// ============================================================================

export const useMobileMenuOpen = () => useUIStore(state => state.isMobileMenuOpen);
export const useSearchOpen = () => useUIStore(state => state.isSearchOpen);
export const useCartDrawerOpen = () => useUIStore(state => state.isCartDrawerOpen);
export const useActiveModals = () => useUIStore(state => state.activeModals);
export const useToasts = () => useUIStore(state => state.toasts);
export const useToastPosition = () => useUIStore(state => state.toastPosition);
export const useGlobalLoading = () => useUIStore(state => state.globalLoading);
export const useLoadingMessage = () => useUIStore(state => state.loadingMessage);
export const useIsScrolled = () => useUIStore(state => state.isScrolled);
export const useScrollDirection = () => useUIStore(state => state.scrollDirection);
export const useIsMobile = () => useUIStore(state => state.isMobile);
export const useIsTablet = () => useUIStore(state => state.isTablet);
export const useIsDesktop = () => useUIStore(state => state.isDesktop);
export const useReducedMotion = () => useUIStore(state => state.reducedMotion);
export const useTheme = () => useUIStore(state => state.theme);

// Combined viewport hook
export const useViewport = () => useUIStore(state => ({
    isMobile: state.isMobile,
    isTablet: state.isTablet,
    isDesktop: state.isDesktop,
}));

// Any overlay open
export const useAnyOverlayOpen = () => useUIStore(state => 
    state.isMobileMenuOpen || state.isSearchOpen || state.isCartDrawerOpen || state.activeModals.length > 0
);
