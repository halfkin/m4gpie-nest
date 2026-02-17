import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "m4gpieOS — Cameron's Portfolio",
    description:
        "Personal portfolio of Cameron (@m4gpie). Customer support professional transitioning into AI roles. Builder of RAG chatbots, prompt injection defenses, and multi-agent architectures.",
    keywords: ["portfolio", "AI", "RAG", "Cameron", "m4gpie", "developer"],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <script src="https://unpkg.com/@phosphor-icons/web"></script>
            </head>
            <body style={{ overflow: "hidden", background: "#D8D6D0" }}>
                {children}
            </body>
        </html>
    );
}
