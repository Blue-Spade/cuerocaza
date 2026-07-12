import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { useCart, formatPrice } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";

const OWNER_WHATSAPP = "971561153442"; // Cuerocaza owner

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Cash on Delivery | Cuerocaza" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, subtotalCents, clear } = useCart();
  const navigate = useNavigate();
  const currency = items[0]?.currency ?? "AED";
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", notes: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error("Your cart is empty"); return; }
    setSubmitting(true);

    const orderLines = items.map((i) => `• ${i.quantity} × ${i.name} — ${formatPrice((i.price_cents ?? 0) * i.quantity, i.currency)}`).join("\n");
    const summary = `New CUEROCAZA order (Cash on Delivery)\n\n${orderLines}\n\nSubtotal: ${formatPrice(subtotalCents, currency)}\n\nCustomer:\n${form.name}\n${form.email}\n${form.phone}\n\nDelivery address:\n${form.address}${form.notes ? `\n\nNotes:\n${form.notes}` : ""}`;

    // 1. Save the order so the owner has a record in the database
    const { data: userData } = await supabase.auth.getUser();
    const { error: orderErr } = await supabase.from("orders").insert({
      user_id: userData.user?.id ?? null,
      items: items as any,
      subtotal_cents: subtotalCents,
      currency,
      contact_name: form.name,
      contact_email: form.email,
      contact_phone: form.phone || null,
      shipping_address: form.address + (form.notes ? `\n\nNotes: ${form.notes}` : ""),
      payment_method: "cod",
      status: "pending",
    } as any);

    // 2. Also drop a copy in inquiries so it surfaces in the admin's inbox
    await supabase.from("inquiries").insert({
      name: form.name, email: form.email, phone: form.phone || null, message: summary,
    });

    setSubmitting(false);

    if (orderErr) {
      toast.error("Could not place order. Please try again or message us on WhatsApp.");
      return;
    }

    // 3. Hand the order to the owner's WhatsApp
    const waUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(summary)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");

    toast.success("Order placed! We'll confirm shortly. Pay cash on delivery.");
    clear();
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-display text-4xl md:text-5xl">Checkout</h1>
      <p className="mt-3 text-muted-foreground">Cash on Delivery across the UAE. Pay the courier when your order arrives.</p>

      {items.length === 0 ? (
        <div className="mt-10 text-muted-foreground">
          Nothing to check out. <Link to="/products" className="border-b border-cognac text-cognac">Browse the collection</Link>.
        </div>
      ) : (
        <div className="mt-10 grid gap-10 md:grid-cols-[1.3fr_1fr]">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-display text-2xl">Your details</h2>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name" className="w-full rounded border border-input bg-background px-4 py-3 text-sm" />
            <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" className="w-full rounded border border-input bg-background px-4 py-3 text-sm" />
            <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone (we'll call to confirm)" className="w-full rounded border border-input bg-background px-4 py-3 text-sm" />
            <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Full delivery address (building, area, emirate)" rows={4} className="w-full rounded border border-input bg-background px-4 py-3 text-sm" />
            <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Order notes (optional)" rows={2} className="w-full rounded border border-input bg-background px-4 py-3 text-sm" />

            <div className="rounded border border-cognac/30 bg-cognac/5 p-4">
              <div className="eyebrow text-cognac">Payment method</div>
              <p className="mt-1 text-sm font-medium">Cash on Delivery</p>
              <p className="mt-1 text-xs text-muted-foreground">Pay our courier in cash (AED) when your order is delivered.</p>
            </div>

            <button type="submit" disabled={submitting} className="w-full rounded bg-cognac px-6 py-3 text-sm font-medium text-primary-foreground disabled:opacity-60">
              {submitting ? "Placing order…" : "Place Order — Cash on Delivery"}
            </button>
            <p className="text-xs text-muted-foreground">
              On submit your order is saved and your phone's WhatsApp opens with the order summary to send to Cuerocaza for confirmation.
            </p>
          </form>

          <aside className="rounded border bg-secondary/30 p-6">
            <h2 className="font-display text-2xl">Order summary</h2>
            <ul className="mt-4 divide-y">
              {items.map((i) => (
                <li key={i.id} className="flex items-center justify-between py-3 text-sm">
                  <span className="truncate pr-3">{i.quantity}× {i.name}</span>
                  <span className="whitespace-nowrap text-cognac">{formatPrice((i.price_cents ?? 0) * i.quantity, i.currency)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl">{formatPrice(subtotalCents, currency)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Payment</span><span>Cash on Delivery</span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
