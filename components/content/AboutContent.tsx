"use client";

import { K, Ft } from "@/lib/tokens";

// Profile Widget style content for About window
export function AboutContent() {
    return (
        <div className="p-4" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Profile Image Area */}
            <div
                style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    background: K.chrome,
                    border: `1px solid ${K.bdr}`,
                    borderRadius: 16,
                    overflow: "hidden",
                    position: "relative",
                    marginBottom: 16,
                }}
            >
                {/* User Photo - Placeholder path, user should replace or upload to public/profile.jpg */}
                <img
                    src="/profile.JPG"
                    alt="Profile"
                    onError={(e) => {
                        // If image fails, show a placeholder colored box
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement!.style.background = "#ccc";
                    }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "grayscale(100%)",
                        mixBlendMode: "multiply",
                        opacity: 0.8
                    }}
                />

                {/* Dither Overlay on Image */}
                <div
                    className="dither-texture"
                    style={{
                        opacity: 0.25,
                        mixBlendMode: "multiply"
                    }}
                />
            </div>

            {/* Text Card */}
            <div
                style={{
                    background: "white",
                    border: `1px solid ${K.bdr}`,
                    borderRadius: 12,
                    padding: 12,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <h3
                    style={{
                        fontFamily: Ft.d,
                        fontWeight: 700,
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        marginBottom: 8,
                        color: K.orange
                    }}
                >
                    ABOUT_ME.txt
                </h3>

                <div
                    style={{
                        fontSize: 12,
                        fontFamily: Ft.m,
                        color: K.txt,
                        lineHeight: 1.5,
                        display: "flex",
                        flexDirection: "column",
                        gap: 4
                    }}
                >
                    <p>&gt; Designer &amp; Developer</p>
                    <p>&gt; Based in San Francisco</p>
                    <p>&gt; Retro computing enthusiast</p>
                    <p>&gt; Coffee connoisseur</p>
                </div>

                <div
                    style={{
                        marginTop: "auto",
                        paddingTop: 8,
                        borderTop: `1px solid ${K.bdr}`,
                        fontSize: 10,
                        color: K.txtD,
                        fontFamily: Ft.m,
                        textTransform: "uppercase"
                    }}
                >
                    STATUS: ONLINE
                </div>
            </div>
        </div>
    );
}
