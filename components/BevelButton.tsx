"use client";

// ─── Beveled Button ─────────────────────────────────────────
// Variant-style: solid, black border, chunky shadow
// Replaces "soft chrome" look with "hard edge" retro look

import { useState } from "react";
import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";

interface BevelButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    active?: boolean;
    small?: boolean;
}

export function BevelButton({ children, onClick, active, small }: BevelButtonProps) {
    const [pressed, setPressed] = useState(false);

    return (
        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: small ? "3px 10px" : "6px 14px",
                background: active ? "black" : "white",
                color: active ? "white" : "black",
                border: "1px solid black",
                borderRadius: 4,
                cursor: "pointer",
                fontFamily: Ft.m,
                fontSize: small ? 10 : 11,
                fontWeight: 700,
                userSelect: "none",
                boxShadow: pressed || active
                    ? "none"
                    : "2px 2px 0px 0px rgba(0,0,0,0.15)",
                transform: pressed || active ? "translate(1px, 1px)" : "none",
                transition: "all 0.05s",
            }}
            onMouseDown={() => setPressed(true)}
            onMouseUp={() => setPressed(false)}
            onMouseLeave={() => setPressed(false)}
            onClick={() => {
                onClick?.();
                Snd.tap();
            }}
        >
            {children}
        </div>
    );
}
