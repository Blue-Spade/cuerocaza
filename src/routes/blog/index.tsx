import { createFileRoute, Link } from "@tanstack/react-router";
import { BLOG_POSTS } from "@/data/blogPosts";
import { ArrowRight, Calendar, Clock, Sparkles, BookOpen } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Journal & Stories | CUEROCAZA — Spanish Soul & Italian Leather" },
      {
        name: "description",
        content: "Explore stories of Spanish passion, World Cup legacy, Italian leather craftsmanship, and luxury lifestyle guides from CUEROCAZA.",
      },
      { property: "og:title", content: "Journal & Stories | CUEROCAZA" },
      {
        property: "og:description",
        content: "What Spain’s World Cup win teaches us about craft, pride, and legacy — and how we build real leather goods to last.",
      },
      { property: "og:url", content: "/blog" },
      { property: "og:image", content: "/spain-world-cup-blog.png" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const featuredPost = BLOG_POSTS.find((p) => p.featured) || BLOG_POSTS[0];
  const regularPosts = BLOG_POSTS.filter((p) => p.id !== featuredPost.id);

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* JOURNAL HERO HEADER */}
      <section className="relative isolate overflow-hidden border-b border-border/60 bg-espresso py-16 md:py-24 text-cream">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-gilt/30 bg-gilt/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gilt">
            <BookOpen className="h-3.5 w-3.5" /> CUEROCAZA Journal
          </div>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl md:text-6xl tracking-tight text-cream">
            Stories of Craft, Passion &amp; Legacy
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base md:text-lg leading-relaxed text-cream/80">
            From Spain's champion spirit to Tuscany's leather ateliers. Explore our journal on handcrafted quality, Spanish soul, and timeless style.
          </p>
          <div className="mt-6 flex justify-center text-xs tracking-wider uppercase text-gilt">
            Visit our storefront at{" "}
            <a
              href="https://cuerocaza.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 underline font-semibold hover:text-cream transition-colors"
            >
              cuerocaza.com
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 pt-12">
        {/* FEATURED POST */}
        <section className="mb-16">
          <span className="eyebrow block mb-4">Featured Story</span>
          <div className="group overflow-hidden border border-border bg-card shadow-elev grid md:grid-cols-12 items-center transition hover:border-cognac/40">
            <div className="md:col-span-7 aspect-[16/10] md:aspect-auto md:h-full overflow-hidden relative">
              <img
                src={featuredPost.heroImage}
                alt={featuredPost.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-cognac text-white text-xs font-semibold uppercase tracking-wider px-3 py-1">
                {featuredPost.category}
              </div>
            </div>
            <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-between h-full">
              <div>
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-cognac" />
                    {featuredPost.publishedAt}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-cognac" />
                    {featuredPost.readTime}
                  </span>
                </div>

                <h2 className="font-display text-2xl md:text-3xl font-normal leading-tight text-foreground group-hover:text-cognac transition-colors">
                  <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-foreground/80 font-sans">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-foreground">
                    {featuredPost.author.name}
                  </div>
                  <div className="text-[11px] text-muted-foreground">
                    {featuredPost.author.role}
                  </div>
                </div>

                <Link
                  to="/blog/$slug"
                  params={{ slug: featuredPost.slug }}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-cognac group-hover:translate-x-1 transition-transform"
                >
                  Read Story <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* BRAND PROMISE / CTA */}
        <section className="bg-espresso text-cream p-8 md:p-12 border border-gilt/20 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <Sparkles className="h-8 w-8 text-gilt mx-auto mb-4" />
            <h3 className="font-display text-2xl md:text-3xl">Leather with Spanish Soul</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              CUEROCAZA blends Spanish heritage and passion with genuine Italian leather craftsmanship.
              Explore our full collection of wallets, passport covers, and custom gifts.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/products"
                className="bg-cognac hover:bg-cognac/90 text-white text-xs uppercase tracking-wider font-medium px-6 py-3 transition"
              >
                View Collection
              </Link>
              <a
                href="https://cuerocaza.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-cream/30 hover:border-cream text-cream text-xs uppercase tracking-wider font-medium px-6 py-3 transition"
              >
                Visituerocaza.com
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
