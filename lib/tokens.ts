// ─── Design Tokens ─────────────────────────────────────────
// Variant-style retro OS: cream palette, black borders, chunky shadows

export const Ft = {
    m: "'IBM Plex Mono','SF Mono','Menlo',monospace",
    d: "'DotGothic16','Space Mono',monospace",
    b: "'IBM Plex Mono','Helvetica Neue',sans-serif",
} as const;

export const K = {
    // Desktop
    desk: "#D8D6D0",
    deskDot: "#111",

    // Paper surfaces
    paper: "#E6E4DD",
    paperAlt: "#F2F0EB",

    // Gradients
    gradHeader: "linear-gradient(to bottom, #E6E4DD 0%, #D8D6D0 100%)",
    gradFooter: "linear-gradient(to top, #E6E4DD 0%, #D8D6D0 100%)",

    // Chrome (title bars, buttons)
    chrome: "#E6E4DD",
    chrLit: "#F0ECE5",
    chrDk: "#C4BFB5",

    // Borders — solid black
    bdr: "#111111",
    bdrLit: "#333333",
    bdrDk: "#000000",

    // Text
    txt: "#111111",
    txtD: "#555555",
    txtF: "#888888",

    // Accent palette
    orange: "#FF4400",
    orangeL: "#FF6633",
    orangeD: "#CC3300",
    neon: "#00E676",
    neonD: "#00C853",
    electric: "#448AFF",
    electricD: "#2962FF",
    violet: "#AA00FF",
    yellow: "#FFCC00",
    pink: "#FF4081",

    // Shadows — chunky pixel-art style
    sh: "rgba(0,0,0,0.08)",
    shH: "rgba(0,0,0,0.15)",
    shD: "rgba(0,0,0,0.25)",

    // Chunky box shadow (Variant signature)
    chunky: "4px 4px 0px 0px rgba(0,0,0,0.2), 4px 3px 0px 0px rgba(0,0,0,0.06), 3px 4px 0px 0px rgba(0,0,0,0.06), 3px 3px 0px 0px rgba(0,0,0,0.12), 2px 2px 0px 0px rgba(0,0,0,0.08)",
    chunkySmall: "2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)",
} as const;

// ─── Z-Index Counter ──────────────────────────────────────
let _z = 100;
export const nz = () => ++_z;
