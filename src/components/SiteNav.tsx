import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag, Settings, User, Package, Sparkles, LogIn } from "lucide-react";
import { useCart } from "@/lib/cart";
const logoUrl = "/logo-genuine-leather.jpeg";

const links = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Collection" },
  { to: "/blog", label: "Journal" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 md:py-4">
        <Link to="/" aria-label="Cuerocaza — Home" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src={logoUrl}
            alt="Cuerocaza — Genuine Italian Leather Dubai"
            className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border border-border/40 shadow-sm transition-transform hover:scale-105 duration-300"
          />
          <span className="font-display text-base md:text-lg tracking-wider leading-none">
            CUEROCAZA<span className="text-cognac">.</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-wide text-foreground/70 transition-colors hover:text-cognac [&.active]:text-foreground"
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label={`Cart (${count} item${count === 1 ? "" : "s"})`}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition hover:bg-cognac/10 hover:text-cognac"
          >
            <ShoppingBag size={20} />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-cognac px-1 text-[10px] font-semibold text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
          <div className="relative">
            <button
              onClick={() => setSettingsOpen((v) => !v)}
              aria-label="Settings"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-foreground/80 transition hover:bg-cognac/10 hover:text-cognac"
            >
              <Settings size={20} />
            </button>
            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-30" onClick={() => setSettingsOpen(false)} />
                <div className="absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-md border border-border bg-popover shadow-elev">
                  <Link to="/auth" onClick={() => setSettingsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-cognac/5">
                    <LogIn size={16} className="text-cognac" /> Account / Sign in
                  </Link>
                  <Link to="/my-orders" onClick={() => setSettingsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-cognac/5">
                    <Package size={16} className="text-cognac" /> My Orders
                  </Link>
                  <Link to="/assistant" onClick={() => setSettingsOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm hover:bg-cognac/5">
                    <Sparkles size={16} className="text-cognac" /> Ask Cuerocaza AI
                  </Link>
                </div>
              </>
            )}
          </div>
          <button
            className="rounded p-2 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border/60 bg-background md:hidden">
          <div className="flex flex-col px-6 py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="py-2 text-sm tracking-wide text-foreground/80"
              >
                {l.label}
              </Link>
            ))}
            <Link to="/my-orders" onClick={() => setOpen(false)} className="py-2 text-sm tracking-wide text-foreground/80">My Orders</Link>
            <Link to="/assistant" onClick={() => setOpen(false)} className="py-2 text-sm tracking-wide text-foreground/80">Ask Cuerocaza AI</Link>
            <Link to="/auth" onClick={() => setOpen(false)} className="py-2 text-sm tracking-wide text-foreground/80">Account / Sign in</Link>
          </div>
        </nav>
      )}
    </header>
  );
}
