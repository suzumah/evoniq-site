"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
    {
        q: "What makes Evoniq different from regular laptop sleeves?",
        a: "Evoniq integrates a built-in power bank within a precision-crafted laptop sleeve, allowing you to protect and charge your device simultaneously — eliminating the need for separate power banks or cable clutter.",
    },
    {
        q: "What devices are compatible?",
        a: "Our sleeves support leading laptop models including MacBook Air / Pro (13\", 14\", 15\", 16\"), Windows ultrabooks, and similarly sized devices. Please refer to the size guide on the product page for exact compatibility.",
    },
    {
        q: "How does the integrated power system work?",
        a: "The built-in power module connects via secure internal wiring. Simply connect your device using the provided cable — or the included 4-in-1 USB cable — and activate charging as needed. No external power bank required.",
    },
    {
        q: "Is the power bank removable?",
        a: "The integrated power module is engineered as part of the sleeve structure for a seamless, minimal profile. It is not removable in standard use, ensuring consistent protection and a cleaner aesthetic.",
    },
    {
        q: "How long does charging last?",
        a: "Battery capacity varies by model. On average, the integrated module provides 1–2 full charges depending on your device's battery size and active usage during charging.",
    },
    {
        q: "Is it airline safe?",
        a: "Yes. Our battery capacity complies with standard airline carry-on safety regulations (under 100Wh). You can travel with complete confidence.",
    },
    {
        q: "What is your warranty policy?",
        a: "All Evoniq products include a 1-year limited warranty covering manufacturing defects in materials and workmanship. This does not cover accidental damage or normal wear.",
    },
    {
        q: "How do I care for my sleeve?",
        a: "Wipe with a soft, dry cloth. For stubborn marks, use a lightly damp cloth with mild soap. Avoid exposure to excessive moisture, heat, or abrasive surfaces to maintain the premium finish.",
    },
    {
        q: "What does the 4-in-1 USB Cable include?",
        a: "The bundled cable includes four connector types: USB-A, USB-C (×2), and Lightning — enabling compatibility with virtually every modern device. It supports up to 65W fast charge.",
    },
    {
        q: "Can the sleeve double as a laptop stand?",
        a: "Yes. The EVONIQ sleeve features a kinetic fold mechanism that transforms it into a stable, elevated laptop stand — reducing desk clutter and improving ergonomic posture for extended work sessions.",
    },
];

function FAQItem({ item, index }: { item: typeof faqs[0]; index: number }) {
    const [open, setOpen] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`glass glow-gold-hover rounded-2xl overflow-hidden transition-all duration-300 ${open ? "border-[#B87333]/30" : "border-[#B87333]/10"}`}
        >
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                aria-expanded={open}
            >
                <span className="font-semibold text-[#2A2420] text-sm sm:text-base leading-snug flex-1">
                    <span className="text-[#B87333] font-bold mr-2.5 font-montserrat">{String(index + 1).padStart(2, "0")}.</span>
                    {item.q}
                </span>
                <motion.div
                    animate={{ rotate: open ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors ${open ? "bg-[#B87333] text-white" : "bg-[#B87333]/10 text-[#B87333]"}`}
                >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="px-6 pb-5 border-t border-[#B87333]/10">
                            <p className="text-[#5C524A] text-sm sm:text-base leading-relaxed pt-4">{item.a}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQPage() {
    return (
        <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)" }}>
            <Navbar />

            {/* Hero */}
            <section className="relative pt-36 pb-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[300px] rounded-full bg-[#B87333]/8 blur-[130px]" />
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative max-w-2xl mx-auto"
                >
                    <span className="text-[#B87333] text-xs font-bold uppercase tracking-[0.35em] mb-4 block glow-text-gold">Knowledge Base</span>
                    <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-[#2A2420] mb-4 tracking-tight">
                        Frequently Asked<br />Questions
                    </h1>
                    <p className="text-[#5C524A] text-base leading-relaxed">
                        Everything you need to know about the EVONIQ sleeve — designed with precision, engineered to perform.
                    </p>
                </motion.div>
            </section>

            <hr className="divider-gold max-w-4xl mx-auto mb-12" />

            {/* FAQ list */}
            <section className="max-w-3xl mx-auto px-4 pb-16 space-y-3">
                {faqs.map((faq, i) => (
                    <FAQItem key={i} item={faq} index={i} />
                ))}
            </section>

            {/* CTA */}
            <section className="max-w-3xl mx-auto px-4 pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-strong glow-gold rounded-3xl p-8 text-center"
                >
                    <p className="text-[#2A2420] font-semibold text-lg mb-2">Still have questions?</p>
                    <p className="text-[#8A7F75] text-sm mb-6">Our team responds within 24–48 hours.</p>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold text-sm uppercase tracking-widest glow-gold-pulse"
                        >
                            Contact Support
                        </motion.button>
                    </Link>
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
