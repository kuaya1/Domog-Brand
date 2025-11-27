import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-cream">
            {/* Brand Manifesto - Hero */}
            <section className="relative min-h-screen flex items-center justify-center bg-cream-sand">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 py-32 text-center">
                    <p className="font-sans text-xs uppercase tracking-[0.3em] text-cognac mb-8">
                        A Manifesto
                    </p>
                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-black font-medium leading-tight mb-12">
                        Between the Steppe and the Piazza
                    </h1>
                    <div className="w-16 h-px bg-gold mx-auto" />
                </div>
            </section>

            {/* The Tension */}
            <section className="py-24 lg:py-32 bg-cream">
                <div className="max-w-3xl mx-auto px-6 lg:px-8">
                    <div className="prose prose-lg prose-stone mx-auto">
                        <p className="text-xl lg:text-2xl text-stone-warm leading-relaxed font-serif italic">
                            There is a silence in the Mongolian grasslands that teaches patience. 
                            There is a precision in Italian ateliers that demands perfection. 
                            We live in the space between.
                        </p>
                    </div>
                </div>
            </section>

            {/* Nomadic Strength */}
            <section className="py-24 lg:py-32 bg-cream-sand">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="order-2 lg:order-1">
                            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
                                I. Nomadic Strength
                            </p>
                            <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                                <p>
                                    Our ancestors rode for days across frozen plains. Their boots were not fashion—they were survival. 
                                    The upturned toe, born from reverence for the earth, allowed a rider to slip free from the stirrup 
                                    in a fall. Every curve had purpose. Every stitch, consequence.
                                </p>
                                <p>
                                    This is the inheritance we carry: footwear forged not in showrooms, but in necessity. 
                                    Leather cured to withstand temperatures that would crack lesser materials. 
                                    Soles stitched by hand because machines cannot feel the grain.
                                </p>
                                <p className="text-black font-medium">
                                    We do not make boots. We make instruments for traversing the earth.
                                </p>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 relative h-[500px] bg-cream-200 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-cream-400 font-serif italic">
                                The Steppe at Dawn
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Italian Refinement */}
            <section className="py-24 lg:py-32 bg-cream">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                        <div className="relative h-[500px] bg-cream-200 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-cream-400 font-serif italic">
                                The Atelier
                            </div>
                        </div>
                        <div>
                            <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-6">
                                II. Italian Refinement
                            </p>
                            <div className="space-y-6 text-stone-warm text-lg leading-relaxed">
                                <p>
                                    Yet strength without grace is brutality. We learned this watching the great houses of Europe—
                                    how a single hem, cut one millimeter shorter, transforms presence. How negative space 
                                    speaks louder than ornament. How restraint is the ultimate sophistication.
                                </p>
                                <p>
                                    We apply this discipline to our heritage. Where tradition called for embellishment, 
                                    we often choose silence. Where convention demanded color, we find power in patina. 
                                    The Swiss movements of Furlan Marri taught us: what you leave out matters 
                                    more than what you put in.
                                </p>
                                <p className="text-black font-medium">
                                    Our boots whisper. They do not shout.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Master's Touch - Central Feature */}
            <section className="py-32 lg:py-40 bg-black text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
                </div>
                <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-16">
                        <p className="font-sans text-xs uppercase tracking-[0.3em] text-gold mb-6">
                            III. The Master&apos;s Touch
                        </p>
                        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-cream font-medium leading-tight">
                            My Father&apos;s Hands
                        </h2>
                    </div>
                    
                    <div className="space-y-8 text-cream/70 text-lg lg:text-xl leading-relaxed text-center max-w-2xl mx-auto">
                        <p>
                            In 1990, my father opened a small workshop in Ulaanbaatar. He had no business plan. 
                            He had only his hands—hands that had apprenticed under masters who remembered 
                            the old ways, before factories, before shortcuts.
                        </p>
                        <p>
                            Thirty-five years later, those same hands still touch every pair we make. 
                            Not symbolically. Literally. He inspects each boot at three stages: 
                            after lasting, after stitching, after finishing. If the leather doesn&apos;t 
                            sing under his fingertips, it goes back.
                        </p>
                        <p className="text-cream font-serif italic text-2xl lg:text-3xl py-8">
                            &ldquo;A machine can measure a boot. Only hands can know it.&rdquo;
                        </p>
                        <p>
                            Presidents have worn his work. Champions have competed in it. 
                            But my father does not keep photographs with dignitaries. 
                            He keeps the lasts—wooden forms shaped to the feet of those he&apos;s served. 
                            Each one a conversation. Each one a promise kept.
                        </p>
                    </div>

                    {/* The Hands Image Placeholder */}
                    <div className="mt-20 relative h-80 lg:h-96 bg-black-rich overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center text-cream/30 font-serif italic">
                            The Master&apos;s Hands at Work
                        </div>
                    </div>
                </div>
            </section>

            {/* The Promise */}
            <section className="py-24 lg:py-32 bg-cream-sand">
                <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-8">
                        Our Promise
                    </p>
                    <div className="space-y-8 text-stone-warm text-lg leading-relaxed">
                        <p>
                            We will never open a factory. We will never rush a curing. 
                            We will never replace the human eye with a sensor, 
                            or the human hand with a robot.
                        </p>
                        <p>
                            This means we cannot scale. This means we will disappoint many 
                            who wish to own our work. This means waiting lists, and patience, 
                            and the understanding that some things cannot be Amazon Primed.
                        </p>
                        <p className="text-black font-medium text-xl">
                            We are not building a brand. We are continuing a conversation 
                            that began on the steppe, a thousand years ago.
                        </p>
                    </div>
                    
                    <div className="mt-16 pt-16 border-t border-cream-200">
                        <p className="font-serif text-2xl text-black italic">
                            Domog
                        </p>
                        <p className="text-stone-warm text-sm mt-2 tracking-wide">
                            Est. 1990 · Ulaanbaatar
                        </p>
                    </div>
                </div>
            </section>

            {/* Quiet Clientele */}
            <section className="py-24 lg:py-32 bg-cream">
                <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                    <p className="font-sans text-xs uppercase tracking-[0.25em] text-cognac mb-12">
                        Those Who Walk With Us
                    </p>
                    <p className="text-stone-warm text-lg leading-relaxed max-w-2xl mx-auto">
                        We have been honored to serve heads of state, Olympic champions, 
                        and cultural institutions across three continents. 
                        Out of respect for their privacy, we do not display their names. 
                        They know who they are. So do we.
                    </p>
                </div>
            </section>
        </div>
    );
}
