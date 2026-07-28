import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag, Settings, Package, Sparkles, LogIn, Globe, Check } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useLanguage, type Language } from "@/lib/i18n";

const logoUrl = "/logo-genuine-leather.jpeg";

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const { count } = useCart();
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { to: "/", label: t.navHome },
    { to: "/products", label: t.navCollection },
    { to: "/blog", label: t.navJournal },
    { to: "/contact", label: t.navContact },
  ] as const;

  const languages: { code: Language; label: string; flag: string; country: string }[] = [
    { code: "en", label: "English", flag: "🇬🇧", country: "Global" },
    { code: "ar", label: "العربية", flag: "🇦🇪", country: "Dubai / UAE" },
    { code: "es", label: "Español", flag: "🇪🇸", country: "Spain" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3 md:py-4">
        
        {/* Logo */}
        <Link to="/" aria-label="Cuerocaza — Home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoUrl}
            alt="Cuerocaza — Genuine Italian Leather Dubai & Spain"
            className="h-11 w-11 md:h-13 md:w-13 rounded-full object-cover border border-border/40 shadow-sm transition-transform hover:scale-105 duration-300"
          />
          <span className="font-display text-base md:text-xl tracking-wider leading-none">
            CUEROCAZA<span className="text-cognac">.</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium tracking-wide text-foreground/80 transition-colors hover:text-cognac [&.active]:text-foreground [&.active]:font-semibold"
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Actions: Language Switcher, Cart, Settings */}
        <div className="flex items-center gap-2">
          
          {/* Language Switcher Button & Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setLangOpen((v) => !v);
                setSettingsOpen(false);
              }}
              aria-label="Change Language"
              className="inline-flex h-9 px-3 items-center gap-1.5 rounded-full border border-border/60 bg-secondary/50 text-xs font-medium text-foreground transition hover:bg-cognac/10 hover:text-cognac"
            >
              <Globe size={15} className="text-cognac" />
              <span className="uppercase font-semibold">{language}</span>
            </button>

            {langOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setLangOpen(false)} />
                <div className="absolute right-0 ltr:right-0 rtl:left-0 z-40 mt-2 w-52 overflow-hidden rounded-xl border border-border bg-popover shadow-elev p-1">
                  <div className="px-3 py-2 text-[11px] font-bold text-muted-foreground uppercase tracking-wider border-b border-border/40">
                    Select Language
                  </div>
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setLangOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-3 py-2.5 text-xs rounded-lg transition-colors ${
                        language === item.code ? "bg-cognac/15 text-cognac font-bold" : "hover:bg-accent"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{item.flag}</span>
                        <span>{item.label}</span>
                      </span>
                      <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        {item.country}
                        {language === item.code && <Check size={14} className="text-cognac ml-1" />}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Cart Icon */}
          <Link
            to="/cart"
            aria-label={`Cart (${count} item${count === 1 ? "" : "s"})`}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition hover:bg-cognac/10 hover:text-cognac"
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-cognac px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>

          {/* Settings Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setSettingsOpen((v) => !v);
                setLangOpen(false);
              }}
              aria-label="Settings"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-foreground/80 transition hover:bg-cognac/10 hover:text-cognac"
            >
              <Settings size={19} />
            </button>
            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setSettingsOpen(false)} />
                <div className="absolute right-0 ltr:right-0 rtl:left-0 z-40 mt-2 w-60 overflow-hidden rounded-xl border border-border bg-popover shadow-elev p-1">
                  <Link to="/auth" onClick={() => setSettingsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-cognac/5 rounded-lg">
                    <LogIn size={15} className="text-cognac" /> {t.navAccount}
                  </Link>
                  <Link to="/my-orders" onClick={() => setSettingsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-cognac/5 rounded-lg">
                    <Package size={15} className="text-cognac" /> {t.navOrders}
                  </Link>
                  <Link to="/assistant" onClick={() => setSettingsOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-xs font-medium hover:bg-cognac/5 rounded-lg">
                    <Sparkles size={15} className="text-cognac" /> {t.navAiAssistant}
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="rounded-lg p-2 md:hidden hover:bg-accent"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Nav */}
      {open && (
        <nav className="border-t border-border/60 bg-background md:hidden">
          <div className="flex flex-col px-6 py-4 space-y-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm font-medium tracking-wide text-foreground/80 hover:text-cognac"
              >
                {l.label}
              </Link>
            ))}
            <div className="border-t border-border/40 pt-2 flex flex-col space-y-2 text-sm text-foreground/80">
              <Link to="/my-orders" onClick={() => setOpen(false)} className="py-1 flex items-center gap-2">
                <Package size={16} className="text-cognac" /> {t.navOrders}
              </Link>
              <Link to="/assistant" onClick={() => setOpen(false)} className="py-1 flex items-center gap-2">
                <Sparkles size={16} className="text-cognac" /> {t.navAiAssistant}
              </Link>
              <Link to="/auth" onClick={() => setOpen(false)} className="py-1 flex items-center gap-2">
                <LogIn size={16} className="text-cognac" /> {t.navAccount}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
