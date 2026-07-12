import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/_authenticated/my-orders")({
  head: () => ({ meta: [{ title: "My Orders — Cuerocaza" }] }),
  component: MyOrdersPage,
});

type OrderRow = {
  id: string;
  created_at: string;
  items: Array<{ name: string; quantity: number; price_cents: number | null; currency: string }>;
  subtotal_cents: number;
  currency: string;
  status: string;
  shipping_address: string;
};

function MyOrdersPage() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("id, created_at, items, subtotal_cents, currency, status, shipping_address")
        .order("created_at", { ascending: false });
      if (!error && data) setOrders(data as unknown as OrderRow[]);
      setLoading(false);
    })();
  }, []);

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <h1 className="font-display text-4xl md:text-5xl">My Orders</h1>
      <p className="mt-3 text-muted-foreground">All orders placed under your account.</p>

      {loading ? (
        <p className="mt-10 text-sm text-muted-foreground">Loading…</p>
      ) : orders.length === 0 ? (
        <div className="mt-10 rounded border border-dashed border-border p-10 text-center">
          <p className="text-muted-foreground">No orders yet.</p>
          <Link to="/products" className="mt-4 inline-block border-b border-cognac text-cognac">Browse the collection →</Link>
        </div>
      ) : (
        <div className="mt-10 space-y-5">
          {orders.map((o) => (
            <article key={o.id} className="rounded border border-border bg-card p-6">
              <header className="flex flex-wrap items-baseline justify-between gap-3">
                <div>
                  <p className="font-display text-lg">Order #{o.id.slice(0, 8).toUpperCase()}</p>
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">
                    {new Date(o.created_at).toLocaleString()} · {o.status}
                  </p>
                </div>
                <span className="font-display text-xl text-cognac">
                  {formatPrice(o.subtotal_cents, o.currency)}
                </span>
              </header>
              <ul className="mt-4 divide-y text-sm">
                {o.items?.map((i, idx) => (
                  <li key={idx} className="flex items-center justify-between py-2">
                    <span>{i.quantity}× {i.name}</span>
                    <span className="text-muted-foreground">{formatPrice((i.price_cents ?? 0) * i.quantity, i.currency)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">Shipping to: {o.shipping_address}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}