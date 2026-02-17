"use client";

// ─── Projects Content ───────────────────────────────────────
// Variant-style: Finder list view
// Row hover: #FF4400 bg + white text
// Headers: sticky, black border

import { useState } from "react";
import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";
import { PROJECTS, type ProjectData } from "@/lib/data";
import { BevelButton } from "@/components/BevelButton";

interface ProjectsContentProps {
    openProject: (project: ProjectData) => void;
}

export function ProjectsContent({ openProject }: ProjectsContentProps) {
    const [selected, setSelected] = useState<string | null>(null);
    const [view, setView] = useState<"list" | "grid">("list");

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Toolbar */}
            <div
                style={{
                    height: 48,
                    background: K.paperAlt,
                    borderBottom: `1px solid ${K.bdr}`,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 12px",
                    gap: 8,
                    flexShrink: 0,
                }}
            >
                <BevelButton small active={view === "list"} onClick={() => setView("list")}>
                    ☰ LIST
                </BevelButton>
                <BevelButton small active={view === "grid"} onClick={() => setView("grid")}>
                    ⊞ GRID
                </BevelButton>

                <div style={{ width: 1, height: 20, background: K.bdr, margin: "0 8px" }} />

                <div style={{ display: "flex", gap: 4 }}>
                    <button style={{ border: "none", background: "none", cursor: "pointer", opacity: 0.5 }}>
                        <i className="ph-bold ph-caret-left" style={{ fontSize: 16 }} />
                    </button>
                    <button style={{ border: "none", background: "none", cursor: "pointer", opacity: 0.5 }}>
                        <i className="ph-bold ph-caret-right" style={{ fontSize: 16 }} />
                    </button>
                </div>

                <div style={{ flex: 1 }} />
                <span style={{ fontFamily: Ft.m, fontSize: 10, color: K.txtD, textTransform: "uppercase" }}>
                    {PROJECTS.length} items
                </span>
            </div>

            {/* Content */}
            {view === "list" ? (
                <div style={{ flex: 1, overflow: "auto", background: "white" }}>
                    {/* Column headers */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 100px 100px 80px",
                            background: K.paper,
                            borderBottom: `1px solid ${K.bdr}`,
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                        }}
                    >
                        {["Name", "Date", "Kind", "Size"].map((h, i) => (
                            <div
                                key={h}
                                style={{
                                    padding: "8px 12px",
                                    fontFamily: Ft.m,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    color: K.txt,
                                    textTransform: "uppercase",
                                    letterSpacing: "0.5px",
                                    borderRight: i < 3 ? `1px solid ${K.bdr}` : "none",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "white")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = K.paper)}
                            >
                                {h} <i className="ph-bold ph-caret-down" style={{ fontSize: 10, marginLeft: 4 }} />
                            </div>
                        ))}
                    </div>

                    {/* Rows */}
                    {PROJECTS.map((p, i) => (
                        <div
                            key={p.id}
                            className="animate-slideup"
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 100px 100px 80px",
                                borderBottom: `1px solid ${K.bdr}22`,
                                cursor: "default",
                                background: selected === p.id ? K.orange : "transparent",
                                color: selected === p.id ? "white" : K.txt,
                                animationDelay: `${i * 0.04}s`,
                                animationFillMode: "both",
                                fontSize: 12,
                                fontFamily: Ft.m,
                            }}
                            onClick={() => {
                                setSelected(p.id);
                                Snd.click();
                            }}
                            onDoubleClick={() => {
                                openProject(p);
                                Snd.open();
                            }}
                        >
                            <div
                                style={{
                                    padding: "10px 12px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 10,
                                    borderRight: `1px solid ${selected === p.id ? "rgba(255,255,255,0.2)" : K.bdr + "22"}`,
                                }}
                            >
                                <i className="ph-fill ph-folder" style={{ fontSize: 16, color: selected === p.id ? "white" : p.color }} />
                                <span style={{ fontFamily: Ft.b, fontWeight: 600 }}>{p.name}</span>
                            </div>
                            <div
                                style={{
                                    padding: "10px 12px",
                                    opacity: selected === p.id ? 1 : 0.6,
                                    borderRight: `1px solid ${selected === p.id ? "rgba(255,255,255,0.2)" : K.bdr + "22"}`,
                                }}
                            >
                                {p.date}
                            </div>
                            <div
                                style={{
                                    padding: "10px 12px",
                                    opacity: selected === p.id ? 1 : 0.6,
                                    borderRight: `1px solid ${selected === p.id ? "rgba(255,255,255,0.2)" : K.bdr + "22"}`,
                                }}
                            >
                                {p.kind}
                            </div>
                            <div style={{ padding: "10px 12px", opacity: selected === p.id ? 1 : 0.6 }}>
                                {p.size}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                        gap: 16,
                        padding: 20,
                        flex: 1,
                        overflow: "auto",
                        background: K.paperAlt,
                    }}
                >
                    {PROJECTS.map((p, i) => (
                        <div
                            key={p.id}
                            className="animate-slideup"
                            style={{
                                background: "white",
                                border: `1px solid ${selected === p.id ? K.orange : K.bdr}`,
                                borderRadius: 12,
                                padding: 16,
                                cursor: "default",
                                boxShadow: selected === p.id ? K.chunkySmall : "0 2px 0 rgba(0,0,0,0.05)",
                                animationDelay: `${i * 0.06}s`,
                                animationFillMode: "both",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                                gap: 10,
                            }}
                            onClick={() => {
                                setSelected(p.id);
                                Snd.click();
                            }}
                            onDoubleClick={() => {
                                openProject(p);
                                Snd.open();
                            }}
                        >
                            <i
                                className="ph-fill ph-folder"
                                style={{
                                    fontSize: 42,
                                    color: p.color
                                }}
                            />
                            <div
                                style={{
                                    fontFamily: Ft.b,
                                    fontSize: 13,
                                    fontWeight: 700,
                                    color: K.txt,
                                    lineHeight: 1.2,
                                }}
                            >
                                {p.name}
                            </div>
                            <div style={{ fontFamily: Ft.m, fontSize: 10, color: K.txtD }}>
                                {p.kind}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
