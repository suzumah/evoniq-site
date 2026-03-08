"use client";

import { motion } from "framer-motion";

const reviews = [
    {
        name: "Rahul S.",
        role: "Software Dev",
        text: "Total game changer for my WFH setup. The wireless charging is clutch, ngl. Desk hasn't looked this clean in years.",
        rating: 5,
    },
    {
        name: "Ananya M.",
        role: "Product Designer",
        text: "Aesthetic? 10/10. Functionality? 10/10. It literally cleaned up my whole desk vibe. Obsessed with the suede finish.",
        rating: 5,
    },
    {
        name: "Kartik V.",
        role: "Startup Founder",
        text: "Bro, the build quality feels so premium. Major upgrade from my old mat. Keeping my phone and airpods charged is a massive flex.",
        rating: 5,
    },
    {
        name: "Sneha P.",
        role: "Content Creator",
        text: "Saves so much space! I used to have wires and chargers everywhere but now my desk actually looks Pinterest-worthy. Huge W.",
        rating: 5,
    },
    {
        name: "Rohan K.",
        role: "Finance Analyst",
        text: "Got the Brown variant and it’s giving rich CEO energy. Love how fast the charging pad responds. Worth every rupee.",
        rating: 5,
    },
    {
        name: "Zara T.",
        role: "Brand Strategist",
        text: "Minimalist, no stray cables, and fits my MacBook perfectly. It's so sleek and the mouse glide is buttery smooth.",
        rating: 5,
    },
    {
        name: "Kabir D.",
        role: "Freelance Architect",
        text: "Literally the only desk mat you need. Such a premium unboxing experience and it looks insane on a dark wood setup.",
        rating: 5,
    },
    {
        name: "Riya C.",
        role: "Marketing Manager",
        text: "Can't imagine going back to a normal desk pad. The quality is crazy good and the built-in charger is actually elite.",
        rating: 5,
    },
    {
        name: "Aryan B.",
        role: "Data Scientist",
        text: "Top-tier accessory. Protects my laptop, declutters my desk, and charges my gear instantly. Honestly, best purchase of the year.",
        rating: 5,
    },
];

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-[#B87333] drop-shadow-[0_0_8px_rgba(184,115,51,0.6)]" : "text-[#B87333]/30"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ))}
        </div>
    );
}

// Split reviews into two arrays for two separate marquee rows
const row1 = reviews.slice(0, 5);
const row2 = reviews.slice(5, 9); // Alternatively, duplicate some or just let it loop

// We duplicate items inside the render so the marquee loops smoothly
function MarqueeRow({ items, reverse = false }: { items: typeof reviews, reverse?: boolean }) {
    return (
        <div className={`flex w-max ${reverse ? "animate-[marqueeReverse_40s_linear_infinite]" : "animate-[marquee_40s_linear_infinite]"} hover:[animation-play-state:paused]`}>
            {/* Duplicated thrice for seamless infinite scroll */}
            {[...Array(3)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-4 sm:gap-6 px-2 sm:px-3">
                    {items.map((review, i) => (
                        <div
                            key={`${arrayIndex}-${i}`}
                            className="w-[280px] sm:w-[350px] glass-strong rounded-3xl p-6 sm:p-8 flex-shrink-0 transition-all duration-300 hover:border-[#B87333]/30 group"
                        >
                            <StarRating rating={review.rating} />
                            <p className="text-[#5C524A] text-sm sm:text-base leading-relaxed mb-6 font-medium">
                                &quot;{review.text}&quot;
                            </p>
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#CD7F32] to-[#B87333] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_15px_rgba(184,115,51,0.3)] group-hover:shadow-[0_0_20px_rgba(184,115,51,0.5)] transition-shadow">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-[#2A2420] text-sm font-bold font-montserrat">{review.name}</p>
                                    <p className="text-[#8A7F75] text-[10px] uppercase tracking-widest">{review.role}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default function Testimonials() {
    return (
        <section className="relative py-24 sm:py-32 overflow-hidden border-t border-[#B87333]/10">
            {/* Decorative background gradients */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#B87333]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <span className="text-[#B87333] text-sm font-semibold uppercase tracking-[0.3em] mb-4 block glow-text-gold">
                        Community
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-montserrat font-bold text-[#2A2420] tracking-[0.02em]">
                        The Workspace Upgrade
                    </h2>
                    <p className="text-[#5C524A] mt-4 max-w-2xl mx-auto text-sm sm:text-base">
                        See what the community is saying about the ultimate 4-in-1 executive sleeve.
                    </p>
                </motion.div>
            </div>

            {/* Marquee Setup */}
            <div className="relative flex flex-col gap-6 sm:gap-8 overflow-hidden mask-edges pb-10">
                {/* Left/Right Fade Masks */}
                <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#E8E0D4] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#E8E0D4] to-transparent z-10 pointer-events-none" />

                <div className="relative">
                    <MarqueeRow items={row1} />
                </div>
                <div className="relative -ml-40">
                    <MarqueeRow items={row2} reverse={true} />
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-33.333%)); }
                }
                @keyframes marqueeReverse {
                    0% { transform: translateX(calc(-33.333%)); }
                    100% { transform: translateX(0); }
                }
                `
            }} />
        </section>
    );
}
