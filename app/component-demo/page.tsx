'use client';

import { useState } from 'react';
import { ArrowRight, Mail, Lock, Search, Heart, ShoppingBag, Check } from 'lucide-react';
import { Button, Input, Badge, Card, ImageGallery } from '@/components/ui';
import { useToast } from '@/components/ToastProvider';

/**
 * Interactive Component Demo Page
 * Showcases all premium UI components with live examples
 */
export default function ComponentDemoPage() {
    const { success, error, info, warning } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleLoadingDemo = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    const demoImages = [
        { src: '/images/boots/genghis-ceremonial.jpg', alt: 'Genghis Boot - Front View' },
        { src: '/images/boots/naadam-1.jpg', alt: 'Naadam Boot - Side View' },
        { src: '/images/boots/khaan-1.jpg', alt: 'Khaan Boot - Detail View' },
    ];

    return (
        <main className="min-h-screen bg-cream pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20">
                    <Badge variant="gold" className="mb-6">Design System</Badge>
                    <h1 className="font-serif text-5xl md:text-6xl text-black mb-6">
                        Premium Components
                    </h1>
                    <p className="text-stone-muted max-w-2xl mx-auto text-lg">
                        A collection of luxury-styled UI components following the Furlan Marri aesthetic.
                        Built with TypeScript, accessibility, and performance in mind.
                    </p>
                </div>

                {/* Buttons Section */}
                <Section title="Buttons" description="Four variants with multiple sizes and states">
                    <div className="space-y-8">
                        {/* Variants */}
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-widest text-stone-muted">Variants</h4>
                            <div className="flex flex-wrap gap-4">
                                <Button variant="primary">Primary</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="dark">Dark</Button>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-widest text-stone-muted">Sizes</h4>
                            <div className="flex flex-wrap items-center gap-4">
                                <Button size="sm">Small</Button>
                                <Button size="md">Medium</Button>
                                <Button size="lg">Large</Button>
                            </div>
                        </div>

                        {/* With Icons */}
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-widest text-stone-muted">With Icons</h4>
                            <div className="flex flex-wrap gap-4">
                                <Button leftIcon={<Heart size={16} />}>Wishlist</Button>
                                <Button rightIcon={<ArrowRight size={16} />}>Shop Now</Button>
                                <Button variant="dark" leftIcon={<ShoppingBag size={16} />}>Add to Cart</Button>
                            </div>
                        </div>

                        {/* Loading State */}
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-widest text-stone-muted">Loading State</h4>
                            <Button isLoading={isLoading} onClick={handleLoadingDemo}>
                                {isLoading ? 'Processing' : 'Click to Load'}
                            </Button>
                        </div>
                    </div>
                </Section>

                {/* Inputs Section */}
                <Section title="Inputs" description="Floating labels with validation states">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Basic Input */}
                        <Input
                            label="Full Name"
                            placeholder="Enter your name"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        {/* With Icon */}
                        <Input
                            label="Email Address"
                            type="email"
                            leftIcon={<Mail size={18} />}
                        />

                        {/* Password */}
                        <Input
                            label="Password"
                            type="password"
                            leftIcon={<Lock size={18} />}
                            helperText="Must be at least 8 characters"
                        />

                        {/* Search */}
                        <Input
                            label="Search Products"
                            leftIcon={<Search size={18} />}
                        />

                        {/* Error State */}
                        <Input
                            label="Email"
                            type="email"
                            error="Please enter a valid email address"
                            defaultValue="invalid-email"
                        />

                        {/* Success State */}
                        <Input
                            label="Username"
                            success="Username is available"
                            defaultValue="domog_artisan"
                        />
                    </div>

                    {/* Textarea */}
                    <div className="mt-8">
                        <Input
                            as="textarea"
                            label="Your Message"
                            rows={4}
                            helperText="Tell us about your bespoke requirements"
                        />
                    </div>
                </Section>

                {/* Badges Section */}
                <Section title="Badges" description="Multiple variants for different contexts">
                    <div className="space-y-8">
                        {/* Variants */}
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-widest text-stone-muted">Variants</h4>
                            <div className="flex flex-wrap gap-4">
                                <Badge variant="gold">New</Badge>
                                <Badge variant="burgundy">Sale</Badge>
                                <Badge variant="dark">Premium</Badge>
                                <Badge variant="cream">Limited</Badge>
                                <Badge variant="outline">Handcrafted</Badge>
                            </div>
                        </div>

                        {/* Sizes */}
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-widest text-stone-muted">Sizes</h4>
                            <div className="flex flex-wrap items-center gap-4">
                                <Badge size="sm">Small</Badge>
                                <Badge size="md">Medium</Badge>
                                <Badge size="lg">Large</Badge>
                            </div>
                        </div>

                        {/* Special States */}
                        <div className="space-y-4">
                            <h4 className="text-sm uppercase tracking-widest text-stone-muted">Special States</h4>
                            <div className="flex flex-wrap items-center gap-4">
                                <Badge pulse variant="gold">Live</Badge>
                                <Badge dot variant="gold" />
                                <Badge dot variant="burgundy" pulse />
                            </div>
                        </div>
                    </div>
                </Section>

                {/* Cards Section */}
                <Section title="Cards" description="Compound component with flexible layouts">
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Default Card */}
                        <Card variant="bordered">
                            <Card.Header bordered>
                                <h3 className="font-serif text-xl">Default Card</h3>
                            </Card.Header>
                            <Card.Body>
                                <p className="text-stone-muted text-sm">
                                    This is a basic card with bordered variant. Perfect for content sections.
                                </p>
                            </Card.Body>
                            <Card.Footer bordered>
                                <Button variant="ghost" size="sm">Learn More</Button>
                            </Card.Footer>
                        </Card>

                        {/* Elevated Card */}
                        <Card variant="elevated" hover>
                            <Card.Header>
                                <Badge variant="gold" size="sm" className="mb-2">Featured</Badge>
                                <h3 className="font-serif text-xl">Elevated Card</h3>
                            </Card.Header>
                            <Card.Body>
                                <p className="text-stone-muted text-sm">
                                    With hover effect and shadow. Great for interactive content.
                                </p>
                            </Card.Body>
                            <Card.Footer align="between">
                                <span className="text-sm text-stone-muted">$890</span>
                                <Button size="sm">View</Button>
                            </Card.Footer>
                        </Card>

                        {/* Dark Card */}
                        <Card variant="dark">
                            <Card.Header>
                                <h3 className="font-serif text-xl text-cream">Dark Card</h3>
                            </Card.Header>
                            <Card.Body>
                                <p className="text-cream/70 text-sm">
                                    Dark variant for premium sections. Creates visual hierarchy.
                                </p>
                            </Card.Body>
                            <Card.Footer>
                                <Button variant="secondary" size="sm">Explore</Button>
                            </Card.Footer>
                        </Card>
                    </div>
                </Section>

                {/* Toast Section */}
                <Section title="Toasts" description="Notification system with multiple types">
                    <div className="flex flex-wrap gap-4">
                        <Button
                            variant="primary"
                            leftIcon={<Check size={16} />}
                            onClick={() => success('Item Added', 'Your cart has been updated')}
                        >
                            Success Toast
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={() => error('Error', 'Something went wrong. Please try again.')}
                        >
                            Error Toast
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => info('Information', 'New collection arriving next week')}
                        >
                            Info Toast
                        </Button>
                        <Button
                            variant="dark"
                            onClick={() => warning('Low Stock', 'Only 3 items remaining')}
                        >
                            Warning Toast
                        </Button>
                    </div>
                </Section>

                {/* Image Gallery Section */}
                <Section title="Image Gallery" description="With lightbox, zoom, and keyboard navigation">
                    <div className="max-w-lg">
                        <ImageGallery
                            images={demoImages}
                            aspectRatio="portrait"
                            showThumbnails
                            enableLightbox
                            enableZoom
                        />
                    </div>
                    <p className="text-stone-muted text-sm mt-4">
                        Click image to open lightbox. Use arrow keys to navigate. Press Escape to close.
                    </p>
                </Section>

                {/* Color Palette */}
                <Section title="Color Palette" description="The foundation of our luxury aesthetic">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                        <ColorSwatch color="bg-black" name="Black" value="#0A0A0A" />
                        <ColorSwatch color="bg-cream" name="Cream" value="#FAF8F3" textDark />
                        <ColorSwatch color="bg-cognac" name="Cognac" value="#8B6F47" />
                        <ColorSwatch color="bg-burgundy" name="Burgundy" value="#6B2737" />
                        <ColorSwatch color="bg-gold" name="Gold" value="#C9A961" textDark />
                    </div>
                </Section>

                {/* Typography */}
                <Section title="Typography" description="Sculptural headings with refined body text">
                    <div className="space-y-8">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-stone-muted mb-2">Playfair Display (Serif)</p>
                            <h2 className="font-serif text-4xl md:text-5xl text-black">
                                Heritage in Every Stitch
                            </h2>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-widest text-stone-muted mb-2">Inter (Sans)</p>
                            <p className="text-lg text-stone-muted max-w-xl">
                                Where ancient Mongolian craftsmanship meets contemporary design sensibility.
                                Each boot tells a story of dedication, skill, and cultural pride.
                            </p>
                        </div>
                    </div>
                </Section>
            </div>
        </main>
    );
}

// Section wrapper component
function Section({
    title,
    description,
    children,
}: {
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <section className="mb-20 pb-20 border-b border-cream-dark last:border-0">
            <div className="mb-10">
                <h2 className="font-serif text-3xl text-black mb-2">{title}</h2>
                <p className="text-stone-muted">{description}</p>
            </div>
            {children}
        </section>
    );
}

// Color swatch component
function ColorSwatch({
    color,
    name,
    value,
    textDark = false,
}: {
    color: string;
    name: string;
    value: string;
    textDark?: boolean;
}) {
    return (
        <div className="space-y-2">
            <div
                className={`h-24 rounded ${color} ${textDark ? 'text-black' : 'text-white'} flex items-end p-3`}
            >
                <span className="text-xs opacity-75">{value}</span>
            </div>
            <p className="text-sm font-medium">{name}</p>
        </div>
    );
}
