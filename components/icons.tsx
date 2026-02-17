"use client";

// ─── Custom SVG Desktop Icons ──────────────────────────────
// Hand-drawn SVGs with gradients, shadows, highlights
// NOT emoji-in-rounded-rect — real depth and physicality

import React from "react";
import { K, Ft } from "@/lib/tokens";

// ─── SVG Filter Defs (rendered once in layout) ─────────────
export function SvgDefs() {
    return (
        <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
                <filter id="ds2">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.22" />
                </filter>
                <filter id="ds3">
                    <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.25" />
                </filter>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
        </svg>
    );
}

interface IconProps {
    color?: string;
    size?: number;
}

export function FolderIcon({ color = K.orange, size = 50 }: IconProps) {
    const gid = "fi" + color.replace("#", "");
    return (
        <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
            <defs>
                <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={color} />
                    <stop offset="100%" stopColor={color} stopOpacity="0.75" />
                </linearGradient>
            </defs>
            <rect x="4" y="11" width="18" height="7" rx="2" fill={color} opacity="0.55" />
            <rect x="3" y="15" width="46" height="30" rx="3.5" fill={`url(#${gid})`} filter="url(#ds2)" />
            <rect x="4" y="16" width="44" height="2.5" rx="1" fill="white" opacity="0.35" />
            <rect x="5" y="42" width="42" height="1.5" rx="0.75" fill="black" opacity="0.15" />
            <line x1="6" y1="22" x2="46" y2="22" stroke="white" strokeOpacity="0.1" strokeWidth="0.5" />
        </svg>
    );
}

export function GameIcon({ size = 50 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
            <rect x="6" y="6" width="40" height="40" rx="8" fill="#1A1A1E" filter="url(#ds3)" stroke={K.neon} strokeWidth="1.5" />
            <rect x="7" y="7" width="38" height="3" rx="1.5" fill={K.neon} opacity="0.2" />
            <circle cx="18" cy="20" r="3" fill={K.neon} opacity="0.9" />
            <circle cx="34" cy="20" r="3" fill={K.pink} opacity="0.9" />
            <circle cx="26" cy="28" r="3" fill={K.yellow} opacity="0.9" />
            <circle cx="18" cy="36" r="3" fill={K.electric} opacity="0.9" />
            <circle cx="34" cy="36" r="3" fill={K.orange} opacity="0.9" />
            <text x="26" y="14" textAnchor="middle" fill={K.neon} fontSize="6" fontFamily={Ft.m} opacity="0.6">PLAY</text>
        </svg>
    );
}

export function PenIcon({ size = 50 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
            <defs>
                <linearGradient id="penG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={K.electric} />
                    <stop offset="100%" stopColor={K.electricD} />
                </linearGradient>
            </defs>
            <rect x="16" y="4" width="8" height="36" rx="2" fill="url(#penG)" filter="url(#ds2)" transform="rotate(12 20 22)" />
            <rect x="17" y="5" width="2.5" height="34" rx="1" fill="white" opacity="0.25" transform="rotate(12 20 22)" />
            <polygon points="21,40 24,50 18,50" fill={K.txt} transform="rotate(12 21 45)" opacity="0.6" />
            <rect x="30" y="28" width="17" height="20" rx="2" fill={K.paper} stroke={K.bdr} strokeWidth="0.8" />
            <line x1="33" y1="33" x2="44" y2="33" stroke={K.bdr} strokeWidth="0.7" />
            <line x1="33" y1="37" x2="41" y2="37" stroke={K.bdr} strokeWidth="0.7" />
            <line x1="33" y1="41" x2="43" y2="41" stroke={K.bdr} strokeWidth="0.7" />
        </svg>
    );
}

export function MusicIcon({ size = 50 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
            <defs>
                <linearGradient id="cdG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={K.violet} />
                    <stop offset="100%" stopColor={K.pink} />
                </linearGradient>
            </defs>
            <circle cx="26" cy="26" r="20" fill="url(#cdG)" filter="url(#ds3)" />
            <circle cx="26" cy="26" r="18" fill="none" stroke="white" strokeOpacity="0.12" strokeWidth="0.5" />
            <circle cx="26" cy="26" r="13" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="0.5" />
            <circle cx="26" cy="26" r="8" fill="none" stroke="white" strokeOpacity="0.08" strokeWidth="0.5" />
            <circle cx="26" cy="26" r="4.5" fill={K.paper} />
            <circle cx="26" cy="26" r="1.5" fill={K.txt} />
            <path d="M14 16Q22 22 18 32" stroke="white" strokeOpacity="0.25" strokeWidth="1.5" fill="none" />
        </svg>
    );
}

export function UserIcon({ size = 50 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
            <defs>
                <linearGradient id="badG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={K.orange} />
                    <stop offset="100%" stopColor={K.orangeD} />
                </linearGradient>
            </defs>
            <rect x="8" y="4" width="36" height="44" rx="6" fill="url(#badG)" filter="url(#ds2)" />
            <rect x="9" y="5" width="34" height="3" rx="1.5" fill="white" opacity="0.25" />
            <circle cx="26" cy="20" r="8" fill="white" opacity="0.9" />
            <circle cx="26" cy="18.5" r="3.5" fill={K.orange} opacity="0.35" />
            <ellipse cx="26" cy="25" rx="6" ry="3.5" fill={K.orange} opacity="0.25" />
            <rect x="16" y="34" width="20" height="2" rx="1" fill="white" opacity="0.4" />
            <rect x="19" y="38.5" width="14" height="1.5" rx="0.75" fill="white" opacity="0.25" />
        </svg>
    );
}

export function MailIcon({ size = 50 }: IconProps) {
    return (
        <svg width={size} height={size} viewBox="0 0 52 52" fill="none">
            <defs>
                <linearGradient id="mlG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={K.neon} />
                    <stop offset="100%" stopColor={K.neonD} />
                </linearGradient>
            </defs>
            <rect x="4" y="13" width="44" height="28" rx="4" fill="url(#mlG)" filter="url(#ds3)" />
            <rect x="5" y="14" width="42" height="2" rx="1" fill="white" opacity="0.3" />
            <path d="M5 14L26 30L47 14" stroke="white" strokeOpacity="0.3" strokeWidth="1.5" fill="none" />
            <path d="M5 40L20 28M47 40L32 28" stroke="black" strokeOpacity="0.1" strokeWidth="0.8" />
        </svg>
    );
}

// ─── Icon Map ─────────────────────────────────────────────
export const ICON_MAP: Record<string, React.FC<IconProps>> = {
    projects: FolderIcon,
    toys: GameIcon,
    thoughts: PenIcon,
    musings: MusicIcon,
    about: UserIcon,
    contact: MailIcon,
};
