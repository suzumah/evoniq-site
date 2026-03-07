"use client";

import { motion } from "framer-motion";

export default function PromoBanner() {
    return (
        <section className="relative py-8 sm:py-12 px-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[300px] sm:w-[500px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: "-50px" }}
                className="relative max-w-5xl mx-auto"
            >
                <div className="glass-strong rounded-3xl p-8 sm:p-12 overflow-hidden border border-emerald-500/20 group relative shadow-[0_8px_32px_rgba(16,185,129,0.05)] hover:shadow-[0_8px_40px_rgba(16,185,129,0.1)] transition-all duration-500">

                    {/* Background styling for the banner */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors duration-500" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                        <div className="flex-1">
                            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-600 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-4">
                                Early Adopter Exclusive
                            </span>
                            <h2 className="text-3xl md:text-4xl font-montserrat font-bold text-[#2A2420] mb-3 tracking-[0.02em]">
                                Flat ₹500 OFF
                            </h2>
                            <p className="text-[#5C524A] text-base md:text-lg">
                                Secure your premium workspace setup with an exclusive discount. <br className="hidden md:block" />
                                Strictly limited to the <b>first 50 customers</b>.
                            </p>
                        </div>

                        <div className="flex-shrink-0 flex flex-col items-center gap-3">
                            <p className="text-[#8A7F75] text-xs font-semibold uppercase tracking-widest">Use Code at Checkout</p>
                            <div className="relative group/code cursor-pointer">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-2xl blur opacity-25 group-hover/code:opacity-70 transition duration-500 group-hover/code:duration-200" />
                                <div className="relative bg-white/60 backdrop-blur-sm border border-emerald-500/30 px-8 py-4 rounded-xl flex items-center justify-center">
                                    <span className="font-montserrat font-black text-2xl md:text-3xl tracking-widest text-emerald-600 drop-shadow-sm">
                                        FIRST50
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </motion.div>
        </section>
    );
}
