"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const footerLinks: Record<string, { label: string; href: string }[]> = {
    Shop: [
        { label: "Laptop Sleeve", href: "/shop" },
        { label: "Gift Cards", href: "/gift-cards" },
    ],
    Support: [
        { label: "FAQ", href: "/faq" },
        { label: "Shipping Policy", href: "/shipping" },
        { label: "Returns", href: "/shipping" },
        { label: "Contact Us", href: "/contact" },
    ],
    Company: [
        { label: "About EVONIQ", href: "/about" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-[#DDD5C8] border-t border-[#B87333]/15">
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#B87333]/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="logo-ring">
                                <Image
                                    src="/images/logo/evoniq-logo.png"
                                    alt="EVONIQ Logo"
                                    width={36}
                                    height={36}
                                    className="logo-premium"
                                />
                            </span>
                            <span className="text-lg font-montserrat font-semibold tracking-[0.15em] copper-text">
                                EVONIQ
                            </span>
                        </div>
                        <p className="text-[#5C524A] text-sm leading-relaxed max-w-sm mb-8">
                            Precision-crafted workspace solutions for the discerning professional.
                            Where ergonomic excellence meets seamless power delivery.
                        </p>

                        {/* Social links */}
                        <div className="flex items-center gap-3 mb-8">
                            {/* Instagram */}
                            <a
                                href="https://www.instagram.com/evoniqstudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="EVONIQ on Instagram"
                                className="w-9 h-9 rounded-xl glass glow-gold-hover flex items-center justify-center text-[#B87333] hover:text-white hover:bg-gradient-to-br hover:from-[#CD7F32] hover:to-[#B87333] transition-all duration-300"
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <circle cx="12" cy="12" r="4" />
                                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                                </svg>
                            </a>
                            {/* WhatsApp */}
                            <a
                                href="https://wa.me/qr/WT2VH4EPS7NTE1"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Chat with EVONIQ on WhatsApp"
                                className="w-9 h-9 rounded-xl glass glow-gold-hover flex items-center justify-center text-[#B87333] hover:text-white hover:bg-gradient-to-br hover:from-[#CD7F32] hover:to-[#B87333] transition-all duration-300"
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                            {/* Email */}
                            <a
                                href="mailto:contactevoniq@gmail.com"
                                aria-label="Email EVONIQ support"
                                className="w-9 h-9 rounded-xl glass glow-gold-hover flex items-center justify-center text-[#B87333] hover:text-white hover:bg-gradient-to-br hover:from-[#CD7F32] hover:to-[#B87333] transition-all duration-300"
                            >
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="2" y="4" width="20" height="16" rx="2" />
                                    <polyline points="2,4 12,13 22,4" />
                                </svg>
                            </a>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <p className="text-[#5C524A] text-sm font-medium mb-3 uppercase tracking-[0.2em]">
                                Stay informed
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    aria-label="Email address for newsletter"
                                    className="flex-1 px-4 py-2.5 rounded-xl bg-white/50 border border-[#B87333]/15 text-[#2A2420] text-sm placeholder:text-[#8A7F75] focus:outline-none focus:border-[#B87333]/50 focus:ring-1 focus:ring-[#B87333]/20 transition-all"
                                />
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(184,115,51,0.3)] transition-all"
                                >
                                    Join
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-[#2A2420] text-sm font-semibold uppercase tracking-[0.2em] mb-5">
                                {title}
                            </h4>
                            <ul className="space-y-3">
                                {links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-[#8A7F75] text-sm hover:text-[#B87333] transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-[#B87333]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[#8A7F75] text-xs">
                        © 2025 EVONIQ. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        {["Privacy Policy", "Terms of Service", "Cookies"].map((item) => (
                            <a
                                key={item}
                                href="#"
                                className="text-[#8A7F75] text-xs hover:text-[#B87333] transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
