import { useEffect, useRef } from "react";
import {
  CalendarDays,
  Briefcase,
  HeartHandshake,
  Users,
  Star,
} from "lucide-react";
import { useLang } from "@/i18n/LanguageProvider";

const ICONS = [CalendarDays, Briefcase, HeartHandshake, Users, Star];

/**
 * Animated counter: counts from 0 to the number inside `value` (keeping any
 * prefix/suffix like "+", "%", "★") the first time it scrolls into view.
 * Direct DOM writes — no React re-renders while counting.
 */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const match = value.match(/\d+/);
    if (!match) {
      el.textContent = value;
      return;
    }
    const target = parseInt(match[0], 10);
    const render = (n: number) => {
      el.textContent = value.replace(match[0], String(n));
    };
    render(0);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1400;
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          // ease-out cubic
          render(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums" dir="ltr">
      {value}
    </span>
  );
}

/**
 * Stats band — a full-width strip of live-counting numbers with icons and
 * thin dividers (reference: NEXARCH stats row).
 */
export function StatsBand() {
  const { t } = useLang();

  return (
    <section aria-label="stats" className="border-y border-[#C58B47]/15 bg-[#E7C89B]/25 py-12 sm:py-16">
      <div className="container-x grid grid-cols-2 gap-y-10 md:grid-cols-5">
        {t.statsBand.map((stat, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div
              key={stat.label}
              className={`flex flex-col items-center gap-2.5 text-center ${
                i > 0 ? "md:border-s md:border-[#C58B47]/20" : ""
              } ${i === t.statsBand.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
            >
              <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <div className="font-display text-3xl font-bold text-foreground sm:text-4xl">
                <CountUp value={stat.value} />
              </div>
              <div className="text-xs text-muted-foreground sm:text-sm">
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
