import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Truck, ShieldCheck, Banknote } from "lucide-react";
import showroomImg from "@/assets/scenes/showroom-1.jpg";
const heroImg = "/hero-banner-main.jpeg";
const storyImg = "/our-story-banner.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Premium Italian Leather Accessories & Personalised Gifts in Dubai | CUEROCAZA" },
      { name: "description", content: "Shop genuine Italian leather wallets, passport covers, personalised gifts, and corporate leather accessories in Dubai. Premium craftsmanship and custom leather products across the UAE." },
      { property: "og:title", content: "Premium Italian Leather Accessories & Personalised Gifts in Dubai | CUEROCAZA" },
      { property: "og:description", content: "Genuine Italian leather wallets, personalised gifts, and corporate leather solutions across the UAE." },
      { property: "og:url", content: "/" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const reviews = [
  { name: "Aisha R.", city: "Dubai", body: "Gifted a personalised wallet with my husband's initials — packaging and craftsmanship were stunning." },
  { name: "Rohit M.", city: "Abu Dhabi", body: "Ordered 60 branded passport covers for our team. Beautiful embossing, delivered on time." },
  { name: "Sara K.", city: "Sharjah", body: "The leather feels incredible and the patina after a few months is gorgeous. Worth every dirham." },
];

const trustBadges = [
  { icon: Truck, title: "Free Shipping in UAE", subtitle: "On every order" },
  { icon: ShieldCheck, title: "1 Year Warranty", subtitle: "Craftsmanship guaranteed" },
  { icon: Banknote, title: "COD Available", subtitle: "Pay on delivery" },
];


function Home() {
  return (
    <div>
      {/* SECTION 1 — HERO */}
      <section className="relative isolate overflow-hidden bg-espresso">
        <img src={heroImg} alt="From a small gift shop in Dubai Marina to premium Italian leather — Cuerocaza" className="block w-full h-auto" />
      </section>

      {/* TRUST BADGES */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-3">
          {trustBadges.map(({ icon: Icon, title, subtitle }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-cognac/10 text-cognac">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold uppercase tracking-wider">{title}</div>
                <div className="text-xs text-muted-foreground">{subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4b — OUR STORY (full content) */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="overflow-hidden shadow-elev md:sticky md:top-24">
              <img
                src={storyImg}
                alt="From a small gift shop in Dubai Marina to Cuerocaza — our journey"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <span className="eyebrow">Our Story</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">From Dubai Marina to CUEROCAZA</h2>
              <p className="mt-6 font-display text-2xl text-cognac italic">Italian craftsmanship, Dubai soul.</p>

              <h3 className="mt-10 font-display text-2xl md:text-3xl text-cognac">2013 – 2015 · The Gift Shop</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">
                CUEROCAZA began as a small gift shop in Dubai Marina, tucked just behind Nando's. We sold
                souvenirs, keychains and little leather goods to travellers from every corner of the world.
                Those early years taught us what people remember about a place — the small, beautifully made
                things they carry home.
              </p>

              <h3 className="mt-8 font-display text-2xl md:text-3xl text-cognac">Crafted &amp; Perfected · Learning the Trade</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">
                Over time, leather became our obsession. We travelled, studied, and worked with master tanners
                and craftsmen to learn how full-grain Italian hides are cut, bevelled, edge-painted and
                stitched. We sourced only premium Italian leather and refused to compromise on any seam, edge or thread.
              </p>

              <h3 className="mt-8 font-display text-2xl md:text-3xl text-cognac">
                Launched Online · <a href="https://cuerocaza.com" target="_blank" rel="noopener noreferrer" className="hover:underline text-cognac">Cuerocaza.com</a>
              </h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">
                As demand grew beyond the gift shop, we expanded into a full digital storefront so customers
                across the UAE could explore our collection, customise their pieces, and place corporate
                orders without leaving their desk.
              </p>

              <h3 className="mt-8 font-display text-2xl md:text-3xl text-cognac">Today · The Premier Destination</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">
                CUEROCAZA is now Dubai's premier destination for handcrafted Italian leather accessories.
                We make wallets, passport covers, card holders, keychains, luggage tags, desk pieces, and
                personalised gifts — and partner with businesses, hotels, and real estate companies across the UAE
                on bespoke corporate gifting at any scale.
              </p>

              <p className="mt-10 font-display text-xl italic text-cognac">"Italian craftsmanship, Dubai soul."</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center rounded-none bg-cognac px-7 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:opacity-90">
                  SHOP ONLINE
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CORPORATE ORDERS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="aspect-[4/5] overflow-hidden order-2 md:order-1">
            <img src={showroomImg} alt="Corporate leather gift sets in the Cuerocaza showroom" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="order-1 md:order-2">
            <span className="eyebrow">Corporate Gifting</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">Corporate Gifting & Bulk Orders</h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/85">
              Looking for premium corporate gifts in Dubai? CUEROCAZA works with businesses, hotels, real estate
              companies, and organisations across the UAE to create personalised leather gifts for employees, clients,
              events, and special occasions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/85">
              From branded wallets and passport covers to executive gift sets and customised accessories, we help businesses leave a lasting impression.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-none bg-cognac px-7 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:opacity-90">
              <Building2 className="h-4 w-4" /> Request a Corporate Quote
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — REVIEWS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">Customer Reviews</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">Words from our customers</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="flex h-full flex-col border border-border bg-card p-6">
              <div className="text-gilt">★★★★★</div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground/85">"{r.body}"</blockquote>
              <figcaption className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {r.name} · {r.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
