import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  async redirects() {
    return [
      // --- HALAMAN UTAMA ---
      {
        source: '/syarat-dan-ketentuan', 
        destination: '/terms',
        permanent: true,
      },
      {
        source: '/privasi', 
        destination: '/privacy',
        permanent: true,
      },
      {
        source: '/kontak', 
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/tentang', 
        destination: '/about',
        permanent: true,
      },
      {
        source: '/Dashboard', 
        destination: '/dashboard',
        permanent: true,
      },

      // --- TOOLS DASHBOARD (Perbaikan Tujuan) ---
      {
        source: '/flyer_promosi',
        destination: '/dashboard/flyer',
        permanent: true,
      },
      {
        source: '/video_produk',
        destination: '/dashboard/video',
        permanent: true,
      },
      {
        source: '/hook_video',
        destination: '/dashboard/hook',
        permanent: true,
      },
      {
        source: '/studio_photo',
        destination: '/dashboard/foto', // ✅ KOREKSI: Sesuai sitemap (/foto)
        permanent: true,
      },
      {
        source: '/kartun_photo',
        destination: '/dashboard/cartoon',
        permanent: true,
      },
      {
        source: '/pre-wedding_image',
        destination: '/dashboard/wedding', // ✅ KOREKSI: Sesuai sitemap (/wedding)
        permanent: true,
      },
      {
        source: '/opening_video_youtube',
        destination: '/dashboard/opening',
        permanent: true,
      },
      {
        source: '/job_description',
        destination: '/dashboard/jobdesc',
        permanent: true,
      },
      {
        source: '/resep',
        destination: '/dashboard/recipe',
        permanent: true,
      },
      {
        source: '/sop',
        destination: '/dashboard/sop',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;