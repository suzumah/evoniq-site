"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
    { icon: "📩", label: "Email", value: "contactevoniq@gmail.com", href: "mailto:contactevoniq@gmail.com" },
    { icon: "📞", label: "Phone", value: "+91 72058 99651", href: "tel:+917205899651" },
    { icon: "🕐", label: "Business Hours", value: "Monday–Friday · 9 AM – 6 PM IST", href: null },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: wire to email API or Formspree
        setSent(true);
    };

    const field = (label: string, key: keyof typeof form, type = "text", placeholder = "") => (
        <div>
            <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-widest mb-1.5">{label}</label>
            {key === "message" ? (
                <textarea
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    rows={5}
                    required
                    className="w-full px-4 py-3 glass border border-[#B87333]/20 rounded-xl text-[#2A2420] text-sm focus:border-[#B87333]/50 focus:outline-none resize-none transition-all"
                />
            ) : (
                <input
                    type={type}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    required={key !== "subject"}
                    className="w-full px-4 py-3 glass border border-[#B87333]/20 rounded-xl text-[#2A2420] text-sm focus:border-[#B87333]/50 focus:outline-none transition-all"
                />
            )}
        </div>
    );

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
                    className="relative max-w-xl mx-auto"
                >
                    <span className="text-[#B87333] text-xs font-bold uppercase tracking-[0.35em] mb-4 block glow-text-gold">Get in Touch</span>
                    <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-[#2A2420] mb-4 tracking-tight">Contact Us</h1>
                    <p className="text-[#5C524A] text-base leading-relaxed">
                        We&apos;re here to assist you. For inquiries regarding products, orders, collaborations, or support — reach out below.
                    </p>
                </motion.div>
            </section>

            <hr className="divider-gold max-w-4xl mx-auto mb-12" />

            <section className="max-w-5xl mx-auto px-4 pb-24 grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-8">

                {/* Left: contact info */}
                <div className="space-y-4">
                    {contactInfo.map((c, i) => (
                        <motion.div
                            key={c.label}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="glass glow-gold-hover rounded-2xl p-5 flex items-start gap-4"
                        >
                            <span className="text-2xl mt-0.5">{c.icon}</span>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-1 glow-text-gold">{c.label}</p>
                                {c.href ? (
                                    <a href={c.href} className="text-[#2A2420] font-medium text-sm hover:text-[#B87333] transition-colors">
                                        {c.value}
                                    </a>
                                ) : (
                                    <p className="text-[#5C524A] text-sm">{c.value}</p>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {/* Response time badge */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="glass glow-gold rounded-2xl p-5"
                    >
                        <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2 glow-text-gold">Response Time</p>
                        <p className="text-[#2A2420] font-semibold text-sm">24–48 business hours</p>
                        <p className="text-[#8A7F75] text-xs mt-1">Professional support. Prompt resolution.</p>
                    </motion.div>
                </div>

                {/* Right: form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="glass-strong glow-gold rounded-3xl p-6 sm:p-8"
                >
                    {sent ? (
                        <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                            <div className="text-5xl mb-4">✅</div>
                            <h3 className="font-montserrat font-bold text-[#2A2420] text-xl mb-2">Message Received</h3>
                            <p className="text-[#8A7F75] text-sm">We&apos;ll get back to you within 24–48 business hours.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {field("Full Name", "name", "text", "Arjun Sharma")}
                                {field("Email", "email", "email", "you@example.com")}
                            </div>
                            {field("Subject", "subject", "text", "Order enquiry / Support / Collaboration...")}
                            {field("Message", "message", "text", "Please describe your enquiry in detail...")}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold uppercase tracking-widest text-sm glow-gold-pulse hover:shadow-[0_0_40px_rgba(184,115,51,0.45)] transition-all"
                            >
                                Send Message
                            </motion.button>
                        </form>
                    )}
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
