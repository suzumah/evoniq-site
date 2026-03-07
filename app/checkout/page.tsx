"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";

// ── Types ──────────────────────────────────────────────────────────────────
type Step = "login" | "otp" | "address" | "payment";

interface AddressForm {
    name: string;
    phone: string;
    flat: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
    landmark: string;
}

// ── Step Indicator ─────────────────────────────────────────────────────────
function StepIndicator({ current }: { current: Step }) {
    const steps: { key: Step | "otp"; label: string }[] = [
        { key: "login", label: "Login" },
        { key: "address", label: "Address" },
        { key: "payment", label: "Payment" },
    ];
    const order: Record<Step, number> = { login: 0, otp: 0, address: 1, payment: 2 };
    const currentIndex = order[current];

    return (
        <div className="flex items-center gap-0 mb-10">
            {steps.map((step, i) => {
                const done = i < currentIndex;
                const active = i === currentIndex;
                return (
                    <div key={step.key} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1.5">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${done
                                ? "bg-green-500 text-white"
                                : active
                                    ? "bg-gradient-to-br from-[#CD7F32] to-[#B87333] text-white shadow-[0_0_16px_rgba(184,115,51,0.4)]"
                                    : "bg-white/40 border border-[#B87333]/20 text-[#8A7F75]"
                                }`}>
                                {done ? (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ) : i + 1}
                            </div>
                            <span className={`text-[10px] uppercase tracking-widest font-medium whitespace-nowrap ${active ? "text-[#B87333]" : done ? "text-green-600" : "text-[#8A7F75]"}`}>
                                {step.label}
                            </span>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`flex-1 h-px mx-2 transition-colors duration-300 ${done ? "bg-green-400" : "bg-[#B87333]/20"}`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ── Order Summary Sidebar ──────────────────────────────────────────────────
function OrderSummary() {
    const { state, totalPrice } = useCart();
    return (
        <div className="glass-strong rounded-3xl p-6 space-y-4 sticky top-8">
            <h3 className="font-montserrat font-bold text-[#2A2420] text-lg flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#B87333]">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 01-8 0" />
                </svg>
                Order Summary
            </h3>

            {state.items.length === 0 ? (
                <p className="text-[#8A7F75] text-sm text-center py-4">No items. <Link href="/shop" className="text-[#B87333] underline">Go shopping</Link></p>
            ) : (
                <>
                    <div className="space-y-3">
                        {state.items.map(({ product, qty }) => (
                            <div key={product.id} className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#E8E0D4] flex-shrink-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={product.imageSrc} alt={product.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-[#2A2420] capitalize truncate">{product.color} Edition</p>
                                    <p className="text-[10px] text-[#8A7F75]">Qty: {qty}</p>
                                </div>
                                <p className="text-sm font-bold text-[#B87333] flex-shrink-0">
                                    ₹{(product.priceNum * qty).toLocaleString("en-IN")}
                                </p>
                            </div>
                        ))}

                        {state.freeGiftAdded && (
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-amber-50 flex items-center justify-center text-xl flex-shrink-0">🔌</div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs font-semibold text-[#2A2420]">4-in-1 USB Cable</p>
                                    <span className="text-[9px] font-bold bg-[#B87333] text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">Gift</span>
                                </div>
                                <p className="text-sm font-bold text-green-600 flex-shrink-0">FREE</p>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-[#B87333]/10 pt-3 space-y-1.5 text-sm">
                        <div className="flex justify-between text-[#8A7F75]">
                            <span>Subtotal</span>
                            <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                        </div>
                        <div className="flex justify-between text-[#8A7F75]">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">FREE</span>
                        </div>
                        <div className="flex justify-between font-bold text-[#2A2420] text-base pt-1.5 border-t border-[#B87333]/10">
                            <span>Total</span>
                            <span className="text-[#B87333]">₹{totalPrice.toLocaleString("en-IN")}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 text-[#8A7F75] text-[10px] justify-center pt-1">
                        <span>🔒 Secure</span>
                        <span>↩️ 14-day returns</span>
                        <span>🚚 Free shipping</span>
                    </div>
                </>
            )}
        </div>
    );
}

// ── Step 1: Login ──────────────────────────────────────────────────────────
function LoginStep({ onNext, phone, setPhone }: { onNext: () => void; phone: string; setPhone: (v: string) => void }) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!/^[6-9]\d{9}$/.test(phone)) {
            setError("Enter a valid 10-digit Indian mobile number.");
            return;
        }
        setError("");
        setLoading(true);
        const { error: signInError } = await supabase.auth.signInWithOtp({
            phone: "+91" + phone,
        });
        setLoading(false);
        if (signInError) {
            setError(signInError.message);
            return;
        }
        onNext();
    };

    return (
        <motion.div key="login" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <p className="text-[#8A7F75] text-sm mb-6">Enter your mobile number to get a verification code.</p>
            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-widest mb-2">Mobile Number</label>
                    <div className="flex">
                        <span className="px-4 py-3 bg-white/40 border border-r-0 border-[#B87333]/20 rounded-l-xl text-[#5C524A] text-sm font-medium">+91</span>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => { setPhone(e.target.value.replace(/\D/g, "").slice(0, 10)); setError(""); }}
                            onKeyDown={(e) => e.key === "Enter" && submit()}
                            placeholder="9876543210"
                            maxLength={10}
                            className="flex-1 px-4 py-3 bg-white/60 border border-[#B87333]/20 rounded-r-xl text-[#2A2420] text-sm focus:outline-none focus:border-[#B87333]/50 focus:ring-1 focus:ring-[#B87333]/30 transition-all"
                        />
                    </div>
                    {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
                </div>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={submit}
                    disabled={loading}
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_28px_rgba(184,115,51,0.4)] transition-shadow disabled:opacity-60"
                >
                    {loading ? "Sending..." : "Send OTP"}
                </motion.button>
            </div>
        </motion.div>
    );
}

// ── Step 2: OTP ─────────────────────────────────────────────────────────────
function OtpStep({ onNext, phone, onBack }: { onNext: () => void; phone: string; onBack: () => void }) {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(30);
    const inputs = useCallback((i: number) => document.getElementById(`otp-${i}`) as HTMLInputElement | null, []);

    // Countdown timer
    useState(() => {
        const id = setInterval(() => setTimer((t) => (t > 0 ? t - 1 : 0)), 1000);
        return () => clearInterval(id);
    });

    const handleChange = (i: number, val: string) => {
        const v = val.replace(/\D/g, "").slice(-1);
        const newOtp = [...otp];
        newOtp[i] = v;
        setOtp(newOtp);
        if (v && i < 5) inputs(i + 1)?.focus();
    };

    const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
        if (e.key === "Backspace" && !otp[i] && i > 0) inputs(i - 1)?.focus();
    };

    const submit = async () => {
        const code = otp.join("");
        if (code.length < 6) { setError("Enter the 6-digit code."); return; }
        setError("");
        setLoading(true);
        const { error: verifyError } = await supabase.auth.verifyOtp({
            phone: "+91" + phone,
            token: code,
            type: "sms",
        });
        setLoading(false);
        if (verifyError) {
            setError(verifyError.message);
            return;
        }
        onNext();
    };

    return (
        <motion.div key="otp" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <p className="text-[#8A7F75] text-sm mb-2">OTP sent to <span className="font-semibold text-[#2A2420]">+91 {phone}</span></p>
            <button onClick={onBack} className="text-[#B87333] text-xs underline underline-offset-2 mb-6 block">Change number</button>

            <div className="flex gap-2 mb-6 justify-center">
                {otp.map((val, i) => (
                    <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        className={`w-11 h-13 text-center text-lg font-bold rounded-xl border transition-all ${val ? "border-[#B87333] bg-[#B87333]/5 text-[#2A2420]" : "border-[#B87333]/20 bg-white/60 text-[#2A2420]"} focus:outline-none focus:border-[#B87333]/70 focus:ring-1 focus:ring-[#B87333]/30`}
                    />
                ))}
            </div>

            {error && <p className="text-red-500 text-xs text-center mb-4">{error}</p>}

            <p className="text-[#8A7F75] text-xs text-center mb-4">
                {timer > 0 ? `Resend in ${timer}s` : (
                    <button onClick={() => setTimer(30)} className="text-[#B87333] underline underline-offset-2">Resend OTP</button>
                )}
            </p>

            <p className="text-[#8A7F75] text-[10px] text-center mb-5 italic">(Demo: any 6-digit code works)</p>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={submit}
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_28px_rgba(184,115,51,0.4)] transition-shadow disabled:opacity-60"
            >
                {loading ? "Verifying..." : "Verify & Continue"}
            </motion.button>
        </motion.div>
    );
}

// ── Step 3: Address ────────────────────────────────────────────────────────
const INDIAN_STATES = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
    "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
    "Delhi", "Jammu & Kashmir", "Ladakh", "Puducherry",
];

function AddressStep({ onNext, form, setForm }: { onNext: () => void; form: AddressForm; setForm: (f: AddressForm) => void }) {
    const [errors, setErrors] = useState<Partial<AddressForm>>({});

    const validate = () => {
        const errs: Partial<AddressForm> = {};
        if (!form.name.trim()) errs.name = "Required";
        if (!form.flat.trim()) errs.flat = "Required";
        if (!form.street.trim()) errs.street = "Required";
        if (!form.city.trim()) errs.city = "Required";
        if (!form.state) errs.state = "Required";
        if (!/^\d{6}$/.test(form.pincode)) errs.pincode = "Enter valid 6-digit pincode";
        return errs;
    };

    const submit = () => {
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setErrors({});
        onNext();
    };

    const field = (label: string, key: keyof AddressForm, opts?: { placeholder?: string; half?: boolean }) => (
        <div className={opts?.half ? "col-span-1" : "col-span-2"}>
            <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-widest mb-1.5">{label}</label>
            <input
                type="text"
                value={form[key]}
                onChange={(e) => { setForm({ ...form, [key]: e.target.value }); setErrors({ ...errors, [key]: undefined }); }}
                placeholder={opts?.placeholder}
                className={`w-full px-3.5 py-2.5 bg-white/60 border rounded-xl text-[#2A2420] text-sm focus:outline-none transition-all ${errors[key] ? "border-red-400 focus:border-red-400" : "border-[#B87333]/20 focus:border-[#B87333]/50 focus:ring-1 focus:ring-[#B87333]/30"}`}
            />
            {errors[key] && <p className="text-red-500 text-[10px] mt-1">{errors[key]}</p>}
        </div>
    );

    return (
        <motion.div key="address" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <p className="text-[#8A7F75] text-sm mb-6">Where should we deliver your order?</p>
            <div className="grid grid-cols-2 gap-3 mb-5">
                {field("Full Name", "name", { placeholder: "Arjun Sharma" })}
                {field("Flat / House / Apt", "flat", { placeholder: "B-204, Sunshine Apartments" })}
                {field("Street / Area / Colony", "street", { placeholder: "MG Road, Bandra West" })}
                {field("City", "city", { placeholder: "Mumbai", half: true })}
                <div className="col-span-1">
                    <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-widest mb-1.5">State</label>
                    <select
                        value={form.state}
                        onChange={(e) => { setForm({ ...form, state: e.target.value }); setErrors({ ...errors, state: undefined }); }}
                        className={`w-full px-3.5 py-2.5 bg-white/60 border rounded-xl text-[#2A2420] text-sm focus:outline-none transition-all ${errors.state ? "border-red-400" : "border-[#B87333]/20 focus:border-[#B87333]/50 focus:ring-1 focus:ring-[#B87333]/30"}`}
                    >
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                    {errors.state && <p className="text-red-500 text-[10px] mt-1">{errors.state}</p>}
                </div>
                {field("Pincode", "pincode", { placeholder: "400050", half: true })}
                <div className="col-span-2">
                    <label className="block text-xs font-semibold text-[#5C524A] uppercase tracking-widest mb-1.5">Landmark <span className="text-[#8A7F75] normal-case">(optional)</span></label>
                    <input
                        type="text"
                        value={form.landmark}
                        onChange={(e) => setForm({ ...form, landmark: e.target.value })}
                        placeholder="Near Linking Road market"
                        className="w-full px-3.5 py-2.5 bg-white/60 border border-[#B87333]/20 rounded-xl text-[#2A2420] text-sm focus:outline-none focus:border-[#B87333]/50 focus:ring-1 focus:ring-[#B87333]/30 transition-all"
                    />
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={submit}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_28px_rgba(184,115,51,0.4)] transition-shadow"
            >
                Continue to Payment
            </motion.button>
        </motion.div>
    );
}

// ── Step 4: Payment (stub) ────────────────────────────────────────────────
const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });
};

function PaymentStep({ form, phone, sessionId }: { form: AddressForm; phone: string; sessionId: string | null }) {
    const { state, totalPrice } = useCart();
    const [loading, setLoading] = useState(false);

    const handleProceed = async () => {
        try {
            setLoading(true);
            const res = await loadRazorpay();

            if (!res) {
                alert("Razorpay SDK failed to load. Please check your internet connection.");
                setLoading(false);
                return;
            }

            let response;
            try {
                response = await fetch("/api/create-razorpay-order", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: totalPrice, sessionId }),
                });
            } catch (err) {
                alert("Network error: Could not reach the payment server.");
                setLoading(false);
                return;
            }

            let data;
            try {
                data = await response.json();
            } catch (err) {
                alert("Error: Payment server returned an invalid response. Please verify your Razorpay API Keys are configured correctly.");
                setLoading(false);
                return;
            }

            if (!response.ok || data.error) {
                alert(data.error || "Could not start payment. Please try again later.");
                setLoading(false);
                return;
            }

            // Fallback key fetching allows either build-time injection or runtime fetching from server
            const keyToUse = data.key_id || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

            if (!keyToUse) {
                alert("Configuration Error: Razorpay Key ID is missing. Please add it to your deployment settings.");
                setLoading(false);
                return;
            }

            const options = {
                key: keyToUse,
                amount: data.amount,
                currency: data.currency,
                name: "EVONIQ",
                description: "Thanks for placing your order with EVONIQ!",
                image: "https://evoniq.in/images/logo/evoniq-logo.png",
                order_id: data.id,
                handler: async function (response: any) {
                    try {
                        const verifyData = {
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_signature: response.razorpay_signature,
                            sessionId
                        };

                        const verifyResRaw = await fetch('/api/verify-razorpay-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(verifyData),
                        });
                        const verifyRes = await verifyResRaw.json();

                        if (verifyRes.message === 'Payment verified successfully.') {
                            alert("Payment Successful! We have received your order!");
                        } else {
                            alert("Warning: Payment tampering detected or verification failed!");
                        }
                    } catch (e) {
                        alert("Payment succeeded but verification failed to respond. Check your dashboard.");
                    }
                },
                prefill: {
                    name: form.name,
                    contact: "+91" + phone,
                },
                theme: {
                    color: "#B87333", // EVONIQ gold branding
                },
            };

            const paymentObject = new (window as any).Razorpay(options);
            paymentObject.on("payment.failed", function (response: any) {
                alert("Payment failed: " + response.error.description);
            });
            paymentObject.open();

        } catch (error: any) {
            console.error(error);
            alert("An unexpected error occurred: " + (error.message || "Unknown error"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div key="payment" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <p className="text-[#8A7F75] text-sm mb-6">Review your order and complete payment.</p>

            {/* Delivery address recap */}
            <div className="glass rounded-2xl p-4 mb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">Delivering to</p>
                <p className="text-sm font-semibold text-[#2A2420]">{form.name} · +91 {phone}</p>
                <p className="text-xs text-[#8A7F75] mt-0.5 leading-relaxed">
                    {form.flat}, {form.street}{form.landmark ? `, ${form.landmark}` : ""}<br />
                    {form.city}, {form.state} – {form.pincode}
                </p>
            </div>

            {/* Items recap */}
            <div className="glass rounded-2xl p-4 mb-6 space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-[#B87333] mb-2">Items</p>
                {state.items.map(({ product, qty }) => (
                    <div key={product.id} className="flex justify-between text-sm">
                        <span className="text-[#5C524A] capitalize">{product.color} Sleeve × {qty}</span>
                        <span className="font-semibold text-[#2A2420]">₹{(product.priceNum * qty).toLocaleString("en-IN")}</span>
                    </div>
                ))}
                {state.freeGiftAdded && (
                    <div className="flex justify-between text-sm">
                        <span className="text-[#5C524A]">4-in-1 USB Cable (Gift)</span>
                        <span className="font-semibold text-green-600">FREE</span>
                    </div>
                )}
                <div className="border-t border-[#B87333]/10 pt-2 flex justify-between font-bold text-base">
                    <span className="text-[#2A2420]">Total</span>
                    <span className="text-[#B87333]">₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleProceed}
                disabled={loading}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_35px_rgba(184,115,51,0.45)] transition-all disabled:opacity-60 flex items-center justify-center gap-3"
            >
                {loading ? (
                    <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <circle cx="12" cy="12" r="10" strokeOpacity="0.3" /><path d="M12 2a10 10 0 0110 10" strokeLinecap="round" />
                        </svg>
                        Processing...
                    </>
                ) : (
                    <>
                        🔒 Proceed to Pay · ₹{totalPrice.toLocaleString("en-IN")}
                    </>
                )}
            </motion.button>

            <p className="text-[#8A7F75] text-[10px] text-center mt-3">
                Secured by 256-bit SSL encryption. Payments processed securely via Razorpay.
            </p>
        </motion.div>
    );
}

// ── Main Checkout Page ─────────────────────────────────────────────────────
export default function CheckoutPage() {
    const [step, setStep] = useState<Step>("login");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState<AddressForm>({
        name: "", phone: "", flat: "", street: "", city: "", state: "", pincode: "", landmark: "",
    });
    const { state } = useCart();
    const [sessionId, setSessionId] = useState<string | null>(null);

    useEffect(() => {
        const saveProgress = async () => {
            try {
                const data = {
                    phone,
                    step,
                    form_data: address,
                    cart_items: state.items
                };

                if (sessionId) {
                    await supabase.from("checkout_sessions").update(data).eq("id", sessionId);
                } else {
                    const { data: insertData } = await supabase.from("checkout_sessions").insert([data]).select().single();
                    if (insertData) setSessionId(insertData.id);
                }
            } catch (e) {
                console.error("Failed to save progress", e);
            }
        };

        const timeout = setTimeout(saveProgress, 1000);
        return () => clearTimeout(timeout);
    }, [phone, step, address, state.items, sessionId]);

    const stepLabel: Record<Step, string> = {
        login: "Verify Your Number",
        otp: "Enter OTP",
        address: "Delivery Address",
        payment: "Complete Payment",
    };

    const displayStep: Step = step === "otp" ? "login" : step;

    return (
        <main className="min-h-screen suede-bg" style={{ background: "linear-gradient(135deg, #E8E0D4 0%, #DDD5C8 100%)" }}>
            {/* Header */}
            <div className="border-b border-[#B87333]/15 bg-[#E8E0D4]/80 backdrop-blur-xl">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/images/logo/evoniq-logo.png" alt="EVONIQ" className="w-8 h-8 object-contain" />
                        <span className="font-montserrat font-bold tracking-[0.15em] copper-text text-lg">EVONIQ</span>
                    </Link>
                    <p className="text-[#8A7F75] text-sm font-medium">🔒 Secure Checkout</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">

                {/* Left — Form panel */}
                <div className="glass-strong rounded-3xl p-6 sm:p-8">
                    {/* Empty cart warning */}
                    {state.items.length === 0 && step !== "payment" && (
                        <div className="text-center py-8">
                            <p className="text-[#8A7F75] mb-4">Your cart is empty.</p>
                            <Link href="/shop">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#CD7F32] to-[#B87333] text-white font-bold text-sm"
                                >
                                    Shop Now
                                </motion.button>
                            </Link>
                        </div>
                    )}

                    {(state.items.length > 0 || step === "payment") && (
                        <>
                            <StepIndicator current={displayStep} />

                            <h2 className="font-montserrat font-bold text-[#2A2420] text-2xl mb-6">
                                {stepLabel[step]}
                            </h2>

                            <AnimatePresence mode="wait">
                                {step === "login" && (
                                    <LoginStep
                                        key="login"
                                        phone={phone}
                                        setPhone={setPhone}
                                        onNext={() => setStep("otp")}
                                    />
                                )}
                                {step === "otp" && (
                                    <OtpStep
                                        key="otp"
                                        phone={phone}
                                        onNext={() => setStep("address")}
                                        onBack={() => setStep("login")}
                                    />
                                )}
                                {step === "address" && (
                                    <AddressStep
                                        key="address"
                                        form={address}
                                        setForm={setAddress}
                                        onNext={() => setStep("payment")}
                                    />
                                )}
                                {step === "payment" && (
                                    <PaymentStep key="payment" form={address} phone={phone} sessionId={sessionId} />
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </div>

                {/* Right — Order summary */}
                <div>
                    <OrderSummary />
                </div>
            </div>
        </main>
    );
}
