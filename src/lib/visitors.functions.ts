import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import fs from "fs";
import path from "path";

export const BASE_VISITOR_COUNT = 472005;
const STATS_FILE = path.resolve(process.cwd(), "visitor_stats.json");

function getStoredCount(): number {
  try {
    if (fs.existsSync(STATS_FILE)) {
      const raw = fs.readFileSync(STATS_FILE, "utf-8");
      const parsed = JSON.parse(raw);
      if (typeof parsed?.count === "number" && parsed.count >= BASE_VISITOR_COUNT) {
        return parsed.count;
      }
    }
  } catch (err) {
    console.warn("Could not read visitor_stats.json:", err);
  }
  return BASE_VISITOR_COUNT;
}

function saveStoredCount(count: number): void {
  try {
    fs.writeFileSync(
      STATS_FILE,
      JSON.stringify({ count, lastVisitAt: new Date().toISOString() }, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.warn("Could not write visitor_stats.json:", err);
  }
}

let currentVisitorCount = getStoredCount();

export const getVisitorStats = createServerFn({ method: "GET" }).handler(async () => {
  return { count: currentVisitorCount };
});

export const trackVisitorVisit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ isNewSession: z.boolean().default(true) }).parse(input ?? { isNewSession: true })
  )
  .handler(async ({ data }) => {
    if (data.isNewSession) {
      currentVisitorCount = Math.max(BASE_VISITOR_COUNT, currentVisitorCount + 1);
      saveStoredCount(currentVisitorCount);
    }
    return { count: currentVisitorCount };
  });
