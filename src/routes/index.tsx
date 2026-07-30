import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Truck, ShieldCheck, Banknote, Globe, Sparkles, ExternalLink } from "lucide-react";
import showroomImg from "@/assets/scenes/showroom-1.jpg";
import { useLanguage } from "@/lib/i18n";
import { VisitorCounter, useVisitorCount } from "@/components/VisitorCounter";

const heroImg = "/hero-banner-main.jpeg";
const storyImg = "/our-story-banner.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CUEROCAZA — Genuine Italian Leather Accessories & Personalised Gifts | www.cuerocaza.com" },
      { name: "description", content: "Shop genuine Italian leather wallets, passport covers, personalised gifts, and corporate leather accessories in Dubai & UAE. Born in Spain, crafted in Dubai. Official site: www.cuerocaza.com." },
      { property: "og:title", content: "CUEROCAZA — Genuine Italian Leather Accessories | www.cuerocaza.com" },
      { property: "og:description", content: "Genuine Italian leather wallets, personalised gifts, and corporate leather solutions across the UAE." },
      { property: "og:url", content: "https://www.cuerocaza.com" },
      { property: "og:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: "https://www.cuerocaza.com" }],
  }),
  component: Home,
});

const reviews = [
  { name: "Aisha R.", city: "Dubai", body: "Gifted a personalised wallet with my husband's initials — packaging and craftsmanship were stunning." },
  { name: "Rohit M.", city: "Abu Dhabi", body: "Ordered 60 branded passport covers for our team. Beautiful embossing, delivered on time." },
  { name: "Sara K.", city: "Sharjah", body: "The leather feels incredible and the patina after a few months is gorgeous. Worth every dirham." },
];

function Home() {
  const { t } = useLanguage();
  const { count } = useVisitorCount();

  const formattedCount = count.toLocaleString("en-US");

  const trustBadges = [
    { icon: Truck, title: t.craftedInDubai, subtitle: "Free UAE Delivery" },
    { icon: ShieldCheck, title: t.spanishCraftsmanship, subtitle: "Full-Grain Italian Hides" },
    { icon: Banknote, title: t.genuineItalianLeather, subtitle: "COD & Card Accepted" },
  ];

  return (
    <div>
      {/* SECTION 1 — HERO */}
      <section className="relative isolate overflow-hidden bg-espresso">
        <img src={heroImg} alt="From a small gift shop in Dubai Marina to premium Italian leather — Cuerocaza www.cuerocaza.com" className="block w-full h-auto" />
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

      {/* SECTION 2 — LIVE ROLLING VISITOR COUNTER FEATURE HIGHLIGHT */}
      <section className="bg-espresso text-cream py-12 px-6 border-y border-cognac/30">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center ltr:md:text-left rtl:md:text-right">
            <span className="eyebrow text-gilt flex items-center justify-center ltr:md:justify-start rtl:md:justify-start gap-2">
              <Sparkles size={16} /> {t.visitorCounterTitle}
            </span>
            <h2 className="font-display text-2xl md:text-3xl tracking-wide">
              {t.joiningOver} <span className="text-gilt font-bold font-mono">{formattedCount}+</span> {t.connoisseurs}
            </h2>
            <p className="text-sm text-cream/70 max-w-lg leading-relaxed">
              {t.counterDescription}
            </p>
          </div>

          <div>
            <VisitorCounter variant="badge" />
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR STORY */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div className="overflow-hidden shadow-elev md:sticky md:top-24 rounded-lg">
              <img
                src={storyImg}
                alt="From a small gift shop in Dubai Marina to Cuerocaza — our journey at www.cuerocaza.com"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <span className="eyebrow">{t.ourStory}</span>
              <h2 className="mt-3 font-display text-4xl md:text-5xl">{t.ourStoryTitle}</h2>
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
                Over time, leather became our obsession. We travelled, studied Spanish and Italian marroquinería traditions, and worked with master tanners
                to learn how full-grain Italian hides are cut, bevelled, edge-painted and stitched.
              </p>

              <h3 className="mt-8 font-display text-2xl md:text-3xl text-cognac">Today · The Premier Destination</h3>
              <p className="mt-3 text-base leading-relaxed text-foreground/85">
                CUEROCAZA is now Dubai's premier destination for handcrafted Italian leather accessories.
                We make wallets, passport covers, card holders, keychains, luggage tags, desk pieces, and
                personalised gifts — and partner with businesses, hotels, and real estate companies across the UAE.
              </p>

              <p className="mt-10 font-display text-xl italic text-cognac">"Italian craftsmanship, Dubai soul, Spanish spirit."</p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="inline-flex items-center rounded-none bg-cognac px-7 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:opacity-90">
                  {t.exploreCollection}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CORPORATE ORDERS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div className="aspect-[4/5] overflow-hidden order-2 md:order-1 rounded-lg">
            <img src={showroomImg} alt="Corporate leather gift sets in the Cuerocaza showroom www.cuerocaza.com" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="order-1 md:order-2">
            <span className="eyebrow">{t.corporateGifting}</span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl">{t.corporateGiftingTitle}</h2>
            <p className="mt-6 text-base leading-relaxed text-foreground/85">
              Looking for premium corporate gifts in Dubai? CUEROCAZA works with businesses, hotels, real estate
              companies, and organisations across the UAE to create personalised leather gifts for employees, clients,
              events, and special occasions.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/85">
              From branded wallets and passport covers to executive gift sets and customised accessories, we help businesses leave a lasting impression.
            </p>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-none bg-cognac px-7 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:opacity-90">
              <Building2 className="h-4 w-4" /> {t.requestCorporateQuote}
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8 — REVIEWS */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <span className="eyebrow">{t.customerReviewsTitle}</span>
          <h2 className="mt-3 font-display text-4xl md:text-5xl">{t.customerReviewsSubtitle}</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure key={r.name} className="flex h-full flex-col border border-border bg-card p-6 rounded-lg shadow-sm">
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
