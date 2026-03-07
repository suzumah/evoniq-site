"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const { totalItems, openCart } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileOpen]);

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? "bg-[#E8E0D4]/90 backdrop-blur-xl border-b border-[#B87333]/15 shadow-md"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Brand */}
                    <Link
                        href="/"
                        className="flex items-center gap-3 group"
                        aria-label="EVONIQ Home"
                        onClick={() => setMobileOpen(false)}
                    >
                        <span className="logo-ring">
                            <Image
                                src="/images/logo/evoniq-logo.png"
                                alt="EVONIQ Logo"
                                width={40}
                                height={40}
                                className="logo-premium"
                                priority
                            />
                        </span>
                        <span className="text-xl font-montserrat font-semibold tracking-[0.15em] copper-text">
                            EVONIQ
                        </span>
                    </Link>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-[#5C524A] text-sm font-medium hover:text-[#B87333] transition-colors duration-200 uppercase tracking-[0.2em]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Desktop CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Cart icon */}
                        <motion.button
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={openCart}
                            className="relative w-10 h-10 rounded-xl flex items-center justify-center hover:bg-[#B87333]/10 transition-colors"
                            aria-label="Open cart"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-[#5C524A] hover:text-[#B87333] transition-colors">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        key="badge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#B87333] text-white text-[10px] font-bold flex items-center justify-center shadow-md"
                                    >
                                        {totalItems > 9 ? "9+" : totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        <Link href="/shop">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.97 }}
                                className="relative px-6 py-2.5 rounded-full bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white text-sm font-semibold tracking-[0.15em] uppercase overflow-hidden group transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(184,115,51,0.35)]"
                                aria-label="Order Now"
                            >
                                <span className="relative z-10">Order Now</span>
                                <div className="absolute inset-0 bg-gradient-to-r from-[#B87333] to-[#8B5E3C] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Mobile: cart + hamburger */}
                    <div className="flex md:hidden items-center gap-2">
                        {/* Cart icon (mobile) */}
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={openCart}
                            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#B87333]/10 transition-colors"
                            aria-label="Open cart"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="text-[#5C524A]">
                                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                            </svg>
                            <AnimatePresence>
                                {totalItems > 0 && (
                                    <motion.span
                                        key="mbadge"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#B87333] text-white text-[9px] font-bold flex items-center justify-center"
                                    >
                                        {totalItems > 9 ? "9+" : totalItems}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </motion.button>

                        {/* Hamburger */}
                        <button
                            className="relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-[#B87333]/10 transition-colors"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label={mobileOpen ? "Close menu" : "Open menu"}
                            aria-expanded={mobileOpen}
                        >
                            <div className="w-5 h-4 relative flex flex-col justify-between">
                                <span className={`block h-0.5 w-full bg-[#2A2420] rounded-full transition-all duration-300 origin-center ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
                                <span className={`block h-0.5 w-full bg-[#2A2420] rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
                                <span className={`block h-0.5 w-full bg-[#2A2420] rounded-full transition-all duration-300 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-[#E8E0D4]/95 backdrop-blur-xl"
                            onClick={() => setMobileOpen(false)}
                        />

                        {/* Menu content */}
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="relative pt-24 px-8 pb-8 flex flex-col items-center gap-6"
                        >
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1 + i * 0.1,
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-[#2A2420] text-3xl font-montserrat font-semibold tracking-[0.1em] hover:text-[#B87333] transition-colors duration-200"
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: 0.3,
                                    duration: 0.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="mt-4"
                            >
                                <Link
                                    href="/shop"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <button className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-semibold text-lg uppercase tracking-[0.15em] hover:shadow-[0_0_40px_rgba(184,115,51,0.35)] transition-shadow duration-300">
                                        Order Now
                                    </button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
