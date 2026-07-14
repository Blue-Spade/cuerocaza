import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listProducts, type Product } from "@/lib/products.functions";
import { isAdmin, claimFirstAdmin, adminCreateProduct, adminUpdateProduct, adminDeleteProduct, adminListInquiries, requestAdminEmailChange, confirmAdminEmailChange } from "@/lib/admin.functions";
import { adminListAllReviews, adminSetReviewApproved, adminDeleteReview, type Review } from "@/lib/reviews.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin — Cuerocaza" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type ProductForm = {
  name: string;
  description: string;
  category: string;
  price_cents: number;
  currency: string;
  image_url: string;
  sort_order: number;
  featured: boolean;
  stock: number;
  offer_price_cents: number | null;
  offer_starts_at: string | null; // ISO
  offer_ends_at: string | null;   // ISO
};

const emptyProduct: ProductForm = {
  name: "", description: "", category: "mens-belts",
  price_cents: 0, currency: "AED", image_url: "", sort_order: 999, featured: false, stock: 6,
  offer_price_cents: null, offer_starts_at: null, offer_ends_at: null,
};

// Convert ISO <-> <input type="datetime-local"> value (YYYY-MM-DDTHH:mm)
function isoToLocalInput(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
function localInputToIso(v: string): string | null {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const checkAdmin = useServerFn(isAdmin);
  const claim = useServerFn(claimFirstAdmin);
  const fetchProducts = useServerFn(listProducts);
  const fetchInquiries = useServerFn(adminListInquiries);
  const createP = useServerFn(adminCreateProduct);
  const updateP = useServerFn(adminUpdateProduct);
  const deleteP = useServerFn(adminDeleteProduct);
  const fetchReviews = useServerFn(adminListAllReviews);
  const setApproved = useServerFn(adminSetReviewApproved);
  const delReview = useServerFn(adminDeleteReview);
  const reqChange = useServerFn(requestAdminEmailChange);
  const confirmChange = useServerFn(confirmAdminEmailChange);

  const adminQuery = useQuery({ queryKey: ["isAdmin"], queryFn: () => checkAdmin() });
  const productsQuery = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
  const inquiriesQuery = useQuery({
    queryKey: ["inquiries"],
    queryFn: () => fetchInquiries(),
    enabled: !!adminQuery.data?.isAdmin,
  });
  const reviewsQuery = useQuery({
    queryKey: ["adminReviews"],
    queryFn: () => fetchReviews(),
    enabled: !!adminQuery.data?.isAdmin,
  });

  const [form, setForm] = useState(emptyProduct);
  const [editing, setEditing] = useState<string | null>(null);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["products"] });
    qc.invalidateQueries({ queryKey: ["inquiries"] });
    qc.invalidateQueries({ queryKey: ["adminReviews"] });
    qc.invalidateQueries({ queryKey: ["reviews"] });
  };

  const approveMut = useMutation({
    mutationFn: (v: { id: string; approved: boolean }) => setApproved({ data: v }),
    onSuccess: () => { toast.success("Review updated."); refresh(); },
    onError: (e: Error) => toast.error(e.message),
  });
  const deleteReviewMut = useMutation({
    mutationFn: (id: string) => delReview({ data: { id } }),
    onSuccess: () => { toast.success("Review deleted."); refresh(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const claimMut = useMutation({
    mutationFn: () => claim(),
    onSuccess: () => { toast.success("You are now the admin."); adminQuery.refetch(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const saveMut = useMutation({
    mutationFn: async () => {
      if (editing) return updateP({ data: { id: editing, patch: form } });
      return createP({ data: form });
    },
    onSuccess: () => { toast.success("Saved."); setForm(emptyProduct); setEditing(null); refresh(); },
    onError: (e: Error) => toast.error(e.message),
  });

  const delMut = useMutation({
    mutationFn: (id: string) => deleteP({ data: { id } }),
    onSuccess: () => { toast.success("Deleted."); refresh(); },
    onError: (e: Error) => toast.error(e.message),
  });

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (adminQuery.isLoading) return <div className="p-12 text-center text-muted-foreground">Checking access…</div>;

  if (!adminQuery.data?.isAdmin) {
    return (
      <div className="mx-auto max-w-md px-6 py-24 text-center">
        <span className="eyebrow">Admin</span>
        <h1 className="mt-3 font-display text-3xl">Access denied</h1>
        <p className="mt-4 text-sm text-muted-foreground mb-6">
          This area is restricted to the registered owner. Sign in with the owner email to continue.
        </p>
        <div className="flex flex-col gap-4 items-center">
          <Link to="/my-orders" className="text-sm font-semibold uppercase tracking-wider text-cognac underline-offset-4 hover:underline">
            Go to My Orders
          </Link>
          <button onClick={signOut} className="text-xs text-muted-foreground underline">Sign out</button>
        </div>
      </div>
    );
  }

  async function uploadImage(file: File) {
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      cacheControl: "31536000", upsert: false, contentType: file.type || undefined,
    });
    if (error) { toast.error(error.message); return; }
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    setForm((f) => ({ ...f, image_url: data.publicUrl }));
    toast.success("Image uploaded.");
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <span className="eyebrow">Admin</span>
          <h1 className="mt-2 font-display text-4xl">House Management</h1>
        </div>
        <button onClick={signOut} className="text-sm text-muted-foreground underline">Sign out</button>
      </div>

      <section className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        {/* Form */}
        <div className="border border-border bg-card p-6">
          <h2 className="font-display text-2xl">{editing ? "Edit product" : "Add product"}</h2>
          <div className="mt-5 space-y-3">
            <Input label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Input label="Image URL" value={form.image_url} onChange={(v) => setForm({ ...form, image_url: v })} />
            <div>
              <label className="eyebrow block">Or upload an image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) void uploadImage(f); e.currentTarget.value = ""; }}
                className="mt-1 block w-full text-sm file:mr-3 file:border file:border-input file:bg-background file:px-3 file:py-1.5 file:text-xs file:uppercase file:tracking-wider hover:file:bg-muted"
              />
              {form.image_url && (
                <img src={form.image_url} alt="" className="mt-3 h-24 w-24 object-cover border border-border" />
              )}
            </div>
            <Input label="Description" value={form.description} onChange={(v) => setForm({ ...form, description: v })} />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <Input label="Category" value={form.category} onChange={(v) => setForm({ ...form, category: v })} />
              <Input label="Price (cents)" type="number" value={String(form.price_cents ?? 0)} onChange={(v) => setForm({ ...form, price_cents: Number(v) })} />
              <Input label="Currency" value={form.currency} onChange={(v) => setForm({ ...form, currency: v.toUpperCase() })} />
              <Input label="Stock" type="number" value={String(form.stock)} onChange={(v) => setForm({ ...form, stock: Math.max(0, Number(v) || 0) })} />
              <Input label="Sort" type="number" value={String(form.sort_order)} onChange={(v) => setForm({ ...form, sort_order: Number(v) })} />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
              Featured on homepage
            </label>

            <div className="mt-2 rounded border border-dashed border-cognac/40 bg-cognac/5 p-3">
              <div className="eyebrow text-cognac">Limited-time offer</div>
              <p className="mt-1 text-xs text-muted-foreground">
                Set a discounted price and the window it's active. Leave blank to disable.
              </p>
              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <Input
                  label="Offer price (cents)"
                  type="number"
                  value={form.offer_price_cents == null ? "" : String(form.offer_price_cents)}
                  onChange={(v) => setForm({ ...form, offer_price_cents: v === "" ? null : Number(v) })}
                />
                <Input
                  label="Starts at"
                  type="datetime-local"
                  value={isoToLocalInput(form.offer_starts_at)}
                  onChange={(v) => setForm({ ...form, offer_starts_at: localInputToIso(v) })}
                />
                <Input
                  label="Ends at"
                  type="datetime-local"
                  value={isoToLocalInput(form.offer_ends_at)}
                  onChange={(v) => setForm({ ...form, offer_ends_at: localInputToIso(v) })}
                />
              </div>
              {(form.offer_price_cents != null || form.offer_starts_at || form.offer_ends_at) && (
                <button
                  type="button"
                  onClick={() => setForm({ ...form, offer_price_cents: null, offer_starts_at: null, offer_ends_at: null })}
                  className="mt-2 text-xs text-cognac underline"
                >
                  Clear offer
                </button>
              )}
            </div>
            <div className="flex gap-2 pt-2">
              <button onClick={() => saveMut.mutate()} disabled={saveMut.isPending}
                className="bg-primary px-5 py-2 text-sm uppercase tracking-wider text-primary-foreground">
                {editing ? "Update" : "Create"}
              </button>
              {editing && (
                <button onClick={() => { setEditing(null); setForm(emptyProduct); }}
                  className="border border-input px-5 py-2 text-sm">Cancel</button>
              )}
            </div>
          </div>
        </div>

        {/* Products list */}
        <div>
          <h2 className="font-display text-2xl">Catalog ({productsQuery.data?.length ?? 0})</h2>
          <ul className="mt-5 divide-y divide-border border border-border bg-card">
            {(productsQuery.data ?? []).map((p: Product) => (
              <li key={p.id} className="flex items-center gap-4 p-3">
                <img src={p.image_url} alt="" className="h-14 w-14 object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="truncate font-medium">{p.name}</div>
                  <div className="text-xs text-muted-foreground">
                    #{p.sort_order} · {p.category} · stock {p.stock}{p.featured ? " · featured" : ""}
                  </div>
                </div>
                <button onClick={() => { setEditing(p.id); setForm({
                  name: p.name, description: p.description ?? "", category: p.category,
                  price_cents: p.price_cents ?? 0, currency: p.currency, image_url: p.image_url,
                  sort_order: p.sort_order, featured: p.featured, stock: p.stock ?? 0,
                  offer_price_cents: p.offer_price_cents,
                  offer_starts_at: p.offer_starts_at,
                  offer_ends_at: p.offer_ends_at,
                }); }} className="text-xs text-cognac underline">Edit</button>
                <button onClick={() => confirm(`Delete ${p.name}?`) && delMut.mutate(p.id)}
                  className="text-xs text-destructive underline">Delete</button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Inquiries */}
      <section className="mt-16">
        <h2 className="font-display text-2xl">Inquiries ({inquiriesQuery.data?.length ?? 0})</h2>
        <div className="mt-5 space-y-3">
          {(inquiriesQuery.data ?? []).map((i: any) => (
            <div key={i.id} className="border border-border bg-card p-4">
              <div className="flex items-baseline justify-between">
                <div className="font-medium">{i.name} <span className="text-muted-foreground">· {i.email}</span></div>
                <time className="text-xs text-muted-foreground">{new Date(i.created_at).toLocaleString()}</time>
              </div>
              {i.phone && <div className="text-xs text-muted-foreground">{i.phone}</div>}
              <p className="mt-2 whitespace-pre-wrap text-sm">{i.message}</p>
            </div>
          ))}
          {inquiriesQuery.data && inquiriesQuery.data.length === 0 && (
            <p className="text-sm text-muted-foreground">No inquiries yet.</p>
          )}
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-16">
        <h2 className="font-display text-2xl">Customer Reviews ({reviewsQuery.data?.length ?? 0})</h2>
        <p className="text-xs text-muted-foreground">New reviews wait here until you approve them.</p>
        <div className="mt-5 space-y-3">
          {(reviewsQuery.data ?? []).map((r: Review) => {
            const productName = productsQuery.data?.find((p) => p.id === r.product_id)?.name ?? r.product_id;
            return (
              <div key={r.id} className="border border-border bg-card p-4">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="font-medium">
                    {r.name} <span className="text-muted-foreground">· {"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)} · {productName}</span>
                  </div>
                  <time className="text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString()}</time>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm">{r.comment}</p>
                <div className="mt-3 flex items-center gap-3 text-xs">
                  <span className={r.approved ? "text-green-700" : "text-amber-700"}>
                    {r.approved ? "Approved" : "Pending"}
                  </span>
                  <button onClick={() => approveMut.mutate({ id: r.id, approved: !r.approved })} className="text-cognac underline">
                    {r.approved ? "Unapprove" : "Approve"}
                  </button>
                  <button onClick={() => confirm("Delete review?") && deleteReviewMut.mutate(r.id)} className="text-destructive underline">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          {reviewsQuery.data && reviewsQuery.data.length === 0 && (
            <p className="text-sm text-muted-foreground">No reviews yet.</p>
          )}
        </div>
      </section>

      <AdminEmailRotation
        onRequest={(new_email) => reqChange({ data: { new_email } })}
        onConfirm={(new_email, code) => confirmChange({ data: { new_email, code } })}
      />
    </div>
  );
}

function AdminEmailRotation({
  onRequest, onConfirm,
}: { onRequest: (e: string) => Promise<any>; onConfirm: (e: string, c: string) => Promise<any> }) {
  const [newEmail, setNewEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState(false);
  const req = useMutation({
    mutationFn: () => onRequest(newEmail),
    onSuccess: () => { setSent(true); toast.success("Code generated. Retrieve it from the server logs."); },
    onError: (e: Error) => toast.error(e.message),
  });
  const conf = useMutation({
    mutationFn: () => onConfirm(newEmail, code),
    onSuccess: () => {
      toast.success("Owner email updated. Sign in with the new email to continue.");
      setSent(false); setNewEmail(""); setCode("");
    },
    onError: (e: Error) => toast.error(e.message),
  });
  return (
    <section className="mt-16 max-w-xl border border-dashed border-cognac/40 bg-cognac/5 p-6">
      <h2 className="font-display text-2xl">Change admin email</h2>
      <p className="mt-2 text-xs text-muted-foreground">
        For security, rotating the owner email requires a 6-digit verification code.
        The code is written to the server logs — copy it from there, then confirm below.
        The new email must already have an account on this site.
      </p>
      <div className="mt-5 space-y-3">
        <Input label="New admin email" value={newEmail} onChange={setNewEmail} />
        <button
          type="button"
          onClick={() => req.mutate()}
          disabled={!newEmail || req.isPending}
          className="border border-input px-4 py-2 text-xs uppercase tracking-wider hover:bg-muted"
        >
          {req.isPending ? "…" : sent ? "Resend code" : "Send verification code"}
        </button>

        {sent && (
          <div className="space-y-3 pt-3">
            <Input label="Verification code" value={code} onChange={(v) => setCode(v.replace(/\D/g, "").slice(0, 6))} />
            <button
              type="button"
              onClick={() => conf.mutate()}
              disabled={code.length !== 6 || conf.isPending}
              className="bg-primary px-5 py-2 text-sm uppercase tracking-wider text-primary-foreground disabled:opacity-50"
            >
              {conf.isPending ? "…" : "Confirm change"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


function Input({ label, value, onChange, type = "text" }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <div>
      <label className="eyebrow block">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-cognac" />
    </div>
  );
}
