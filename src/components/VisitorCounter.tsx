import React, { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { Users, TrendingUp } from "lucide-react";

const INITIAL_VISITOR_COUNT = 472005;
const STORAGE_KEY = "cuerocaza_visitor_count_v2";

let globalCount = INITIAL_VISITOR_COUNT;
let isInitialized = false;
let globalPulse = false;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((fn) => fn());
}

function initGlobalCounter() {
  if (isInitialized || typeof window === "undefined") return;
  isInitialized = true;

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed >= INITIAL_VISITOR_COUNT) {
        globalCount = parsed;
      }
    }

    // Increment for current session visit
    globalCount += 1;
    localStorage.setItem(STORAGE_KEY, globalCount.toString());
    notifyListeners();
  } catch (err) {
    console.warn("Storage access error:", err);
  }

  // Periodic traffic pulse simulation (12-27 seconds)
  setInterval(() => {
    globalCount += 1;
    try {
      localStorage.setItem(STORAGE_KEY, globalCount.toString());
    } catch (_) {}
    globalPulse = true;
    notifyListeners();

    setTimeout(() => {
      globalPulse = false;
      notifyListeners();
    }, 1200);
  }, Math.floor(Math.random() * 15000) + 12000);
}

export function useVisitorCount() {
  const [count, setCount] = useState<number>(INITIAL_VISITOR_COUNT);
  const [isPulse, setIsPulse] = useState<boolean>(false);

  useEffect(() => {
    initGlobalCounter();
    setCount(globalCount);
    setIsPulse(globalPulse);

    const onChange = () => {
      setCount(globalCount);
      setIsPulse(globalPulse);
    };

    listeners.add(onChange);
    return () => {
      listeners.delete(onChange);
    };
  }, []);

  return { count, isPulse };
}

interface VisitorCounterProps {
  variant?: "header" | "badge" | "banner";
  className?: string;
}

// Single Digit Roller Column
const RollerDigit: React.FC<{ digit: string }> = ({ digit }) => {
  const isNumber = !isNaN(parseInt(digit, 10));
  const numValue = isNumber ? parseInt(digit, 10) : 0;

  if (!isNumber) {
    return <span className="inline-block px-0.5 opacity-60">{digit}</span>;
  }

  return (
    <div className="relative inline-block h-[1.3em] overflow-hidden align-middle font-mono font-bold tracking-tighter">
      <div
        className="transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex flex-col items-center"
        style={{ transform: `translateY(-${numValue * 10}%)` }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <span key={n} className="h-[1.3em] flex items-center justify-center">
            {n}
          </span>
        ))}
      </div>
    </div>
  );
};

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  variant = "badge",
  className = "",
}) => {
  const { t } = useLanguage();
  const { count, isPulse } = useVisitorCount();

  // Format count into comma-separated string: "472,006"
  const formattedString = count.toLocaleString("en-US");
  const digits = formattedString.split("");

  if (variant === "header") {
    return (
      <div
        className={`inline-flex items-center gap-2 rounded-full border border-cognac/30 bg-espresso/80 px-3 py-1 text-xs text-cream shadow-sm backdrop-blur transition-all ${className}`}
        title={t.visitorCounterTitle}
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="text-[11px] font-medium text-cream/70 hidden sm:inline">
          {t.totalVisitorsServed}:
        </span>
        <div className={`flex items-center text-gilt transition-scale duration-300 ${isPulse ? "scale-105" : ""}`}>
          {digits.map((d, idx) => (
            <RollerDigit key={`${idx}-${d}`} digit={d} />
          ))}
        </div>
      </div>
    );
  }

  if (variant === "banner") {
    return (
      <div className={`w-full bg-gradient-to-r from-espresso via-[#2a1a14] to-espresso border-y border-cognac/30 py-2.5 px-4 text-cream ${className}`}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium tracking-wide text-cream/90">
              {t.brandName} · {t.domainName}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-cream/70 hidden md:inline">{t.visitorCounterTitle}:</span>
            <div className="flex items-center gap-1 bg-black/40 px-3 py-1 rounded-md border border-cognac/40 text-gilt font-mono text-sm tracking-wider shadow-inner">
              <Users size={14} className="text-cognac mr-1" />
              {digits.map((d, idx) => (
                <RollerDigit key={`${idx}-${d}`} digit={d} />
              ))}
            </div>
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              <TrendingUp size={12} /> {t.realtimePulse}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Default "badge" variant
  return (
    <div
      className={`inline-flex flex-col gap-1 rounded-xl border border-cognac/40 bg-espresso/95 p-4 shadow-warm text-cream ${className}`}
    >
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className="eyebrow text-[10px] text-gilt tracking-widest uppercase flex items-center gap-1.5">
          <Users size={14} className="text-cognac" /> {t.visitorCounterTitle}
        </span>
        <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
          {t.liveStatus}
        </span>
      </div>

      <div className="mt-1 flex items-baseline gap-2">
        <div className="flex items-center font-mono text-2xl md:text-3xl font-bold tracking-tight text-gilt">
          {digits.map((d, idx) => (
            <RollerDigit key={`${idx}-${d}`} digit={d} />
          ))}
        </div>
        <span className="text-xs text-cream/60">{t.usersJoined}</span>
      </div>

      <div className="mt-1 text-[11px] text-cream/50 flex items-center justify-between border-t border-cream/10 pt-2">
        <span>{t.verifiedEntryOdometer}</span>
        <span className="text-cognac font-mono text-[10px]">{t.realtimeTraffic}</span>
      </div>
    </div>
  );
};
