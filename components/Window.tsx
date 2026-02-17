"use client";

// ─── Window Component ───────────────────────────────────────
// Draggable, traffic lights, maximize, z-index management
// Variant-style: cream bg, black borders, chunky shadows, rounded-2xl

import { useState, useRef, useCallback, type ReactNode } from "react";
import { K, Ft, nz } from "@/lib/tokens";
import { Snd } from "@/lib/sound";

interface WindowProps {
    id: string;
    title: string;
    icon: string;
    x: number;
    y: number;
    w: number;
    h: number;
    isActive: boolean;
    onFocus: (id: string) => void;
    onClose: (id: string) => void;
    children: ReactNode;
}

export function Window({
    id,
    title,
    icon,
    x: initX,
    y: initY,
    w: initW,
    h: initH,
    isActive,
    onFocus,
    onClose,
    children,
}: WindowProps) {
    const [pos, setPos] = useState({ x: initX, y: initY });
    const [size, setSize] = useState({ w: initW, h: initH });
    const [z, setZ] = useState(() => nz());
    const [maximized, setMaximized] = useState(false);
    const [minimized, setMinimized] = useState(false);

    // Refs for drag/resize
    const dragging = useRef(false);
    const resizing = useRef<string | null>(null); // 'se', 's', 'e'
    const offset = useRef({ x: 0, y: 0 });
    const prevGeo = useRef<{ p: typeof pos; s: typeof size } | null>(null);

    // ─── Drag Logic ─────────────────────────────────────────
    const startDrag = useCallback(
        (e: React.MouseEvent) => {
            if ((e.target as HTMLElement).closest(".window-btn") || maximized) return;
            dragging.current = true;
            offset.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
            setZ(nz());
            onFocus(id);

            const onMove = (ev: MouseEvent) => {
                if (dragging.current) {
                    setPos({
                        x: ev.clientX - offset.current.x,
                        y: Math.max(42, ev.clientY - offset.current.y), // Keep below menu bar
                    });
                }
            };
            const onUp = () => {
                dragging.current = false;
                window.removeEventListener("mousemove", onMove);
                window.removeEventListener("mouseup", onUp);
            };
            window.addEventListener("mousemove", onMove);
            window.addEventListener("mouseup", onUp);
        },
        [pos, id, onFocus, maximized]
    );

    // ─── Resize Logic ───────────────────────────────────────
    const startResize = useCallback((e: React.MouseEvent, direction: string) => {
        e.stopPropagation();
        resizing.current = direction;
        const startX = e.clientX;
        const startY = e.clientY;
        const startW = size.w;
        const startH = size.h;
        setZ(nz());
        onFocus(id);

        const onMove = (ev: MouseEvent) => {
            if (resizing.current) {
                const deltaX = ev.clientX - startX;
                const deltaY = ev.clientY - startY;

                setSize({
                    w: Math.max(300, startW + (direction.includes('e') ? deltaX : 0)),
                    h: Math.max(200, startH + (direction.includes('s') ? deltaY : 0)),
                });
            }
        };

        const onUp = () => {
            resizing.current = null;
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    }, [size, id, onFocus]);


    // ─── Control Logic ──────────────────────────────────────
    const toggleMaximize = () => {
        if (!maximized) {
            // Save current state
            prevGeo.current = { p: { ...pos }, s: { ...size } };
            // Maximize with "half inch" margin (approx 48px) and MenuBar offset
            // MenuBar is 40px top. 
            const margin = 16;
            setPos({ x: margin, y: 40 + margin });
            setSize({
                w: window.innerWidth - (margin * 2),
                h: window.innerHeight - 40 - (margin * 2) - 48 // Minus taskbar and margin
            });
        } else if (prevGeo.current) {
            setPos(prevGeo.current.p);
            setSize(prevGeo.current.s);
        }
        setMaximized(!maximized);
        Snd.click();
    };

    const toggleMinimize = (e: React.MouseEvent) => {
        e.stopPropagation();
        setMinimized(!minimized);
        // Note: Actual "docking" logic usually handled by parent/Taskbar, 
        // but here we just hide the body. Parent handles selection restore.
        Snd.click();
    };


    if (minimized) {
        // Render nothing or a hidden state. 
        // In this OS, minimized windows are just hidden from desktop but visible in Taskbar.
        // We relies on parent passing 'isActive' to bring it back.
        // If isActive becomes true, we un-minimize.
        if (isActive) setMinimized(false);
        return null;
    }

    return (
        <div
            className="animate-windowpop"
            style={{
                position: "fixed",
                left: pos.x,
                top: pos.y,
                width: size.w,
                height: size.h,
                zIndex: z,
                display: minimized ? "none" : "flex",
                flexDirection: "column",
                background: K.paper,
                borderRadius: 16,
                overflow: "hidden",
                border: `1px solid ${K.bdr}`,
                boxShadow: K.chunky,
                transition: dragging.current || resizing.current ? "none" : "box-shadow 0.2s, width 0.1s, height 0.1s",
            }}
            onMouseDown={() => {
                setZ(nz());
                onFocus(id);
            }}
        >
            {/* Title Bar */}
            <div
                onMouseDown={startDrag}
                style={{
                    height: 32,
                    flexShrink: 0,
                    background: "white",
                    borderBottom: `1px solid ${K.bdr}`,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    cursor: "grab",
                    userSelect: "none",
                    justifyContent: "space-between",
                }}
            >
                {/* Title + Icon */}
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 12, height: 12, background: K.orange }} />
                    <span
                        style={{
                            fontFamily: Ft.d,
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: K.txt,
                        }}
                    >
                        {title}
                    </span>
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", gap: 4 }}>
                    <div
                        className="window-btn"
                        style={{
                            width: 24, height: 24, borderRadius: "50%",
                            border: `1px solid ${K.bdr}`, background: K.yellow,
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        }}
                        onClick={toggleMinimize}
                    >
                        <i className="ph-bold ph-minus" style={{ fontSize: 10 }} />
                    </div>
                    <div
                        className="window-btn"
                        style={{
                            width: 24, height: 24, borderRadius: "50%",
                            border: `1px solid ${K.bdr}`, background: K.orange,
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        }}
                        onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
                    >
                        <i className={`ph-bold ${maximized ? 'ph-corners-in' : 'ph-corners-out'}`} style={{ fontSize: 10 }} />
                    </div>
                    <div
                        className="window-btn"
                        style={{
                            width: 24, height: 24, borderRadius: "50%",
                            border: `1px solid ${K.bdr}`, background: "#EF4444", color: "white",
                            display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                        }}
                        onClick={(e) => { e.stopPropagation(); Snd.close(); onClose(id); }}
                    >
                        <i className="ph-bold ph-x" style={{ fontSize: 10 }} />
                    </div>
                </div>
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflow: "auto", background: K.paperAlt, position: "relative" }}>
                {children}
            </div>

            {/* Status & Resize Handle */}
            <div
                style={{
                    height: 24,
                    flexShrink: 0,
                    background: K.paper,
                    borderTop: `1px solid ${K.bdr}`,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8px",
                    fontFamily: Ft.m,
                    fontSize: 9,
                    color: K.txtD,
                    gap: 8,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    position: "relative",
                    userSelect: "none",
                }}
            >
                <span>Path: /Users/m4gpie/{title.toLowerCase().replace(/\s+/g, "/")}/</span>
                <div style={{ flex: 1 }} />
                <span style={{ color: K.orange }}>RW-R--R--</span>
                <span>UTF-8</span>

                {/* Resize Handle (Bottom Right) */}
                <div
                    style={{
                        position: "absolute", bottom: 0, right: 0, width: 16, height: 16,
                        cursor: "nwse-resize", display: "flex", alignItems: "flex-end", justifyContent: "flex-end", padding: 2
                    }}
                    onMouseDown={(e) => startResize(e, 'se')}
                >
                    <div style={{ width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 8px 8px", borderColor: `transparent transparent ${K.txtD} transparent` }} />
                </div>
            </div>
        </div>
    );
}
