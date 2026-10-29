
'use client';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, Terminal, ShieldCheck, Server } from 'lucide-react';
import Services from '@/components/sections/Services';
import TechMarquee from '@/components/sections/TechMarquee';

const EASE = [0.16, 1, 0.3, 1];

export default function Home() {
  return (
    <main className="min-h-screen relative flex flex-col bg-[#0A0A0B] overflow-hidden">
      
      {/* نوبار شیشه‌ای */}
      <header className="fixed top-0 w-full px-6 pt-6 z-50">
        <div className="max-w-7xl mx-auto rounded-2xl px-6 py-4 flex justify-between items-center bg-black/40 backdrop-blur-md border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
          <div className="font-bold tracking-tighter text-xl text-white">DEV.LOG</div>
          <div className="hidden md:flex gap-8 text-sm text-gray-400">
            <a href="#services" className="hover:text-white transition-colors">خدمات</a>
            <a href="#work" className="hover:text-white transition-colors">نمونه کارها</a>
            <a href="#about" className="hover:text-white transition-colors">درباره من</a>
          </div>
          <a href="https://t.me/YourUsername" target="_blank" rel="noopener noreferrer" className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-2">
            شروع گفتگو
            <Send size={16} />
          </a>
        </div>
      </header>

      {/* Hero Section - چیدمان دو ستونه */}
      <div className="min-h-screen max-w-7xl w-full mx-auto px-6 pt-32 flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
        
        {/* ستون راست: متن‌ها */}
        <div className="w-full lg:w-1/2 flex flex-col items-start pt-10 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8FF4D]/10 border border-[#C8FF4D]/20 text-[#C8FF4D] font-mono text-xs tracking-widest uppercase mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8FF4D] animate-pulse" />
            Available for Q1 2025
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1, ease: EASE }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.2] tracking-tight mb-6 text-white"
          >
            ساخت سیستم‌های <span className="text-[#C8FF4D]">سریع</span><br />
            و زیرساخت‌های <span className="text-gray-500">امن و محکم.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}
            className="text-base md:text-lg text-gray-400 max-w-lg font-light leading-relaxed mb-10"
          >
            توسعه‌دهنده فول‌استک، مهندس DevOps و بک‌اند با زبان Go. 
            اینجا جایی است که ایده‌ها به کدهای مقیاس‌پذیر و پایپ‌لاین‌های امن تبدیل می‌شوند.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a href="https://t.me/YourUsername" target="_blank" rel="noopener noreferrer" className="bg-[#C8FF4D] text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform flex items-center gap-2">
              ثبت سفارش در تلگرام <ArrowLeft size={18} />
            </a>
            <a href="#services" className="text-gray-300 px-6 py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors font-medium">
              مشاهده خدمات
            </a>
          </motion.div>
        </div>

        {/* ستون چپ: پنجره ترمینال */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="w-full lg:w-1/2 relative hidden lg:block"
        >
          {/* هاله نور پشت ترمینال */}
          <div className="absolute inset-0 bg-[#C8FF4D]/10 blur-[100px] rounded-full" />
          
          <div className="relative rounded-2xl border border-white/10 bg-[#0A0A0B] overflow-hidden shadow-2xl">
            {/* هدر ترمینال */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="text-xs text-gray-400 font-mono flex items-center gap-2">
                <Terminal size={14} /> bash — 80x24
              </div>
            </div>
            
            {/* بدنه ترمینال */}
            <div className="p-6 font-mono text-sm text-gray-300 leading-loose" dir="ltr">
              <p><span className="text-[#C8FF4D]">hamid@dev</span>:<span className="text-blue-400">~/infrastructure</span>$ docker compose up -d</p>
              <p className="text-gray-500">[+] Running 3/3</p>
              <p className="text-green-400"> ✔ Network secure_net     Created</p>
              <p className="text-green-400"> ✔ Container go_backend   Started</p>
              <p className="text-green-400"> ✔ Container nginx_proxy  Started</p>
              <br />
              <p><span className="text-[#C8FF4D]">hamid@dev</span>:<span className="text-blue-400">~/security</span>$ trivy image go_backend:latest</p>
              <p className="text-gray-500">2025-03-24T10:00:00Z INFO Scanning...</p>
              <p className="text-green-400 flex items-center gap-2">
                <ShieldCheck size={16} /> Total: 0 (CRITICAL: 0, HIGH: 0)
              </p>
              <br />
              <p><span className="text-[#C8FF4D]">hamid@dev</span>:<span className="text-blue-400">~</span>$ <span className="animate-pulse">_</span></p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* نوار متحرک تکنولوژی‌ها */}
      <TechMarquee />

      {/* بخش خدمات با تب‌ها */}
      <Services />
      
    </main>
  );
}
