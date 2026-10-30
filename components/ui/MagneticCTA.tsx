
"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { ArrowLeft } from "lucide-react";
const PAD = 70;
const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
export default function MagneticCTA({ href, children }: { href: string; children: ReactNode }) {
  const wrap = useRef<HTMLSpanElement>(null);
  const spring = { stiffness: 180, damping: 15, mass: 0.5 };
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);
  const labelX = useTransform(x, (v) => v * 0.35);
  const labelY = useTransform(y, (v) => v * 0.35);
  const arrowX = useTransform(x, (v) => v * 0.7);
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    const onMove = (e: PointerEvent) => {
      const el = wrap.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const inside = Math.abs(dx) < r.width / 2 + PAD && Math.abs(dy) < r.height / 2 + PAD;
      x.set(inside ? clamp(dx / 4, 12) : 0);
      y.set(inside ? clamp(dy / 4, 8) : 0);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);
  return (
    <span ref={wrap} className="inline-block">
      <motion.a href={href} target="_blank" rel="noopener noreferrer" style={{ x, y }} className="btn-lime outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]">
        <motion.span style={{ x: labelX, y: labelY }}>{children}</motion.span>
        <motion.span style={{ x: arrowX }} aria-hidden className="grid place-items-center"><ArrowLeft size={18} strokeWidth={2.2} /></motion.span>
      </motion.a>
    </span>
  );
}
