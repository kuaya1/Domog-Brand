'use client';

import { useEffect, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { 
    useUIStore, 
    useToasts, 
    useToastPosition,
    type Toast,
    type ToastType,
    type ToastPosition 
} from '@/lib/stores/ui-store';
import { cn } from '@/lib/utils';

// ============================================================================
// Types & Constants
// ============================================================================

const TOAST_ICONS: Record<ToastType, React.ComponentType<{ className?: string }>> = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
};

const TOAST_COLORS: Record<ToastType, { bg: string; border: string; icon: string; text: string }> = {
    success: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-500',
        text: 'text-green-800',
    },
    error: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-500',
        text: 'text-red-800',
    },
    info: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-500',
        text: 'text-blue-800',
    },
    warning: {
        bg: 'bg-amber-50',
        border: 'border-amber-200',
        icon: 'text-amber-500',
        text: 'text-amber-800',
    },
};

const PROGRESS_COLORS: Record<ToastType, string> = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    info: 'bg-blue-500',
    warning: 'bg-amber-500',
};

const POSITION_CLASSES: Record<ToastPosition, string> = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

const ANIMATION_CLASSES: Record<ToastPosition, { enter: string; exit: string }> = {
    'top-right': { enter: 'animate-slide-in-right', exit: 'animate-slide-out-right' },
    'top-left': { enter: 'animate-slide-in-left', exit: 'animate-slide-out-left' },
    'bottom-right': { enter: 'animate-slide-in-right', exit: 'animate-slide-out-right' },
    'bottom-left': { enter: 'animate-slide-in-left', exit: 'animate-slide-out-left' },
    'top-center': { enter: 'animate-slide-in-top', exit: 'animate-slide-out-top' },
    'bottom-center': { enter: 'animate-slide-in-bottom', exit: 'animate-slide-out-bottom' },
};

// ============================================================================
// Toast Item Component
// ============================================================================

interface ToastItemProps {
    toast: Toast;
    position: ToastPosition;
    onDismiss: (id: string) => void;
}

function ToastItem({ toast, position, onDismiss }: ToastItemProps) {
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);

    const colors = TOAST_COLORS[toast.type];
    const Icon = toast.icon ? () => <>{toast.icon}</> : TOAST_ICONS[toast.type];
    const animations = ANIMATION_CLASSES[position];

    const handleDismiss = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => {
            onDismiss(toast.id);
        }, 200);
    }, [toast.id, onDismiss]);

    // Progress bar animation
    useEffect(() => {
        if (toast.duration <= 0) return;

        const startTime = toast.createdAt;
        const endTime = startTime + toast.duration;

        let animationFrame: number;

        const updateProgress = () => {
            if (isPaused) {
                animationFrame = requestAnimationFrame(updateProgress);
                return;
            }

            const now = Date.now();
            const elapsed = now - startTime;
            const remaining = Math.max(0, 100 - (elapsed / toast.duration) * 100);

            setProgress(remaining);

            if (remaining > 0) {
                animationFrame = requestAnimationFrame(updateProgress);
            }
        };

        animationFrame = requestAnimationFrame(updateProgress);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [toast.duration, toast.createdAt, isPaused]);

    return (
        <div
            className={cn(
                "relative flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg backdrop-blur-sm transition-all duration-200",
                colors.bg,
                colors.border,
                isExiting ? animations.exit : animations.enter
            )}
            role="alert"
            aria-live="polite"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Icon */}
            <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", colors.icon)} />

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", colors.text)}>
                    {toast.title}
                </p>
                {toast.message && (
                    <p className={cn("mt-1 text-sm", colors.text, "opacity-80")}>
                        {toast.message}
                    </p>
                )}
                {toast.action && (
                    <button
                        onClick={() => {
                            toast.action?.onClick();
                            handleDismiss();
                        }}
                        className={cn(
                            "mt-2 text-sm font-medium underline underline-offset-2",
                            colors.text,
                            "hover:opacity-80 transition-opacity"
                        )}
                    >
                        {toast.action.label}
                    </button>
                )}
            </div>

            {/* Dismiss Button */}
            {toast.dismissible && (
                <button
                    onClick={handleDismiss}
                    className={cn(
                        "flex-shrink-0 rounded p-1 transition-colors",
                        colors.text,
                        "opacity-60 hover:opacity-100"
                    )}
                    aria-label="Dismiss notification"
                >
                    <X className="h-4 w-4" />
                </button>
            )}

            {/* Progress Bar */}
            {toast.duration > 0 && (
                <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-lg">
                    <div
                        className={cn(
                            "h-full transition-all ease-linear",
                            PROGRESS_COLORS[toast.type],
                            isPaused ? "opacity-50" : "opacity-100"
                        )}
                        style={{ 
                            width: `${progress}%`,
                            transitionDuration: isPaused ? '0s' : '100ms'
                        }}
                    />
                </div>
            )}
        </div>
    );
}

// ============================================================================
// Toast Container Component
// ============================================================================

export function ToastProvider() {
    const toasts = useToasts();
    const position = useToastPosition();
    const removeToast = useUIStore(state => state.removeToast);

    // Determine stack direction based on position
    const isTopPosition = position.startsWith('top');

    if (toasts.length === 0) return null;

    return (
        <div
            className={cn(
                "fixed z-[100] flex flex-col gap-3 pointer-events-none",
                POSITION_CLASSES[position],
                isTopPosition ? "flex-col" : "flex-col-reverse"
            )}
            aria-label="Notifications"
            role="region"
        >
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem
                        toast={toast}
                        position={position}
                        onDismiss={removeToast}
                    />
                </div>
            ))}
        </div>
    );
}

// ============================================================================
// Custom Hook for Easy Toast Access
// ============================================================================

export function useToast() {
    const toast = useUIStore(state => state.toast);
    const addToast = useUIStore(state => state.addToast);
    const removeToast = useUIStore(state => state.removeToast);
    const clearToasts = useUIStore(state => state.clearToasts);
    const setToastPosition = useUIStore(state => state.setToastPosition);

    return {
        success: toast.success,
        error: toast.error,
        info: toast.info,
        warning: toast.warning,
        addToast,
        removeToast,
        clearToasts,
        setPosition: setToastPosition,
    };
}

export default ToastProvider;
