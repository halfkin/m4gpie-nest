"use client";

// ─── Desktop Icon ───────────────────────────────────────────
// Variant-style: square, black border, chunky shadow, white bg
// Phosphor icons via CSS classes

import { useState, useRef } from "react";
import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";

// Note: To implement drag and drop properly we need to handle mouse events and update parent.
// For brevity, we will update the props first to accept onDragEnd or similar?
// The user asked for "positionable on a grid snap".
// I will update the DesktopIcon to handle the drag UI locally and report new position on mouse up.

interface DesktopIconProps {
    id: string;
    label: string;
    icon: string;
    x: number;
    y: number;
    isSelected: boolean;
    onSelect: () => void;
    onDoubleClick: () => void;
    onDragEnd?: (x: number, y: number) => void;
}

export function DesktopIcon({
    id,
    label,
    icon,
    x,
    y,
    isSelected,
    onSelect,
    onDoubleClick,
    onDragEnd,
}: DesktopIconProps) {
    const [dragging, setDragging] = useState(false);
    const [dragPos, setDragPos] = useState({ x: 0, y: 0 }); // Offset during drag
    const startPos = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (!onDragEnd) return;
        e.stopPropagation();
        onSelect();
        setDragging(true);
        startPos.current = { x: e.clientX, y: e.clientY };

        const onMove = (ev: MouseEvent) => {
            setDragPos({
                x: ev.clientX - startPos.current.x,
                y: ev.clientY - startPos.current.y
            });
        };

        const onUp = (ev: MouseEvent) => {
            setDragging(false);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseup", onUp);

            const dx = ev.clientX - startPos.current.x;
            const dy = ev.clientY - startPos.current.y;

            // Only report move if moved significantly (prevent click-glitch)
            if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
                // Report final position (original + delta)
                onDragEnd(x + dx, y + dy);
            }
            setDragPos({ x: 0, y: 0 }); // Reset offset
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseup", onUp);
    };

    const iconClass = icon || "ph-folder";

    return (
        <div
            className="group"
            style={{
                position: "absolute",
                left: x + dragPos.x,
                top: y + dragPos.y,
                width: 90,
                // height: 110, // Let it grow
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                cursor: dragging ? "grabbing" : "pointer",
                textAlign: "center",
                zIndex: isSelected || dragging ? 10 : 1,
                userSelect: "none",
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
                e.stopPropagation();
                onSelect();
                Snd.click();
            }}
            onDoubleClick={(e) => {
                e.stopPropagation();
                onDoubleClick();
                Snd.open();
            }}
        >
            {/* Glow / Selection BG - Projects always glows, others only on select */}
            {((isSelected && id === 'projects') || id === 'projects') && (
                <>
                    <div className="animate-pulse" style={{ position: "absolute", inset: 0, background: K.orange, opacity: 0.2, filter: "blur(8px)", borderRadius: 16 }} />
                    <div className="dither-texture" style={{ opacity: 0.15, borderRadius: 16 }} />
                </>
            )}

            <div
                style={{
                    width: 64,
                    height: 64,
                    background: isSelected ? K.paper : "white",
                    border: `1px solid ${K.bdr}`,
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: 10,
                    overflow: "hidden",
                    // Use User's exact box shadow
                    boxShadow: dragging ? "none" : "2px 2px 0px 0px rgba(0,0,0,0.25), 2px 1px 0px 0px rgba(0,0,0,0.08), 1px 2px 0px 0px rgba(0,0,0,0.08), 1px 1px 0px 0px rgba(0,0,0,0.15)",
                    transform: dragging ? "translate(2px, 2px)" : "none",
                    transition: dragging ? "none" : "all 0.1s",
                }}
            >
                {id === 'profile' || id === 'about' ? (
                    <>
                        <img
                            src="https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop"
                            alt=""
                            style={{
                                position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
                                filter: "grayscale(100%)", mixBlendMode: "multiply", opacity: 0.5
                            }}
                        />
                        <i className={`ph-fill ph-user-circle`} style={{ fontSize: 32, position: "relative", zIndex: 10, opacity: 0.7 }} />
                    </>
                ) : (
                    <i
                        className={`ph-fill ${iconClass}`}
                        style={{
                            fontSize: 32,
                            color: isSelected ? K.orange : K.txt,
                            opacity: isSelected ? 1 : 0.7,
                        }}
                    />
                )}
            </div>

            <span
                style={{
                    fontFamily: Ft.m,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    padding: "2px 4px",
                    background: isSelected ? "white" : "black",
                    color: isSelected ? "black" : "white",
                    border: isSelected ? `1px solid ${K.orange}` : "1px solid black",
                    borderRadius: 4,
                    letterSpacing: "0.5px",
                    zIndex: 10,
                    marginTop: 4,
                    lineHeight: 1.2,
                }}
            >
                {label}
            </span>
        </div>
    );
}
