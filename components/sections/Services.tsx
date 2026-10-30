
"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowLeft, CheckCircle2, Code2, Globe, LifeBuoy, Server, ShieldCheck } from "lucide-react";

const ACCENT = "#C8FF4D";
const EASE = [0.16, 1, 0.3, 1] as const;
const TELEGRAM = "https://t.me/Hamed_hasouedi";

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 .55 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const CSS = `
@keyframes svc-beam { to { offset-distance: 100%; } }
.svc-beam {
  offset-path: rect(0 auto auto 0 round 24px);
  offset-anchor: 90% 50%;
  animation: svc-beam var(--svc-d, 8s) linear infinite;
}
@media (prefers-reduced-motion: reduce) { .svc-beam { animation: none; opacity: 0; } }
`;

type Pkg = {
  title: string;
  price: string;
  duration: string;
  features: [string, string, string];
  featured?: boolean;
};

type Tab = { id: string; label: string; icon: ReactNode; packages: Pkg[] };

const ic = { size: 16, strokeWidth: 1.8, "aria-hidden": true } as const;

const TABS: Tab[] = [
  {
    id: "web",
    label: "توسعه وب و بک‌اند",
    icon: <Code2 {...ic} />,
    packages: [
      {
        title: "طراحی و پیاده‌سازی پلتفرم کامل (SaaS)",
        price: "توافقی",
        duration: "7-15 روز",
        features: ["فرانت‌اند Next.js", "بک‌اند، دیتابیس کامل", "پنل ادمین"],
        featured: true,
      },
      {
        title: "معماری و پیاده‌سازی میکروسرویس",
        price: "توافقی",
        duration: "بر اساس پروژه",
        features: ["معماری با Go", "پیام‌رسان Kafka", "کش Redis، مقیاس‌پذیری بالا"],
      },
      {
        title: "طراحی و توسعه RESTful API",
        price: "توافقی",
        duration: "3-7 روز",
        features: ["مستندسازی با Swagger", "احراز هویت (JWT/OAuth)", "امنیت و Rate Limiting"],
      },
      {
        title: "ساخت ربات تلگرام / بله + مینی‌اپ",
        price: "4,500,000 تومان",
        duration: "3-5 روز",
        features: ["پنل مدیریت ربات", "درگاه پرداخت", "اعلان و پیام‌رسانی خودکار"],
      },
      {
        title: "طراحی دیتابیس و API برای اپلیکیشن",
        price: "توافقی",
        duration: "3-7 روز",
        features: ["مدل‌سازی و نرمال‌سازی", "ایندکس‌گذاری و بهینه‌سازی کوئری", "مایگریشن و بکاپ"],
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps (زیرساخت)",
    icon: <Server {...ic} />,
    packages: [
      {
        title: "راه‌اندازی CI/CD کامل",
        price: "توافقی",
        duration: "3-5 روز",
        features: ["GitHub Actions / GitLab CI", "استقرار بدون Downtime", "Rollback خودکار"],
      },
      {
        title: "کانتینرسازی و Kubernetes",
        price: "توافقی",
        duration: "5-10 روز",
        features: ["Docker و Helm Chart", "Autoscaling", "محیط‌های Staging و Production"],
      },
      {
        title: "زیرساخت به‌صورت کد",
        price: "توافقی",
        duration: "4-8 روز",
        features: ["Terraform و Ansible", "محیط‌های یکسان و تکرارپذیر", "مدیریت State امن"],
      },
      {
        title: "مانیتورینگ و لاگ‌گیری",
        price: "توافقی",
        duration: "2-4 روز",
        features: ["Prometheus و Grafana", "لاگ متمرکز با Loki", "هشدار در تلگرام"],
      },
    ],
  },
  {
    id: "devsecops",
    label: "DevSecOps",
    icon: <ShieldCheck {...ic} />,
    packages: [
      {
        title: "امن‌سازی پایپ‌لاین CI/CD",
        price: "توافقی",
        duration: "3-6 روز",
        features: ["اسکن ایمیج با Trivy", "SAST و بررسی وابستگی‌ها", "Gate امنیتی قبل از Deploy"],
        featured: true,
      },
      {
        title: "مدیریت Secrets و دسترسی‌ها",
        price: "توافقی",
        duration: "2-5 روز",
        features: ["Vault یا Secret Manager", "چرخش خودکار کلیدها", "اصل حداقل دسترسی"],
        featured: true,
      },
      {
        title: "سخت‌سازی سرور و شبکه",
        price: "توافقی",
        duration: "2-4 روز",
        features: ["استانداردهای CIS", "فایروال و WAF", "امن‌سازی SSH و Audit"],
        featured: true,
      },
    ],
  },
  {
    id: "cms",
    label: "وردپرس و Odoo",
    icon: <Globe {...ic} />,
    packages: [
      {
        title: "سایت وردپرس اختصاصی",
        price: "توافقی",
        duration: "5-10 روز",
        features: ["قالب سفارشی", "سئوی فنی و سرعت بالا", "امنیت و بکاپ خودکار"],
      },
      {
        title: "پیاده‌سازی و استقرار Odoo",
        price: "توافقی",
        duration: "7-14 روز",
        features: ["ماژول فروش و انبار", "استقرار روی سرور اختصاصی", "انتقال داده‌ها"],
      },
      {
        title: "ماژول سفارشی Odoo",
        price: "توافقی",
        duration: "بر اساس پروژه",
        features: ["توسعه با Python", "اتصال به سرویس‌های بیرونی", "تست و مستندسازی"],
      },
    ],
  },
  {
    id: "support",
    label: "پشتیبانی ماهانه",
    icon: <LifeBuoy {...ic} />,
    packages: [
      {
        title: "پشتیبانی پایه",
        price: "توافقی",
        duration: "ماهانه",
        features: ["بروزرسانی و پچ امنیتی", "بکاپ و پایش وضعیت", "رفع باگ‌های جزئی"],
      },
      {
        title: "پشتیبانی پیشرفته",
        price: "توافقی",
        duration: "ماهانه",
        features: ["پایش ۲۴ ساعته و هشدار", "زمان پاسخ‌گویی تضمین‌شده", "گزارش ماهانه عملکرد"],
        featured: true,
      },
    ],
  },
];

const cardV: Variants = {
  rest: { y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
  hover: { y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } },
};
const glowV: Variants = {
  rest: { opacity: 0, transition: { duration: 0.3 } },
  hover: { opacity: 1, transition: { duration: 0.5 } },
};
const spotV: Variants = {
  rest: { opacity: 0, transition: { duration: 0.4 } },
  hover: { opacity: 1, transition: { duration: 0.6 } },
};
const checkV: Variants = {
  rest: { scale: 0.82, opacity: 0.55, color: "rgba(255,255,255,0.4)", transition: { duration: 0.25 } },
  hover: (i: number) => ({
    scale: 1,
    opacity: 1,
    color: ACCENT,
    transition: { type: "spring", stiffness: 520, damping: 14, delay: i * 0.07 },
  }),
};

const gridV: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
  exit: { opacity: 0, transition: { duration: 0.16 } },
};
const itemV: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

function MagneticCTA({ href, children }: { href: string; children: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLAnchorElement>(null);
  const nx = useMotionValue(0);
  const ny = useMotionValue(0);
  const spring = { stiffness: 220, damping: 18, mass: 0.4 };

  const textX = useSpring(useTransform(nx, [-1, 1], [-7, 7]), spring);
  const arrowX = useSpring(useTransform(nx, [-1, 1], [-14, 14]), spring);
  const arrowY = useSpring(useTransform(ny, [-1, 1], [-3, 3]), spring);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        nx.set(((e.clientX - r.left) / r.width) * 2 - 1);
        ny.set(((e.clientY - r.top) / r.height) * 2 - 1);
      }}
      onPointerLeave={() => {
        nx.set(0);
        ny.set(0);
      }}
      className="group/btn relative flex w-full items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.05] px-5 py-3.5 text-sm font-medium text-white/90 outline-none transition-colors duration-300 hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-[#C8FF4D]/70"
    >
      <motion.span style={{ x: textX }}>{children}</motion.span>
      <motion.span style={{ x: arrowX, y: arrowY }} className="text-white/60 transition-colors duration-300 group-hover/btn:text-[#C8FF4D]">
        <ArrowLeft size={16} strokeWidth={2} className="transition-transform duration-300 group-hover/btn:-translate-x-1" aria-hidden />
      </motion.span>
    </a>
  );
}

function ServiceCard({ pkg, index }: { pkg: Pkg; index: number }) {
  const reduced = useReducedMotion();
  const href = `${TELEGRAM}?text=${encodeURIComponent(`سلام، درباره «${pkg.title}» مشاوره می‌خواهم.`)}`;

  return (
    <motion.li variants={itemV} className="list-none">
      <motion.article
        variants={cardV}
        initial="rest"
        animate="rest"
        whileHover={reduced ? undefined : "hover"}
        className="relative h-full rounded-3xl"
      >
        <motion.span
          aria-hidden
          variants={glowV}
          className="pointer-events-none absolute inset-x-10 -bottom-5 h-16 rounded-full blur-2xl"
          style={{ background: "rgba(200,255,77,0.28)" }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.065) 0%, rgba(255,255,255,0.018) 55%, rgba(255,255,255,0.03) 100%)",
            backdropFilter: "blur(24px) saturate(150%)",
            WebkitBackdropFilter: "blur(24px) saturate(150%)",
            border: `1px solid ${pkg.featured ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)"}`,
            boxShadow: [
              "inset 0 1px 0 rgba(255,255,255,0.10)",
              "inset 0 0 0 1px rgba(255,255,255,0.02)",
              "inset 0 -28px 48px -24px rgba(0,0,0,0.65)",
              "0 30px 60px -34px rgba(0,0,0,0.95)",
            ].join(","),
          }}
        >
          <motion.span
            variants={spotV}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 90% at 0% 0%, rgba(200,255,77,0.13) 0%, rgba(255,255,255,0.05) 30%, transparent 60%)",
            }}
          />
          <span
            className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
            style={{ backgroundImage: NOISE, backgroundSize: "160px 160px" }}
          />
        </div>

        {pkg.featured && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              border: "1.5px solid transparent",
              maskClip: "padding-box, border-box",
              maskComposite: "intersect",
              maskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
              WebkitMaskClip: "padding-box, border-box",
              WebkitMaskComposite: "source-in",
              WebkitMaskImage: "linear-gradient(transparent, transparent), linear-gradient(#000, #000)",
            } as CSSProperties}
          >
            <span
              className="svc-beam absolute aspect-square w-28"
              style={
                {
                  background: `linear-gradient(to left, ${ACCENT}, rgba(200,255,77,0.35) 45%, transparent)`,
                  "--svc-d": "8s",
                  animationDelay: `${-index * 2.3}s`,
                } as CSSProperties
              }
            />
          </div>
        )}

        <div className="relative flex h-full flex-col p-7">
          <h3 className="text-[1.15rem] font-bold leading-snug text-white">{pkg.title}</h3>

          <div className="mt-5 flex items-center gap-3 font-mono text-[13px]">
            <span className="rounded-md bg-white/[0.07] px-3 py-1 text-white/70">{pkg.price}</span>
            <span className="text-white/45">{pkg.duration}</span>
          </div>

          <ul className="mt-6 space-y-3.5 text-[15px] text-white/75">
            {pkg.features.map((f, i) => (
              <li key={f} className="flex items-center gap-3">
                <motion.span custom={i} variants={checkV} className="grid shrink-0 place-items-center">
                  <CheckCircle2 size={18} strokeWidth={1.6} aria-hidden />
                </motion.span>
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <MagneticCTA href={href}>مشاوره و سفارش</MagneticCTA>
          </div>
        </div>
      </motion.article>
    </motion.li>
  );
}

export default function Services() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(TABS[0].id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = TABS.find((t) => t.id === active) ?? TABS[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = TABS.length;
    let next = -1;
    if (e.key === "ArrowLeft") next = (i + 1) % n;
    else if (e.key === "ArrowRight") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setActive(TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="services" dir="rtl" className="relative isolate overflow-hidden bg-[#0A0A0B] py-24 text-white">
      <style>{CSS}</style>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(45% 35% at 85% 12%, rgba(200,255,77,0.07), transparent 70%), radial-gradient(40% 40% at 10% 70%, rgba(255,255,255,0.04), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-8">
        <header className="max-w-2xl">
          <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)] font-extrabold leading-tight">خدمات و پکیج‌ها</h2>
          <p className="mt-4 leading-8 text-white/55">
            تمامی پکیج‌ها شامل ۷ روز پشتیبانی رایگان و مستندسازی کامل هستند. برای پروژه‌های بزرگ و سازمانی،
            قیمت و زمان‌بندی پس از جلسه مشاوره مشخص می‌شود.
          </p>
        </header>

        <div
          role="tablist"
          aria-label="دسته‌بندی خدمات"
          className="mt-10 flex max-w-full gap-1 overflow-x-auto rounded-full border border-white/[0.08] bg-white/[0.04] p-1.5 [&::-webkit-scrollbar]:hidden sm:w-fit"
          style={{ scrollbarWidth: "none", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}
        >
          {TABS.map((t, i) => {
            const on = t.id === active;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                id={`svc-tab-${t.id}`}
                aria-selected={on}
                aria-controls="svc-panel"
                tabIndex={on ? 0 : -1}
                onClick={() => setActive(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className="relative isolate shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF4D]/60"
              >
                {on && (
                  <motion.span
                    layoutId="services-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full"
                    style={{ background: ACCENT, boxShadow: "0 8px 30px -8px rgba(200,255,77,0.55)" }}
                    transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span
                  className={`flex items-center gap-2 transition-colors duration-200 ${
                    on ? "text-black" : "text-white/60 hover:text-white"
                  }`}
                >
                  {t.icon}
                  {t.label}
                </span>
              </button>
            );
          })}
        </div>

        <div role="tabpanel" id="svc-panel" aria-labelledby={`svc-tab-${current.id}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={current.id}
              variants={gridV}
              initial="hidden"
              animate="show"
              exit="exit"
              className="grid gap-6 p-0 md:grid-cols-2 lg:grid-cols-3"
            >
              {current.packages.map((pkg, i) => (
                <ServiceCard key={pkg.title} pkg={pkg} index={i} />
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
