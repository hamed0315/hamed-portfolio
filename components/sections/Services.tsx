
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Server, Database, Globe, CheckCircle2, ArrowLeft, LifeBuoy, Code2, Terminal } from 'lucide-react';

const servicesData = {
  fullstack: {
    label: 'توسعه وب و بک‌اند',
    icon: <Code2 className="w-4 h-4" />,
    items: [
      { title: 'طراحی و پیاده‌سازی پلتفرم کامل (SaaS)', price: 'توافقی', time: '7-15 روز', features: ['فرانت‌اند Next.js', 'بک‌اند، دیتابیس کامل', 'پنل ادمین'] },
      { title: 'معماری و پیاده‌سازی میکروسرویس', price: 'توافقی', time: 'بر اساس پروژه', features: ['معماری با Go', 'پیام‌رسان Kafka', 'کش Redis، مقیاس‌پذیری بالا'] },
      { title: 'طراحی و توسعه RESTful API', price: 'توافقی', time: '3-7 روز', features: ['مستندسازی با Swagger', 'احراز هویت (JWT/OAuth)', 'امنیت و Rate Limiting'] },
      { title: 'ساخت ربات تلگرام / بله + مینی‌اپ', price: '4,500,000', time: '3-5 روز', features: ['بک‌اند Go', 'مینی‌اپ (Next.js)', 'اتصال به API پیام‌رسان'] },
      { title: 'طراحی دیتابیس و API برای اپلیکیشن', price: 'توافقی', time: '3-7 روز', features: ['طراحی معماری (Postgres)', 'توسعه API اختصاصی'] },
    ]
  },
  devops: {
    label: 'DevOps (زیرساخت)',
    icon: <Server className="w-4 h-4" />,
    items: [
      { title: 'راه‌اندازی سرور امن', price: '1,500,000', time: '1-3 روز', features: ['SSH Key', 'فایروال UFW', 'غیرفعال‌سازی root'] },
      { title: 'نصب Docker و Compose', price: '1,600,000', time: '1 روز', features: ['Docker Engine', 'کانفیگ Compose', 'پروژه تست'] },
      { title: 'نصب SSL رایگان', price: '1,200,000', time: '1 روز', features: ['Let\'s Encrypt', 'ریدایرکت HTTPS', 'تمدید خودکار'] },
      { title: 'دیپلوی اپ با Nginx', price: '2,800,000', time: '2 روز', features: ['داکرایز اپ', 'Reverse Proxy', 'Auto-Restart'] },
      { title: 'Hardening سرور', price: '2,000,000', time: '1-3 روز', features: ['Fail2ban', 'Sysctl', 'گزارش Lynis'] },
      { title: 'Monitoring (پایش)', price: '3,000,000', time: '1-3 روز', features: ['Prometheus', 'Grafana', 'هشدار تلگرام'] },
      { title: 'بکاپ خودکار و بازیابی', price: '2,500,000', time: '1-2 روز', features: ['بکاپ روزانه S3', 'تست بازیابی (DR)'] },
      { title: 'انتقال سرور (Migration)', price: '2,500,000', time: '1-2 روز', features: ['Zero-Downtime', 'تنظیم DNS'] },
      { title: 'پیاده‌سازی CI/CD', price: '4,000,000', time: '2-3 روز', features: ['GitHub Actions', 'دیپلوی خودکار'] },
      { title: 'پاکسازی بعد از هک', price: '5,000,000', time: '1-3 روز', features: ['بررسی نفوذ', 'پاکسازی بدافزار', 'گزارش'] },
    ]
  },
  devsecops: {
    label: 'DevSecOps',
    icon: <Shield className="w-4 h-4" />,
    items: [
      { title: 'خط تولید امن (CI/CD)', price: '3,500,000', time: '1-2 روز', features: ['اسکن Trivy', 'اسکن Gitleaks', 'GitHub Actions'], featured: true },
      { title: 'اسکن آسیب‌پذیری اپ', price: '4,500,000', time: '2-3 روز', features: ['تحلیل SAST', 'اسکن ایمیج داکر', 'رفع باگ'], featured: true },
    ]
  },
  wp_odoo: {
    label: 'وردپرس و Odoo',
    icon: <Globe className="w-4 h-4" />,
    items: [
      { title: 'وردپرس: بهینه‌سازی سرعت', price: '2,500,000', time: '1-2 روز', features: ['Core Web Vitals', 'کش سرور', 'رفع خطای 503'] },
      { title: 'وردپرس: رفع هک و امنیت', price: '3,500,000', time: '1-3 روز', features: ['پاکسازی بدافزار', 'امن‌سازی', 'فایروال'] },
      { title: 'وردپرس: انتقال سرور', price: '2,500,000', time: '1 روز', features: ['انتقال دیتابیس', 'تنظیم DNS', 'SSL جدید'] },
      { title: 'Odoo: استقرار و بهینه‌سازی', price: '8,500,000', time: '3-5 روز', features: ['Docker', 'بهینه‌سازی PostgreSQL', 'Redis Cache'] },
      { title: 'Odoo: امنیت و پایداری', price: '5,500,000', time: '2 روز', features: ['Hardening', 'بکاپ خودکار', 'Zero-Downtime'] },
    ]
  },
  support: {
    label: 'پشتیبانی ماهانه',
    icon: <LifeBuoy className="w-4 h-4" />,
    items: [
      { title: 'مراقبت ماهانه (پایه)', price: '1,500,000/ماه', time: 'ماهانه', features: ['آپدیت', 'مانیتورینگ', 'بکاپ', 'پشتیبانی تلگرام'] },
      { title: 'مراقبت ماهانه (حرفه‌ای)', price: '3,500,000/ماه', time: 'ماهانه', features: ['بهینه‌سازی', 'رفع مشکل', 'گزارش ماهانه'] },
    ]
  }
};

type TabKey = keyof typeof servicesData;

export default function Services() {
  const [activeTab, setActiveTab] = useState<TabKey>('fullstack'); // پیش‌فرض روی فول‌استک تنظیم شد

  return (
    <section id="services" className="py-24 px-6 max-w-7xl mx-auto relative z-10 bg-[#0A0A0B]">
      <div className="mb-12 flex flex-col items-start">
        <div className="text-[#C8FF4D] font-mono text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C8FF4D]" />
          SERVICES & PACKAGES
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          پکیج‌های تخصصی
        </h2>
        <p className="text-gray-400 max-w-2xl text-lg font-light">
          تمامی پکیج‌ها شامل 7 روز پشتیبانی رایگان و مستندسازی کامل هستند. برای پروژه‌های بزرگ و اختصاصی، جهت مشاوره و برآورد هزینه تماس بگیرید.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 mb-12">
        {(Object.keys(servicesData) as TabKey[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300
              ${activeTab === key 
                ? 'bg-[#C8FF4D] text-black shadow-[0_0_20px_rgba(200,255,77,0.2)]' 
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            {servicesData[key].icon}
            {servicesData[key].label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {servicesData[activeTab].items.map((service: any, index: number) => (
            <motion.div
              key={service.title}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`group relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between transition-colors duration-500
                ${service.featured 
                  ? 'bg-[#111114] border border-[#C8FF4D]/40 shadow-[0_0_30px_rgba(200,255,77,0.05)]' 
                  : 'bg-[#111114] border border-white/5 hover:border-white/20'}`}
            >
              {service.featured && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8FF4D]/10 blur-3xl rounded-full pointer-events-none" />
              )}

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  {service.featured && <Shield className="w-6 h-6 text-[#C8FF4D]" />}
                </div>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-6 font-mono">
                  <span className={`px-3 py-1 rounded-md ${service.featured ? 'bg-[#C8FF4D]/10 text-[#C8FF4D]' : 'bg-white/5'}`}>
                    {service.price === 'توافقی' ? 'توافقی' : `${service.price} تومان`}
                  </span>
                  <span>{service.time}</span>
                </div>

                <ul className="space-y-2 mb-8">
                  {service.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${service.featured ? 'text-[#C8FF4D]' : 'text-gray-600'}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="https://t.me/Hamed_hasouedi" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`relative z-10 flex items-center justify-between w-full p-3 rounded-xl text-sm font-medium transition-colors duration-300
                  ${service.featured 
                    ? 'bg-[#C8FF4D] text-black hover:bg-white' 
                    : 'bg-white/5 text-white hover:bg-white/10'}`}
              >
                {service.price === 'توافقی' ? 'مشاوره و سفارش' : 'ثبت سفارش'}
                <ArrowLeft className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
