"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const pillars = [
    {
        icon: "⚡",
        title: "Advanced Battery Integration",
        desc: "A built-in power module seamlessly embedded within the sleeve structure, delivering uninterrupted charge without external hardware.",
    },
    {
        icon: "🧵",
        title: "Precision Vegan Leather",
        desc: "Premium vegan leather crafting — scratch-proof, structured, and refined enough for boardrooms and resilient enough for daily carry.",
    },
    {
        icon: "🛡️",
        title: "Structured Impact Protection",
        desc: "Engineered to absorb shock and maintain form through intensive daily use. 360° protection that never compromises on form.",
    },
    {
        icon: "✦",
        title: "Timeless Design Language",
        desc: "Clean geometries. Minimal profile. An aesthetic that transcends seasons — built to complement any professional environment.",
    },
];

const specs = [
    "Laptop sleeve with integrated protection",
    "Convertible laptop stand (kinetic fold mechanism)",
    "Dual wireless charging slots (phone + earbuds)",
    "Portability with structured storage",
    "4-in-1 Fast Charge USB Cable included",
    "Premium Vegan Leather — Scratch Proof",
];

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    }),
};

export default function AboutPage() {
    return (
        <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)" }}>
            <Navbar />

            {/* Hero */}
            <section className="relative pt-36 pb-20 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[700px] h-[400px] rounded-full bg-[#B87333]/8 blur-[150px]" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-3xl mx-auto"
                >
                    <span className="text-[#B87333] text-xs font-bold uppercase tracking-[0.35em] mb-4 block glow-text-gold">
                        Our Story
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold text-[#2A2420] mb-4 tracking-tight leading-tight">
                        About EVONIQ
                    </h1>
                    <p className="text-xl sm:text-2xl text-[#B87333] font-light italic tracking-wide">
                        Precision. Power. Performance.
                    </p>
                </motion.div>
            </section>

            <hr className="divider-gold max-w-4xl mx-auto mb-20" />

            {/* Mission */}
            <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-[#2A2420] text-lg sm:text-xl md:text-2xl leading-relaxed font-light mb-8">
                        Evoniq was founded to <strong className="font-semibold text-[#B87333]">redefine everyday carry</strong> for the modern professional.
                    </p>
                    <p className="text-[#5C524A] text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-8">
                        In an increasingly mobile world, productivity should not depend on wall sockets.
                        We engineered a solution where <em>protection meets power</em> — seamlessly integrated
                        into a refined, minimalist form.
                    </p>
                    <p className="text-[#5C524A] text-base leading-relaxed max-w-2xl mx-auto">
                        Evoniq exists at the intersection of technology and craftsmanship —
                        designed for those who <strong className="text-[#2A2420]">move without pause</strong>.
                    </p>
                </motion.div>
            </section>

            {/* World's First callout */}
            <section className="max-w-5xl mx-auto px-4 pb-20">
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-strong glow-gold rounded-3xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
                >
                    <div>
                        <span className="text-[#B87333] text-xs font-bold uppercase tracking-widest mb-3 block glow-text-gold">Product Philosophy</span>
                        <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#2A2420] mb-4 leading-tight">
                            World&apos;s First<br />4-in-1 Laptop Sleeve
                        </h2>
                        <p className="text-[#5C524A] text-base leading-relaxed mb-4">
                            Introducing the <strong>All-in-One PowerSleeve</strong>: Transform your workspace and protect
                            your gear with the EVONIQ Sleeve 4-in-1 — the ultimate laptop sleeve designed for modern professionals.
                        </p>
                        <p className="text-[#5C524A] text-base leading-relaxed">
                            Sleek, durable, and endlessly practical, it combines premium protection, a built-in wireless
                            charging pad, a convertible stand, and smart storage — all in one elegant design.
                        </p>
                    </div>
                    <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-4 glow-text-gold">What&apos;s Inside</p>
                        <ul className="space-y-3">
                            {specs.map((spec) => (
                                <li key={spec} className="flex items-start gap-3 text-sm text-[#5C524A]">
                                    <svg className="w-4 h-4 text-[#B87333] mt-0.5 flex-shrink-0 icon-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    {spec}
                                </li>
                            ))}
                        </ul>
                        <p className="text-[#8A7F75] text-sm mt-5 italic">
                            The last touch is the <strong className="text-[#2A2420]">vegan leather crafting</strong> that
                            will make you the talk of the office. Simply the <strong className="text-[#2A2420]">future of work ergonomics</strong>.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Fits any device */}
            <section className="max-w-4xl mx-auto px-4 pb-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#2A2420] mb-4">Fits Any Device</h2>
                    <p className="text-[#5C524A] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                        Imagine having a sleeve you can take with you wherever and whenever.
                        <strong className="text-[#2A2420]"> The sleeve is the right product</strong> — it&apos;s lightweight
                        and <strong className="text-[#2A2420]">works on any device</strong> within the supported size range.
                        Designed for MacBook, Windows ultrabooks, and everything in between.
                    </p>
                </motion.div>
            </section>

            <hr className="divider-gold max-w-4xl mx-auto mb-20" />

            {/* Pillars */}
            <section className="max-w-5xl mx-auto px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <span className="text-[#B87333] text-xs font-bold uppercase tracking-[0.35em] mb-3 block glow-text-gold">Built With</span>
                    <h2 className="text-3xl sm:text-4xl font-montserrat font-bold text-[#2A2420]">Our Pillars of Craft</h2>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {pillars.map((p, i) => (
                        <motion.div
                            key={p.title}
                            custom={i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                            className="glass glow-gold-hover rounded-2xl p-6 flex gap-5"
                        >
                            <div className="text-3xl flex-shrink-0 mt-0.5">{p.icon}</div>
                            <div>
                                <h3 className="font-montserrat font-semibold text-[#2A2420] mb-2">{p.title}</h3>
                                <p className="text-[#5C524A] text-sm leading-relaxed">{p.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-4 pb-24 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <p className="text-[#5C524A] text-sm mb-6">
                        Ready to redefine your workspace?
                    </p>
                    <Link href="/shop">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold uppercase tracking-widest text-sm glow-gold-pulse"
                        >
                            Shop EVONIQ
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
