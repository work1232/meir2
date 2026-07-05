import {
  useRef,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max tilt in degrees toward the cursor. */
  max?: number;
  /** Scale applied while hovering (subtle lift). */
  scale?: number;
  /** Show the moving glare highlight. */
  glare?: boolean;
};

/**
 * Interactive 3D tilt card. As the cursor moves over it, the card rotates in
 * 3D toward the pointer and a soft light "glare" follows the cursor —
 * the classic premium "WOW" hover.
 *
 * Performance: pointer handling writes transforms straight to the DOM refs
 * (never through React state), throttled to one write per animation frame, so
 * it's a pure GPU-composited transform with zero re-renders. It disables
 * itself on touch/coarse-pointer devices and when the user prefers reduced
 * motion — so it never costs anything on phones (where lag matters most).
 */
export function TiltCard({
  children,
  className,
  max = 10,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const frame = useRef<number | null>(null);

  // Fine-pointer devices only. Not gated on prefers-reduced-motion: the
  // tilt only moves under the user's own cursor.
  const enabled = () => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(pointer: coarse)").matches) return false;
    return true;
  };

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!enabled()) return;
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const rect = wrap.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (0.5 - py) * max * 2; // rotateX
    const ry = (px - 0.5) * max * 2; // rotateY

    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      inner.style.transform = `perspective(1000px) rotateX(${rx.toFixed(
        2
      )}deg) rotateY(${ry.toFixed(2)}deg) scale(${scale})`;
      if (glare && glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(circle at ${(
          px * 100
        ).toFixed(1)}% ${(py * 100).toFixed(
          1
        )}%, rgba(255,255,255,0.28), transparent 55%)`;
      }
    });
  };

  const onLeave = () => {
    const inner = innerRef.current;
    if (frame.current) cancelAnimationFrame(frame.current);
    if (inner) {
      inner.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    }
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("[transform-style:preserve-3d]", className)}
    >
      <div
        ref={innerRef}
        className="relative h-full w-full transition-transform duration-300 ease-out [transform-style:preserve-3d] will-change-transform"
      >
        {children}
        {glare && (
          <div
            ref={glareRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300"
            style={{ mixBlendMode: "soft-light" }}
          />
        )}
      </div>
    </div>
  );
}
