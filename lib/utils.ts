import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

/**
 * tailwind-merge must know the custom font sizes in tailwind.config.ts.
 * Otherwise it reads `text-label-lg` as a text colour and drops the real
 * colour (for example `text-cream-50` on primary buttons).
 */
const twMerge = extendTailwindMerge({
    extend: {
        classGroups: {
            'font-size': [
                {
                    text: [
                        'display-xl',
                        'display-lg',
                        'display-md',
                        'display-sm',
                        'display-xs',
                        'heading-xl',
                        'heading-lg',
                        'heading-md',
                        'body-lg',
                        'body-md',
                        'body-sm',
                        'body-xs',
                        'label-lg',
                        'label-md',
                        'label-sm',
                    ],
                },
            ],
        },
    },
});

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
