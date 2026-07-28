import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/lib/i18n";
import { VisitorCounter } from "./VisitorCounter";
import { Globe, MapPin } from "lucide-react";

export function SiteFooter() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <footer className="mt-32 border-t border-border/60 bg-espresso">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        
        {/* Brand & Visitor Counter Column */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <Link to="/" className="inline-flex items-center gap-2">
              <span className="font-display text-2xl md:text-3xl tracking-wider text-cream">
                CUEROCAZA<span className="text-gilt">.</span>
              </span>
            </Link>
            <p className="mt-2 text-xs font-serif italic text-gilt/80">
              {t.tagline}
            </p>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-cream/70">
            {t.footerAboutText}
          </p>

          <p className="text-sm text-cream/70 flex items-center gap-2">
            <MapPin size={16} className="text-gilt flex-shrink-0" />
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("39 6th St - Al Murar - Dubai - United Arab Emirates")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gilt hover:underline"
            >
              {t.footerAddress}
            </a>
          </p>

          {/* Social Media Links */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://wa.me/971561153442"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp: +971 56 115 3442"
              title="WhatsApp: +971 56 115 3442"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366] text-white transition hover:opacity-90 shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M20.52 3.48A11.86 11.86 0 0012.05 0C5.5 0 .17 5.33.16 11.88c0 2.1.55 4.13 1.59 5.93L.06 24l6.32-1.65a11.88 11.88 0 005.68 1.44h.01c6.55 0 11.88-5.33 11.88-11.88a11.8 11.8 0 00-3.43-8.43zM12.07 21.8h-.01a9.85 9.85 0 01-5.03-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.84 9.84 0 01-1.51-5.27c0-5.44 4.43-9.87 9.88-9.87 2.64 0 5.12 1.03 6.98 2.9a9.79 9.79 0 012.9 6.98c0 5.45-4.43 9.88-9.88 9.88zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35z"/></svg>
            </a>
            <a
              href="https://www.facebook.com/share/1BwPpZ5UZp/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook: Cuerocaza"
              title="Facebook: Cuerocaza"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white transition hover:opacity-90 shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a
              href="https://www.instagram.com/cuerocaza?igsh=MXBjMWd1cm9zOG1xdQ=="
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram: @cuerocaza"
              title="Instagram: @cuerocaza"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#E1306C] text-white transition hover:opacity-90 shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a
              href="https://www.youtube.com/@cuerocaza"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube: @cuerocaza"
              title="YouTube: @cuerocaza"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FF0000] text-white transition hover:opacity-90 shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a
              href="https://www.tiktok.com/@leather160"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok: @leather160"
              title="TikTok: @leather160"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:opacity-90 shadow-sm"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.3 0 .58.05.84.13V9.4a6.33 6.33 0 00-1-.05A6.34 6.34 0 005.78 21.1a6.34 6.34 0 0010.86-4.43V9.86a8.16 8.16 0 004.77 1.52V8a4.85 4.85 0 01-1.82-1.31z"/></svg>
            </a>
          </div>

          {/* Visitor Counter Display Badge */}
          <div className="pt-2">
            <VisitorCounter variant="badge" />
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="eyebrow text-gilt">{t.footerExplore}</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/blog">{t.navJournal}</Link></li>
            <li><Link to="/products">{t.genuineItalianLeather}</Link></li>
            <li><Link to="/products">{t.navCollection}</Link></li>
            <li><Link to="/contact">{t.navContact}</Link></li>
          </ul>

          <div className="mt-8">
            <h4 className="eyebrow text-gilt flex items-center gap-1.5">
              <Globe size={14} /> Language
            </h4>
            <div className="mt-3 flex flex-col gap-2 text-xs text-cream/70">
              <button
                onClick={() => setLanguage("en")}
                className={`text-left rtl:text-right hover:text-gilt transition ${language === "en" ? "text-gilt font-bold" : ""}`}
              >
                🇬🇧 English (Global)
              </button>
              <button
                onClick={() => setLanguage("es")}
                className={`text-left rtl:text-right hover:text-gilt transition ${language === "es" ? "text-gilt font-bold" : ""}`}
              >
                🇪🇸 Español (España)
              </button>
              <button
                onClick={() => setLanguage("ar")}
                className={`text-left rtl:text-right hover:text-gilt transition ${language === "ar" ? "text-gilt font-bold" : ""}`}
              >
                🇦🇪 العربية (دبي)
              </button>
            </div>
          </div>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="eyebrow text-gilt">{t.footerHouse}</h4>
          <ul className="mt-4 space-y-2 text-sm text-cream/80">
            <li><Link to="/products">{t.navCollection}</Link></li>
            <li><Link to="/blog">{t.navJournal}</Link></li>
            <li><Link to="/contact">{t.navContact}</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-cream/10 px-6 py-6 text-center text-xs text-cream/50 max-w-7xl mx-auto">
        © {new Date().getFullYear()} {t.footerCopyright}
      </div>
    </footer>
  );
}
