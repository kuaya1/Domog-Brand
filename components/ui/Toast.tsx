'use client';

import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode,
} from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Toast system with context provider
 * Follows Furlan Marri luxury aesthetic
 */
type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    type: ToastType;
    title: string;
    message?: string;
    duration?: number;
}

interface ToastContextValue {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: string) => void;
    success: (title: string, message?: string) => void;
    error: (title: string, message?: string) => void;
    info: (title: string, message?: string) => void;
    warning: (title: string, message?: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/**
 * Hook to use toast functionality
 * @throws Error if used outside ToastProvider
 */
export function useToast(): ToastContextValue {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}

interface ToastProviderProps {
    children: ReactNode;
    /** Default duration in ms */
    defaultDuration?: number;
    /** Maximum number of toasts to show */
    maxToasts?: number;
    /** Position of toast container */
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Toast Provider Component
 * 
 * @example
 * // In layout.tsx
 * <ToastProvider>
 *   {children}
 * </ToastProvider>
 * 
 * // In any component
 * const { success, error } = useToast();
 * success('Item added', 'Your cart has been updated');
 */
export function ToastProvider({
    children,
    defaultDuration = 5000,
    maxToasts = 5,
    position = 'bottom-right',
}: ToastProviderProps) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback(
        (toast: Omit<Toast, 'id'>) => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
            const duration = toast.duration ?? defaultDuration;

            setToasts((prev) => {
                const newToasts = [...prev, { ...toast, id }];
                // Keep only maxToasts
                return newToasts.slice(-maxToasts);
            });

            // Auto remove after duration
            if (duration > 0) {
                setTimeout(() => removeToast(id), duration);
            }
        },
        [defaultDuration, maxToasts, removeToast]
    );

    const success = useCallback(
        (title: string, message?: string) => addToast({ type: 'success', title, message }),
        [addToast]
    );

    const error = useCallback(
        (title: string, message?: string) => addToast({ type: 'error', title, message }),
        [addToast]
    );

    const info = useCallback(
        (title: string, message?: string) => addToast({ type: 'info', title, message }),
        [addToast]
    );

    const warning = useCallback(
        (title: string, message?: string) => addToast({ type: 'warning', title, message }),
        [addToast]
    );

    const positionStyles = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4',
    };

    return (
        <ToastContext.Provider
            value={{ toasts, addToast, removeToast, success, error, info, warning }}
        >
            {children}
            {/* Toast Container */}
            <div
                className={cn(
                    'fixed z-50 flex flex-col gap-3',
                    positionStyles[position]
                )}
                role="region"
                aria-label="Notifications"
            >
                {toasts.map((toast) => (
                    <ToastItem
                        key={toast.id}
                        toast={toast}
                        onClose={() => removeToast(toast.id)}
                    />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

// Individual Toast Item
interface ToastItemProps {
    toast: Toast;
    onClose: () => void;
}

const typeStyles: Record<ToastType, { bg: string; icon: typeof CheckCircle; iconColor: string }> = {
    success: {
        bg: 'bg-emerald-50 border-emerald-200',
        icon: CheckCircle,
        iconColor: 'text-emerald-500',
    },
    error: {
        bg: 'bg-red-50 border-red-200',
        icon: AlertCircle,
        iconColor: 'text-red-500',
    },
    info: {
        bg: 'bg-blue-50 border-blue-200',
        icon: Info,
        iconColor: 'text-blue-500',
    },
    warning: {
        bg: 'bg-amber-50 border-amber-200',
        icon: AlertTriangle,
        iconColor: 'text-amber-500',
    },
};

function ToastItem({ toast, onClose }: ToastItemProps) {
    const { bg, icon: Icon, iconColor } = typeStyles[toast.type];

    return (
        <div
            className={cn(
                'min-w-[320px] max-w-md',
                'p-4 rounded border',
                'shadow-luxury',
                'animate-in slide-in-from-right-full fade-in duration-300',
                bg
            )}
            role="alert"
        >
            <div className="flex items-start gap-3">
                <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', iconColor)} />
                <div className="flex-1 min-w-0">
                    <p className="font-medium text-black text-sm">{toast.title}</p>
                    {toast.message && (
                        <p className="text-stone-muted text-sm mt-1">{toast.message}</p>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-stone-muted hover:text-black transition-colors"
                    aria-label="Close notification"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}

export default ToastProvider;
export type { Toast, ToastType, ToastContextValue };
