"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ProductSleeveScroll from "@/components/ProductSleeveScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import AnnouncementRibbon from "@/components/AnnouncementRibbon";
import PromoBanner from "@/components/PromoBanner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default function HomePage() {
    const product = products[0]; // Black variant — the one with frame assets
    const heroRef = useRef<HTMLDivElement>(null);
    const ctaSectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: ctaSectionRef,
        offset: ["start end", "end start"],
    });

    const ctaOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const ctaY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);

    return (
        <main className="relative suede-bg">
            <Navbar />
            <AnnouncementRibbon />

            {/* ─── Hero Scrollytelling Section ─── */}
            <div ref={heroRef} className="relative bg-black">
                <ProductSleeveScroll
                    folderPath={product.folderPath}
                    frameCount={product.frameCount}
                    frameExtension={product.frameExtension}
                />
                <ProductTextOverlays
                    section1={product.section1}
                    section2={product.section2}
                    section3={product.section3}
                    section4={product.section4}
                />

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="flex flex-col items-center gap-2"
                    >
                        <span className="text-white/30 text-xs uppercase tracking-[0.3em] font-light glow-text-gold" style={{ textShadow: '0 0 10px rgba(184,115,51,0.5)' }}>
                            Scroll
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#B87333]/80 icon-gold"
                            >
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                            </svg>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <PromoBanner />

            {/* ─── Key Highlights Strip ─── */}
            <section className="relative py-16 sm:py-20 overflow-hidden">
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block glow-text-gold">
                            Key Highlights
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#2A2420] tracking-[0.02em]">
                            Everything in one sleeve
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                        {product.stats.map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    delay: i * 0.15,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="glass liquid-glass glow-gold-hover rounded-2xl p-6 sm:p-8 text-center group hover:border-[#B87333]/30 transition-all duration-500"
                            >
                                <p className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-[#2A2420] mb-2 group-hover:text-[#B87333] group-hover:glow-text-gold transition-colors duration-300">
                                    {stat.val}
                                </p>
                                <p className="text-[#8A7F75] text-sm uppercase tracking-[0.2em] font-medium">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Features Grid ─── */}
            <section className="relative py-16 sm:py-24 overflow-hidden">
                <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-12 sm:mb-16"
                    >
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#2A2420] mb-4 sm:mb-6 tracking-[0.02em]">
                            {product.detailsSection.title}
                        </h2>
                        <p className="text-[#5C524A] text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                            {product.detailsSection.description}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {product.features.map((feature, i) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                    duration: 0.5,
                                    delay: i * 0.1,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                viewport={{ once: true }}
                                className="glass liquid-glass glow-gold-hover rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center gap-3 sm:gap-4 group hover:border-[#B87333]/25 transition-all duration-500"
                            >
                                {/* Feature icon */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#B87333]/15 to-[#CD7F32]/10 flex items-center justify-center group-hover:from-[#B87333]/25 group-hover:to-[#CD7F32]/15 transition-all duration-300">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="text-[#B87333]"
                                    >
                                        {i === 0 && (
                                            <>
                                                <rect x="3" y="3" width="18" height="18" rx="3" />
                                                <path d="M3 9h18M9 3v18" />
                                            </>
                                        )}
                                        {i === 1 && (
                                            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                        )}
                                        {i === 2 && (
                                            <>
                                                <rect x="2" y="6" width="20" height="12" rx="2" />
                                                <path d="M12 6v12M2 12h20" />
                                            </>
                                        )}
                                        {i === 3 && (
                                            <>
                                                <rect x="5" y="2" width="14" height="20" rx="3" />
                                                <circle cx="12" cy="18" r="1" />
                                            </>
                                        )}
                                    </svg>
                                </div>
                                <span className="text-[#2A2420] text-xs sm:text-sm font-medium">
                                    {feature}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Precision Section ─── */}
            <section className="relative py-16 sm:py-24 overflow-hidden">
                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block glow-text-gold">
                            Craftsmanship
                        </span>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#2A2420] mb-6 sm:mb-8 tracking-[0.02em]">
                            {product.freshnessSection.title}
                        </h2>
                        <p className="text-[#5C524A] text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                            {product.freshnessSection.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Proceed CTA Section ─── */}
            <section ref={ctaSectionRef} className="relative py-24 sm:py-32 overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-[#B87333]/8 rounded-full blur-[140px]" />
                </div>

                <motion.div
                    style={{ opacity: ctaOpacity, y: ctaY }}
                    className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center"
                >
                    <Image
                        src="/images/logo/evoniq-logo.png"
                        alt="EVONIQ"
                        width={80}
                        height={80}
                        className="mx-auto mb-6 sm:mb-8 logo-premium-lg"
                    />
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#2A2420] mb-4 sm:mb-6 tracking-[0.02em]">
                        Elevate your workspace.
                    </h2>
                    <p className="text-[#5C524A] text-base sm:text-lg md:text-xl mb-8 sm:mb-12 max-w-xl mx-auto">
                        Select your variant, explore the architecture, and make it yours.
                    </p>
                    <Link href="/shop">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.97 }}
                            className="group relative inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 sm:px-10 py-4 sm:py-5 rounded-2xl liquid-glass-copper text-white text-base sm:text-lg font-semibold uppercase tracking-[0.15em] overflow-hidden transition-all duration-500 glow-gold-pulse hover:shadow-[0_0_70px_rgba(184,115,51,0.55)]"
                        >
                            <span className="relative z-10">Proceed to Shop</span>
                            <svg
                                className="relative z-10 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="2.5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5E3C] to-[#B87333] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
