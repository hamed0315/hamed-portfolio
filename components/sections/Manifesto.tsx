
'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const text = "من به عنوان یک مهندس، به ساخت سیستم‌هایی اعتقاد دارم که نه تنها سریع و مقیاس‌پذیر باشند، بلکه از خط مقدم کد تا زیرساخت، کاملاً امن و پایدار باقی بمانند. تمرکز من بر اتوماسیون، امنیت خط تولید (DevSecOps) و پایداری زیرساخت‌های مدرن است.";

const words = text.split(" ");

export default function Manifesto() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.2"] // انیمیشن وقتی شروع میشه که بالای متن به 80% صفحه برسه
  });

  return (
    <section ref={container} className="py-32 px-6 max-w-5xl mx-auto relative z-10">
      <p className="text-2xl md:text-4xl lg:text-5xl leading-[1.6] font-medium text-center flex flex-wrap justify-center gap-x-3 gap-y-2">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
          );
        })}
      </p>
    </section>
  );
}

const Word = ({ children, progress, range }: { children: React.ReactNode, progress: any, range: [number, number] }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  const color = useTransform(progress, range, ["#333333", "#EDEDEF"]); // از خاکستری تیره به سفید
  
  return (
    <motion.span style={{ opacity, color }} className="inline-block">
      {children}
    </motion.span>
  );
};
