"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Section {
    title: string;
    subtitle: string;
}

interface ProductTextOverlaysProps {
    section1: Section;
    section2: Section;
    section3: Section;
    section4: Section;
}

function TextOverlay({
    title,
    subtitle,
    scrollProgress,
    rangeIn,
    rangeOut,
}: {
    title: string;
    subtitle: string;
    scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
    rangeIn: [number, number];
    rangeOut: [number, number];
}) {
    const opacity = useTransform(
        scrollProgress,
        [rangeIn[0], rangeIn[1], rangeOut[0], rangeOut[1]],
        [0, 1, 1, 0]
    );
    const y = useTransform(
        scrollProgress,
        [rangeIn[0], rangeIn[1], rangeOut[0], rangeOut[1]],
        [60, 0, 0, -40]
    );
    const scale = useTransform(
        scrollProgress,
        [rangeIn[0], rangeIn[1], rangeOut[0], rangeOut[1]],
        [0.95, 1, 1, 0.98]
    );

    return (
        <motion.div
            style={{ opacity, y, scale }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 pointer-events-none z-10"
        >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-montserrat font-bold tracking-[0.04em] text-white drop-shadow-2xl mb-3 sm:mb-4 leading-[1.05]">
                {title}
            </h2>
            <p className="text-base sm:text-lg md:text-2xl font-light text-white/80 max-w-2xl leading-relaxed drop-shadow-lg tracking-wide">
                {subtitle}
            </p>
        </motion.div>
    );
}

export default function ProductTextOverlays({
    section1,
    section2,
    section3,
    section4,
}: ProductTextOverlaysProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const sections = [
        { ...section1, rangeIn: [0.02, 0.08] as [number, number], rangeOut: [0.16, 0.22] as [number, number] },
        { ...section2, rangeIn: [0.25, 0.31] as [number, number], rangeOut: [0.38, 0.44] as [number, number] },
        { ...section3, rangeIn: [0.48, 0.54] as [number, number], rangeOut: [0.60, 0.66] as [number, number] },
        { ...section4, rangeIn: [0.72, 0.78] as [number, number], rangeOut: [0.86, 0.92] as [number, number] },
    ];

    return (
        <div ref={containerRef} className="absolute inset-0 h-[500vh]">
            <div className="sticky top-0 h-screen w-full">
                {sections.map((section, i) => (
                    <TextOverlay
                        key={i}
                        title={section.title}
                        subtitle={section.subtitle}
                        scrollProgress={scrollYProgress}
                        rangeIn={section.rangeIn}
                        rangeOut={section.rangeOut}
                    />
                ))}
            </div>
        </div>
    );
}
