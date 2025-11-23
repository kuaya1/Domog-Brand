export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  sizes: string[];
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Genghis Ceremonial Boot",
    price: 450,
    description: "Masterfully crafted over 35 years of heritage, these ceremonial boots represent the pinnacle of Mongolian artisanship. Hand-stitched from premium cowhide leather with intricate traditional patterns symbolizing strength and unity, they have graced the feet of presidents and dignitaries. Each pair embodies commanding presence while honoring the ancient techniques passed down through generations of master craftsmen.",
    images: ["/images/boot-1.jpg"],
    category: "Ceremonial",
    sizes: ["39", "40", "41", "42", "43", "44"],
    inStock: true
  },
  {
    id: "2",
    name: "Naadam Festival Boot",
    price: 380,
    description: "Born from our 35-year legacy of serving Mongolia's greatest champions, these festival boots seamlessly blend wrestling flexibility with ceremonial elegance. The signature upturned toe design honors the sacred earth, a hallmark of authentic Mongolian tradition. Worn by national athletes and cultural ambassadors, each pair is crafted using time-honored techniques with premium materials that ensure both performance and prestige.",
    images: ["/images/boot-2.jpg"],
    category: "Festival",
    sizes: ["38", "39", "40", "41", "42", "43"],
    inStock: true
  },
  {
    id: "3",
    name: "Steppe Rider Boot",
    price: 290,
    description: "Engineered for the rugged Mongolian steppe through decades of refinement, these riding boots combine ancestral wisdom with modern durability. Reinforced leather soles and insulated felt lining provide unmatched warmth and grip for long horseback journeys. Trusted by herders and riders who demand boots that perform in extreme conditions, they represent our commitment to functional excellence rooted in traditional Mongolian craftsmanship.",
    images: ["/images/boot-3.jpg"],
    category: "Riding",
    sizes: ["40", "41", "42", "43", "44", "45"],
    inStock: true
  },
  {
    id: "4",
    name: "Altai Mountain Boot",
    price: 320,
    description: "Inspired by the majestic Altai peaks and perfected through 35 years of master craftsmanship, these winter boots feature robust construction with decorative embroidery symbolizing the eternal blue sky. Premium insulation and weatherproof leather make them ideal for harsh winters and cultural celebrations alike. Each pair tells a story of Mongolian resilience, combining practical warmth with the artistic heritage our artisans are renowned for.",
    images: ["/images/boot-4.jpg"],
    category: "Winter",
    sizes: ["38", "39", "40", "41", "42"],
    inStock: true
  },
  {
    id: "5",
    name: "Khan's Legacy Boot",
    price: 420,
    description: "A true masterpiece requiring over 40 hours of meticulous handwork, these luxury boots showcase the zenith of our 35-year heritage. Gold-thread embroidery and the finest calf leather create an heirloom worthy of the Great Khans themselves. Reserved for those who appreciate supreme artistry, each pair has been worn by prime ministers and distinguished guests, representing the ultimate expression of Mongolian bootmaking tradition and prestige.",
    images: ["/images/boot-5.jpg"],
    category: "Luxury",
    sizes: ["40", "41", "42", "43", "44"],
    inStock: true
  },
  {
    id: "6",
    name: "Bogd Khan Sacred Boot",
    price: 440,
    description: "Reflecting the spiritual grandeur of the Bogd Khan, these boots are a testament to 35 years of ceremonial mastery. Crafted with sacred motifs and premium leather, they are designed for moments of profound cultural importance. Worn by high-ranking lamas and dignitaries, they bridge the earthly and the divine through exquisite traditional craftsmanship.",
    images: ["/images/boot-6.jpg"],
    category: "Ceremonial",
    sizes: ["39", "40", "41", "42", "43", "44"],
    inStock: true
  },
  {
    id: "7",
    name: "Three Games Champion Boot",
    price: 390,
    description: "Celebrating the spirit of Naadam, these boots are built for the champions of the 'Three Manly Games.' With 35 years of performance heritage, they offer the flexibility needed for archery and wrestling while maintaining a regal appearance. The vibrant stitching and durable hide make them a favorite among festival winners and cultural enthusiasts alike.",
    images: ["/images/boot-7.jpg"],
    category: "Festival",
    sizes: ["38", "39", "40", "41", "42", "43"],
    inStock: true
  },
  {
    id: "8",
    name: "Khentii Range Rider",
    price: 310,
    description: "Forged for the rugged terrain of the Khentii Mountains, these boots embody the endurance of the Mongol horseman. Our 35-year legacy ensures a perfect fit for long rides, utilizing reinforced soles and weather-resistant leather. Trusted by expert equestrians, they offer superior grip and comfort, allowing you to traverse the wild steppes with confidence.",
    images: ["/images/boot-8.jpg"],
    category: "Riding",
    sizes: ["40", "41", "42", "43", "44", "45"],
    inStock: true
  },
  {
    id: "9",
    name: "Khövsgöl Ice Boot",
    price: 340,
    description: "Inspired by the frozen majesty of Lake Khövsgöl, these winter boots provide unparalleled warmth without compromising style. Lined with thick sheepskin and crafted from heavy-duty leather, they are the result of 35 years of perfecting cold-weather gear. Whether for ice festivals or daily winter wear, they offer protection worthy of those who thrive in the harshest climates.",
    images: ["/images/boot-9.jpg"],
    category: "Winter",
    sizes: ["38", "39", "40", "41", "42"],
    inStock: true
  },
  {
    id: "10",
    name: "Zud Survivor Boot",
    price: 350,
    description: "Named after the fierce Mongolian winter, the Zud Survivor is engineered to withstand extreme cold. With triple-layer insulation and a design refined over three decades, these boots are a lifeline for herders and adventurers. They combine rugged durability with the elegant lines of traditional footwear, ensuring you stay warm while honoring the resilience of the nomad.",
    images: ["/images/boot-10.jpg"],
    category: "Winter",
    sizes: ["39", "40", "41", "42", "43", "44"],
    inStock: true
  },
  {
    id: "11",
    name: "Golden Eagle Hunter Boot",
    price: 480,
    description: "Capturing the noble spirit of the eagle hunters, these luxury boots are a fusion of wild beauty and refined artistry. Hand-tooled leather and gold accents reflect 35 years of dedication to creating footwear for the elite. Worn by cultural icons, they stand as a symbol of freedom and power, perfect for those who command attention.",
    images: ["/images/boot-11.jpg"],
    category: "Luxury",
    sizes: ["40", "41", "42", "43", "44"],
    inStock: true
  },
  {
    id: "12",
    name: "Ulaanbaatar City Walker",
    price: 220,
    description: "Blending traditional aesthetics with modern urban needs, the Ulaanbaatar City Walker is perfect for the contemporary nomad. These boots feature a lighter sole and breathable leather, refined over 35 years to provide all-day comfort. Ideal for office or street wear, they allow you to carry a piece of Mongolian heritage wherever you go.",
    images: ["/images/boot-12.jpg"],
    category: "Daily Wear",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true
  },
  {
    id: "13",
    name: "Orkhon Valley Casual",
    price: 190,
    description: "Inspired by the lush landscapes of the Orkhon Valley, these boots offer a relaxed yet distinguished look. Crafted with soft, supple leather and traditional stitching, they represent the accessible side of our 35-year craftsmanship. Perfect for daily use, they bring the comfort of the steppe to your everyday life, favored by those who value authenticity.",
    images: ["/images/boot-13.jpg"],
    category: "Daily Wear",
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    inStock: true
  },
  {
    id: "14",
    name: "Eternal Blue Sky Wedding Boot",
    price: 460,
    description: "Designed for the most auspicious day of your life, these wedding boots symbolize eternal love and the vast blue sky. Intricate embroidery and the finest white leather showcase the peak of our 35-year artisanal tradition. Worn by couples seeking to honor their heritage, they add a touch of majestic elegance to any traditional ceremony.",
    images: ["/images/boot-14.jpg"],
    category: "Wedding",
    sizes: ["37", "38", "39", "40", "41", "42"],
    inStock: true
  },
  {
    id: "15",
    name: "Silk Road Bridal Boot",
    price: 490,
    description: "Evoking the romance of ancient trade routes, these bridal boots are a masterpiece of silk and leather. With delicate patterns and luxurious materials, they are the crown jewel of our 35-year history. Created for brides who desire a connection to the past, they ensure you walk down the aisle with the grace and beauty of a queen.",
    images: ["/images/boot-15.jpg"],
    category: "Wedding",
    sizes: ["36", "37", "38", "39", "40", "41"],
    inStock: true
  }
];
