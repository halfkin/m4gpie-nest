"use client";

import { K, Ft } from "@/lib/tokens";

export function Clippy() {
    return (
        <div className="absolute bottom-16 left-4 z-50 flex flex-col items-start gap-2">
            <div
                className="relative bg-white border border-black px-3 py-2 rounded-2xl"
                style={{
                    boxShadow: K.chunkySmall,
                    marginBottom: 8,
                    minWidth: 260,
                    width: "max-content",
                }}
            >
                <p
                    className="text-xs font-mono"
                    style={{ fontFamily: Ft.m }}
                >
                    How about checking out some PROJECTS first?
                </p>

                {/* Speech Bubble Tail */}
                <div
                    className="absolute -bottom-2 left-4"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "8px solid black",
                    }}
                />
                <div
                    className="absolute left-4"
                    style={{
                        width: 0,
                        height: 0,
                        borderLeft: "6px solid transparent",
                        borderRight: "6px solid transparent",
                        borderTop: "8px solid white",
                        bottom: "-7px",
                    }}
                />
            </div>

            {/* Clippy SVG */}
            <div
                className="w-16 h-20 relative ml-2"
                style={{
                    filter: "drop-shadow(0 0 8px rgba(255, 68, 0, 0.5))"
                }}
            >
                <svg viewBox="0 0 64 80" className="w-full h-full" style={{ filter: "contrast(1.2)" }}>
                    <path d="M32 10 L32 55 Q32 65 40 65 Q48 65 48 55 L48 20" fill="none" stroke="#666" strokeWidth="5" />
                    <path d="M48 20 L48 55 Q48 70 32 70 Q16 70 16 55 L16 15 Q16 8 22 8 Q28 8 28 15 L28 50" fill="none" stroke="#999" strokeWidth="4" />
                    <circle cx="26" cy="30" r="4" fill="white" stroke="#111" strokeWidth="1" />
                    <circle cx="26" cy="30" r="2" fill="#FF4400" />
                    <circle cx="38" cy="30" r="4" fill="white" stroke="#111" strokeWidth="1" />
                    <circle cx="38" cy="30" r="2" fill="#FF4400" />
                    <path d="M26 38 Q32 42 38 38" fill="none" stroke="#111" strokeWidth="3" strokeLinecap="round" />
                    <path d="M22 26 L30 24" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                    <path d="M42 26 L34 24" stroke="#111" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div className="dither-texture" style={{ opacity: 0.15, mixBlendMode: "multiply" }} />
            </div>
        </div>
    );
}
