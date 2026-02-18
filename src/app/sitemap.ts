import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Gunakan WWW sesuai list kamu biar konsisten
  const baseUrl = 'https://www.tokoboost.com'; 

  // 1. Daftar Halaman Statis (Utama)
  const staticPages = [
    '',             // Homepage
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/disclaimer',
    '/affiliate',
  ];

  // 2. Daftar Tools di Dashboard
  const dashboardTools = [
    '/dashboard',          // Dashboard Utama
    '/dashboard/flyer',
    '/dashboard/video',
    '/dashboard/foto',
    '/dashboard/wedding',
    '/dashboard/cartoon',
    '/dashboard/hook',
    '/dashboard/opening',
    '/dashboard/recipe',
    '/dashboard/sop',
    '/dashboard/jobdesc',
  ];

  // 3. Generate Sitemap Array
  const routes = [
    ...staticPages.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1 : 0.8, // Homepage prioritas 1, lainnya 0.8
    })),
    ...dashboardTools.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const, // Dashboard sering update fitur
      priority: 0.7,
    })),
  ];

  return routes;
}