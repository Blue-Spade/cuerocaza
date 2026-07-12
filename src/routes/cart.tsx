import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart, formatPrice } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart — Cuerocaza Italy" }] }),
  component: CartPage,
});

function CartPage() {
  const { items, setQty, remove, subtotalCents, clear } = useCart();
  const navigate = useNavigate();
  const currency = items[0]?.currency ?? "EUR";

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-display text-4xl md:text-5xl">Your Cart</h1>

      {items.length === 0 ? (
        <div className="mt-10 text-muted-foreground">
          Your cart is empty. <Link to="/products" className="border-b border-cognac text-cognac">Browse the collection</Link>.
        </div>
      ) : (
        <>
          <div className="mt-10 divide-y border-y">
            {items.map((i) => (
              <div key={i.id} className="flex items-center gap-4 py-5">
                <img src={i.image_url} alt={i.name} className="h-20 w-20 rounded object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-display text-lg truncate">{i.name}</div>
                  <div className="text-sm text-cognac">{formatPrice(i.price_cents, i.currency)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setQty(i.id, i.quantity - 1)} className="rounded border p-1.5"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="w-8 text-center text-sm">{i.quantity}</span>
                  <button onClick={() => setQty(i.id, i.quantity + 1)} className="rounded border p-1.5"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <button onClick={() => remove(i.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button onClick={clear} className="text-sm text-muted-foreground hover:text-foreground">Clear cart</button>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Subtotal</div>
              <div className="font-display text-3xl">{formatPrice(subtotalCents, currency)}</div>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Link to="/products" className="rounded border border-input px-5 py-3 text-sm">Continue shopping</Link>
            <button onClick={() => navigate({ to: "/checkout" })} className="rounded bg-cognac px-6 py-3 text-sm font-medium text-primary-foreground">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
