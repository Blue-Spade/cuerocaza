import { createServerFn } from "@tanstack/react-start";
import cardHolder2New from "@/assets/uploads/card-holder-10-3.jpeg.asset.json";
import belt1 from "@/assets/belts/belt-v3-1.asset.json";
import belt2 from "@/assets/belts/belt-v3-2.asset.json";
import belt3 from "@/assets/belts/belt-v3-3.asset.json";
import belt4 from "@/assets/belts/belt-v3-4.asset.json";
import belt5 from "@/assets/belts/belt-v3-5.asset.json";
import belt6 from "@/assets/belts/belt-v3-6.asset.json";
import belt7 from "@/assets/belts/belt-v3-7.asset.json";
import belt8 from "@/assets/belts/belt-v3-8.asset.json";
import belt9 from "@/assets/belts/belt-v3-9.asset.json";
import belt10 from "@/assets/belts/belt-v3-10.asset.json";
import belt11 from "@/assets/belts/belt-v3-11.asset.json";
import belt12 from "@/assets/belts/belt-v3-12.asset.json";
import belt13 from "@/assets/belts/belt-v3-13.asset.json";
import belt14 from "@/assets/belts/belt-v3-14.asset.json";

const beltAssets = [belt1, belt2, belt3, belt4, belt5, belt6, belt7, belt8, belt9, belt10, belt11, belt12, belt13, belt14];


export type Product = {
  id: string;
  name: string;
  description: string | null;
  category: string;
  price_cents: number | null;
  currency: string;
  image_url: string;
  sort_order: number;
  featured: boolean;
  stock: number;
  offer_price_cents: number | null;
  offer_starts_at: string | null;
  offer_ends_at: string | null;
};

export function isOfferActive(p: Pick<Product, "offer_price_cents" | "offer_starts_at" | "offer_ends_at">, now: Date = new Date()): boolean {
  if (p.offer_price_cents == null) return false;
  const t = now.getTime();
  if (p.offer_starts_at && new Date(p.offer_starts_at).getTime() > t) return false;
  if (p.offer_ends_at && new Date(p.offer_ends_at).getTime() < t) return false;
  return true;
}

export function effectivePriceCents(p: Product, now: Date = new Date()): number | null {
  return isOfferActive(p, now) ? p.offer_price_cents : p.price_cents;
}

const walletProducts: Product[] = Array.from({ length: 25 }, (_, index) => {
  const edition = index + 1;
  return {
    id: `00000000-0000-4000-8000-${String(edition).padStart(12, "0")}`,
    name: `Unisex Wallet — Edition ${String(edition).padStart(2, "0")}`,
    description: "Full-grain Italian leather unisex wallet, handcrafted in Dubai. Designed to age beautifully with daily use.",
    category: "unisex-wallets",
    price_cents: 14900,
    currency: "AED",
    image_url: `/products/wallets/wallet-${edition}.jpeg`,
    sort_order: 1000 + edition,
    featured: edition <= 2,
    stock: 3,
    offer_price_cents: null,
    offer_starts_at: null,
    offer_ends_at: null,
  };
});

const cardHolderProducts: Product[] = [
  ["00000000-0000-4001-8000-000000000001", "Brown Crunch Leather Unisex Card Holder", "/products/card-holders/card-holder-1.jpeg", 2001],
  ["00000000-0000-4001-8000-000000000002", "Tan Nappa Leather Unisex Card Holder with  cash keeping compartment", cardHolder2New.url, 2002],
  ["00000000-0000-4001-8000-000000000003", "Tan Nappa Leather Unisex Card Holder", "/products/card-holders/card-holder-3.jpeg", 2003],
  ["00000000-0000-4001-8000-000000000004", "Black & Brown Nappa Leather Unisex Card Holder with cash compartment & elastic gripper.", "/products/card-holders/card-holder-4.jpeg", 2004],
  ["00000000-0000-4001-8000-000000000005", "Black Nappa Leather Unisex Magic Card Holder with cash compartment", "/products/card-holders/card-holder-5.jpeg", 2005],
  ["00000000-0000-4001-8000-000000000006", "Black Nappa Leather Unisex Card Holder with cash compartment & button", "/products/card-holders/card-holder-6.jpeg", 2006],
  ["00000000-0000-4001-8000-000000000007", "Brown Nappa Leather Unisex Card Holder with cash compartment in the center", "/products/card-holders/card-holder-7.jpeg", 2007],
  ["00000000-0000-4001-8000-000000000008", "Black Nappa Leather Unisex Card Holder with cash compartment in the center", "/products/card-holders/card-holder-8.jpeg", 2008],
  ["00000000-0000-4001-8000-000000000009", "Black Nappa Leather Unisex Card Holder with cash compartment in the center.", "/products/card-holders/card-holder-9.jpeg", 2009],
  ["00000000-0000-4001-8000-000000000010", "Black Nappa Leather Unisex Card Holder with cash compartment in the center.", "/products/card-holders/card-holder-10.jpeg", 2010],
  ["00000000-0000-4001-8000-000000000011", "Brown Crunch Leather Unisex Card Holder", "/products/card-holders/card-holder-11.png", 2011],
].map(([id, name, image_url, sort_order]) => ({
  id: id as string,
  name: name as string,
  description: "Slim, full-grain Italian leather unisex card holder. Compact carry, refined finish.",
  category: "unisex-card-holders",
  price_cents: 9900,
  currency: "AED",
  image_url: image_url as string,
  sort_order: sort_order as number,
  featured: false,
  stock: 3,
  offer_price_cents: null,
  offer_starts_at: null,
  offer_ends_at: null,
}));

const beltProducts: Product[] = beltAssets.map((asset, i) => {
  const edition = i + 1;
  return {
    id: `00000000-0000-4002-8000-${String(edition).padStart(12, "0")}`,
    name: `Casual Men's Leather Belt — Edition ${String(edition).padStart(2, "0")}`,
    description: "Handcrafted full-grain leather belt for men — refined finish for daily wear.",
    category: "mens-belts",
    price_cents: 14900,
    currency: "AED",
    image_url: asset.url,
    sort_order: 3000 + edition,
    featured: false,
    stock: 3,
    offer_price_cents: null,
    offer_starts_at: null,
    offer_ends_at: null,
  };
});

const fallbackProducts: Product[] = [...walletProducts, ...cardHolderProducts, ...beltProducts].sort((a, b) => a.sort_order - b.sort_order);


export const listProducts = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );
    const { data, error } = await supabase
      .from("products")
      .select("id,name,description,category,price_cents,currency,image_url,sort_order,featured,stock,offer_price_cents,offer_starts_at,offer_ends_at")
      .order("sort_order", { ascending: true });
    if (error) throw new Error(error.message);
    return ((data ?? []) as Product[]).length ? (data as Product[]) : fallbackProducts;
  } catch (error) {
    console.error("[products] Falling back to bundled catalog", error);
    return fallbackProducts;
  }
});
