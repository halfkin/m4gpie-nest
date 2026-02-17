"use client";

// ─── Thoughts Content ───────────────────────────────────────
// Expandable essay cards with chunky retro styling

import { useState } from "react";
import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";

export function ThoughtsContent() {
    const [expanded, setExpanded] = useState(false);

    const placeholders = [
        "On Prompt Engineering as a Discipline",
        "Notes on Multi-Agent Architecture",
        "The Support→Engineering Pipeline",
    ];

    return (
        <div style={{ padding: 20 }}>
            <div
                style={{
                    fontFamily: Ft.d,
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 16,
                    textTransform: "uppercase",
                }}
            >
                Latest Essays
            </div>

            {/* Main essay */}
            <div
                style={{
                    border: `1px solid ${K.bdr}`,
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: expanded ? K.chunky : K.chunkySmall,
                    marginBottom: 16,
                    cursor: "default",
                    transition: "all 0.2s",
                    background: "white",
                    transform: expanded ? "translate(-1px, -1px)" : "none",
                }}
            >
                <div
                    style={{
                        padding: "16px",
                        background: expanded ? K.paper : "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        borderBottom: expanded ? `1px solid ${K.bdr}` : "none",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        setExpanded(!expanded);
                        Snd.click();
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div
                            style={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: K.electric,
                                border: `1px solid ${K.bdr}`,
                            }}
                        />
                        <div>
                            <div
                                style={{
                                    fontFamily: Ft.b,
                                    fontSize: 15,
                                    fontWeight: 700,
                                    color: K.txt,
                                    marginBottom: 2,
                                }}
                            >
                                Why I Build With AI
                            </div>
                            <div
                                style={{
                                    fontFamily: Ft.m,
                                    fontSize: 10,
                                    color: K.txtD,
                                    fontWeight: 600,
                                    textTransform: "uppercase",
                                }}
                            >
                                Essay · 2025 · 4 min
                            </div>
                        </div>
                    </div>
                    <span
                        style={{
                            fontFamily: Ft.m,
                            fontSize: 12,
                            fontWeight: 700,
                            transform: expanded ? "rotate(90deg)" : "none",
                            transition: "0.2s",
                            display: "inline-block",
                        }}
                    >
                        ▶
                    </span>
                </div>
                {expanded && (
                    <div
                        className="animate-slideup"
                        style={{
                            padding: 24,
                            fontFamily: Ft.b,
                            fontSize: 15,
                            lineHeight: 1.7,
                            color: K.txt,
                            background: "white",
                        }}
                    >
                        <p style={{ marginBottom: 16 }}>
                            I don&apos;t have a CS degree. I didn&apos;t grow up coding. I got into AI
                            the way most interesting people get into anything — by being curious
                            enough to try and stubborn enough to keep going when it broke.
                        </p>
                        <p style={{ marginBottom: 16 }}>
                            The gap between &ldquo;knows about AI&rdquo; and &ldquo;can build with AI&rdquo; is
                            narrower than the industry wants you to believe. The hard part
                            isn&apos;t knowledge — it&apos;s judgment. Knowing when a system is
                            working vs. confidently wrong.
                        </p>
                        <p>
                            That&apos;s what customer support teaches you. Thousands of interactions
                            with confused, frustrated, stuck people. You develop intuition for
                            systems — where they break, why, and what &ldquo;working&rdquo; looks like
                            from the user&apos;s side.
                        </p>
                    </div>
                )}
            </div>

            {/* Placeholder essays */}
            {placeholders.map((t, i) => (
                <div
                    key={i}
                    style={{
                        border: `1px dashed ${K.bdr}`,
                        borderRadius: 12,
                        padding: "14px 16px",
                        marginBottom: 10,
                        opacity: 0.5,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: K.paperAlt,
                    }}
                >
                    <div>
                        <div
                            style={{
                                fontFamily: Ft.b,
                                fontSize: 13,
                                fontWeight: 500,
                                color: K.txt,
                            }}
                        >
                            {t}
                        </div>
                    </div>
                    <span
                        style={{
                            fontFamily: Ft.m,
                            fontSize: 10,
                            color: K.txtD,
                            fontWeight: 700,
                            textTransform: "uppercase",
                        }}
                    >
                        SOON
                    </span>
                </div>
            ))}
        </div>
    );
}
