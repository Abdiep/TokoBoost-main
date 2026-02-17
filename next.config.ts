import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [

      // Format: { source: 'Link Lama', destination: 'Link Baru', permanent: true }
      {
        source: '/flyer_promosi',
        destination: '/dashboard/flyer',
        permanent: true, // 301 Redirect (SEO Friendly)
      },
      {
        source: '/product_video',
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
        destination: '/dashboard/studio',
        permanent: true,
      },
      {
        source: '/cartoon_photo',
        destination: '/dashboard/cartoon',
        permanent: true,
      },
      {
        source: '/pre_wedding_image',
        destination: '/dashboard/prewedding',
        permanent: true,
      },
      {
        source: '/opening_video',
        destination: '/dashboard/opening',
        permanent: true,
      },
      {
        source: '/job_description',
        destination: '/dashboard/jobdesc',
        permanent: true,
      },
      {
        source: '/recipe',
        destination: '/dashboard/recipe',
        permanent: true,
      },
      // SOP tidak perlu karena path-nya sama (/sop -> /dashboard/sop jika kamu pindah ke dashboard)
      {
        source: '/sop',
        destination: '/dashboard/sop',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
