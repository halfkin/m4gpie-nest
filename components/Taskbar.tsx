"use client";

// ─── Taskbar ────────────────────────────────────────────────
// Variant-style footer: 48px, cream gradient, chunky buttons, music widget
// + button, terminal/globe/music icons, window pills

import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";
import type { WindowData } from "@/lib/data";

interface TaskbarProps {
    windows: WindowData[];
    activeWindow: string | null;
    onFocus: (id: string) => void;
}

export function Taskbar({ windows, activeWindow, onFocus }: TaskbarProps) {
    return (
        <footer
            style={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                height: 48,
                background: K.gradFooter,
                borderTop: `1px solid ${K.bdr}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                zIndex: 9998,
            }}
        >
            {/* Dither Texture */}
            <div className="dither-texture" />

            {/* Left: Quick Actions */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, position: "relative", zIndex: 10 }}>
                {/* Start Button */}
                <button
                    style={{
                        height: 32,
                        width: 32,
                        borderRadius: 8,
                        background: "black",
                        color: "white",
                        fontFamily: Ft.b,
                        fontSize: 20,
                        fontWeight: 700,
                        border: "none",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: 2, // optical adjust
                        transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = K.orange)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "black")}
                    onClick={() => Snd.click()}
                >
                    +
                </button>

                {/* App Shortcuts */}
                <div style={{ display: "flex", gap: 8 }}>
                    {["terminal-window", "globe", "music-notes"].map((icon, i) => (
                        <div
                            key={icon}
                            style={{
                                width: 32,
                                height: 32,
                                borderRadius: 10,
                                background: i === 1 ? K.orange : "white",
                                color: i === 1 ? "white" : K.txt,
                                border: `1px solid ${K.bdr}`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: K.chunkySmall,
                                cursor: "pointer",
                                fontSize: 16,
                            }}
                            onClick={() => Snd.click()}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = "translate(1px, 1px)";
                                e.currentTarget.style.boxShadow = "none";
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = "none";
                                e.currentTarget.style.boxShadow = K.chunkySmall;
                            }}
                        >
                            <i className={`ph-bold ph-${icon}`} />
                        </div>
                    ))}
                </div>

                {/* Vertical Divider */}
                <div style={{ width: 1, height: 24, background: K.bdr, opacity: 0.2 }} />

                {/* Window Tabs */}
                <div style={{ display: "flex", gap: 6 }}>
                    {windows.map((w) => (
                        <div
                            key={w.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "4px 12px",
                                height: 28,
                                background: activeWindow === w.id ? "white" : "transparent",
                                borderRadius: 6,
                                cursor: "pointer",
                                fontFamily: Ft.m,
                                fontSize: 11,
                                color: activeWindow === w.id ? K.txt : K.txtD,
                                border: activeWindow === w.id ? `1px solid ${K.bdr}` : "1px solid transparent",
                                boxShadow: activeWindow === w.id ? K.chunkySmall : "none",
                                opacity: activeWindow === w.id ? 1 : 0.7,
                            }}
                            onClick={() => {
                                onFocus(w.id);
                                Snd.click();
                            }}
                        >
                            <span>{w.icon}</span>
                            <span
                                style={{
                                    maxWidth: 100,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {w.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: Music Widget (Optional visual only) */}
            <div
                className="hidden sm:flex"
                style={{
                    alignItems: "center",
                    gap: 12,
                    padding: "4px 8px 4px 4px",
                    background: "white",
                    border: `1px solid ${K.bdr}`,
                    borderRadius: 16,
                    boxShadow: K.chunkySmall,
                    position: "relative",
                    zIndex: 10,
                }}
            >
                <div
                    className="animate-spin-slow"
                    style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        background: K.orange,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: 12,
                    }}
                >
                    <i className="ph-fill ph-cassette-tape" />
                </div>
                <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
                    <span style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", lineHeight: 1 }}>
                        Now Playing
                    </span>
                    <span style={{ fontSize: 9, fontFamily: Ft.m, lineHeight: 1.2 }}>Radiohead - 15 Step</span>
                </div>
                <div style={{ display: "flex", gap: 4, marginLeft: 4 }}>
                    <i className="ph-fill ph-play" style={{ fontSize: 12, cursor: "pointer" }} />
                    <i className="ph-fill ph-skip-forward" style={{ fontSize: 12, cursor: "pointer" }} />
                </div>
            </div>
        </footer>
    );
}
