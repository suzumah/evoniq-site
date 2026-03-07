"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
    { icon: "📦", title: "Order Processing", content: "Orders are processed within <strong>3–5 business days</strong> after payment confirmation. You will receive a confirmation email upon successful purchase." },
    { icon: "🚚", title: "Delivery Timeline", content: null, table: [{ region: "Domestic (India)", time: "3–7 business days" }, { region: "International", time: "7–14 business days (subject to customs clearance)" }] },
    { icon: "💰", title: "Shipping Charges", content: "Calculated at checkout based on destination and order value. <strong>Free shipping</strong> on all bundle orders and orders above ₹3,000." },
    { icon: "📍", title: "Order Tracking", content: "Tracking details shared via email within 24 hours of dispatch." },
    { icon: "⚠️", title: "Disclaimer", content: "Evoniq is not responsible for delays caused by courier services, customs authorities, or unforeseen events." },
    { icon: "↩️", title: "Returns & Exchanges", content: "We accept returns within <strong>14 days</strong> of delivery (unused, original packaging). Email <a href='mailto:contactevoniq@gmail.com' class='text-[#B87333] underline underline-offset-2'>contactevoniq@gmail.com</a> to initiate." },
];

export default function ShippingPage() {
    return (
        <main className="min-h-screen" style={{ background: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)" }}>
            <Navbar />
            <section className="relative pt-36 pb-16 px-4 text-center overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[300px] rounded-full bg-[#B87333]/8 blur-[130px]" />
                </div>
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} className="relative max-w-2xl mx-auto">
                    <span className="text-[#B87333] text-xs font-bold uppercase tracking-[0.35em] mb-4 block glow-text-gold">Logistics &amp; Delivery</span>
                    <h1 className="text-4xl sm:text-5xl font-montserrat font-bold text-[#2A2420] mb-4 tracking-tight">Shipping Policy</h1>
                    <p className="text-[#5C524A] text-base leading-relaxed">Clear timelines. Reliable delivery. Transparent charges.</p>
                </motion.div>
            </section>
            <hr className="divider-gold max-w-4xl mx-auto mb-12" />
            <section className="max-w-3xl mx-auto px-4 pb-20 space-y-4">
                {sections.map((s, i) => (
                    <motion.div key={s.title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="glass glow-gold-hover rounded-2xl p-6 flex gap-5">
                        <div className="text-2xl flex-shrink-0 mt-0.5">{s.icon}</div>
                        <div className="flex-1">
                            <h3 className="font-montserrat font-semibold text-[#2A2420] text-base mb-3">{s.title}</h3>
                            {s.content && <p className="text-[#5C524A] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: s.content }} />}
                            {s.table && <div className="space-y-2">{s.table.map((row) => (<div key={row.region} className="flex justify-between py-2 border-b border-[#B87333]/10 last:border-0"><span className="text-[#5C524A] text-sm">{row.region}</span><span className="text-[#2A2420] font-semibold text-sm text-right">{row.time}</span></div>))}</div>}
                        </div>
                    </motion.div>
                ))}
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="glass-strong glow-gold rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-1"><p className="font-semibold text-[#2A2420] mb-1">Need help with your order?</p><p className="text-[#8A7F75] text-sm">Our team responds within 24–48 business hours.</p></div>
                    <Link href="/contact"><motion.button whileHover={{ scale: 1.04 }} className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold text-sm uppercase tracking-widest glow-gold-pulse whitespace-nowrap">Contact Us</motion.button></Link>
                </motion.div>
            </section>
            <Footer />
        </main>
    );
}
