
'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import Services from '@/components/sections/Services';
import TechMarquee from '@/components/sections/TechMarquee';
import DevOpsConstellation from '@/components/DevOpsConstellation';

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col bg-[#0A0A0B] overflow-hidden">
      
      {/* نور پس‌زمینه بسیار ملایم */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(70% 55% at 25% 45%, rgba(200,255,77,0.03), transparent 70%)" }} />

      {/* نوبار شیشه‌ای */}
      <header className="fixed top-0 w-full px-6 pt-6 z-50">
        <div className="max-w-7xl mx-auto rounded-2xl px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <div className="font-bold tracking-tighter text-xl text-white" dir="ltr">DEV.LOG</div>
          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">خدمات</a>
            <a href="#work" className="hover:text-white transition-colors">نمونه کارها</a>
            <a href="#about" className="hover:text-white transition-colors">درباره من</a>
          </div>
          <a href="https://t.me/Hamed_hasouedi" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
            شروع گفتگو
            <Send size={16} />
          </a>
        </div>
      </header>

      {/* Hero Section با چیدمان کلود */}
      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-8 w-full z-10 flex-grow flex flex-col justify-center">
        <section className="grid items-center gap-10 py-24 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-2 lg:gap-6">
          
          {/* ستون متن (سمت راست در RTL) */}
          <div className="lg:pe-6">
            <span dir="ltr" className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#C8FF4D]/25 bg-[#C8FF4D]/[0.06] px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[#C8FF4D]">
              Available for Q1 2025
              <span className="size-1.5 rounded-full bg-[#C8FF4D] animate-pulse" />
            </span>

            <h1 className="text-[clamp(2.6rem,6vw,4.5rem)] font-extrabold leading-[1.2] tracking-tight mb-8 text-white">
              ساخت سیستم‌های <span className="text-[#C8FF4D]">سریع</span>
              <br />
              و زیرساخت‌های <span className="text-gray-500">امن و محکم.</span>
            </h1>

            <p className="max-w-[34rem] text-base leading-8 text-gray-400 font-light mb-10">
              توسعه‌دهنده فول‌استک، مهندس DevOps و بک‌اند با زبان Go. اینجا جایی است که
              ایده‌ها به کدهای مقیاس‌پذیر و پایپ‌لاین‌های امن تبدیل می‌شوند.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="https://t.me/Hamed_hasouedi" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-xl bg-[#C8FF4D] px-7 py-4 font-bold text-black transition-transform hover:-translate-y-1">
                ثبت سفارش در تلگرام
                <ArrowLeft size={18} />
              </a>
              <a href="#services" className="inline-flex items-center rounded-xl border border-white/15 px-7 py-4 font-medium text-gray-300 transition-colors hover:border-white/35">
                مشاهده خدمات
              </a>
            </div>
          </div>

          {/* ستون ویژوال (شبکه دواپس) */}
          <div className="hidden lg:block">
             <DevOpsConstellation />
          </div>
        </section>
      </div>

      {/* بخش‌های پایین */}
      <TechMarquee />
      <Services />
      
    </main>
  );
}
