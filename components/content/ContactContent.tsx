"use client";

// ─── Contact Content ────────────────────────────────────────
// Variant-style: list of chunky cards
// Hover: translate up + deep shadow

import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";

export function ContactContent() {
    const links = [
        { l: "Email", v: "hello@m4gpie.com", i: "✉", c: K.orange, href: "mailto:hello@m4gpie.com" },
        { l: "GitHub", v: "github.com/m4gpie", i: "◆", c: K.txt, href: "https://github.com/m4gpie" },
        { l: "Instagram", v: "@m4gpie", i: "◎", c: K.violet, href: "https://instagram.com/m4gpie" },
        { l: "X / Twitter", v: "@m4gpie", i: "✕", c: K.electric, href: "https://x.com/m4gpie" },
    ];

    return (
        <div style={{ padding: 24 }}>
            <div
                style={{
                    fontFamily: Ft.d,
                    fontSize: 20,
                    fontWeight: 700,
                    color: K.txt,
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "-0.5px",
                }}
            >
                Get in touch
            </div>
            <div
                style={{
                    fontFamily: Ft.b,
                    fontSize: 14,
                    color: K.txtD,
                    marginBottom: 24,
                }}
            >
                Always open to interesting conversations.
            </div>

            {links.map((link, i) => (
                <a
                    key={link.l}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                >
                    <div
                        className="animate-slideup"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            padding: "16px 20px",
                            marginBottom: 12,
                            background: "white",
                            border: `1px solid ${K.bdr}`,
                            borderRadius: 12,
                            cursor: "pointer",
                            boxShadow: K.chunkySmall,
                            transition: "all 0.15s cubic-bezier(0.2, 0.8, 0.2, 1)",
                            animationDelay: `${i * 0.05}s`,
                            animationFillMode: "both",
                            position: "relative",
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
                        onClick={() => Snd.click()}
                    >
                        {/* Icon */}
                        <div
                            style={{
                                width: 42,
                                height: 42,
                                borderRadius: 10,
                                background: link.c,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 20,
                                color: "white",
                                flexShrink: 0,
                                border: `1px solid ${K.bdr}`,
                                boxShadow: "2px 2px 0 rgba(0,0,0,0.1)",
                            }}
                        >
                            {link.i}
                        </div>

                        {/* Text */}
                        <div>
                            <div
                                style={{
                                    fontFamily: Ft.m,
                                    fontSize: 10,
                                    color: K.txtD,
                                    textTransform: "uppercase",
                                    letterSpacing: "1px",
                                    fontWeight: 700,
                                    marginBottom: 2,
                                }}
                            >
                                {link.l}
                            </div>
                            <div
                                style={{
                                    fontFamily: Ft.b,
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: K.txt,
                                }}
                            >
                                {link.v}
                            </div>
                        </div>

                        {/* Arrow */}
                        <div style={{ flex: 1 }} />
                        <span style={{ fontSize: 18, color: K.txtD }}>→</span>
                    </div>
                </a>
            ))}
        </div>
    );
}
