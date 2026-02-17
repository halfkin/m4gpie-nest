// ─── Data ─────────────────────────────────────────────────
import { K } from "./tokens";

export interface DesktopIconData {
    id: string;
    label: string;
    x: number;
    y: number;
    color: string;
}

export interface ProjectData {
    id: string;
    name: string;
    kind: string;
    date: string;
    size: string;
    desc: string;
    stack: string[];
    color: string;
}

export interface WindowData {
    id: string;
    title: string;
    icon: string;
    x: number;
    y: number;
    w: number;
    h: number;
    project?: ProjectData;
}

export const DESKTOP_ICONS: DesktopIconData[] = [
    { id: "projects", label: "Projects", x: 32, y: 48, color: K.orange },
    { id: "toys", label: "Toys", x: 32, y: 160, color: K.neon },
    { id: "thoughts", label: "Thoughts", x: 32, y: 272, color: K.electric },
    { id: "musings", label: "Musings", x: 32, y: 384, color: K.violet },
    { id: "about", label: "About Me", x: 140, y: 48, color: K.orange },
    { id: "contact", label: "Contact", x: 140, y: 160, color: K.neon },
];

// Reusing ProjectData structure for simplicity as they share the same list layout
export const PROJECTS: ProjectData[] = [
    {
        id: "dot",
        name: "Dot — Policy Expert Bot",
        kind: "RAG System",
        date: "2025",
        size: "4 layers",
        desc: 'Production-grade RAG chatbot with "Ravelin" 4-layer security, semantic eval pipeline. 82.7% adversarial pass rate.',
        stack: ["Python", "RAG", "LLM", "Vector DB"],
        color: K.orange,
    },
    {
        id: "promptarmor",
        name: "PromptArmor",
        kind: "Security Tool",
        date: "2025",
        size: "4 layers",
        desc: "4-layer prompt injection defense. Input sanitization, intent classification, output filtering, behavioral monitoring.",
        stack: ["Python", "NLP", "API"],
        color: K.electric,
    },
    {
        id: "openclaw",
        name: "OpenClaw",
        kind: "Bot System",
        date: "2024–25",
        size: "5 agents",
        desc: "Multi-agent Discord bot. 5 specialized agents in Docker with agent isolation and workspace management.",
        stack: ["Python", "Docker", "Discord.py"],
        color: K.neon,
    },
];

export const TOYS: ProjectData[] = [
    {
        id: "t1",
        name: "Physics_Playground.exe",
        kind: "Simulation",
        date: "2025",
        size: "12 MB",
        desc: "A small canvas-based 2D physics engine demo.",
        stack: ["HTML5", "Canvas", "JS"],
        color: K.neon,
    },
    {
        id: "t2",
        name: "Fractal_Gen_v2",
        kind: "Visualizer",
        date: "2024",
        size: "4 MB",
        desc: "Mandelbrot set explorer with zoom capabilities.",
        stack: ["WebGL", "Shader"],
        color: K.electric,
    },
    {
        id: "t3",
        name: "Retro_Snake",
        kind: "Game",
        date: "2023",
        size: "2 MB",
        desc: "Classic snake game with a neon twist.",
        stack: ["React", "State"],
        color: K.violet,
    },
];

export const CURIOSITIES: ProjectData[] = [
    {
        id: "c1",
        name: "Strange_Attractors",
        kind: "Math Art",
        date: "2025",
        size: "8 MB",
        desc: "Lorenz attractor visualization.",
        stack: ["p5.js"],
        color: K.orange,
    },
    {
        id: "c2",
        name: "Glitch_Experiments",
        kind: "Art",
        date: "2024",
        size: "15 MB",
        desc: "Collection of image glitching algorithms.",
        stack: ["Canvas", "Pixel"],
        color: K.electric,
    },
];

export const MUSIC: ProjectData[] = [
    {
        id: "m1",
        name: "LoFi_Beats_Vol1",
        kind: "Audio",
        date: "2025",
        size: "45 MB",
        desc: "Chill coding tracks.",
        stack: ["MP3"],
        color: K.violet,
    },
    {
        id: "m2",
        name: "Synthwave_Mix",
        kind: "Audio",
        date: "2024",
        size: "60 MB",
        desc: "Retrowave collection.",
        stack: ["WAV"],
        color: K.neon,
    },
];

export const WINDOW_CONFIGS: Record<string, Omit<WindowData, "id" | "project">> = {
    projects: { title: "Projects", icon: "📂", x: 200, y: 60, w: 660, h: 400 },
    about: { title: "About — Cameron", icon: "◉", x: 250, y: 50, w: 460, h: 540 },
    thoughts: { title: "Thoughts", icon: "✎", x: 270, y: 70, w: 520, h: 470 },
    contact: { title: "Contact", icon: "✉", x: 320, y: 55, w: 420, h: 400 },
    musings: { title: "Musings", icon: "♪", x: 290, y: 80, w: 380, h: 400 },
    toys: { title: "Toys", icon: "🎲", x: 230, y: 65, w: 580, h: 400 },
    curiosities: { title: "Curiosities", icon: "🔮", x: 250, y: 85, w: 580, h: 400 },
    music: { title: "Music", icon: "🎵", x: 300, y: 100, w: 580, h: 400 },
};

export const BOOT_MESSAGES = [
    "> booting m4gpie's nest v0.3",
    "> loading personality module ██████████ ok",
    "> checking vibes .............. immaculate",
    "> welcome back, cameron",
];

export const ASCII_LOGO = `
 ███╗   ███╗██╗  ██╗ ██████╗ ██████╗ ██╗███████╗
 ████╗ ████║██║  ██║██╔════╝ ██╔══██╗██║██╔════╝
 ██╔████╔██║███████║██║  ███╗██████╔╝██║█████╗
 ██║╚██╔╝██║╚════██║██║   ██║██╔═══╝ ██║██╔══╝
 ██║ ╚═╝ ██║     ██║╚██████╔╝██║     ██║███████╗
 ╚═╝     ╚═╝     ╚═╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝`.trim();
