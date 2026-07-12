import { createFileRoute } from "@tanstack/react-router";
import sh1 from "@/assets/scenes/showroom-1.jpg";
import sh2 from "@/assets/scenes/showroom-2.jpg";

export const Route = createFileRoute("/showroom")({
  head: () => ({
    meta: [
      { title: "Showroom & Café — Cuerocaza Italy" },
      { name: "description", content: "Visit our walnut-panelled leather showroom and espresso bar in the heart of Florence." },
      { property: "og:image", content: typeof sh1 === "string" ? sh1 : "" },
    ],
  }),
  component: () => (
    <div>
      <section className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <img src={sh1} alt="The Cuerocaza showroom and café" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-6 pb-14">
          <span className="eyebrow text-gilt">Visit the House</span>
          <h1 className="mt-3 font-display text-5xl text-cream md:text-7xl">The Showroom & Café</h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-16 px-6 py-24 md:grid-cols-2 md:items-center">
        <div>
          <span className="eyebrow">The Room</span>
          <h2 className="mt-3 font-display text-4xl">A walnut library, a Marzocco espresso bar.</h2>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            We built the showroom inside a 17th-century palazzo a few streets behind the Duomo.
            Walnut shelves hold every wallet we make. Two tufted leather chairs sit by the arched
            windows. A marble counter at the back pulls espresso from a vintage La Marzocco — on
            the house, while you decide.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            There are no salespeople. Just Lorenzo, his daughter Anna and an espresso machine
            you can hear from the street. Come on a Tuesday afternoon — we'll have time to talk.
          </p>
        </div>
        <div className="overflow-hidden shadow-warm">
          <img src={sh2} alt="The marble café bar inside the showroom" loading="lazy" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="border-t border-border/60 bg-gradient-warm py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <span className="eyebrow">Find us</span>
          <p className="mt-4 font-display text-3xl leading-relaxed">
            Via dei Cimatori, 14r — Firenze<br />
            <span className="text-muted-foreground">Open Tue – Sat, 10:00 – 19:00</span>
          </p>
        </div>
      </section>
    </div>
  ),
});
