'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/shop' },
      { label: 'Collections', href: '/collections' },
      { label: 'Heritage', href: '/heritage' },
    ],
    support: [
      { label: 'Size Guide', href: '/size-guide' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Returns', href: '/returns' },
    ],
    company: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy', href: '/privacy' },
    ],
  };

  return (
    <footer className="relative mt-24 border-t border-ink/15 bg-ink text-rice">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.08),transparent_65%)]" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-10 py-20">
        <div className="grid gap-12 lg:grid-cols-[220px_1fr]">
          <div className="space-y-10">
            <div>
              <p className="text-[0.6rem] uppercase tracking-[0.45em] text-rice/40">Domog</p>
              <h3 className="mt-4 text-3xl font-serif tracking-[0.2em]">Nomadic Atelier</h3>
              <p className="mt-4 text-sm leading-6 text-rice/70">
                Quiet luxury forged by Mongolian artisanship and refined through Japanese restraint.
              </p>
            </div>
            <div className="space-y-4 text-[0.65rem] uppercase tracking-[0.4em] text-rice/50">
              <p>Tokyo · Ulaanbaatar · Digital Atelier</p>
              <span className="block h-px w-20 bg-rice/20" />
              <p>Est. 1989</p>
            </div>
            <div className="flex gap-4 text-sm uppercase tracking-[0.3em] text-rice/60">
              <Link href="https://instagram.com" target="_blank" className="hover:text-jade">Instagram</Link>
              <Link href="https://pinterest.com" target="_blank" className="hover:text-jade">Pinterest</Link>
              <Link href="/journal" className="hover:text-jade">Journal</Link>
            </div>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="space-y-5">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-rice/50">
                  {title}
                </p>
                <ul className="space-y-3 text-sm leading-7 text-rice/80">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link className="transition hover:text-jade" href={link.href}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1fr_auto]">
          <div className="space-y-4 max-w-xl">
            <p className="text-[0.65rem] uppercase tracking-[0.35em] text-rice/50">Studio Dispatch</p>
            <p className="text-sm leading-7 text-rice/70">
              Receive fragments on new releases, atelier residencies, and the quiet rituals guiding each pair.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email for dispatches"
                required
                className="flex-1 rounded-full border border-rice/20 bg-transparent px-5 py-3 text-sm uppercase tracking-[0.25em] placeholder:text-rice/30 focus:outline-none focus:border-jade"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-3 rounded-full border border-jade/60 px-6 py-3 text-[0.65rem] uppercase tracking-[0.35em] text-jade transition hover:bg-jade hover:text-ink"
              >
                <span className="h-px w-5 bg-jade/50" />
                Send
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-between text-[0.65rem] uppercase tracking-[0.35em] text-rice/50">
            <span className="vertical-text hidden lg:flex">Quiet luxury</span>
            <p>Made with pride in Mongolia.</p>
            <p>Heritage. Stillness. Motion.</p>
          </div>
        </div>
      </div>

      <div className="relative border-t border-rice/15">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 py-6 flex flex-col gap-3 text-[0.6rem] uppercase tracking-[0.35em] text-rice/40 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Domog Atelier</p>
          <p>Crafted for wandering empires</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
