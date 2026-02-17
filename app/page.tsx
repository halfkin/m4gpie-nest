"use client";

// ═════════════════════════════════════════════════════════════
//  m4gpieOS — Main Page
//  Desktop metaphor portfolio: boot → desktop with windows
//  Variant-style retro OS aesthetic
// ═════════════════════════════════════════════════════════════

import { useState, useCallback } from "react";
import { K, Ft } from "@/lib/tokens";
import { Snd } from "@/lib/sound";
import { DESKTOP_ICONS, WINDOW_CONFIGS, PROJECTS, TOYS, CURIOSITIES, MUSIC, type WindowData, type ProjectData } from "@/lib/data";

import { SvgDefs } from "@/components/icons";
import { BootScreen } from "@/components/BootScreen";
import { MenuBar } from "@/components/MenuBar";
import { Window } from "@/components/Window";
import { DesktopIcon } from "@/components/DesktopIcon";
import { Taskbar } from "@/components/Taskbar";
import { Clippy } from "@/components/Clippy";
import ClickSpark from "@/components/vendor/ClickSpark";



import { ProjectsContent } from "@/components/content/ProjectsContent";
import { ProjectDetail } from "@/components/content/ProjectDetail";
import { AboutContent } from "@/components/content/AboutContent";
import { ThoughtsContent } from "@/components/content/ThoughtsContent";
import { ContactContent } from "@/components/content/ContactContent";
import { MusingsContent } from "@/components/content/MusingsContent";
import { ToysContent } from "@/components/content/ToysContent";
import { FolderContent } from "@/components/content/FolderContent";

export default function M4gpieOS() {
    const [windows, setWindows] = useState<WindowData[]>([]);
    const [activeWindow, setActiveWindow] = useState<string | null>(null);
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
    const [booted, setBooted] = useState(false);

    // Icon Data State (Positions)
    // Initial positions match reference (Desktop right column, Macintosh HD top right)
    // But now they are draggable.
    const [icons, setIcons] = useState([
        { id: "hd", label: "Macintosh HD", icon: "ph-hard-drives", x: 24, y: 64 },
        { id: "projects", label: "Projects", icon: "ph-folder-notch-open", x: 24, y: 174 },
        { id: "toys", label: "Toys", icon: "ph-game-controller", x: 24, y: 284 },
        { id: "curiosities", label: "Curiosities", icon: "ph-eye", x: 24, y: 394 },
        { id: "music", label: "Music", icon: "ph-music-notes", x: 24, y: 504 },
        { id: "about", label: "About Me", icon: "ph-user-circle", x: 24, y: 614 },
        // Column 2
        { id: "contact", label: "Contact", icon: "ph-envelope", x: 134, y: 64 },
        { id: "trash", label: "Trash", icon: "ph-trash", x: 134, y: 174 },
    ]);

    // Update positions on mount to match window width if needed, 
    // but for now we stick to a reasonable default or the user's specific "right side" visual.
    // The user's screenshot showed them on the right. 

    // ─── Window Management ──────────────────────────────────
    const openWindow = useCallback(
        (id: string) => {
            if (windows.find((w) => w.id === id)) {
                setActiveWindow(id);
                // Un-minimize if minimized
                return;
            }
            const config = WINDOW_CONFIGS[id] || {
                title: id,
                icon: "📁",
                x: 200,
                y: 60,
                w: 600,
                h: 450,
            };
            setWindows((prev) => [...prev, { id, ...config }]);
            setActiveWindow(id);
            Snd.open();
        },
        [windows]
    );

    const openProject = useCallback(
        (proj: ProjectData) => {
            const id = "p-" + proj.id;
            if (windows.find((w) => w.id === id)) {
                setActiveWindow(id);
                return;
            }
            setWindows((prev) => [
                ...prev,
                {
                    id,
                    title: proj.name,
                    icon: "📄",
                    x: 280 + Math.random() * 60,
                    y: 55 + Math.random() * 40,
                    w: 480,
                    h: 470,
                    project: proj,
                },
            ]);
            setActiveWindow(id);
        },
        [windows]
    );

    const closeWindow = useCallback(
        (id: string) => {
            setWindows((prev) => prev.filter((w) => w.id !== id));
            if (activeWindow === id) setActiveWindow(null);
        },
        [activeWindow]
    );

    // ─── Content Router ─────────────────────────────────────
    const getContent = (w: WindowData) => {
        if (w.id === "projects") return <ProjectsContent openProject={openProject} />;
        if (w.id === "about") return <AboutContent />;

        // New Apps using Generic FolderContent
        if (w.id === "toys") return <FolderContent items={TOYS} />;
        if (w.id === "curiosities") return <FolderContent items={CURIOSITIES} />;
        if (w.id === "music") return <FolderContent items={MUSIC} />;

        if (w.id === "thoughts") return <ThoughtsContent />;
        if (w.id === "contact") return <ContactContent />;
        if (w.id === "musings") return <MusingsContent />;
        if (w.project) return <ProjectDetail project={w.project} />;
        return <div className="p-4 text-center">Empty Folder</div>;
    };

    // ─── Icon Drag Logic ────────────────────────────────────
    const updateIconPos = (id: string, x: number, y: number) => {
        setIcons(prev => prev.map(icon => {
            if (icon.id === id) {
                // Snap to grid (approx 90x100 grid)
                const GRID_X = 100;
                const GRID_Y = 110;
                const snappedX = Math.round(x / GRID_X) * GRID_X;
                // Add some offset for visual centering if needed, but simple snap is fine
                const snappedY = Math.round(y / GRID_Y) * GRID_Y;
                return { ...icon, x: snappedX + 24, y: snappedY + 32 }; // +offset for margin
            }
            return icon;
        }));
    };

    // ─── Boot Screen ────────────────────────────────────────
    if (!booted) {
        return (
            <>
                <SvgDefs />
                <BootScreen onDone={() => setBooted(true)} />
            </>
        );
    }

    // ─── Desktop ────────────────────────────────────────────
    return (
        <ClickSpark sparkColor="#FF4400" sparkSize={12} sparkRadius={20} sparkCount={10} duration={500}>
            <div
                style={{
                    width: "100vw",
                    height: "100vh",
                    overflow: "hidden",
                    position: "relative",
                    fontFamily: Ft.b,
                }}
                onClick={() => setSelectedIcon(null)}
            >
                <SvgDefs />

                {/* Cream desktop with wallpaper */}
                <div style={{ position: "fixed", inset: 0, zIndex: 0, background: K.desk }}>
                    <img
                        src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80&w=2070&auto=format&fit=crop"
                        alt=""
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            opacity: 0.25,
                            filter: "grayscale(100%) contrast(120%) brightness(0.9)",
                            mixBlendMode: "multiply",
                        }}
                    />
                </div>

                {/* Overlays */}
                <div className="dither-overlay" />
                <div className="scanlines-overlay" />
                <div className="grid-overlay" />

                {/* Menu bar */}
                <MenuBar openWindow={openWindow} />

                {/* Main Content Area - Flex Logic like User Code */}
                {/* We keep windows absolute, but icons fixed right */}

                {/* Desktop icons (Draggable) */}
                {icons.map((item) => (
                    <DesktopIcon
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={item.x}
                        y={item.y}
                        isSelected={selectedIcon === item.id}
                        onSelect={() => setSelectedIcon(item.id)}
                        onDoubleClick={() => openWindow(item.id)}
                        onDragEnd={(x, y) => updateIconPos(item.id, x, y)}
                    />
                ))}

                {/* Windows */}
                {windows.map((w) => (
                    <Window
                        key={w.id}
                        {...w}
                        isActive={activeWindow === w.id}
                        onFocus={setActiveWindow}
                        onClose={closeWindow}
                    >
                        {getContent(w)}
                    </Window>
                ))}

                {/* Clippy */}
                <Clippy />

                {/* Taskbar */}
                <Taskbar
                    windows={windows}
                    activeWindow={activeWindow}
                    onFocus={setActiveWindow}
                />
            </div>
        </ClickSpark>
    );
}
