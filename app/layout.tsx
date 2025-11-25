import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const inter = Inter({ 
    subsets: ["latin"], 
    variable: "--font-inter",
    weight: ["300", "400", "500", "600"],
    display: "swap",
});

const playfair = Playfair_Display({ 
    subsets: ["latin"], 
    variable: "--font-playfair",
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Domog Brand | Premium Mongolian Footwear",
    description: "Handcrafted traditional Mongolian boots. 35 years of master craftsmanship for presidents, champions, and discerning collectors.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth">
            <body className={`${inter.variable} ${playfair.variable} font-sans bg-cream text-black antialiased`}>
                <Navigation />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
