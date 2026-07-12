import { createFileRoute } from "@tanstack/react-router";
import s1 from "@/assets/scenes/sketch-1.jpg";
import s2 from "@/assets/scenes/sketch-2.jpg";

export const Route = createFileRoute("/sketches")({
  head: () => ({
    meta: [
      { title: "Sketchbook — Cuerocaza Italy" },
      { name: "description", content: "Every Cuerocaza wallet begins on paper — pencil, compass and a vegetable-tanned swatch." },
      { property: "og:image", content: typeof s1 === "string" ? s1 : "" },
    ],
  }),
  component: () => (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <header className="max-w-3xl">
        <span className="eyebrow">The Sketchbook</span>
        <h1 className="mt-3 font-display text-5xl md:text-6xl">It always starts on paper.</h1>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          Before the leather is cut, every wallet lives for weeks in Lorenzo's sketchbook —
          pencil, ink, dimensions in millimetres, notes about stitch pitch and edge bevel.
          The drawings on this page are still on the workbench. Some will become next season's
          pieces. Most will not.
        </p>
      </header>

      <div className="mt-16 grid gap-10 md:grid-cols-2">
        <figure className="overflow-hidden shadow-warm">
          <img src={s1} alt="Sketchbook with four hand-drawn wallet studies" loading="lazy" className="h-full w-full object-cover" />
          <figcaption className="border-t border-border bg-card p-5 text-sm">
            <span className="eyebrow">Plate I</span>
            <p className="mt-2">Studies for the Cordova Bifold — interior coin compartment, four-card stack.</p>
          </figcaption>
        </figure>
        <figure className="overflow-hidden shadow-warm">
          <img src={s2} alt="Detailed pencil sketch with dimensions and a leather swatch" loading="lazy" className="h-full w-full object-cover" />
          <figcaption className="border-t border-border bg-card p-5 text-sm">
            <span className="eyebrow">Plate II</span>
            <p className="mt-2">Bifold construction, exploded view. Cognac swatch from Tannery 14, Santa Croce.</p>
          </figcaption>
        </figure>
      </div>
    </div>
  ),
});
