"use client";

import { useState, useRef, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";
import PromoBanner from "@/components/PromoBanner";
import Testimonials from "@/components/Testimonials";
import { useCart } from "@/context/CartContext";
import type { CartProduct } from "@/context/CartContext";

const featureIcons = [
    // Leather/material
    <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#B87333]"><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M3 9h18M9 3v18" /></svg>,
    // Charging / lightning
    <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#B87333]"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    // Desk mat / fold
    <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#B87333]"><rect x="2" y="6" width="20" height="12" rx="2" /><path d="M12 6v12M2 12h20" /></svg>,
    // Phone / slots
    <svg key="3" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#B87333]"><rect x="5" y="2" width="14" height="20" rx="3" /><circle cx="12" cy="18" r="1" /></svg>,
];

/* ─── Product Visual — Real product photography ─── */
function ProductHero({ product, activeImageKey }: { product: (typeof products)[0]; activeImageKey: string }) {
    const imageSrc = product.productImages[activeImageKey as keyof typeof product.productImages] || product.productImages.hero;

    return (
        <div className="relative aspect-square rounded-3xl overflow-hidden group">
            {/* Gradient background */}
            <div
                className="absolute inset-0 transition-all duration-700"
                style={{
                    background: `
                        radial-gradient(ellipse at 30% 20%, ${product.swatchColor}22 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 80%, ${product.themeColor}33 0%, transparent 50%),
                        linear-gradient(135deg, #DDD5C8, #E8E0D4)
                    `,
                }}
            />

            {/* Product image */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeImageKey}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 flex items-center justify-center p-4"
                >
                    <Image
                        src={imageSrc}
                        alt={`${product.id} variant — ${activeImageKey} view`}
                        width={600}
                        height={600}
                        className="object-contain w-full h-full rounded-2xl"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Decorative corner accents */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l border-t border-[#B87333]/25 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r border-t border-[#B87333]/25 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l border-b border-[#B87333]/25 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r border-b border-[#B87333]/25 rounded-br-lg" />

            {/* Floating glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full blur-[80px] opacity-15 group-hover:opacity-25 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: "#B87333" }}
            />
        </div>
    );
}

/* ─── Product thumbnail views ─── */
function ProductThumbnails({ product, activeKey, onSelect }: { product: (typeof products)[0]; activeKey: string; onSelect: (key: string) => void }) {
    const viewEntries = useMemo(() => [
        { key: "hero", label: "Hero" },
        { key: "open", label: "Open" },
        { key: "charging", label: "Charging" },
        { key: "detail", label: "Detail" },
    ], []);

    return (
        <div className="mt-4 grid grid-cols-4 gap-2">
            {viewEntries.map((view) => {
                const imgSrc = product.productImages[view.key as keyof typeof product.productImages];
                if (!imgSrc) return null;
                const isActive = activeKey === view.key;
                return (
                    <button
                        key={view.key}
                        onClick={() => onSelect(view.key)}
                        className={`aspect-square rounded-xl overflow-hidden relative cursor-pointer transition-all duration-300 ${isActive
                            ? "ring-2 ring-[#B87333] ring-offset-2 ring-offset-[#E8E0D4] shadow-[0_0_15px_rgba(184,115,51,0.2)]"
                            : "glass hover:border-[#B87333]/25"
                            }`}
                    >
                        <Image
                            src={imgSrc}
                            alt={`${product.id} — ${view.label}`}
                            width={120}
                            height={120}
                            className="object-cover w-full h-full"
                        />
                    </button>
                );
            })}
        </div>
    );
}

function ColorSwatch({
    product,
    isSelected,
    onClick,
}: {
    product: (typeof products)[0];
    isSelected: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="relative flex flex-col items-center gap-2 group"
            aria-label={`Select ${product.id} variant`}
        >
            <div
                className={`w-14 h-14 rounded-2xl transition-all duration-300 ${isSelected
                    ? "ring-2 ring-[#B87333] ring-offset-2 ring-offset-[#E8E0D4] shadow-[0_0_15px_rgba(184,115,51,0.25)]"
                    : "ring-1 ring-[#2A2420]/15 hover:ring-[#B87333]/40"
                    }`}
                style={{ backgroundColor: product.swatchColor }}
            />
            <span
                className={`text-xs font-medium capitalize transition-colors duration-200 ${isSelected ? "text-[#B87333]" : "text-[#8A7F75] group-hover:text-[#5C524A]"
                    }`}
            >
                {product.id}
            </span>
        </motion.button>
    );
}

export default function ShopPage() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [activeImageKey, setActiveImageKey] = useState("hero");
    const product = products[selectedIndex];
    const topRef = useRef<HTMLDivElement>(null);
    const { dispatch } = useCart();

    const handleColorChange = (index: number) => {
        setSelectedIndex(index);
        setActiveImageKey("hero");
        topRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const toCartProduct = useCallback((p: typeof products[0]): CartProduct => ({
        id: p.id,
        name: p.name,
        subName: p.subName,
        price: p.price,
        priceNum: parseInt(p.price.replace(/[^0-9]/g, ""), 10),
        imageSrc: p.productImages.hero,
        color: p.id,
    }), []);

    const handleAddToCart = useCallback(() => {
        dispatch({ type: "ADD_ITEM", payload: toCartProduct(product) });
    }, [dispatch, product, toCartProduct]);

    return (
        <main className="relative min-h-screen suede-bg" style={{ background: product.gradient }}>
            <Navbar />
            <div ref={topRef} />

            {/* ─── Hero / Product Overview ─── */}
            <section className="pt-28 pb-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
                        >
                            {/* Left — Product Visual */}
                            <div className="relative">
                                <ProductHero product={product} activeImageKey={activeImageKey} />
                                <ProductThumbnails product={product} activeKey={activeImageKey} onSelect={setActiveImageKey} />
                            </div>

                            {/* Right — Product Info (sticky on desktop) */}
                            <div className="lg:sticky lg:top-24">
                                {/* Color Swatches */}
                                <div className="flex items-center gap-5 mb-8">
                                    {products.map((p, i) => (
                                        <ColorSwatch
                                            key={p.id}
                                            product={p}
                                            isSelected={i === selectedIndex}
                                            onClick={() => handleColorChange(i)}
                                        />
                                    ))}
                                </div>

                                <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.25em] mb-3 block">
                                    EVONIQ Original
                                </span>
                                <h1 className="text-3xl md:text-4xl font-montserrat font-bold text-[#2A2420] mb-3 leading-tight tracking-[0.02em]">
                                    {product.name}
                                </h1>
                                <p className="text-[#5C524A] text-lg mb-2">{product.subName}</p>
                                <p className="text-[#8A7F75] text-sm mb-6">{product.description}</p>

                                {/* Price */}
                                <div className="flex items-baseline gap-3 mb-8">
                                    <span className="text-4xl font-montserrat font-bold text-[#2A2420]">
                                        {product.price}
                                    </span>
                                    <span className="text-[#8A7F75] text-sm">
                                        {product.buyNowSection.unit}
                                    </span>
                                    <span className="ml-auto px-3 py-1 rounded-full bg-[#B87333]/10 border border-[#B87333]/20 text-[#B87333] text-xs font-medium">
                                        In Stock
                                    </span>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-3 mb-8">
                                    {product.stats.map((stat) => (
                                        <div
                                            key={stat.label}
                                            className="glass glow-gold-hover rounded-xl p-4 text-center"
                                        >
                                            <p className="text-[#2A2420] font-montserrat font-semibold text-lg">{stat.val}</p>
                                            <p className="text-[#8A7F75] text-xs uppercase tracking-[0.15em] mt-1">
                                                {stat.label}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {/* Processing Params */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {product.buyNowSection.processingParams.map((param) => (
                                        <span
                                            key={param}
                                            className="px-3 py-1.5 rounded-full bg-white/50 border border-[#B87333]/12 text-[#5C524A] text-xs font-medium"
                                        >
                                            {param}
                                        </span>
                                    ))}
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex gap-3 mb-8">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        className="flex-1 py-4 rounded-2xl bg-white/40 border border-[#B87333]/20 text-[#2A2420] font-semibold text-sm uppercase tracking-[0.15em] hover:bg-white/60 transition-colors duration-200"
                                        aria-label="Add to Cart"
                                    >
                                        Add to Cart
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-semibold text-sm uppercase tracking-[0.15em] glow-gold-pulse hover:shadow-[0_0_35px_rgba(184,115,51,0.4)] transition-shadow duration-300"
                                        aria-label="Buy Now"
                                    >
                                        Buy Now
                                    </motion.button>
                                </div>

                                {/* Delivery & Returns */}
                                <div className="space-y-3">
                                    <div className="flex items-start gap-3 glass rounded-xl p-4">
                                        <svg
                                            className="w-5 h-5 text-[#B87333] mt-0.5 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.481 1.035-1.099C20.94 12.133 19.667 6.75 15.375 6.75H3.75m0 0h7.5M3.75 6.75L2.625 3"
                                            />
                                        </svg>
                                        <div>
                                            <p className="text-[#2A2420] text-sm font-medium">
                                                Delivery
                                            </p>
                                            <p className="text-[#8A7F75] text-xs mt-0.5">
                                                {product.buyNowSection.deliveryPromise}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 glass rounded-xl p-4">
                                        <svg
                                            className="w-5 h-5 text-[#B87333] mt-0.5 flex-shrink-0"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182"
                                            />
                                        </svg>
                                        <div>
                                            <p className="text-[#2A2420] text-sm font-medium">
                                                Returns
                                            </p>
                                            <p className="text-[#8A7F75] text-xs mt-0.5">
                                                {product.buyNowSection.returnPolicy}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            <PromoBanner />

            {/* ─── Detailed Sections ─── */}

            {/* Charging Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Wireless Charging
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#2A2420] mb-6 tracking-[0.02em]">
                            {product.section3.title}
                        </h2>
                        <p className="text-[#5C524A] text-lg md:text-xl max-w-2xl mx-auto">
                            {product.section3.subtitle}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="glass rounded-3xl p-10 flex flex-col justify-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#B87333]/10 flex items-center justify-center mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#B87333]">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-montserrat font-semibold text-[#2A2420] mb-3">
                                Phone Charging
                            </h3>
                            <p className="text-[#5C524A] leading-relaxed">
                                Position your device on the integrated pad — seamless power delivery without cable interference.
                            </p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ once: true }}
                            className="glass rounded-3xl p-10 flex flex-col justify-center"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-[#B87333]/10 flex items-center justify-center mb-6">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[#B87333]">
                                    <circle cx="12" cy="12" r="3" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-montserrat font-semibold text-[#2A2420] mb-3">
                                Earbuds Charging
                            </h3>
                            <p className="text-[#5C524A] leading-relaxed">
                                Your earbuds case charges simultaneously alongside your phone. Two devices, zero cables.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Protection Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Protection
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#2A2420] mb-6 tracking-[0.02em]">
                            {product.section4.title}
                        </h2>
                        <p className="text-[#5C524A] text-lg md:text-xl max-w-2xl mx-auto">
                            {product.section4.subtitle}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {["Impact Resistant", "Firm Build", "Edge Protection", "Anti-Scratch"].map(
                            (label, i) => (
                                <motion.div
                                    key={label}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="glass rounded-2xl p-6 text-center group hover:border-[#B87333]/25 transition-all duration-300"
                                >
                                    <div className="w-12 h-12 mx-auto rounded-xl bg-[#B87333]/8 flex items-center justify-center mb-4 group-hover:bg-[#B87333]/15 transition-colors duration-300">
                                        <svg
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="text-[#8A7F75] group-hover:text-[#B87333] transition-colors duration-300"
                                        >
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </div>
                                    <p className="text-[#5C524A] text-sm font-medium">{label}</p>
                                </motion.div>
                            )
                        )}
                    </div>
                </div>
            </section>

            {/* Details / Craftsmanship section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block">
                            Details
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-montserrat font-bold text-[#2A2420] mb-8 tracking-[0.02em]">
                            {product.detailsSection.title}
                        </h2>
                        <p className="text-[#5C524A] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-12">
                            {product.detailsSection.description}
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {product.features.map((feature, i) => (
                            <motion.div
                                key={feature}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass rounded-2xl p-6 flex flex-col items-center gap-4 text-center group hover:border-[#B87333]/25 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#B87333]/15 to-[#CD7F32]/8 flex items-center justify-center group-hover:from-[#B87333]/25 group-hover:to-[#CD7F32]/15 transition-all duration-300">
                                    {featureIcons[i % featureIcons.length]}
                                </div>
                                <span className="text-[#2A2420] text-sm font-medium">
                                    {feature}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Craftsmanship quote */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        viewport={{ once: true }}
                    >
                        <Image
                            src="/images/logo/evoniq-logo.png"
                            alt="EVONIQ"
                            width={60}
                            height={60}
                            className="mx-auto mb-8 logo-premium-lg"
                        />
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-[#2A2420] mb-6 tracking-[0.02em]">
                            {product.freshnessSection.title}
                        </h2>
                        <p className="text-[#5C524A] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                            {product.freshnessSection.description}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ─── Bottom Buy Section ─── */}
            <section className="py-20 px-6 overflow-hidden">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto glass-strong rounded-3xl p-10 text-center"
                >
                    <h3 className="text-3xl md:text-4xl font-montserrat font-bold text-[#2A2420] mb-2">
                        {product.price}
                    </h3>
                    <p className="text-[#8A7F75] text-sm mb-8">
                        {product.buyNowSection.unit} · Inclusive of all taxes
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleAddToCart}
                            className="px-8 py-4 rounded-2xl bg-white/50 border border-[#B87333]/20 text-[#2A2420] font-semibold uppercase tracking-[0.15em] hover:bg-white/70 transition-colors"
                            aria-label="Add to Cart"
                        >
                            Add to Cart
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleAddToCart}
                            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-semibold uppercase tracking-[0.15em] hover:shadow-[0_0_40px_rgba(184,115,51,0.35)] transition-shadow duration-300"
                            aria-label="Buy Now"
                        >
                            Buy Now
                        </motion.button>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center text-[#8A7F75] text-xs">
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.079-.481 1.035-1.099C20.94 12.133 19.667 6.75 15.375 6.75H3.75" />
                            </svg>
                            Ships in 3–5 days
                        </span>
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
                            </svg>
                            48-hour returns
                        </span>
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                            Secure checkout
                        </span>
                    </div>
                </motion.div>
            </section>

            {/* ─── Next Variant CTA ─── */}
            <section className="py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <motion.button
                        onClick={() =>
                            handleColorChange((selectedIndex + 1) % products.length)
                        }
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full group relative overflow-hidden rounded-3xl p-8 md:p-12 glass-strong hover:border-[#B87333]/30 transition-all duration-500"
                        aria-label={`View ${products[(selectedIndex + 1) % products.length].id} variant`}
                    >
                        <div className="relative z-10 flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-[#8A7F75] text-sm uppercase tracking-[0.2em] mb-2">
                                    Next Variant
                                </p>
                                <p className="text-2xl md:text-3xl font-montserrat font-semibold text-[#2A2420]">
                                    {products[(selectedIndex + 1) % products.length].id
                                        .charAt(0)
                                        .toUpperCase() +
                                        products[(selectedIndex + 1) % products.length].id.slice(1)}{" "}
                                    Edition
                                </p>
                                <p className="text-[#5C524A] text-sm mt-1">
                                    {products[(selectedIndex + 1) % products.length].subName}
                                </p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-16 h-16 rounded-2xl shadow-md"
                                    style={{
                                        backgroundColor:
                                            products[(selectedIndex + 1) % products.length].swatchColor,
                                    }}
                                />
                                <svg
                                    className="w-8 h-8 text-[#8A7F75] group-hover:text-[#B87333] group-hover:translate-x-2 transition-all duration-300"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </div>
                        </div>
                    </motion.button>
                </div>
            </section>

            <Testimonials />
            <Footer />
        </main>
    );
}
