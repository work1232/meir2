import {
  useRef,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";

type MagneticProps = {
  children: ReactNode;
  className?: string;
  /** How far (px) the element is pulled toward the cursor. */
  strength?: number;
};

/**
 * "Magnetic" wrapper — the element gently drifts toward the cursor while the
 * pointer hovers near it, then springs back on leave. A small, premium touch
 * for primary buttons.
 *
 * Like TiltCard, it writes the transform straight to the DOM ref (no React
 * state), rAF-throttled, and no-ops on touch / reduced-motion devices.
 */
export function Magnetic({ children, className, strength = 8 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  const enabled = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(pointer: coarse)").matches) return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return false;
    return true;
  };

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled()) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    const dx = (mx / rect.width) * strength * 2;
    const dy = (my / rect.height) * strength * 2;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (frame.current) cancelAnimationFrame(frame.current);
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "inline-block transition-transform duration-300 ease-out will-change-transform",
        className
      )}
    >
      {children}
    </div>
  );
}
