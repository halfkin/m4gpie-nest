"use client";

// ─── Musings Content ────────────────────────────────────────
// Music/Spotify playlist style
// Variant-style: minimalist list with chunky hover

import { K, Ft } from "@/lib/tokens";

export function MusingsContent() {
    const tracks = [
        { title: "15 Step", artist: "Radiohead", album: "In Rainbows" },
        { title: "On Melancholy Hill", artist: "Gorillaz", album: "Plastic Beach" },
        { title: "Digital Love", artist: "Daft Punk", album: "Discovery" },
        { title: "Archangel", artist: "Burial", album: "Untrue" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header / Cover Art */}
            <div
                style={{
                    padding: 24,
                    background: K.paperAlt,
                    borderBottom: `1px solid ${K.bdr}`,
                    display: "flex",
                    gap: 20,
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        width: 100,
                        height: 100,
                        background: K.orange,
                        border: `1px solid ${K.bdr}`,
                        boxShadow: K.chunkySmall,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 40,
                        color: "white",
                    }}
                >
                    <i className="ph-fill ph-cassette-tape" />
                </div>
                <div>
                    <div
                        style={{
                            fontFamily: Ft.m,
                            fontSize: 11,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            color: K.txtD,
                            marginBottom: 4,
                        }}
                    >
                        Playlist
                    </div>
                    <div
                        style={{
                            fontFamily: Ft.d,
                            fontSize: 24,
                            fontWeight: 700,
                            marginBottom: 8,
                        }}
                    >
                        Coding Flow
                    </div>
                    <div style={{ fontFamily: Ft.m, fontSize: 11, color: K.txt }}>
                        {tracks.length} songs · 14 min
                    </div>
                </div>
            </div>

            {/* Tracklist */}
            <div style={{ flex: 1, overflow: "auto", padding: 0 }}>
                {tracks.map((t, i) => (
                    <div
                        key={i}
                        className="group"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px 16px",
                            gap: 16,
                            borderBottom: `1px solid ${K.bdr}11`,
                            cursor: "default",
                        }}
                    >
                        <div
                            style={{
                                fontFamily: Ft.m,
                                fontSize: 11,
                                color: K.txtD,
                                width: 20,
                            }}
                        >
                            {i + 1}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div
                                style={{
                                    fontFamily: Ft.b,
                                    fontSize: 13,
                                    fontWeight: 600,
                                    color: K.txt,
                                }}
                            >
                                {t.title}
                            </div>
                            <div style={{ fontFamily: Ft.m, fontSize: 11, color: K.txtD }}>
                                {t.artist}
                            </div>
                        </div>
                        <div style={{ fontFamily: Ft.m, fontSize: 11, color: K.txtD }}>
                            {t.album}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
