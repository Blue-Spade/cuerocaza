import { createFileRoute, Link } from "@tanstack/react-router";
import storyImageAsset from "@/assets/uploads/our-story-poster.jpeg.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "CUEROCAZA | Premium Italian Leather Accessories in Dubai" },
      { name: "description", content: "Discover the story behind CUEROCAZA, a Dubai-based brand offering genuine Italian leather wallets, personalised leather gifts, custom leather products, and corporate gifting solutions across the UAE." },
      { property: "og:title", content: "Our Story — CUEROCAZA" },
      { property: "og:description", content: "From a small gift shop in Dubai Marina to a premier Italian leather brand serving the UAE." },
      { property: "og:url", content: "/about" },
      { property: "og:image", content: storyImageAsset.url },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const socialLinks = [
  {
    name: "Facebook",
    handle: "Cuerocaza",
    href: "https://www.facebook.com/share/1BwPpZ5UZp/",
    icon: FacebookIcon,
  },
  {
    name: "Instagram",
    handle: "@cuerocaza",
    href: "https://www.instagram.com/cuerocaza?igsh=MXBjMWd1cm9zOG1xdQ==",
    icon: InstagramIcon,
  },
  {
    name: "YouTube",
    handle: "@cuerocaza",
    href: "https://www.youtube.com/@cuerocaza",
    icon: YouTubeIcon,
  },
  {
    name: "LinkedIn",
    handle: "Nasir J",
    href: "https://www.linkedin.com/in/nasir-j-realtor-with-integrity-5067b8143",
    icon: LinkedInIcon,
  },
  {
    name: "TikTok",
    handle: "@leather160",
    href: "https://www.tiktok.com/@leather160",
    icon: TikTokIcon,
  },
];

function openSocialLink(url: string) {
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.assign(url);
  }
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.06 2.06 0 11.001-4.121 2.06 2.06 0 010 4.121zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .78 0 1.74v20.51C0 23.21.79 24 1.77 24h20.45c.98 0 1.78-.79 1.78-1.75V1.74C24 .78 23.2 0 22.22 0z" />
    </svg>
  );
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .58.05.84.13V9.4a6.33 6.33 0 00-1-.05A6.34 6.34 0 005.78 21.1a6.34 6.34 0 0010.86-4.43V9.86a8.16 8.16 0 004.77 1.52V8a4.85 4.85 0 01-1.82-1.31z" />
    </svg>
  );
}

function AboutPage() {
  return (
    <div className="relative bg-background">
      {/* Plain header */}
      <section className="bg-espresso">
        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32">
          <span className="eyebrow text-gilt">Our Story</span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight text-cream md:text-6xl">
            Our Story — From Dubai Marina to CUEROCAZA
          </h1>
        </div>
      </section>

      <div className="bg-gradient-to-b from-background to-cream/40">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          {/* Photo at the top */}
          <div className="mb-12 overflow-hidden shadow-elev">
            <img
              src={storyImageAsset.url}
              alt="From a small gift shop to handcrafted Italian leather — my journey in Dubai"
              className="w-full object-contain"
            />
          </div>

          {/* Narrative */}
          <article className="text-base leading-relaxed text-foreground">
            <p className="font-display text-3xl text-foreground">
              Italian craftsmanship, Dubai soul.
            </p>

            <h2 className="mt-10 font-display text-3xl md:text-4xl text-cognac">2013 – 2015 · The Gift Shop</h2>
            <p className="mt-3 text-foreground/85">
              CUEROCAZA began as a small gift shop in Dubai Marina, tucked just behind Nando's. We sold
              souvenirs, keychains and little leather goods to travellers from every corner of the world.
              Those early years taught us what people remember about a place — the small, beautifully made
              things they carry home.
            </p>

            <h2 className="mt-10 font-display text-3xl md:text-4xl text-cognac">Crafted &amp; Perfected · Learning the Trade</h2>
            <p className="mt-3 text-foreground/85">
              Over time, leather became our obsession. We travelled, studied, and worked with master tanners
              and craftsmen to learn how full-grain Italian hides are cut, bevelled, edge-painted and
              stitched. We sourced only premium Italian leather and refused to compromise on any seam, edge or thread.
            </p>

            <h2 className="mt-10 font-display text-3xl md:text-4xl text-cognac">Launched Online · Cuerocaza.com</h2>
            <p className="mt-3 text-foreground/85">
              As demand grew beyond the gift shop, we expanded into a full digital storefront so customers
              across the UAE could explore our collection, customise their pieces, and place corporate
              orders without leaving their desk.
            </p>

            <h2 className="mt-10 font-display text-3xl md:text-4xl text-cognac">Today · The Premier Destination</h2>
            <p className="mt-3 text-foreground/85">
              CUEROCAZA is now Dubai's premier destination for handcrafted Italian leather accessories.
              We make wallets, passport covers, card holders, keychains, luggage tags, desk pieces, and
              personalised gifts — and partner with businesses, hotels, and real estate companies across the UAE
              on bespoke corporate gifting at any scale.
            </p>

            <p className="mt-12 font-display text-2xl italic text-cognac">
              "Italian craftsmanship, Dubai soul."
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/products" className="inline-flex items-center rounded-none bg-cognac px-7 py-3 text-sm font-medium uppercase tracking-wider text-primary-foreground transition hover:opacity-90">
                Shop the Collection
              </Link>
              <Link to="/contact" className="inline-flex items-center rounded-none border border-cognac px-7 py-3 text-sm font-medium uppercase tracking-wider text-cognac transition hover:bg-cognac/5">
                Request a Corporate Quote
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* Social links */}
      <section className="bg-espresso">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="flex flex-col items-center text-center">
            <span className="eyebrow text-gilt">Follow Our Journey</span>
            <h2 className="mt-3 font-display text-3xl text-cream md:text-4xl">
              Stay connected with CUEROCAZA
            </h2>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-5 md:gap-8">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${link.name} profile (${link.handle})`}
                    title={`${link.name}: ${link.handle}`}
                    onClick={(e) => {
                      e.preventDefault();
                      openSocialLink(link.href);
                    }}
                    className="group flex items-center gap-2 rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-cream transition hover:border-gilt hover:text-gilt"
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{link.handle}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
