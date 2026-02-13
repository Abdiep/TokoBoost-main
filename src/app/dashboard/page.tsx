// src/app/dashboard/page.tsx
import React from 'react';
import Link from 'next/link';
import { 
    IconFlyer, IconPrewedding, IconSOP, IconJob, IconRecipe,
    IconCartoon, IconHookVideo, IconStudioPhoto, IconProductVideo, IconOpeningVideo, 
    IconHotel, IconQuranApp, IconSportSimple 
} from '@/constants/constants';
import { AdSenseBanner } from '@/components/ads/AdSenseBanner';

const FeatureCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    description: string;
    imageUrl?: string; 
}> = ({ icon, title, description, imageUrl }) => (
    <div className="h-full flex flex-col bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/10 overflow-hidden transform transition-all duration-300 hover:scale-105 hover:border-pink-500/50 hover:shadow-pink-500/20 group">
        <div className="relative h-48 w-full overflow-hidden bg-gray-900">
            {imageUrl ? (
                // PAKAI IMG SAJA BIAR AMAN SESUAI KODE LAMA
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                    src={imageUrl} 
                    alt={title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
            ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-black flex items-center justify-center">
                   <span className="opacity-20 scale-150">{icon}</span>
                </div>
            )}
            <div className="absolute top-0 right-5 p-1 ">
                <div className="w-5 h-5 text-pink-400">
                    {icon}
                </div>
            </div>
        </div>
        <div className="p-5 flex flex-col flex-grow">
            <h3 className="text-xl font-bold font-orbitron gradient-text mb-2">{title}</h3>
            <p className="text-gray-400 text-sm flex-grow leading-relaxed">{description}</p>
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-pink-400 text-sm font-medium group-hover:text-pink-300 transition-colors">
                Coba Sekarang 
                <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </div>
        </div>
    </div>
);

// MAPPING MANUAL SESUAI KODE LAMA (TAPI NEXTJS ROUTE)
const features = [
    { title: "Flyer Promosi", desc: "Buat flyer promosi profesional untuk produk Anda.", icon: <IconFlyer />, path: "/dashboard/flyer", img: "/imageDashboard/Card-Flyer.webp" },
    { title: "Video Produk", desc: "Generate video produk 5 detik dari gambar.", icon: <IconProductVideo />, path: "/dashboard/video", img: "/imageDashboard/product-Card.webp" },
    { title: "Studio Foto AI", desc: "Hasilkan foto studio berkualitas tinggi dari wajah Anda.", icon: <IconStudioPhoto />, path: "/dashboard/studio", img: "/imageDashboard/Card-Studio.webp" },
    { title: "Prewedding AI", desc: "Hasilkan foto pre-wedding impian dari foto Anda.", icon: <IconPrewedding />, path: "/dashboard/wedding", img: "/imageDashboard/pw-Card.webp" },
    { title: "Kartun Avatar", desc: "Ubah foto Anda menjadi gaya kartun/anime.", icon: <IconCartoon />, path: "/dashboard/cartoon", img: "/imageDashboard/Card-Cartoon.webp" },
    { title: "Hook Video", desc: "Generate hook video menarik untuk konten Anda.", icon: <IconHookVideo />, path: "/dashboard/hook", img: "/imageDashboard/hook-Card.webp" },
    { title: "Opening YouTube", desc: "Generate opening video YouTube yang keren.", icon: <IconOpeningVideo />, path: "/dashboard/opening", img: "/imageDashboard/YT-Card.webp" },
    { title: "Resep & Menu", desc: "Generate resep masakan lezat dan mudah.", icon: <IconRecipe />, path: "/dashboard/recipe", img: "/imageDashboard/Card-Recipe.webp" },
    { title: "SOP Generator", desc: "Generate Standar Operasional Prosedur (SOP).", icon: <IconSOP />, path: "/dashboard/sop", img: "/imageDashboard/Card-SOP.webp" },
    { title: "Job Description", desc: "Generate deskripsi pekerjaan profesional.", icon: <IconJob />, path: "/dashboard/jobdesc", img: "/imageDashboard/Card-Job.webp" },
];

export default function DashboardPage() {
    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-6xl font-bold font-orbitron gradient-text mb-4 animate-pulse">
                    AI Tools <span className="text-white"> Store</span>
                </h1>
                <p className="text-xl text-gray-300">
                    Pilih alat ajaibmu dan mulai berkarya dalam hitungan detik
                </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-12">
                {features.map((f, idx) => (
                    <Link key={idx} href={f.path} className="group h-full">
                        <FeatureCard icon={f.icon} title={f.title} description={f.desc} imageUrl={f.img} />
                    </Link>
                ))}
                
                {/* EXTERNAL LINKS */}
                <a href="https://sport.tokoboost.com" target="_blank" rel="noopener noreferrer" className="group h-full">
                    <FeatureCard icon={<IconSportSimple />} title="Live Sport Center" description="Klasemen Liga Eropa Real-time, Top Score, & Update Menuju World Cup 2026." imageUrl="/imageDashboard/Card-Sport.webp" />
                </a>
                <a href="https://tools-hotel.tokoboost.com" target="_blank" rel="noopener noreferrer" className="group h-full">
                    <FeatureCard icon={<IconHotel />} title="Hotel P&L Tools" description="Aplikasi pelaporan keuangan & performa hotel otomatis untuk para Hotelier." imageUrl="/imageDashboard/Card-Hotel.webp" />
                </a>
                <a href="https://quran.tokoboost.com" target="_blank" rel="noopener noreferrer" className="group h-full">
                    <FeatureCard icon={<IconQuranApp />} title="Quran & Doa Digital" description="Baca Al-Quran, Tafsir, dan kumpulan Doa Harian Mustajab." imageUrl="/imageDashboard/Card-Quran.webp" />
                </a>
            </div>
            
            <div className="mt-24 max-w-5xl mx-auto border-t border-gray-800 pt-12">
                <AdSenseBanner adSlot="" style={{ marginBottom: '3rem' }} />
                <div className="prose prose-invert max-w-none text-gray-400 text-center">
                    <h2 className="text-3xl font-bold text-white mb-8 font-orbitron">Platform Produktivitas AI Terlengkap</h2>
                    <p className="mb-4">TokoBoost hadir sebagai solusi jembatan teknologi bagi jutaan pelaku UMKM di Indonesia.</p>
                </div>
            </div>
        </div>

    );
}