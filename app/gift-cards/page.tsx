"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const denominations = [500, 1000, 1500, 2000, 2499, 5000];

const features = [
    { icon: "💳", title: "Flexible Denominations", desc: "Choose from ₹500 to ₹5,000. Suits every budget." },
    { icon: "⚡", title: "Instant Delivery", desc: "Delivered digitally to the recipient's inbox." },
    { icon: "♾️", title: "No Expiration", desc: "Redeemable at your own pace, whenever you're ready." },
    { icon: "🎁", title: "Full Collection Access", desc: "Applicable on all EVONIQ products and bundles." },
];

export default function GiftCardsPage() {
    const [selected, setSelected] = useState(2499);
    const [customAmt, setCustomAmt] = useState("");

    return (
        <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)" }}>
            <Navbar />

            {/* Hero */}
            <section className="relative pt-36 pb-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[400px] rounded-full bg-[#B87333]/8 blur-[140px]" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-2xl mx-auto"
                >
                    <span className="text-[#B87333] text-xs font-bold uppercase tracking-[0.35em] mb-4 block glow-text-gold">
                        For Those Who Inspire
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-montserrat font-bold text-[#2A2420] mb-4 tracking-tight">
                        Gift Cards
                    </h1>
                    <p className="text-xl text-[#B87333] font-light italic mb-5 tracking-wide">
                        Power their productivity.
                    </p>
                    <p className="text-[#5C524A] text-base leading-relaxed">
                        The Evoniq Gift Card offers a refined and practical gifting solution for professionals,
                        students, and creators. Delivered digitally, redeemable across our entire collection.
                    </p>
                </motion.div>
            </section>

            <hr className="divider-gold max-w-4xl mx-auto mb-16" />

            {/* Card preview + selector */}
            <section className="max-w-5xl mx-auto px-4 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Visual card */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex justify-center"
                >
                    <div
                        className="relative w-80 h-48 rounded-3xl overflow-hidden glow-gold shadow-[0_20px_60px_rgba(184,115,51,0.25)]"
                        style={{ background: "linear-gradient(135deg, #1a0f06 0%, #2A1810 40%, #3D2410 70%, #B87333 100%)" }}
                    >
                        {/* Decorative circles */}
                        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#B87333]/20 blur-2xl" />
                        <div className="absolute -left-4 -bottom-4 w-28 h-28 rounded-full bg-[#CD7F32]/15 blur-xl" />

                        <div className="relative p-6 h-full flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <span className="text-white/90 font-montserrat font-bold tracking-[0.2em] text-sm">EVONIQ</span>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Gift Card Value</p>
                                <AnimatePresence mode="wait">
                                    <motion.p
                                        key={customAmt || selected}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="text-3xl font-montserrat font-bold text-white"
                                    >
                                        ₹{customAmt ? parseInt(customAmt).toLocaleString("en-IN") : selected.toLocaleString("en-IN")}
                                    </motion.p>
                                </AnimatePresence>
                                <p className="text-white/30 text-[10px] mt-2 uppercase tracking-widest">No expiration · Full collection access</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Selector */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-4 glow-text-gold">Select Amount</p>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                        {denominations.map((amt) => (
                            <button
                                key={amt}
                                onClick={() => { setSelected(amt); setCustomAmt(""); }}
                                className={`py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${selected === amt && !customAmt
                                        ? "bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white glow-gold"
                                        : "glass border border-[#B87333]/15 text-[#5C524A] hover:border-[#B87333]/30 glow-gold-hover"
                                    }`}
                            >
                                ₹{amt.toLocaleString("en-IN")}
                            </button>
                        ))}
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-widest mb-2">Custom Amount</label>
                        <input
                            type="number"
                            value={customAmt}
                            onChange={(e) => setCustomAmt(e.target.value)}
                            placeholder="Enter amount (₹500–₹50,000)"
                            className="w-full px-4 py-3 glass border border-[#B87333]/20 rounded-xl text-[#2A2420] text-sm focus:border-[#B87333]/50 focus:outline-none transition-all"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-widest mb-2">Recipient Email</label>
                        <input
                            type="email"
                            placeholder="their@email.com"
                            className="w-full px-4 py-3 glass border border-[#B87333]/20 rounded-xl text-[#2A2420] text-sm focus:border-[#B87333]/50 focus:outline-none transition-all"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold uppercase tracking-widest text-sm glow-gold-pulse hover:shadow-[0_0_40px_rgba(184,115,51,0.4)] transition-all"
                    >
                        Purchase Gift Card
                    </motion.button>

                    <p className="text-[#8A7F75] text-xs text-center mt-3">
                        Delivered instantly via email · Secure checkout
                    </p>
                </motion.div>
            </section>

            <hr className="divider-gold max-w-4xl mx-auto mb-16" />

            {/* Why choose */}
            <section className="max-w-5xl mx-auto px-4 pb-24">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-xs font-bold uppercase tracking-[0.35em] text-[#B87333] text-center mb-4 glow-text-gold"
                >
                    Why Choose an Evoniq Gift Card?
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="glass glow-gold-hover rounded-2xl p-5 text-center"
                        >
                            <div className="text-3xl mb-3">{f.icon}</div>
                            <p className="font-semibold text-[#2A2420] text-sm mb-1">{f.title}</p>
                            <p className="text-[#8A7F75] text-xs leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
                <p className="text-center text-[#5C524A] text-sm font-medium italic mt-10">
                    A thoughtful gift. A smarter workspace.
                </p>
            </section>

            <Footer />
        </main>
    );
}
