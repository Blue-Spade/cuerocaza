import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export const BASE_VISITOR_COUNT = 472005;

let currentVisitorCount = BASE_VISITOR_COUNT;
let isLoaded = false;

async function loadPersistedCount(): Promise<number> {
  if (isLoaded) return currentVisitorCount;
  if (typeof window !== "undefined") return BASE_VISITOR_COUNT;
  
  try {
    const fs = await import("fs");
    const path = await import("path");
    const file = path.resolve(process.cwd(), "visitor_stats.json");
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf-8");
      const parsed = JSON.parse(raw);
      if (typeof parsed?.count === "number" && parsed.count >= BASE_VISITOR_COUNT) {
        currentVisitorCount = parsed.count;
      }
    }
  } catch (err) {
    // Read-only environment fallback
  }
  isLoaded = true;
  return currentVisitorCount;
}

async function persistCount(count: number): Promise<void> {
  if (typeof window !== "undefined") return;
  try {
    const fs = await import("fs");
    const path = await import("path");
    const file = path.resolve(process.cwd(), "visitor_stats.json");
    fs.writeFileSync(
      file,
      JSON.stringify({ count, lastVisitAt: new Date().toISOString() }, null, 2),
      "utf-8"
    );
  } catch (_) {
    // Vercel serverless /tmp or read-only filesystem graceful fallback
  }
}

export const getVisitorStats = createServerFn({ method: "GET" }).handler(async () => {
  await loadPersistedCount();
  return { count: currentVisitorCount };
});

export const trackVisitorVisit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ isNewSession: z.boolean().default(true) }).parse(input ?? { isNewSession: true })
  )
  .handler(async ({ data }) => {
    await loadPersistedCount();
    if (data.isNewSession) {
      currentVisitorCount = Math.max(BASE_VISITOR_COUNT, currentVisitorCount + 1);
      await persistCount(currentVisitorCount);
    }
    return { count: currentVisitorCount };
  });
