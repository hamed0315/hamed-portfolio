
import type { Metadata } from 'next';
import { Vazirmatn } from 'next/font/google';
import './globals.css';

const vazirmatn = Vazirmatn({ subsets: ['arabic', 'latin'] });

export const metadata: Metadata = {
  title: 'Hamed | DevOps & Full-Stack Engineer',
  description: 'Building fast systems and the secure infrastructure behind them.',
  openGraph: {
    title: 'Hamed | DevOps & Full-Stack Engineer',
    description: 'Building fast systems and the secure infrastructure behind them.',
    url: 'https://hamed.dev', // بعداً با دامنه واقعی عوض کن
    siteName: 'Hamed Portfolio',
    images: [
      {
        url: '/og-image.jpg', // یک عکس 1200x630 از سایتت بگیر و توی پوشه public بذار
        width: 1200,
        height: 630,
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hamed | DevOps & Full-Stack Engineer',
    description: 'Building fast systems and the secure infrastructure behind them.',
    images: ['/og-image.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.className}>
      <body className="bg-[#0A0A0B] text-white antialiased selection:bg-[#C8FF4D] selection:text-black">
        {children}
      </body>
    </html>
  );
}
