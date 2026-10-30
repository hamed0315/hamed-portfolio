
import { Fragment, type CSSProperties } from "react";
import { Anton, Vazirmatn } from "next/font/google";
import { Send } from "lucide-react";
import DevOpsConstellation from "@/components/DevOpsConstellation";
import MagneticCTA from "@/components/ui/MagneticCTA";
import ScrambleText from "@/components/ui/ScrambleText";
import Services from "@/components/sections/Services";
import "./hero.css";

const vazir = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["400", "500", "700", "800"], display: "swap" });
const anton = Anton({ subsets: ["latin"], weight: "400", display: "swap", variable: "--font-ghost" });

const TELEGRAM_URL = "https://t.me/Hamed_hasouedi";

type W = { t: string; tone?: "accent" | "muted" };
const HEADLINE: W[] = [
  { t: "ساخت" }, { t: "سیستم‌های" }, { t: "سریع", tone: "accent" }, { t: "و" },
  { t: "زیرساخت‌های" }, { t: "امن", tone: "muted" }, { t: "و", tone: "muted" }, { t: "محکم.", tone: "muted" },
];

const vars = (o: Record<string, string | number>) => o as CSSProperties;
const focus = "outline-none focus-visible:ring-2 focus-visible:ring-[#C8FF4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A0A0B]";

export default function Page() {
  return (
    <main dir="rtl" className={`${vazir.className} ${anton.variable} relative min-h-screen overflow-x-clip bg-[#0A0A0B] text-white`}>
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 55% at 25% 45%, rgba(200,255,77,0.05), transparent 70%)" }} />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8">
        <header className="liquid-glass in-down mt-6 flex items-center justify-between rounded-2xl px-5 py-4 sm:px-8" style={vars({ "--d": "0ms" })}>
          <span className="text-xl font-extrabold tracking-wide" dir="ltr">DEV.LOG</span>
          <nav className="hidden items-center gap-10 text-sm text-white/60 md:flex">
            <a href="#services" className={`transition-colors hover:text-white ${focus}`}>خدمات</a>
            <a href="#work" className={`transition-colors hover:text-white ${focus}`}>نمونه کارها</a>
            <a href="#about" className={`transition-colors hover:text-white ${focus}`}>درباره من</a>
          </nav>
          <a href={TELEGRAM_URL} className={`btn-white ${focus}`}>
            <Send size={16} strokeWidth={1.8} aria-hidden />
            شروع گفتگو
          </a>
        </header>

        <section className="grid items-center gap-10 py-16 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-2 lg:gap-6 lg:py-10">
          <div className="lg:pe-6">
            <span dir="ltr" className="liquid-glass in-fade mb-10 inline-flex items-center gap-3 rounded-full px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-[#C8FF4D]" style={vars({ "--d": "150ms", "--rise": "12px" })}>
              <ScrambleText text="Available for Q1 2027" delay={450} />
              <span className="ping-dot" aria-hidden />
            </span>

            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-[1.25]">
              {HEADLINE.map((w, i) => (
                <Fragment key={i}>
                  <span className="mw">
                    <span className={`mw-i ${w.tone === "accent" ? "mw-accent" : ""} ${w.tone === "muted" ? "text-[#5E6573]" : ""}`} style={vars({ "--i": i })}>{w.t}</span>
                  </span>
                  {i < HEADLINE.length - 1 ? " " : null}
                </Fragment>
              ))}
            </h1>

            <p className="in-fade mt-8 max-w-[34rem] text-base leading-8 text-white/55" style={vars({ "--d": "1000ms" })}>
              توسعه‌دهنده فول‌استک، مهندس DevOps و بک‌اند با زبان Go. اینجا جایی است که ایده‌ها به کدهای مقیاس‌پذیر و پایپ‌لاین‌های امن تبدیل می‌شوند.
            </p>

            <div className="in-fade mt-10 flex flex-wrap items-center gap-4" style={vars({ "--d": "1200ms" })}>
              <MagneticCTA href={TELEGRAM_URL}>ثبت سفارش در تلگرام</MagneticCTA>
              <a href="#services" className={`liquid-glass liquid-glass--strong btn-glass ${focus}`}>مشاهده خدمات</a>
            </div>
          </div>

          <DevOpsConstellation />
        </section>
      </div>

      <Services />
    </main>
  );
}
