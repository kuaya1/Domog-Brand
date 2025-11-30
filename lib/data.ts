export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    sizes: string[];
    category: 'Traditional' | 'Ceremonial' | 'Festival' | 'Daily Wear';
    inStock: boolean;
    isNew?: boolean;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Genghis Legacy Ceremonial Boot',
        price: 450,
        description: 'Handcrafted with the finest leather and intricate embroidery, the Genghis Legacy boot embodies the spirit of the Great Khan. Designed for ceremonial use, it features traditional patterns that tell stories of conquest and unity. The upturned toe, a signature of Mongolian footwear, respects the earth by minimizing impact on the soil.',
        images: [
            '/images/product photos/Genghis ceremonial left.jpg',
            '/images/product photos/Genghis ceremonial right.jpg',
            '/images/product photos/Genghis ceremonial back.jpg',
        ],
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
        category: 'Ceremonial',
        inStock: true,
        isNew: true,
    },
    {
        id: '2',
        name: 'Naadam Festival Premium Boot',
        price: 380,
        description: 'Celebrate the "Three Manly Games" in style with our Naadam Festival Premium Boot. Built for durability and comfort, this boot is perfect for wrestling, archery, and horse racing spectators alike. The vibrant colors reflect the joy and energy of the summer festival.',
        images: [
            '/images/product photos/Naadam Festival left.jpg',
            '/images/product photos/Naadam Festival right.jpg',
            '/images/product photos/naadam festival back.jpg',
        ],
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
        category: 'Festival',
        inStock: true,
    },
    {
        id: '3',
        name: 'Steppe Rider Traditional Boot',
        price: 250,
        description: 'The Steppe Rider is the quintessential boot for the modern nomad. Rugged, practical, and deeply rooted in tradition, it offers superior protection against the elements. Whether you are riding across the plains or navigating city streets, this boot provides unmatched support.',
        images: [
            '/images/product photos/Steppe rider left.jpg',
            '/images/product photos/Steppe rider right.jpg',
            '/images/product photos/Steppe rider back.jpg',
        ],
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
        category: 'Daily Wear',
        inStock: true,
    },
    {
        id: '4',
        name: 'Golden Horde Diplomatic Boot',
        price: 420,
        description: 'Inspired by the opulent attire of the Golden Horde court, this boot features gold-threaded embroidery and premium felt lining. It is a statement piece that commands respect and admiration, suitable for high-profile gatherings and cultural events.',
        images: [
            '/images/product photos/khans legacy left.jpg',
            '/images/product photos/khans legacy right.jpg',
            '/images/product photos/khans legacy back.jpg',
        ],
        sizes: ['39', '40', '41', '42', '43', '44'],
        category: 'Traditional',
        inStock: true,
        isNew: true,
    },
    {
        id: '5',
        name: 'Khaan Signature Handcrafted Boot',
        price: 180,
        description: 'Our entry-level handcrafted boot, the Khaan Signature, offers authentic Mongolian craftsmanship at an accessible price. It features a simplified design while maintaining the classic silhouette and durable construction that Domog Brand is known for.',
        images: [
            '/images/product photos/Burkhan Khalduun left.jpg',
            '/images/product photos/Burkhan Khalduun right.jpg',
            '/images/product photos/Burkhan Khalduun back.jpg',
        ],
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
        category: 'Daily Wear',
        inStock: true,
    },
    {
        id: '6',
        name: 'Altai Mountain Heritage Boot',
        price: 320,
        description: 'Inspired by the majestic Altai Mountains, this heritage boot combines rugged durability with refined aesthetics. Perfect for those who appreciate the natural beauty of Mongolia and seek footwear that can handle both adventure and everyday elegance.',
        images: [
            '/images/product photos/Altai mountain left.jpg',
            '/images/product photos/Altai mountain right.jpg',
            '/images/product photos/Altai Mountain back.jpg',
        ],
        sizes: ['38', '39', '40', '41', '42', '43', '44', '45'],
        category: 'Traditional',
        inStock: true,
    },
];
