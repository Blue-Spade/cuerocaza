import { createFileRoute } from "@tanstack/react-router";
import f1 from "@/assets/scenes/factory-1.jpg";
import f2 from "@/assets/scenes/factory-2.jpg";

export const Route = createFileRoute("/factory")({
  head: () => ({
    meta: [
      { title: "The Atelier — Cuerocaza Italy" },
      { name: "description", content: "Inside the Cuerocaza atelier outside Florence — where every wallet is hand-cut and stitched." },
      { property: "og:image", content: typeof f1 === "string" ? f1 : "" },
    ],
  }),
  component: () => (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={f1} alt="An artisan stitching a leather wallet" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-6 pb-14">
          <span className="eyebrow text-gilt">The Maker</span>
          <h1 className="mt-3 font-display text-5xl text-cream md:text-7xl">The Atelier</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden shadow-warm md:order-2">
          <img src={f2} alt="The factory floor: hides, presses and finished wallets" loading="lazy" className="h-full w-full object-cover" />
        </div>
        <div>
          <span className="eyebrow">Heritage</span>
          <h2 className="mt-3 font-display text-4xl">Built in 1962. Run by the third generation.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            A short drive from Florence, our atelier still smells the way it did sixty years ago —
            of vegetable-tanned hide, beeswax and the faint metallic warmth of an old leather press.
            Seven artisans share the floor with two vintage Singer machines and a brass cutting
            press built in Bologna in the 1950s.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            We never make more than sixteen wallets a week. Each piece passes through six pairs
            of hands before it earns its little orange tag.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-espresso py-20 text-cream">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-3">
          {[
            { n: "01", t: "Selecting", b: "Full-grain Tuscan hides chosen by hand from a tannery in Santa Croce sull'Arno." },
            { n: "02", t: "Cutting", b: "Each panel cut with a steel die under our 1950s Bolognese press." },
            { n: "03", t: "Stitching", b: "Saddle-stitched with waxed Italian linen thread — two needles, no shortcuts." },
          ].map((s) => (
            <div key={s.n}>
              <div className="font-display text-5xl text-gilt">{s.n}</div>
              <h3 className="mt-4 font-display text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.b}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  ),
});
