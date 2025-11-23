'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });

        setTimeout(() => setStatus('idle'), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                        Contact Us
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Have questions about sizing, custom orders, or our heritage? We&apos;re here to help.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Contact Info */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                            Get in Touch
                        </h2>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-amber-50 p-3 rounded-lg text-amber-700">
                                    <Phone size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                                    <p className="text-gray-600">+976 9911-XXXX</p>
                                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-amber-50 p-3 rounded-lg text-amber-700">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                                    <p className="text-gray-600">info@domogbrand.com</p>
                                    <p className="text-sm text-gray-500 mt-1">We reply within 24 hours</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-amber-50 p-3 rounded-lg text-amber-700">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Workshop</h3>
                                    <p className="text-gray-600">
                                        Khan-Uul District, 15th Khoroo<br />
                                        Ulaanbaatar, Mongolia
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-amber-50 p-3 rounded-lg text-amber-700">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-1">Business Hours</h3>
                                    <p className="text-gray-600">Monday - Friday: 09:00 - 18:00</p>
                                    <p className="text-gray-600">Saturday: 10:00 - 15:00</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white rounded-2xl shadow-sm p-8 lg:p-12">
                        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                            Send a Message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4 bg-gray-50"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4 bg-gray-50"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4 bg-gray-50"
                                        placeholder="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 py-3 px-4 bg-gray-50"
                                    placeholder="How can we help you?"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting' || status === 'success'}
                                className="w-full bg-amber-700 text-white py-4 px-8 rounded-md font-bold hover:bg-amber-800 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                            >
                                {status === 'submitting' ? (
                                    'Sending...'
                                ) : status === 'success' ? (
                                    'Message Sent!'
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
