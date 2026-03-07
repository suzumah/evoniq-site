"use client";

import { motion } from "framer-motion";

// Individual pill items shown in the marquee
const items = [
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor" stroke="none" />
            </svg>
        ),
        text: (
            <>
                FREE 4-in-1 USB Cable — use code{" "}
                <span className="ribbon-code">4IN1</span>
                {" "}· Limited Time
            </>
        ),
    },
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </svg>
        ),
        text: "FREE Shipping across India",
    },
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
            </svg>
        ),
        text: "14-Day Hassle-Free Returns",
    },
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <line x1="2" y1="10" x2="22" y2="10" />
            </svg>
        ),
        text: "Pay Online · Fast Processing",
    },
    {
        icon: (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
        ),
        text: "Premium Craftsmanship · 1-Year Warranty",
    },
];

// Separator diamond
const Diamond = () => (
    <span className="ribbon-diamond">◆</span>
);

// One full set of marquee items
function MarqueeSet() {
    return (
        <>
            {items.map((item, i) => (
                <span key={i} className="ribbon-item">
                    <span className="ribbon-icon">{item.icon}</span>
                    <span className="ribbon-text">{item.text}</span>
                    <Diamond />
                </span>
            ))}
        </>
    );
}

export default function AnnouncementRibbon() {
    return (
        <div className="ribbon-root" aria-label="Promotions and announcements">
            {/* Shimmer gradient overlay (left & right fades) */}
            <div className="ribbon-fade-left" aria-hidden="true" />
            <div className="ribbon-fade-right" aria-hidden="true" />

            {/* Decorative copper glow orb */}
            <div className="ribbon-glow" aria-hidden="true" />

            {/* Marquee track — duplicated 3× so it loops without gaps */}
            <div className="ribbon-track" aria-hidden="false">
                <div className="ribbon-inner">
                    <MarqueeSet />
                    <MarqueeSet />
                    <MarqueeSet />
                </div>
            </div>

            {/* Subtle top/bottom rule lines */}
            <div className="ribbon-rule-top" aria-hidden="true" />
            <div className="ribbon-rule-bottom" aria-hidden="true" />
            <style dangerouslySetInnerHTML={{
                __html: `
                /* ── Root ── */
                .ribbon-root {
                    position: relative;
                    width: 100%;
                    height: 38px;
                    background: linear-gradient(
                        90deg,
                        #0a0a0a 0%,
                        #111008 30%,
                        #130f06 50%,
                        #111008 70%,
                        #0a0a0a 100%
                    );
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    z-index: 40;
                }

                /* ── Copper glow orb ── */
                .ribbon-glow {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 320px;
                    height: 60px;
                    background: radial-gradient(
                        ellipse at center,
                        rgba(184,115,51,0.18) 0%,
                        transparent 70%
                    );
                    pointer-events: none;
                    animation: ribbonGlowPulse 4s ease-in-out infinite;
                }

                @keyframes ribbonGlowPulse {
                    0%, 100% { opacity: 0.7; transform: translate(-50%, -50%) scaleX(1); }
                    50%       { opacity: 1;   transform: translate(-50%, -50%) scaleX(1.15); }
                }

                /* ── Rule lines ── */
                .ribbon-rule-top,
                .ribbon-rule-bottom {
                    position: absolute;
                    left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(
                        90deg,
                        transparent 0%,
                        rgba(184,115,51,0.35) 20%,
                        rgba(205,127,50,0.6) 50%,
                        rgba(184,115,51,0.35) 80%,
                        transparent 100%
                    );
                }
                .ribbon-rule-top    { top: 0; }
                .ribbon-rule-bottom { bottom: 0; }

                /* ── Fade masks ── */
                .ribbon-fade-left,
                .ribbon-fade-right {
                    position: absolute;
                    top: 0; bottom: 0;
                    width: 100px;
                    pointer-events: none;
                    z-index: 2;
                }
                .ribbon-fade-left {
                    left: 0;
                    background: linear-gradient(to right, #0a0a0a 0%, transparent 100%);
                }
                .ribbon-fade-right {
                    right: 0;
                    background: linear-gradient(to left, #0a0a0a 0%, transparent 100%);
                }

                /* ── Marquee track ── */
                .ribbon-track {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    overflow: hidden;
                }

                .ribbon-inner {
                    display: flex;
                    align-items: center;
                    white-space: nowrap;
                    animation: ribbonScroll 38s linear infinite;
                    will-change: transform;
                }

                .ribbon-inner:hover {
                    animation-play-state: paused;
                }

                @keyframes ribbonScroll {
                    from { transform: translateX(0); }
                    to   { transform: translateX(-33.333%); }
                }

                /* ── Items ── */
                .ribbon-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 0 18px;
                }

                .ribbon-icon {
                    color: #CD7F32;
                    display: inline-flex;
                    align-items: center;
                    flex-shrink: 0;
                    filter: drop-shadow(0 0 4px rgba(205,127,50,0.5));
                }

                .ribbon-text {
                    font-family: var(--font-inter), 'Inter', sans-serif;
                    font-size: 11px;
                    font-weight: 500;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.8);
                }

                /* Promo code pill */
                .ribbon-code {
                    display: inline-block;
                    padding: 1px 7px;
                    border-radius: 4px;
                    background: linear-gradient(135deg, #CD7F32, #B87333);
                    color: #fff;
                    font-weight: 700;
                    letter-spacing: 0.12em;
                    font-size: 10px;
                    box-shadow: 0 0 8px rgba(184,115,51,0.55);
                    vertical-align: middle;
                    position: relative;
                    top: -0.5px;
                    animation: codePulse 2.5s ease-in-out infinite;
                }

                @keyframes codePulse {
                    0%, 100% { box-shadow: 0 0 6px rgba(184,115,51,0.5); }
                    50%       { box-shadow: 0 0 14px rgba(205,127,50,0.9), 0 0 24px rgba(184,115,51,0.35); }
                }

                /* Separator diamond */
                .ribbon-diamond {
                    color: rgba(184,115,51,0.45);
                    font-size: 6px;
                    vertical-align: middle;
                    padding-left: 4px;
                }

                /* ── Mobile: slightly smaller ── */
                @media (max-width: 640px) {
                    .ribbon-root { height: 34px; }
                    .ribbon-text { font-size: 10px; }
                    .ribbon-inner { animation-duration: 28s; }
                    .ribbon-fade-left,
                    .ribbon-fade-right { width: 50px; }
                }
            `}} />
        </div>
    );
}
