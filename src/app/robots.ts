import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'], // Jangan biarkan Google akses API internal
    },
    // Pastikan sitemap mengarah ke domain WWW juga
    sitemap: 'https://www.tokoboost.com/sitemap.xml',
  };
}