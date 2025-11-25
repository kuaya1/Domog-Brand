export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    images: string[];
    category: string;
    sizes: string[];
    isNew?: boolean;
    inStock?: boolean;
}

export const products: Product[] = [
    {
        id: "1",
        name: "Genghis Ceremonial Boot",
        price: 450,
        description: "Hand-stitched from premium cowhide leather, these boots feature intricate traditional patterns representing strength and unity. Worn by dignitaries for centuries, they offer both commanding presence and exceptional durability.",
        images: ["/images/boot-1.jpg"],
        category: "Ceremonial",
        sizes: ["39", "40", "41", "42", "43", "44"],
        isNew: true,
        inStock: true,
    },
    {
        id: "2",
        name: "Naadam Festival Boot",
        price: 380,
        description: "Designed for the annual Naadam festival, these boots combine flexibility for wrestling with the elegance required for opening ceremonies. The upturned toe design respects the land, a hallmark of Mongolian tradition.",
        images: ["/images/boot-2.jpg"],
        category: "Festival",
        sizes: ["38", "39", "40", "41", "42", "43"],
        isNew: true,
        inStock: true,
    },
    {
        id: "3",
        name: "Steppe Rider Boot",
        price: 290,
        description: "Built for the rugged terrain of the Mongolian steppe. Reinforced leather soles and insulated felt lining ensure warmth and grip during long horseback rides in winter conditions.",
        images: ["/images/boot-3.jpg"],
        category: "Riding",
        sizes: ["40", "41", "42", "43", "44", "45"],
        inStock: true,
    },
    {
        id: "4",
        name: "Altai Mountain Boot",
        price: 320,
        description: "Inspired by the peaks of the Altai Mountains, these boots feature a robust construction with decorative embroidery symbolizing the eternal blue sky. Perfect for cold weather and cultural events.",
        images: ["/images/boot-4.jpg"],
        category: "Winter",
        sizes: ["38", "39", "40", "41", "42"],
        inStock: true,
    },
    {
        id: "5",
        name: "Khan's Legacy Boot",
        price: 420,
        description: "A masterpiece of craftsmanship, featuring gold-thread embroidery and the finest calf leather. Each pair takes over 40 hours to complete, embodying the spirit of the Great Khans.",
        images: ["/images/boot-5.jpg"],
        category: "Luxury",
        sizes: ["40", "41", "42", "43", "44"],
        inStock: true,
    },
];
