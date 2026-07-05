import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type Scroll3DProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Scroll-linked 3D wrapper: as a section travels through the viewport it
 * tilts in from below (rotateX), settles flat while centered, then tilts
 * away as it leaves — giving the whole page a 3D-scroll feel.
 *
 * Performance: only transform/opacity are animated (GPU-composited, no
 * layout/paint), driven by framer-motion MotionValues that bypass React
 * re-renders. Respects prefers-reduced-motion by rendering a plain div.
 */
export function Scroll3D({ children, className }: Scroll3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 0 → section entering from the bottom, 0.5 → centered, 1 → leaving above.
  const rotateX = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [12, 0, 0, -9]);
  const scale = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [0.93, 1, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.5, 1, 1, 0.6]);

  if (reduceMotion) {
    // Keep the ref attached so useScroll always has a real target (otherwise
    // framer warns "target ref not hydrated" on every render).
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ perspective: "1400px" }}>
      <motion.div
        style={{
          rotateX,
          scale,
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
