import { createServerFn } from "@tanstack/react-start";

// ─── Manual-only visitor count ──────────────────────────────────────────────
// Auto-increment on new sessions is DISABLED.
// Count is updated manually each week (bump BASE_VISITOR_COUNT by 2–3).
// ────────────────────────────────────────────────────────────────────────────
export const BASE_VISITOR_COUNT = 472005;

export const getVisitorStats = createServerFn({ method: "GET" }).handler(
  async () => {
    return { count: BASE_VISITOR_COUNT };
  }
);

// No-op — kept so existing imports don't break, but does NOT increment.
export const trackVisitorVisit = createServerFn({ method: "POST" }).handler(
  async () => {
    return { count: BASE_VISITOR_COUNT };
  }
);
