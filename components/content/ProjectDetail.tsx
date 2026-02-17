"use client";

// ─── Project Detail ─────────────────────────────────────────
// Variant-style: Detail view for projects
// Tech stack pills + primary button

import { K, Ft } from "@/lib/tokens";
import { type ProjectData } from "@/lib/data";
import { BevelButton } from "@/components/BevelButton";

interface ProjectDetailProps {
    project: ProjectData;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* Header with color banner */}
            <div
                style={{
                    height: 120,
                    background: project.color,
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: 24,
                }}
            >
                <div className="dither-texture" style={{ opacity: 0.2 }} />

                <div
                    style={{
                        position: "absolute",
                        top: 24,
                        right: 24,
                        background: "rgba(0,0,0,0.2)",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: 6,
                        fontFamily: Ft.m,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                    }}
                >
                    {project.kind}
                </div>

                <h1
                    style={{
                        fontFamily: Ft.d,
                        fontSize: 32,
                        fontWeight: 700,
                        color: "white",
                        textShadow: "2px 2px 0 rgba(0,0,0,0.1)",
                        zIndex: 1,
                    }}
                >
                    {project.name}
                </h1>
            </div>

            {/* Content Body */}
            <div style={{ padding: 24, flex: 1, overflow: "auto" }}>
                {/* Tech Stack Pills */}
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            style={{
                                padding: "4px 10px",
                                background: "white",
                                border: `1px solid ${K.bdr}`,
                                borderRadius: 100, // pill
                                fontFamily: Ft.m,
                                fontSize: 10,
                                fontWeight: 600,
                                textTransform: "uppercase",
                                boxShadow: "2px 2px 0 rgba(0,0,0,0.05)",
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                {/* Description */}
                <div
                    style={{
                        fontFamily: Ft.b,
                        fontSize: 15,
                        lineHeight: 1.7,
                        color: K.txt,
                        marginBottom: 32,
                    }}
                >
                    {project.desc}
                </div>

                {/* Actions */}
                <div style={{ display: "flex", gap: 12 }}>
                    <BevelButton active>View Code</BevelButton>
                    <BevelButton>Live Demo</BevelButton>
                </div>
            </div>
        </div>
    );
}
