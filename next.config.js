
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',       // تبدیل به فایل‌های استاتیک
  images: { unoptimized: true }, // غیرفعال کردن بهینه‌سازی عکس
  trailingSlash: true,    // ساخت پوشه برای هر مسیر (خیلی مهم برای گیت‌هاب)
  
  // اگر روی ساب‌دامین گیت‌هاب هستی، این دو خط باید فعال باشن:
  basePath: '/YOUR_REPO_NAME', 
  assetPrefix: '/YOUR_REPO_NAME/',
};
export default nextConfig;
