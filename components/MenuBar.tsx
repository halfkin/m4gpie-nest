"use client";

// ─── Menu Bar ───────────────────────────────────────────────
// Variant-style: 40px, cream gradient, dither texture, chunky black border
// "SYSTEM_OS" branding, REC blinker, NET status

import { useState } from "react";
import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";
import { useClock } from "@/lib/hooks";

interface MenuItem {
    l: string;
    a?: () => void;
    k?: string;
    s?: number; // separator
}

interface MenuBarProps {
    openWindow: (id: string) => void;
}

export function MenuBar({ openWindow }: MenuBarProps) {
    const time = useClock();
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const menus: Record<string, MenuItem[]> = {
        "m4gpie": [
            { l: "About m4gpieOS", a: () => openWindow("about") },
            { s: 1, l: "" },
            { l: "System Preferences…" },
            { s: 1, l: "" },
            { l: "Sleep" },
        ],
        File: [
            { l: "Open Projects", a: () => openWindow("projects"), k: "⌘P" },
            { l: "Open Thoughts", a: () => openWindow("thoughts") },
            { s: 1, l: "" },
            { l: "Close Window", k: "⌘W" },
        ],
        View: [
            { l: "as Icons" },
            { l: "as List" },
            { s: 1, l: "" },
            { l: "Clean Up Desktop" },
        ],
        Go: [
            { l: "Projects", a: () => openWindow("projects") },
            { l: "About", a: () => openWindow("about") },
            { l: "Contact", a: () => openWindow("contact") },
        ],
        Help: [
            { l: "m4gpieOS Help" },
            { s: 1, l: "" },
            { l: "Report a Bug →", a: () => openWindow("contact") },
        ],
    };

    const timeStr = time.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return (
        <header
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: 40,
                background: K.gradHeader,
                borderBottom: `1px solid ${K.bdr}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 16px",
                fontFamily: Ft.b,
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "1px",
                color: K.txt,
                zIndex: 9999,
                userSelect: "none",
            }}
            onClick={() => setOpenMenu(null)}
        >
            {/* Dither Texture Overlay */}
            <div className="dither-texture" />

            {/* Left: Logo & Menus */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 10 }}>
                {/* Branding */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        cursor: "pointer",
                        color: K.txt,
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenu(openMenu === "m4gpie" ? null : "m4gpie");
                        Snd.click();
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = K.orange)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = K.txt)}
                >
                    <i className="ph-bold ph-asterisk" style={{ fontSize: 16 }} />
                    <span style={{ fontFamily: Ft.d, fontSize: 13 }}>M4GPIE_OS</span>
                </div>

                {/* Menus */}
                <nav style={{ display: "flex", gap: 24 }} className="hidden sm:flex">
                    {Object.keys(menus)
                        .filter((k) => k !== "m4gpie")
                        .map((key) => (
                            <div key={key} style={{ position: "relative" }}>
                                <div
                                    style={{
                                        cursor: "pointer",
                                        padding: "2px 6px",
                                        background: openMenu === key ? "black" : "transparent",
                                        color: openMenu === key ? "white" : K.txt,
                                        transition: "all 0.1s",
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setOpenMenu(openMenu === key ? null : key);
                                        Snd.click();
                                    }}
                                    onMouseEnter={(e) => {
                                        if (openMenu && openMenu !== key) setOpenMenu(key);
                                        else if (!openMenu) {
                                            e.currentTarget.style.background = "black";
                                            e.currentTarget.style.color = "white";
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (openMenu !== key) {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = K.txt;
                                        }
                                    }}
                                >
                                    {key}
                                </div>
                                {openMenu === key && (
                                    <div
                                        className="animate-menudown"
                                        style={{
                                            position: "absolute",
                                            top: 30,
                                            left: -4,
                                            minWidth: 200,
                                            background: K.paper,
                                            border: `1px solid ${K.bdr}`,
                                            boxShadow: K.chunky,
                                            padding: "6px 0",
                                            zIndex: 10000,
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {menus[key].map((item, i) =>
                                            item.s ? (
                                                <div
                                                    key={i}
                                                    style={{
                                                        height: 1,
                                                        background: K.bdr,
                                                        margin: "4px 0",
                                                        opacity: 0.2,
                                                    }}
                                                />
                                            ) : (
                                                <div
                                                    key={i}
                                                    style={{
                                                        padding: "8px 16px",
                                                        cursor: "pointer",
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        color: K.txt,
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.background = K.orange;
                                                        e.currentTarget.style.color = "white";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.background = "transparent";
                                                        e.currentTarget.style.color = K.txt;
                                                    }}
                                                    onClick={() => {
                                                        item.a?.();
                                                        setOpenMenu(null);
                                                        Snd.click();
                                                    }}
                                                >
                                                    <span>{item.l}</span>
                                                    {item.k && <span style={{ opacity: 0.5 }}>{item.k}</span>}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                </nav>
            </div>

            {/* Right: Status Indicators */}
            <div style={{ display: "flex", alignItems: "center", gap: 24, position: "relative", zIndex: 10 }}>
                {/* REC */}
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: K.orange }}>
                    <div
                        className="animate-blink"
                        style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: K.orange,
                        }}
                    />
                    <span>REC</span>
                </div>

                {/* NET */}
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <i className="ph-bold ph-wifi-high" style={{ fontSize: 14 }} />
                    <span>NET: ON</span>
                </div>

                {/* Clock */}
                <div
                    style={{
                        background: "black",
                        color: K.paper,
                        padding: "4px 10px",
                        fontFamily: Ft.d,
                        borderRadius: 6,
                        minWidth: 90,
                        textAlign: "center",
                    }}
                >
                    {timeStr}
                </div>
            </div>

            {/* Hidden Dropdown for branding */}
            {openMenu === "m4gpie" && (
                <div
                    className="animate-menudown"
                    style={{
                        position: "fixed",
                        top: 36,
                        left: 8,
                        minWidth: 200,
                        background: K.paper,
                        border: `1px solid ${K.bdr}`,
                        boxShadow: K.chunky,
                        padding: "6px 0",
                        zIndex: 10000,
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {menus["m4gpie"].map((item, i) =>
                        item.s ? (
                            <div key={i} style={{ height: 1, background: K.bdr, margin: "4px 0", opacity: 0.2 }} />
                        ) : (
                            <div
                                key={i}
                                style={{
                                    padding: "8px 16px",
                                    cursor: "pointer",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    color: K.txt,
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.background = K.orange;
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.background = "transparent";
                                    e.currentTarget.style.color = K.txt;
                                }}
                                onClick={() => {
                                    item.a?.();
                                    setOpenMenu(null);
                                    Snd.click();
                                }}
                            >
                                <span>{item.l}</span>
                            </div>
                        )
                    )}
                </div>
            )}
        </header>
    );
}
