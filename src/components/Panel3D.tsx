import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/useIsMobile";

type Panel3DProps = {
  children: ReactNode;
  className?: string;
  /** Starting Y-rotation in degrees (sign controls the side it swings from). */
  from?: number;
};

/**
 * "Museum panel": the element starts slightly rotated away in 3D (like a
 * painting seen from the side while walking a gallery) and smoothly aligns
 * to face the visitor as it scrolls toward the center of the viewport.
 *
 * Desktop-only by design (plain div on mobile / reduced-motion) — part of the
 * hybrid 3D-journey: full depth on desktop, light and fast on phones.
 */
export function Panel3D({ children, className, from = 10 }: Panel3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateY = useTransform(scrollYProgress, [0, 1], [from, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  if (isMobile) {
    // Keep the ref attached so useScroll always has a real target (otherwise
    // framer warns "target ref not hydrated" on every render).
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ perspective: "1200px" }}>
      <motion.div
        style={{
          rotateY,
          opacity,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
