"use client";

// ─── Boot Screen ────────────────────────────────────────────
// ReactBits ASCIIText 3D logo → boot messages → fade to desktop
// Variant: #FF4400 text, but kept dark background for contrast

import { useState, useEffect, useCallback } from "react";
import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";
import { BOOT_MESSAGES } from "@/lib/data";
import ASCIIText from "@/components/vendor/ASCIIText";

interface BootScreenProps {
    onDone: () => void;
}

export function BootScreen({ onDone }: BootScreenProps) {
    const [phase, setPhase] = useState(0); // 0=ascii art, 1=messages, 2=fade
    const [msgIdx, setMsgIdx] = useState(0);
    const [opacity, setOpacity] = useState(1);

    const stableDone = useCallback(onDone, [onDone]);

    // Phase 0: Show ASCIIText for 3.5s, then move to messages
    useEffect(() => {
        Snd.boot();
        const timer = setTimeout(() => setPhase(1), 3500);
        return () => clearTimeout(timer);
    }, []);

    // Phase 1: Boot messages
    useEffect(() => {
        if (phase !== 1) return;
        if (msgIdx >= BOOT_MESSAGES.length) {
            setTimeout(() => setPhase(2), 500);
            return;
        }
        const t = setTimeout(() => setMsgIdx((prev) => prev + 1), 400);
        return () => clearTimeout(t);
    }, [phase, msgIdx]);

    // Phase 2: Fade out
    useEffect(() => {
        if (phase !== 2) return;
        setOpacity(0);
        const t = setTimeout(stableDone, 600);
        return () => clearTimeout(t);
    }, [phase, stableDone]);

    const progress =
        phase === 0
            ? 40
            : phase === 1
                ? 40 + (msgIdx / BOOT_MESSAGES.length) * 55
                : 100;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "#0A0A0C", // Keep dark for boot impact
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: Ft.m,
                color: K.orange,
                opacity,
                transition: "opacity 0.5s ease",
            }}
        >
            {/* Scanline effect */}
            <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
                <div
                    className="animate-scanline"
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        height: 4,
                        background: `linear-gradient(180deg, transparent, ${K.orange}22, transparent)`,
                    }}
                />
            </div>

            {/* Dither Texture */}
            <div className="dither-overlay" style={{ opacity: 0.1 }} />

            {/* ASCIIText 3D Logo — centered */}
            <div
                style={{
                    position: "relative",
                    width: "min(600px, 85vw)",
                    height: 260,
                    marginBottom: 32,
                    opacity: phase === 0 ? 1 : 0.15,
                    transition: "opacity 0.6s ease",
                }}
            >
                <ASCIIText
                    text="m4gpie.nest"
                    textFontSize={180}
                    textColor="#FF4400"
                    asciiFontSize={7}
                    planeBaseHeight={8}
                    enableWaves={true}
                />
            </div>

            {/* Boot Messages */}
            <div style={{ minHeight: 100, width: 400, maxWidth: "90vw" }}>
                {BOOT_MESSAGES.slice(0, msgIdx).map((msg, i) => (
                    <div
                        key={i}
                        className="animate-slideup"
                        style={{
                            fontSize: 11,
                            color: i === msgIdx - 1 ? K.orange : K.txtF,
                            marginBottom: 6,
                            textShadow: i === msgIdx - 1 ? `0 0 8px ${K.orange}44` : "none",
                        }}
                    >
                        {msg}
                    </div>
                ))}
                {phase === 1 && msgIdx < BOOT_MESSAGES.length && (
                    <span className="animate-blink-slow" style={{ fontSize: 11, color: K.orange }}>
                        █
                    </span>
                )}
            </div>

            {/* Progress bar */}
            <div
                style={{
                    width: 300,
                    maxWidth: "80vw",
                    height: 6,
                    background: "#111",
                    borderRadius: 4,
                    overflow: "hidden",
                    marginTop: 20,
                    border: "1px solid #333",
                }}
            >
                <div
                    style={{
                        width: `${progress}%`,
                        height: "100%",
                        background: K.orange,
                        borderRadius: 2,
                        transition: "width 0.3s ease",
                        boxShadow: `0 0 8px ${K.orange}44`,
                    }}
                />
            </div>
        </div>
    );
}
