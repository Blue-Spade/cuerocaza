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

        {/* ALL STORIES & GUIDES */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8 border-b border-border/60 pb-4">
            <div>
              <span className="eyebrow block">The Craft Journal</span>
              <h2 className="font-display text-2xl sm:text-3xl text-foreground">
                All Stories &amp; Guides
              </h2>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">
              {BLOG_POSTS.length} Stories
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.id}
                className="group border border-border bg-card flex flex-col justify-between overflow-hidden shadow-sm transition hover:border-cognac/50 hover:shadow-md"
              >
                <div>
                  <div className="aspect-[16/10] overflow-hidden relative bg-muted">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-cognac text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5">
                      {post.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-cognac" />
                        {post.publishedAt}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-cognac" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-display text-lg font-normal leading-snug text-foreground group-hover:text-cognac transition-colors">
                      <Link to="/blog/$slug" params={{ slug: post.slug }}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="mt-3 text-xs leading-relaxed text-foreground/75 font-sans line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                    <span className="font-medium text-muted-foreground">{post.author.name}</span>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="inline-flex items-center gap-1 font-semibold text-cognac group-hover:translate-x-0.5 transition-transform"
                    >
                      Read <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
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
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
