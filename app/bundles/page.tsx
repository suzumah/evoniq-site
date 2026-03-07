"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const bundles = [
    {
        id: "essentials",
        badge: "MOST POPULAR",
        name: "Essentials Bundle",
        tagline: "Everything you need. Nothing you don\u2019t.",
        price: "₹2,899",
        originalPrice: "₹3,299",
        savings: "Save ₹400",
        items: [
            "EVONIQ Integrated Power Sleeve (1 unit)",
            "4-in-1 Fast Charge USB Cable",
            "Microfibre Cleaning Cloth",
        ],
        highlight: false,
    },
    {
        id: "executive",
        badge: "BEST VALUE",
        name: "Executive Bundle",
        tagline: "The complete professional carry system.",
        price: "₹3,499",
        originalPrice: "₹4,199",
        savings: "Save ₹700",
        items: [
            "EVONIQ Integrated Power Sleeve (1 unit)",
            "4-in-1 Fast Charge USB Cable",
            "Cable & Accessory Organiser",
            "Premium Dust Bag",
            "Priority Support Access",
        ],
        highlight: true,
    },
    {
        id: "traveller",
        badge: "FOR TRAVEL",
        name: "Traveller Bundle",
        tagline: "Built for those who move without pause.",
        price: "₹3,199",
        originalPrice: "₹3,799",
        savings: "Save ₹600",
        items: [
            "EVONIQ Integrated Power Sleeve (1 unit)",
            "4-in-1 Fast Charge USB Cable",
            "Compact Cable Organiser",
            "Travel Pouch",
        ],
        highlight: false,
    },
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function BundlesPage() {
    return (
        <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)" }}>
            <Navbar />

            {/* Hero */}
            <section className="relative pt-36 pb-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[600px] h-[400px] rounded-full bg-[#B87333]/8 blur-[140px]" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-3xl mx-auto"
                >
                    <span className="text-[#B87333] text-xs font-bold uppercase tracking-[0.35em] mb-4 block glow-text-gold">
                        Curated Collections
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold text-[#2A2420] mb-6 tracking-tight leading-tight">
                        Bundles
                    </h1>
                    <p className="text-xl sm:text-2xl text-[#B87333] font-light italic mb-6 tracking-wide">
                        Intelligent combinations. Elevated efficiency.
                    </p>
                    <p className="text-[#5C524A] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        Evoniq Bundles are thoughtfully curated to enhance your workspace. Each set pairs our
                        precision-engineered laptop sleeve with complementary accessories designed for seamless productivity.
                        Whether you&apos;re upgrading your daily carry or preparing for travel, our bundles deliver
                        integrated protection and uninterrupted power — in one refined system.
                    </p>
                </motion.div>
            </section>

            <hr className="divider-gold max-w-4xl mx-auto mb-16" />

            {/* Bundle cards */}
            <section className="max-w-6xl mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {bundles.map((bundle, i) => (
                        <motion.div
                            key={bundle.id}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-60px" }}
                            variants={fadeUp}
                            className={`relative rounded-3xl p-7 flex flex-col glow-gold-hover transition-all duration-500 ${bundle.highlight
                                    ? "glass-strong border-2 border-[#B87333]/40 shadow-[0_0_40px_rgba(184,115,51,0.18)]"
                                    : "glass border border-[#B87333]/15"
                                }`}
                        >
                            {bundle.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white text-[10px] font-bold uppercase tracking-widest glow-gold-pulse">
                                        {bundle.badge}
                                    </span>
                                </div>
                            )}
                            {!bundle.highlight && (
                                <span className="text-[#B87333] text-[10px] font-bold uppercase tracking-widest mb-3 glow-text-gold">
                                    {bundle.badge}
                                </span>
                            )}

                            <h2 className="font-montserrat font-bold text-[#2A2420] text-xl mb-1">{bundle.name}</h2>
                            <p className="text-[#8A7F75] text-sm mb-6 italic">{bundle.tagline}</p>

                            <ul className="space-y-2.5 mb-8 flex-1">
                                {bundle.items.map((item) => (
                                    <li key={item} className="flex items-start gap-2.5 text-sm text-[#5C524A]">
                                        <svg className="w-4 h-4 text-[#B87333] mt-0.5 flex-shrink-0 icon-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="border-t border-[#B87333]/10 pt-5 mt-auto">
                                <div className="flex items-baseline gap-2 mb-1">
                                    <span className="text-2xl font-montserrat font-bold text-[#2A2420]">{bundle.price}</span>
                                    <span className="text-sm text-[#8A7F75] line-through">{bundle.originalPrice}</span>
                                </div>
                                <span className="text-xs font-semibold text-green-600 mb-4 block">{bundle.savings}</span>
                                <Link href="/shop">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        className={`w-full py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all duration-300 ${bundle.highlight
                                                ? "bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white glow-gold-pulse"
                                                : "bg-white/60 border border-[#B87333]/20 text-[#2A2420] hover:bg-white/80"
                                            }`}
                                    >
                                        Select Bundle
                                    </motion.button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Footer note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-center mt-16"
                >
                    <p className="text-[#5C524A] text-sm font-medium italic">
                        Designed for efficiency. Priced for value.
                    </p>
                    <p className="text-[#8A7F75] text-xs mt-2">
                        Bundle availability subject to stock. Free shipping on all bundle orders.
                    </p>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
