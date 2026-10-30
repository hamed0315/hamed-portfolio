
"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import {
  animate,
  motion,
  motionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

const ACCENT = "#C8FF4D";
const EASE = [0.16, 1, 0.3, 1] as const;
const TILT = 0.62;

const icon = {
  width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

type NodeDef = {
  id: string; label: string; meta: string; radius: number; base: number; accent?: boolean; glyph: ReactNode;
};

const NODES: NodeDef[] = [
  { id: "docker", label: "Docker", meta: "containers", radius: 36, base: -90, glyph: (<svg {...icon}><path d="M3 12.5h18c-.4 4.6-3.6 7.5-8.5 7.5S4.2 17.4 3 12.5Z" /><rect x="5.5" y="8.5" width="3" height="3" /><rect x="9.5" y="8.5" width="3" height="3" /><rect x="13.5" y="8.5" width="3" height="3" /><rect x="9.5" y="4.5" width="3" height="3" /></svg>) },
  { id: "kubernetes", label: "Kubernetes", meta: "orchestration", radius: 28, base: 0, glyph: (<svg {...icon}><path d="M12 3l7.5 3.6 1.9 8.1-5.2 6.5H7.8L2.6 14.7l1.9-8.1z" /><circle cx="12" cy="12" r="2.4" /><path d="M12 9.6V6.5M14.1 10.8l2.7-1.5M14.1 13.2l2.7 1.5M12 14.4v3.1M9.9 13.2l-2.7 1.5M9.9 10.8 7.2 9.3" /></svg>) },
  { id: "postgres", label: "PostgreSQL", meta: "persistence", radius: 36, base: 90, glyph: (<svg {...icon}><ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6" /><path d="M4.5 12v6c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-6" /></svg>) },
  { id: "devsecops", label: "DevSecOps", meta: "0 critical", radius: 28, base: 180, accent: true, glyph: (<svg {...icon}><path d="M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6z" /><path d="M9 12l2.2 2.2L15.5 10" /></svg>) },
];

const STARS = Array.from({ length: 42 }, (_, i) => {
  const a = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  const b = Math.sin(i * 269.5 + 183.3) * 43758.5453;
  return { x: Number(((a - Math.floor(a)) * 100).toFixed(2)), y: Number(((b - Math.floor(b)) * 100).toFixed(2)), r: Number((0.12 + ((i * 7) % 5) * 0.05).toFixed(2)), o: Number((0.15 + ((i * 3) % 6) * 0.07).toFixed(2)) };
});

type NodeMotion = { appear: MotionValue<number>; x: MotionValue<number>; y: MotionValue<number>; left: MotionValue<string>; top: MotionValue<string>; scale: MotionValue<number>; opacity: MotionValue<number>; zIndex: MotionValue<number>; };

function useNode(i: number, rot: MotionValue<number>, expand: MotionValue<number>, mx: MotionValue<number>, my: MotionValue<number>, appear: MotionValue<number>): NodeMotion {
  const n = NODES[i];
  const p = useTransform([rot, expand, mx, my, appear], ([r, e, px, py, ap]: number[]) => {
      const a = ((n.base + r - (1 - ap) * 70) * Math.PI) / 180;
      const rad = n.radius * e * (0.2 + 0.8 * ap);
      const z = Math.sin(a);
      const depth = 1 + z;
      return { x: 50 + rad * Math.cos(a) + px * 2.2 * depth, y: 50 + rad * TILT * Math.sin(a) + py * 1.6 * depth, z, s: (0.86 + 0.07 * depth) * (0.6 + 0.4 * ap), o: ap * (0.6 + 0.2 * depth) };
    });
  return { appear, x: useTransform(p, (v) => v.x), y: useTransform(p, (v) => v.y), left: useTransform(p, (v) => `${v.x}%`), top: useTransform(p, (v) => `${v.y}%`), scale: useTransform(p, (v) => v.s), opacity: useTransform(p, (v) => v.o), zIndex: useTransform(p, (v) => Math.round(v.z * 10) + 10) };
}

function useConstellation(reduced: boolean) {
  const { scrollY } = useScroll();
  const spring = { stiffness: 60, damping: 20, mass: 0.8 };
  const scrollRot = useSpring(useTransform(scrollY, [0, 900], [0, 80]), spring);
  const expand = useSpring(useTransform(scrollY, [0, 900], [1, 1.1]), spring);
  const drift = useMotionValue(0);
  const rot = useTransform([scrollRot, drift], ([a, b]: number[]) => a + b);
  const px = useMotionValue(0), py = useMotionValue(0);
  const mx = useSpring(px, { stiffness: 70, damping: 18 }), my = useSpring(py, { stiffness: 70, damping: 18 });
  const coreAppear = useMemo(() => motionValue(0), []);
  const appear = useMemo(() => NODES.map(() => motionValue(0)), []);

  useEffect(() => {
    if (reduced) { coreAppear.set(1); appear.forEach((a) => a.set(1)); return; }
    const controls = [ animate(coreAppear, 1, { duration: 1.4, ease: EASE }), animate(drift, 360, { duration: 240, ease: "linear", repeat: Infinity }), ...appear.map((a, i) => animate(a, 1, { duration: 1.9, delay: 0.35 + i * 0.14, ease: EASE })) ];
    return () => controls.forEach((c) => c.stop());
  }, [reduced, coreAppear, appear, drift]);

  const nodes = NODES.map((_, i) => useNode(i, rot, expand, mx, my, appear[i])); // eslint-disable-line
  return { nodes, expand, px, py, coreAppear, coreX: useTransform(mx, (v) => 50 + v * 0.8), coreY: useTransform(my, (v) => 50 + v * 0.6), glowX: useTransform(mx, (v) => v * -14), glowY: useTransform(my, (v) => v * -10), ghostX: useTransform(mx, (v) => v * -18), ghostY: useTransform(my, (v) => v * -10) };
}

type Pt = { x: MotionValue<number>; y: MotionValue<number>; appear: MotionValue<number>; };

function Link({ a, b, packet, delay = 0, reduced }: { a: Pt; b: Pt; packet?: boolean; delay?: number; reduced: boolean; }) {
  const visible = useTransform([a.appear, b.appear], ([p, q]: number[]) => Math.min(p, q));
  const t = useMotionValue(0);
  useEffect(() => {
    if (!packet || reduced) return;
    const c = animate(t, 1, { duration: 2.6, delay: 2.4 + delay, repeat: Infinity, repeatDelay: 2.2, ease: "easeInOut" });
    return () => c.stop();
  }, [packet, reduced, delay, t]);
  const cx = useTransform([a.x, b.x, t], ([x1, x2, k]: number[]) => x1 + (x2 - x1) * k);
  const cy = useTransform([a.y, b.y, t], ([y1, y2, k]: number[]) => y1 + (y2 - y1) * k);
  const co = useTransform([t, visible], ([k, v]: number[]) => Math.sin(k * Math.PI) * v);
  return (
    <>
      <motion.line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={packet ? ACCENT : "#fff"} strokeOpacity={packet ? 0.38 : 0.1} strokeWidth={1} vectorEffect="non-scaling-stroke" style={{ opacity: visible }} />
      {packet && <motion.circle cx={cx} cy={cy} r={0.75} fill={ACCENT} style={{ opacity: co, filter: `drop-shadow(0 0 3px ${ACCENT})` }} />}
    </>
  );
}

function NodeCard({ def, m }: { def: NodeDef; m: NodeMotion }) {
  return (
    <motion.div className="absolute will-change-transform" style={{ left: m.left, top: m.top, x: "-50%", y: "-50%", scale: m.scale, opacity: m.opacity, zIndex: m.zIndex, width: "clamp(88px, 22cqw, 142px)" }}>
      <div className={`liquid-glass liquid-glass--node flex items-center gap-2.5 rounded-2xl p-[clamp(8px,1.8cqw,12px)] ${def.accent ? "liquid-glass--accent" : ""}`}>
        <span className="grid shrink-0 place-items-center rounded-lg" style={{ width: "clamp(28px, 6cqw, 36px)", height: "clamp(28px, 6cqw, 36px)", background: def.accent ? "rgba(200,255,77,0.1)" : "rgba(255,255,255,0.05)", color: def.accent ? ACCENT : "rgba(255,255,255,0.78)" }}>{def.glyph}</span>
        <span className="min-w-0 leading-tight">
          <span className="block truncate font-medium text-white/90" style={{ fontSize: "clamp(11px, 2.4cqw, 14px)" }}>{def.label}</span>
          <span className="hidden truncate font-mono min-[480px]:block" style={{ fontSize: "clamp(9px, 1.7cqw, 11px)", color: def.accent ? ACCENT : "rgba(255,255,255,0.4)" }}>{def.meta}</span>
        </span>
      </div>
    </motion.div>
  );
}

function Core({ x, y, appear, reduced }: { x: MotionValue<number>; y: MotionValue<number>; appear: MotionValue<number>; reduced: boolean; }) {
  const left = useTransform(x, (v) => `${v}%`), top = useTransform(y, (v) => `${v}%`);
  const scale = useTransform(appear, (v) => 0.55 + 0.45 * v);
  const size = "clamp(64px, 17cqw, 108px)";
  return (
    <motion.div className="absolute z-20 grid place-items-center" style={{ left, top, x: "-50%", y: "-50%", scale, opacity: appear, width: size, height: size }}>
      {!reduced && [0, 1].map((i) => <motion.span key={i} className="absolute inset-0 rounded-full" style={{ border: `1px solid ${ACCENT}` }} initial={{ scale: 1, opacity: 0 }} animate={{ scale: 2.4, opacity: [0, 0.35, 0] }} transition={{ duration: 4.5, delay: 1.8 + i * 2.25, repeat: Infinity, ease: "easeOut" }} />)}
      <span className="absolute rounded-full" style={{ inset: "-90%", background: `radial-gradient(closest-side, rgba(200,255,77,0.28), rgba(200,255,77,0) 70%)` }} />
      <span className="relative grid h-full w-full place-items-center rounded-full backdrop-blur-md" style={{ background: "rgba(10,10,11,0.72)", border: `1px solid rgba(200,255,77,0.55)`, boxShadow: `0 0 40px rgba(200,255,77,0.25), inset 0 0 24px rgba(200,255,77,0.12)` }}>
        <span className="font-mono font-semibold" style={{ color: ACCENT, fontSize: "clamp(20px, 5.2cqw, 32px)" }}>Go</span>
      </span>
      <span className="absolute top-[calc(100%+10px)] hidden whitespace-nowrap font-mono text-[10px] text-white/35 min-[480px]:block">go_backend</span>
    </motion.div>
  );
}

export default function DevOpsConstellation({ className = "" }: { className?: string }) {
  const reduced = !!useReducedMotion();
  const c = useConstellation(reduced);
  const corePt: Pt = { x: c.coreX, y: c.coreY, appear: c.coreAppear };
  return (
    <div dir="ltr" role="img" aria-label="نمودار شبکه زیرساخت: هسته Go متصل به Docker، Kubernetes، PostgreSQL و DevSecOps" className={`relative mx-auto aspect-square w-full max-w-[640px] touch-pan-y select-none ${className}`} style={{ containerType: "inline-size" }} onPointerMove={(e) => { if (reduced) return; const r = e.currentTarget.getBoundingClientRect(); c.px.set(((e.clientX - r.left) / r.width - 0.5) * 2); c.py.set(((e.clientY - r.top) / r.height - 0.5) * 2); }} onPointerLeave={() => { c.px.set(0); c.py.set(0); }}>
      <motion.div aria-hidden className="pointer-events-none absolute -inset-[18%]" style={{ x: c.glowX, y: c.glowY, WebkitMaskImage: "radial-gradient(closest-side, #000 50%, transparent 100%)", maskImage: "radial-gradient(closest-side, #000 50%, transparent 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(40% 40% at 50% 50%, rgba(200,255,77,0.09), transparent 70%), radial-gradient(60% 60% at 62% 38%, rgba(255,255,255,0.035), transparent 70%)" }} />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">{STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={s.o} />)}</svg>
      </motion.div>
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center" style={{ x: c.ghostX, y: c.ghostY, scale: c.expand }} initial={{ opacity: 0 }} animate={{ opacity: 0.13 }} transition={{ duration: 2.4, delay: 0.4, ease: EASE }}><span className="ghost-word">DevOps</span></motion.div>
      <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        <motion.g style={{ scale: c.expand }}>
          {[28, 36].map((r, i) => <motion.ellipse key={r} cx={50} cy={50} rx={r} ry={r * TILT} fill="none" stroke="#fff" strokeOpacity={0.07} strokeWidth={1} strokeDasharray={i ? "2 7" : undefined} vectorEffect="non-scaling-stroke" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.2 + i * 0.2 }} />)}
        </motion.g>
        {c.nodes.map((n, i) => <Link key={`ring-${i}`} a={n} b={c.nodes[(i + 1) % c.nodes.length]} reduced={reduced} />)}
        {c.nodes.map((n, i) => <Link key={`core-${i}`} a={corePt} b={n} packet delay={i * 0.9} reduced={reduced} />)}
      </svg>
      <Core x={c.coreX} y={c.coreY} appear={c.coreAppear} reduced={reduced} />
      {NODES.map((def, i) => <NodeCard key={def.id} def={def} m={c.nodes[i]} />)}
    </div>
  );
}
