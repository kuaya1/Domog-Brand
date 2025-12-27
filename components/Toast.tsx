'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

export default function Toast({ message, isVisible, onClose }: ToastProps) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="bg-charcoal-900 text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-4 min-w-[300px] border border-gold/20">
                <div className="flex-1">
                    <p className="font-medium text-gold">Success</p>
                    <p className="text-sm text-cream-300">{message}</p>
                </div>
                <button
                    onClick={onClose}
                    className="text-cream-400 hover:text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
}
