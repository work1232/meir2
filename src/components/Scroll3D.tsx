import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

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
 * re-renders.
 *
 * NOTE: deliberately NOT gated on prefers-reduced-motion — many Windows
 * machines have OS animations off (the owner's included), which silently
 * hid every scroll effect. Scroll-linked motion only moves while the user
 * scrolls, so it stays.
 */
export function Scroll3D({ children, className }: Scroll3DProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 0 → section entering from the bottom, 0.5 → centered, 1 → leaving above.
  // Kept SUBTLE on purpose: neighbouring sections must stay clearly visible
  // so the page feels dense (several things on screen), not one floating card.
  const rotateX = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [6, 0, 0, -4]);
  const scale = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [0.975, 1, 1, 0.99]);
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0.88, 1, 1, 0.92]);

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
