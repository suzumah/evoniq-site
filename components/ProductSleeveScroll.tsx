"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

interface ProductSleeveScrollProps {
    folderPath: string;
    frameCount: number;
    frameExtension: string;
}

export default function ProductSleeveScroll({
    folderPath,
    frameCount,
    frameExtension,
}: ProductSleeveScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const frameIndex = useTransform(
        scrollYProgress,
        [0, 1],
        [0, frameCount - 1]
    );

    // Draw a specific frame onto the canvas
    const drawFrame = useCallback((index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const images = imagesRef.current;
        const clampedIndex = Math.max(0, Math.min(Math.round(index), images.length - 1));
        const img = images[clampedIndex];

        if (!img || !img.complete || img.naturalWidth === 0) return;

        const dpr = window.devicePixelRatio || 1;
        const canvasW = canvas.width / dpr;
        const canvasH = canvas.height / dpr;

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.clearRect(0, 0, canvasW, canvasH);

        // Cover-fill: fill the canvas completely, cropping excess
        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = canvasW / canvasH;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (imgAspect > canvasAspect) {
            // Image is wider — fit height, crop sides
            drawH = canvasH;
            drawW = canvasH * imgAspect;
            drawX = (canvasW - drawW) / 2;
            drawY = 0;
        } else {
            // Image is taller — fit width, crop top/bottom
            drawW = canvasW;
            drawH = canvasW / imgAspect;
            drawX = 0;
            drawY = (canvasH - drawH) / 2;
        }

        ctx.drawImage(img, drawX, drawY, drawW, drawH);

        // ~57% brightness overlay — adjusted for 20% more brightness
        ctx.fillStyle = "rgba(0, 0, 0, 0.57)";
        ctx.fillRect(0, 0, canvasW, canvasH);

        // Golden vignette glow around edges — amplified
        const vignetteGradient = ctx.createRadialGradient(
            canvasW / 2, canvasH / 2, canvasH * 0.25,
            canvasW / 2, canvasH / 2, Math.max(canvasW, canvasH) * 0.72
        );
        vignetteGradient.addColorStop(0, "rgba(0,0,0,0)");
        vignetteGradient.addColorStop(0.65, "rgba(0,0,0,0)");
        vignetteGradient.addColorStop(1, "rgba(184,115,51,0.28)");
        ctx.fillStyle = vignetteGradient;
        ctx.fillRect(0, 0, canvasW, canvasH);

        currentFrameRef.current = clampedIndex;
    }, []);

    // Preload all frames
    useEffect(() => {
        const images: HTMLImageElement[] = [];
        let loadedCount = 0;

        const onLoad = () => {
            loadedCount++;
            setLoadProgress(Math.round((loadedCount / frameCount) * 100));
            if (loadedCount === frameCount) {
                imagesRef.current = images;
                setIsLoading(false);
                // Draw first frame
                drawFrame(0);
            }
        };

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.onload = onLoad;
            img.onerror = onLoad; // Count errors too so we don't hang
            img.src = `${folderPath}/${i}.${frameExtension}`;
            images.push(img);
        }

        return () => {
            // Cleanup
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [folderPath, frameCount, frameExtension, drawFrame]);

    // Resize canvas to match its own rendered size (absolute inset-0 within 16:9 container)
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const dpr = window.devicePixelRatio || 1;
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) return;

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;

            const ctx = canvas.getContext("2d");
            if (ctx) ctx.scale(dpr, dpr);

            drawFrame(currentFrameRef.current);
        };

        // Run once after layout settles
        const raf = requestAnimationFrame(handleResize);
        window.addEventListener("resize", handleResize);
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", handleResize);
        };
    }, [drawFrame]);

    // Listen to scroll progress and draw frames with rAF
    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            drawFrame(latest);
        });
    });

    return (
        <div ref={containerRef} className="relative h-[500vh] bg-black">
            {/* Sticky viewport — fully black, no gaps */}
            <div className="sticky top-0 h-screen w-full bg-black flex items-center justify-center overflow-hidden">

                {/* 16:9 canvas container — fills width on wide screens, pillar-box on very tall viewports */}
                <div
                    className="relative w-full"
                    style={{
                        aspectRatio: "16 / 9",
                        maxHeight: "100vh",
                        /* On very tall/narrow viewports cap height and let width shrink naturally */
                        maxWidth: "calc(100vh * 16 / 9)",
                    }}
                >
                    {/* Loading overlay */}
                    {isLoading && (
                        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm">
                            <div className="relative w-40 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-4">
                                <div
                                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-orange-400 rounded-full transition-all duration-300"
                                    style={{ width: `${loadProgress}%` }}
                                />
                            </div>
                            <p className="text-white/50 text-xs sm:text-sm font-light tracking-widest uppercase">
                                Loading — {loadProgress}%
                            </p>
                        </div>
                    )}

                    {/* Canvas fills the 16:9 box */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full"
                        style={{ display: "block" }}
                    />
                </div>
            </div>
        </div>
    );
}
