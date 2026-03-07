"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type confettiLib from "canvas-confetti";

// ── Free gift data ──────────────────────────────────────────────────────────
const FREE_GIFT = {
    name: "4-in-1 Fast Charge USB Cable",
    specs: [
        "USB-A · Type-C · Lightning · Type-C",
        "65W max fast charge",
        "4 modes — 1 cable",
    ],
    image: "/images/gift/usb-cable.jpg",
    badge: "FREE GIFT",
};

// ── Golden confetti ─────────────────────────────────────────────────────────
async function fireConfetti() {
    const confetti = (await import("canvas-confetti")).default as typeof confettiLib;
    const colors = ["#FFD700", "#FFA500", "#CD7F32", "#B87333", "#FFFACD", "#FFE066"];
    const count = 180;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 9999 };
    const fire = (x: number, y: number, particleCount: number) =>
        confetti({ ...defaults, particleCount, origin: { x, y }, colors });
    fire(0.25, 0.45, count * 0.35);
    fire(0.75, 0.45, count * 0.35);
    fire(0.5, 0.3, count * 0.5);
}

// ── Cart item row ─────────────────────────────────────────────────────────
function CartItemRow({
    product,
    qty,
    onQty,
    onRemove,
}: {
    product: { id: string; name: string; subName: string; price: string; priceNum: number; imageSrc: string; color: string };
    qty: number;
    onQty: (qty: number) => void;
    onRemove: () => void;
}) {
    return (
        <div className="flex gap-3 p-4 rounded-2xl bg-white/40 border border-[#B87333]/10">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-[#E8E0D4]">
                <Image src={product.imageSrc} alt={product.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <p className="font-montserrat font-semibold text-[#2A2420] text-sm leading-tight truncate">{product.name}</p>
                <p className="text-[#8A7F75] text-xs mt-0.5 capitalize">{product.color} Edition</p>
                <p className="text-[#B87333] font-bold text-sm mt-1">{product.price}</p>
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => onQty(qty - 1)}
                        disabled={qty <= 1}
                        className="w-7 h-7 rounded-lg bg-white/60 border border-[#B87333]/20 text-[#2A2420] flex items-center justify-center text-lg font-light disabled:opacity-30 hover:border-[#B87333]/40 transition-colors"
                        aria-label="Decrease quantity"
                    >−</button>
                    <span className="w-6 text-center text-sm font-semibold text-[#2A2420]">{qty}</span>
                    <button
                        onClick={() => onQty(qty + 1)}
                        className="w-7 h-7 rounded-lg bg-white/60 border border-[#B87333]/20 text-[#2A2420] flex items-center justify-center text-lg font-light hover:border-[#B87333]/40 transition-colors"
                        aria-label="Increase quantity"
                    >+</button>
                    <button
                        onClick={onRemove}
                        className="ml-auto text-[#B87333]/50 hover:text-red-400 transition-colors"
                        aria-label="Remove item"
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Free gift card ────────────────────────────────────────────────────────
function FreeGiftCard({ added, onAdd }: { added: boolean; onAdd: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-2xl border-2 p-4 ${added
                ? "bg-amber-50/80 border-[#B87333]/50"
                : "bg-white/30 border-[#B87333]/25 border-dashed"
                } transition-colors duration-300`}
        >
            <div className="flex gap-3 items-start">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-white shadow-sm">
                    <Image
                        src={FREE_GIFT.image}
                        alt="4-in-1 USB Cable"
                        fill
                        className="object-contain p-1"
                        onError={(e) => {
                            // fallback if image isn't there yet
                            (e.currentTarget as HTMLImageElement).style.display = "none";
                        }}
                    />
                    {/* Fallback USB icon */}
                    <div className="absolute inset-0 flex items-center justify-center text-2xl">🔌</div>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white">
                            {FREE_GIFT.badge}
                        </span>
                    </div>
                    <p className="font-semibold text-[#2A2420] text-sm leading-snug">{FREE_GIFT.name}</p>
                    <ul className="mt-1 space-y-0.5">
                        {FREE_GIFT.specs.map((s) => (
                            <li key={s} className="text-[#8A7F75] text-[10px] flex items-center gap-1">
                                <span className="text-[#B87333]">·</span> {s}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="font-bold text-[#B87333] text-sm line-through opacity-40">₹499</p>
                    <p className="font-bold text-green-600 text-sm">FREE</p>
                </div>
            </div>
            {!added && (
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onAdd}
                    className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(184,115,51,0.35)] transition-shadow"
                >
                    Add Free Cable to Cart
                </motion.button>
            )}
            {added && (
                <div className="mt-3 flex items-center justify-center gap-2 text-green-700 text-xs font-semibold">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Added to your order!
                </div>
            )}
        </motion.div>
    );
}

// ── Main CartDrawer ────────────────────────────────────────────────────────
export default function CartDrawer() {
    const { state, dispatch, totalItems, totalPrice, closeCart } = useCart();
    const [couponInput, setCouponInput] = useState("");
    const [couponError, setCouponError] = useState("");
    const overlayRef = useRef<HTMLDivElement>(null);

    // Sync input with applied coupon
    useEffect(() => {
        if (state.couponApplied) setCouponInput(state.couponCode);
    }, [state.couponApplied, state.couponCode]);

    // Close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape" && state.isOpen) closeCart();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [state.isOpen, closeCart]);

    // Lock body scroll while open
    useEffect(() => {
        document.body.style.overflow = state.isOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [state.isOpen]);

    const applyCoupon = useCallback(() => {
        const code = couponInput.trim().toUpperCase();
        if (!code) { setCouponError("Enter a coupon code."); return; }
        dispatch({ type: "APPLY_COUPON", payload: code });
        if (code !== "4IN1") setCouponError("Invalid code. Try 4IN1 🎁");
        else { setCouponError(""); }
    }, [couponInput, dispatch]);

    const handleAddFreeGift = useCallback(async () => {
        dispatch({ type: "ADD_FREE_GIFT" });
        await fireConfetti();
    }, [dispatch]);

    const formattedTotal = `₹${(totalPrice).toLocaleString("en-IN")}`;

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {state.isOpen && (
                    <motion.div
                        key="backdrop"
                        ref={overlayRef}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[200]"
                        onClick={closeCart}
                    />
                )}
            </AnimatePresence>

            {/* Drawer */}
            <AnimatePresence>
                {state.isOpen && (
                    <motion.aside
                        key="drawer"
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 320, damping: 38 }}
                        className="fixed top-0 right-0 h-screen w-full sm:w-[420px] z-[201] flex flex-col"
                        style={{ background: "linear-gradient(160deg, #F4EDE5 0%, #EDE5DA 100%)" }}
                        aria-modal="true"
                        aria-label="Shopping cart"
                        role="dialog"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-5 py-4 border-b border-[#B87333]/15">
                            <div className="flex items-center gap-2">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#B87333]">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                                </svg>
                                <h2 className="font-montserrat font-bold text-[#2A2420] text-lg">Your Cart</h2>
                                {totalItems > 0 && (
                                    <span className="ml-1 px-2 py-0.5 rounded-full bg-[#B87333] text-white text-xs font-bold">
                                        {totalItems}
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={closeCart}
                                className="w-8 h-8 rounded-xl bg-white/50 flex items-center justify-center text-[#5C524A] hover:bg-white/80 hover:text-[#B87333] transition-all"
                                aria-label="Close cart"
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>

                        {/* Scrollable body */}
                        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

                            {/* Empty state */}
                            {state.items.length === 0 && (
                                <div className="flex flex-col items-center justify-center h-48 gap-3 text-center">
                                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[#8A7F75]/40">
                                        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                                    </svg>
                                    <p className="text-[#8A7F75] text-sm">Your cart is empty</p>
                                    <button onClick={closeCart} className="text-[#B87333] text-sm underline underline-offset-2 font-medium">Continue Shopping</button>
                                </div>
                            )}

                            {/* Cart items */}
                            <AnimatePresence initial={false}>
                                {state.items.map(({ product, qty }) => (
                                    <motion.div
                                        key={product.id}
                                        layout
                                        initial={{ opacity: 0, x: 30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -30, height: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <CartItemRow
                                            product={product}
                                            qty={qty}
                                            onQty={(q) => dispatch({ type: "UPDATE_QTY", payload: { id: product.id, qty: q } })}
                                            onRemove={() => dispatch({ type: "REMOVE_ITEM", payload: product.id })}
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>

                            {/* ── Coupon section ── */}
                            {state.items.length > 0 && (
                                <div className="rounded-2xl bg-white/40 border border-[#B87333]/12 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-widest text-[#5C524A] mb-3 flex items-center gap-2">
                                        <span>🎁</span> Promo Code
                                    </p>
                                    {!state.couponApplied ? (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={couponInput}
                                                onChange={(e) => { setCouponInput(e.target.value.toUpperCase()); setCouponError(""); }}
                                                onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                                                placeholder="Enter code (try 4IN1)"
                                                maxLength={10}
                                                className="flex-1 px-3 py-2 rounded-xl border border-[#B87333]/20 bg-white/60 text-[#2A2420] text-sm font-mono placeholder:text-[#8A7F75]/60 focus:outline-none focus:border-[#B87333]/50 focus:ring-1 focus:ring-[#B87333]/30 transition-all"
                                            />
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={applyCoupon}
                                                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white text-sm font-semibold hover:shadow-[0_0_16px_rgba(184,115,51,0.35)] transition-shadow"
                                            >
                                                Apply
                                            </motion.button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 text-green-700 text-sm font-semibold">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            Code <span className="font-mono font-bold">{state.couponCode}</span> applied! Free cable unlocked.
                                            <button
                                                onClick={() => { dispatch({ type: "REMOVE_FREE_GIFT" }); setCouponInput(""); }}
                                                className="ml-auto text-[#8A7F75] hover:text-red-400 text-xs underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    )}
                                    {couponError && (
                                        <p className="text-red-500 text-xs mt-2">{couponError}</p>
                                    )}
                                </div>
                            )}

                            {/* ── Free gift ── */}
                            {state.couponApplied && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <FreeGiftCard
                                        added={state.freeGiftAdded}
                                        onAdd={handleAddFreeGift}
                                    />
                                </motion.div>
                            )}
                        </div>

                        {/* Footer */}
                        {state.items.length > 0 && (
                            <div className="border-t border-[#B87333]/15 px-5 py-5 space-y-3 bg-white/20 backdrop-blur-sm">
                                {/* Order summary */}
                                <div className="space-y-1.5 text-sm">
                                    <div className="flex justify-between text-[#5C524A]">
                                        <span>Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})</span>
                                        <span className="font-semibold text-[#2A2420]">{formattedTotal}</span>
                                    </div>
                                    {state.freeGiftAdded && (
                                        <div className="flex justify-between text-green-700 font-semibold">
                                            <span>4-in-1 USB Cable (Gift)</span>
                                            <span>FREE</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-[#5C524A]">
                                        <span>Shipping</span>
                                        <span className="text-green-600 font-medium">FREE</span>
                                    </div>
                                    <div className="flex justify-between font-bold text-[#2A2420] text-base pt-2 border-t border-[#B87333]/10">
                                        <span>Total</span>
                                        <span className="text-[#B87333]">{formattedTotal}</span>
                                    </div>
                                </div>

                                {/* CTA buttons */}
                                <div className="flex gap-2 pt-1">
                                    <button
                                        onClick={closeCart}
                                        className="flex-1 py-3 rounded-2xl border border-[#B87333]/25 bg-white/40 text-[#2A2420] text-sm font-semibold hover:bg-white/60 transition-colors"
                                    >
                                        Continue Shopping
                                    </button>
                                    <Link href="/checkout" className="flex-1" onClick={closeCart}>
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white text-sm font-bold uppercase tracking-wider hover:shadow-[0_0_28px_rgba(184,115,51,0.4)] transition-shadow flex items-center justify-center gap-2"
                                        >
                                            Checkout
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M12 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>
                                    </Link>
                                </div>

                                {/* Trust badges */}
                                <div className="flex justify-center gap-4 text-[#8A7F75] text-[10px] pt-1">
                                    {["🔒 Secure", "↩️ 14-day returns", "🚚 Free shipping"].map((b) => (
                                        <span key={b}>{b}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}
