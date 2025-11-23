import Image from 'next/image';

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative bg-gray-900 py-24 sm:py-32">
                <div className="absolute inset-0 overflow-hidden">
                    {/* Placeholder for hero image */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/90 z-10" />
                    <div className="absolute inset-0 bg-gray-800" />
                </div>
                <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-serif font-bold tracking-tight text-white sm:text-6xl mb-6">
                        35 Years of Excellence
                    </h1>
                    <p className="text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
                        Preserving the ancient art of Mongolian bootmaking for the modern world.
                    </p>
                </div>
            </div>

            {/* Heritage Section */}
            <div className="py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">
                                A Legacy of Craftsmanship
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg">
                                <p>
                                    Founded in 1990, Domog Brand began as a small workshop in Ulaanbaatar with a singular mission: to keep the intricate art of traditional Mongolian footwear alive.
                                </p>
                                <p>
                                    For over three decades, we have served everyone from nomadic herders to presidents, delivering boots that are not just footwear, but pieces of cultural history. Our master craftsmen, many of whom have been with us since the beginning, use techniques passed down through generations.
                                </p>
                                <p>
                                    Every stitch tells a story. The upturned toe respects the land. The intricate patterns honor our ancestors. The durability ensures our legacy walks on.
                                </p>
                            </div>
                        </div>
                        <div className="relative h-96 lg:h-full min-h-[400px] bg-gray-100 rounded-2xl overflow-hidden">
                            {/* Placeholder for workshop image */}
                            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                Workshop Image
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Master Craftsmen */}
            <div className="bg-gray-50 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-serif font-bold text-gray-900">
                            Our Masters
                        </h2>
                        <p className="mt-4 text-gray-600">
                            The hands behind the heritage.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-64 bg-gray-200 relative">
                                    {/* Placeholder for craftsman image */}
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        Master Artisan {i}
                                    </h3>
                                    <p className="text-amber-700 font-medium mb-4">
                                        {10 + i * 5} Years Experience
                                    </p>
                                    <p className="text-gray-600">
                                        Specializing in traditional embroidery and leather tooling techniques.
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Clientele */}
            <div className="py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12">
                        Trusted by Leaders
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Placeholders for logos/client names */}
                        <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg font-serif font-bold text-xl">Government</div>
                        <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg font-serif font-bold text-xl">Cultural Inst.</div>
                        <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg font-serif font-bold text-xl">Embassies</div>
                        <div className="h-24 flex items-center justify-center bg-gray-50 rounded-lg font-serif font-bold text-xl">Artists</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
