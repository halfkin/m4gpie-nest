"use client";

import { useEffect, useRef } from "react";

interface BitWaveProps {
    color?: string; // Hex color for the ripples
    opacity?: number;
}

export default function BitWave({ color = "#FF4400", opacity = 0.5 }: BitWaveProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let ripples: { x: number; y: number; radius: number; age: number }[] = [];

        // Low resolution for pixel look
        const PIXEL_SCALE = 8;

        const resize = () => {
            canvas.width = window.innerWidth / PIXEL_SCALE;
            canvas.height = window.innerHeight / PIXEL_SCALE;
            ctx.imageSmoothingEnabled = false;
        };
        window.addEventListener("resize", resize);
        resize();

        const addRipple = (x: number, y: number) => {
            ripples.push({
                x: x / PIXEL_SCALE,
                y: y / PIXEL_SCALE,
                radius: 1,
                age: 0
            });
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (Math.random() > 0.7) { // Limit spawn rate
                addRipple(e.clientX, e.clientY);
            }
        };
        const handleClick = (e: MouseEvent) => {
            for (let i = 0; i < 5; i++) {
                addRipple(e.clientX + (Math.random() - 0.5) * 20, e.clientY + (Math.random() - 0.5) * 20);
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);

        const animate = () => {
            // Clear trails slightly for liquid feel
            ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Update and draw ripples
            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.age++;
                r.radius += 0.5;

                if (r.age > 60) {
                    ripples.splice(i, 1);
                    continue;
                }

                const alpha = 1 - r.age / 60;

                // Draw pixelated circle/diamond
                ctx.fillStyle = `rgba(255, 68, 0, ${alpha})`;

                // Draw a rough circle pixel by pixel-ish or small rects
                const size = r.radius;
                // Simple pixel rect for performance and style
                ctx.fillRect(r.x - size / 2, r.y - size / 2, size, size);

                // Add some "dither" noise pixels around
                if (Math.random() > 0.5) {
                    ctx.fillRect(r.x - size, r.y + (Math.random() - 0.5) * size, 1, 1);
                    ctx.fillRect(r.x + size, r.y + (Math.random() - 0.5) * size, 1, 1);
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
                imageRendering: "pixelated", // Key for hard edges
                opacity: opacity,
                mixBlendMode: "screen",
            }}
        />
    );
}
