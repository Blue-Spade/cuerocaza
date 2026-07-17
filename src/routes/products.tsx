import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBag, Zap, X, ZoomIn } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useMemo, useState } from "react";
import { listProducts, isOfferActive, effectivePriceCents, resolveImageUrl } from "@/lib/products.functions";
import { useCart, formatPrice } from "@/lib/cart";
import { useAllReviews, ProductReviewsBlock } from "@/components/ProductReviews";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "Italian Leather Wallets, Belts, Passport Covers & Gifts | CUEROCAZA Dubai" },
      { name: "description", content: "Shop genuine Italian leather wallets, men's casual belts, card holders, passport covers and personalised gifts in Dubai." },
    ],
  }),
  component: ProductsPage,
});

const CATEGORY_ORDER: { slug: string; label: string }[] = [
  { slug: "unisex-wallets", label: "Unisex Wallets" },
  { slug: "unisex-card-holders", label: "Unisex Card Holders" },
  { slug: "mens-belts", label: "Casual Men's Leather Belts" },
  { slug: "wallets", label: "Italian Leather Wallets" },
  { slug: "passport-covers", label: "Passport Covers" },
  { slug: "card-holders", label: "Card Holders" },
  { slug: "keychains", label: "Keychains" },
  { slug: "luggage-tags", label: "Luggage Tags" },
  { slug: "desk-accessories", label: "Leather Desk Accessories" },
  { slug: "personalised-gifts", label: "Personalised Gifts" },
];


function ProductsPage() {
  const fetchProducts = useServerFn(listProducts);
  const { data: products = [], isLoading } = useQuery({ queryKey: ["products"], queryFn: () => fetchProducts() });
  const { data: reviews = [] } = useAllReviews();
  const { add } = useCart();
  const navigate = useNavigate();
  const [active, setActive] = useState<string>("all");
  const [zoom, setZoom] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setZoom(null); };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [zoom]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof products>();
    for (const p of products) {
      const arr = map.get(p.category) ?? [];
      arr.push(p);
      map.set(p.category, arr);
    }
    return map;
  }, [products]);

  const visibleCategories = active === "all"
    ? CATEGORY_ORDER.filter((c) => grouped.has(c.slug))
    : CATEGORY_ORDER.filter((c) => c.slug === active);

  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <header className="mb-16 max-w-2xl">
        <span className="eyebrow">The Collection</span>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">Explore Our Collection</h1>
        <p className="mt-5 text-muted-foreground">
          Genuine Italian leather wallets, men's casual belts, card holders, passport covers and
          personalised gifts — handcrafted in Dubai for the UAE.
        </p>
      </header>

      <div className="mb-12 flex flex-wrap gap-2">
        <button
          onClick={() => setActive("all")}
          className={`px-4 py-2 text-xs uppercase tracking-wider transition ${active === "all" ? "bg-cognac text-primary-foreground" : "border border-border bg-card hover:border-cognac"}`}
        >
          All
        </button>
        {CATEGORY_ORDER.filter((c) => grouped.has(c.slug)).map((c) => (
          <button
            key={c.slug}
            onClick={() => setActive(c.slug)}
            className={`px-4 py-2 text-xs uppercase tracking-wider transition ${active === c.slug ? "bg-cognac text-primary-foreground" : "border border-border bg-card hover:border-cognac"}`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {isLoading && <p className="text-muted-foreground">Loading collection…</p>}

      <div className="space-y-20">
        {visibleCategories.map((cat) => {
          const items = grouped.get(cat.slug) ?? [];
          if (!items.length) return null;
          return (
            <section key={cat.slug} id={cat.slug}>
              <div className="mb-8 flex items-end justify-between border-b border-border pb-3">
                <h2 className="font-display text-3xl md:text-4xl">{cat.label}</h2>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{items.length} pieces</span>
              </div>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => {
                  const onOffer = isOfferActive(p);
                  const priceNow = effectivePriceCents(p);
                  const outOfStock = (p.stock ?? 0) <= 0;
                  
                  const handleAdd = () => {
                    if (outOfStock) return;
                    add({ id: p.id, name: p.name, price_cents: priceNow, currency: p.currency, image_url: resolveImageUrl(p.image_url) });
                    toast.success(`${p.name} added to cart`);
                  };
                  const handleBuy = () => {
                    if (outOfStock) return;
                    add({ id: p.id, name: p.name, price_cents: priceNow, currency: p.currency, image_url: resolveImageUrl(p.image_url) });
                    navigate({ to: "/checkout" });
                  };
                  return (
                    <article key={p.id} className="group">
                      <div className="relative aspect-square overflow-hidden bg-secondary shadow-elev">
                        <button
                          type="button"
                          onClick={() => setZoom({ src: resolveImageUrl(p.image_url), alt: p.name })}
                          className="absolute inset-0 h-full w-full cursor-zoom-in"
                          aria-label={`View larger image of ${p.name}`}
                        >
                          <img src={resolveImageUrl(p.image_url)} alt={p.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                        </button>
                        <span className="pointer-events-none absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-espresso/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-cream opacity-0 shadow transition group-hover:opacity-100">
                          <ZoomIn className="h-3 w-3" /> Zoom
                        </span>
                        {onOffer && (
                          <span className="absolute left-3 top-3 rounded bg-cognac px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-foreground shadow">
                            Offer
                          </span>
                        )}
                        {outOfStock && (
                          <span className="absolute right-3 top-3 rounded bg-destructive px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-destructive-foreground shadow">
                            Sold out
                          </span>
                        )}
                      </div>
                      <div className="mt-5 space-y-3">
                        <h2 className="font-display text-2xl">{p.name}</h2>
                        {p.description && <p className="text-sm leading-relaxed text-muted-foreground">{p.description}</p>}
                        
                        <div className="flex items-baseline gap-2">
                          <div className="text-lg font-medium text-cognac">{formatPrice(priceNow, p.currency)}</div>
                          {onOffer && (
                            <div className="text-sm text-muted-foreground line-through">{formatPrice(p.price_cents, p.currency)}</div>
                          )}
                        </div>
                        <p className={`text-xs uppercase tracking-wider ${outOfStock ? "text-destructive" : "text-muted-foreground"}`}>
                          {outOfStock ? "Sold out" : `Only ${p.stock} piece${p.stock === 1 ? "" : "s"} available in stock`}
                        </p>
                        {onOffer && p.offer_ends_at && (
                          <OfferCountdown endsAt={p.offer_ends_at} />
                        )}
                        <div className="flex flex-col gap-2 pt-1">
                          <button
                            onClick={handleBuy}
                            disabled={outOfStock}
                            className="inline-flex items-center justify-center gap-2 rounded bg-cognac px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Zap className="h-4 w-4" /> {outOfStock ? "Sold out" : "Buy Now"}
                          </button>
                          <button
                            onClick={handleAdd}
                            disabled={outOfStock}
                            className="inline-flex items-center justify-center gap-2 rounded border border-cognac/40 px-4 py-2.5 text-sm font-medium text-cognac transition hover:bg-cognac/5 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <ShoppingBag className="h-4 w-4" /> Add to Cart
                          </button>
                        </div>
                        <ProductReviewsBlock productId={p.id} productName={p.name} reviews={reviews} />
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <div className="mt-12 text-center text-sm text-muted-foreground">
        <Link to="/cart" className="border-b border-cognac pb-0.5 text-cognac">View cart</Link>
      </div>

      {zoom && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={zoom.alt}
          onClick={() => setZoom(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-espresso/95 p-4 backdrop-blur-sm animate-fade-in"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setZoom(null); }}
            aria-label="Close image"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-cream/30 bg-espresso/60 text-cream transition hover:bg-gilt hover:text-espresso"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={zoom.src}
            alt={zoom.alt}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] object-contain shadow-elev animate-scale-in"
          />
        </div>
      )}
    </div>
  );
}

function OfferCountdown({ endsAt }: { endsAt: string }) {
  const end = useMemo(() => new Date(endsAt).getTime(), [endsAt]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (end - Date.now() <= 0) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [end]);
  const diff = end - now;
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return (
    <p className="text-xs uppercase tracking-wider text-cognac">
      Offer ends in {d > 0 ? `${d}d ` : ""}{String(h).padStart(2, "0")}:{String(m).padStart(2, "0")}:{String(sec).padStart(2, "0")}
    </p>
  );
}
