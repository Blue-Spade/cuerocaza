import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import fs from "node:fs";
import path from "node:path";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    spa: {
      enabled: false,
    },
  },
  nitro: {
    preset: "node-server",
  },
  vite: {
    server: {
      port: 3000,
    },
    plugins: [
      {
        name: "copy-ssr-entry",
        closeBundle() {
          const paths = [
            { src: "dist/server/index.mjs", dest: "dist/server/server.js" },
            { src: ".output/server/index.mjs", dest: ".output/server/server.js" },
            { src: "dist/server/index.js", dest: "dist/server/server.js" },
            { src: ".output/server/index.js", dest: ".output/server/server.js" },
          ];
          for (const p of paths) {
            const src = path.resolve(p.src);
            const dest = path.resolve(p.dest);
            if (fs.existsSync(src)) {
              try {
                fs.mkdirSync(path.dirname(dest), { recursive: true });
                fs.copyFileSync(src, dest);
                console.log(`✓ Copied ${p.src} to ${p.dest}`);
              } catch (e) {
                console.error(`Failed to copy SSR entry:`, e);
              }
            }
          }

          // Create YouStable/cPanel root startup proxy to run Node.js app
          const outputDir = path.resolve(".output");
          if (fs.existsSync(outputDir)) {
            try {
              const proxyPath = path.join(outputDir, "server.js");
              fs.writeFileSync(proxyPath, "import './server/server.js';\n");
              console.log("✓ Created YouStable/cPanel Node.js startup proxy at .output/server.js");
            } catch (e) {
              console.error("Failed to create Node.js startup proxy:", e);
            }
          }
        },
      },
    ],
  },
});
