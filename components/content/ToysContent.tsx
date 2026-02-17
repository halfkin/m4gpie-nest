"use client";

// ─── Toys Content ───────────────────────────────────────────
// Grid of interactive toys
// Variant-style: chunky cards

import { K, Ft } from "@/lib/tokens";

export function ToysContent() {
    const toys = [
        { name: "ClickSpark", icon: "✨", desc: "Particle effects" },
        { name: "Gravity", icon: "🍎", desc: "Physics simulation" },
        { name: "Synth", icon: "🎹", desc: "WebAudio synth" },
    ];

    return (
        <div style={{ padding: 20 }}>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
                    gap: 16,
                }}
            >
                {toys.map((toy, i) => (
                    <div
                        key={i}
                        style={{
                            background: "white",
                            border: `1px solid ${K.bdr}`,
                            borderRadius: 12,
                            padding: 16,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            gap: 12,
                            boxShadow: K.chunkySmall,
                            cursor: "pointer",
                            transition: "all 0.15s",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "translate(-2px, -2px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = K.chunky;
                            (e.currentTarget as HTMLElement).style.borderColor = "black";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.transform = "none";
                            (e.currentTarget as HTMLElement).style.boxShadow = K.chunkySmall;
                            (e.currentTarget as HTMLElement).style.borderColor = K.bdr;
                        }}
                    >
                        <div
                            style={{
                                fontSize: 32,
                                width: 60,
                                height: 60,
                                borderRadius: "50%",
                                background: K.paperAlt,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: `1px solid ${K.bdr}22`,
                            }}
                        >
                            {toy.icon}
                        </div>
                        <div>
                            <div
                                style={{
                                    fontFamily: Ft.d,
                                    fontSize: 14,
                                    fontWeight: 700,
                                    marginBottom: 4,
                                }}
                            >
                                {toy.name}
                            </div>
                            <div
                                style={{
                                    fontFamily: Ft.m,
                                    fontSize: 10,
                                    color: K.txtD,
                                }}
                            >
                                {toy.desc}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
