import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";

const ProductInput = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(2000).optional().or(z.literal("")),
  category: z.string().trim().min(1).max(40).default("wallet"),
  price_cents: z.number().int().nonnegative().nullable(),
  currency: z.string().trim().length(3).default("AED"),
  image_url: z.string().trim().min(1).max(1000),
  sort_order: z.number().int().default(0),
  featured: z.boolean().default(false),
  stock: z.number().int().nonnegative().default(0),
  offer_price_cents: z.number().int().nonnegative().nullable().optional(),
  offer_starts_at: z.string().datetime({ offset: true }).nullable().optional(),
  offer_ends_at: z.string().datetime({ offset: true }).nullable().optional(),
});

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const isAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();
    return { isAdmin: !!data };
  });

export const claimFirstAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { count, error: cErr } = await supabaseAdmin
      .from("user_roles")
      .select("id", { count: "exact", head: true })
      .eq("role", "admin");
    if (cErr) throw new Error(cErr.message);
    if ((count ?? 0) > 0) throw new Error("Admin already claimed");
    const { error } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: context.userId, role: "admin" });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminListInquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminCreateProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ProductInput.parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const payload = { ...data, description: data.description || null };
    const { error } = await supabaseAdmin.from("products").insert(payload);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminUpdateProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid(), patch: ProductInput.partial() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").update(data.patch).eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ─── Admin email rotation ──────────────────────────────────────────────────
import { createHash, randomInt, timingSafeEqual } from "node:crypto";
function hashCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}

export const requestAdminEmailChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ new_email: z.string().trim().email().max(200) }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const code = String(randomInt(0, 1_000_000)).padStart(6, "0");
    const expires = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    // invalidate prior open requests
    await supabaseAdmin.from("admin_change_requests")
      .update({ consumed_at: new Date().toISOString() })
      .is("consumed_at", null);
    const { error } = await supabaseAdmin.from("admin_change_requests")
      .insert({ new_email: data.new_email.toLowerCase(), code_hash: hashCode(code), expires_at: expires });
    if (error) throw new Error(error.message);
    // The verification code is written to the server logs so the current
    // owner can retrieve it. Do not return it to the client.
    console.log(`[admin-change] verification code for ${data.new_email}: ${code} (expires ${expires})`);
    return { ok: true };
  });

export const confirmAdminEmailChange = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({
      new_email: z.string().trim().email().max(200),
      code: z.string().trim().regex(/^\d{6}$/),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const newEmail = data.new_email.toLowerCase();
    const { data: req, error } = await supabaseAdmin
      .from("admin_change_requests")
      .select("*")
      .eq("new_email", newEmail)
      .is("consumed_at", null)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!req) throw new Error("No active verification request for that email");
    const a = Buffer.from(req.code_hash);
    const b = Buffer.from(hashCode(data.code));
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Invalid code");

    // Rotate owner_email() via security-definer helper.
    const { error: rotErr } = await supabaseAdmin.rpc("rotate_owner_email", { _new_email: newEmail });
    if (rotErr) throw new Error("Rotation failed: " + rotErr.message);

    await supabaseAdmin.from("admin_change_requests").update({ consumed_at: new Date().toISOString() }).eq("id", req.id);
    return { ok: true, new_email: newEmail };
  });
