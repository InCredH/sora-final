import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

// `vite build`                -> normal multi-file build (BrowserRouter, clean URLs like /admin)
// `vite build --mode preview` -> one self-contained HTML file (HashRouter, e.g. #/admin)
const googleFonts = `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=DM+Serif+Display:ital@0;1&family=Montserrat:wght@400;500&display=swap">`;

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tailwindcss(),
    // Hosted-preview safety net: also request the same fonts from Google Fonts in case embedded fonts are blocked.
    { name: "preview-fonts", transformIndexHtml: (html: string) => (mode === "preview" ? html.replace("</head>", `${googleFonts}</head>`) : html) },
    ...(mode === "preview" ? [viteSingleFile()] : []),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build:
    mode === "preview"
      ? { assetsInlineLimit: 100_000_000, cssCodeSplit: false, chunkSizeWarningLimit: 5000 }
      : {},
}));
