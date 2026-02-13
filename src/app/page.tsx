'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { 
    IconFlyer, IconProductVideo, IconHookVideo, 
    IconStudioPhoto, IconPrewedding, IconCartoon, 
    IconSOP,
    IconJob,
    IconRecipe,
    IconOpeningVideo,
    IconSportSimple,
    IconQuranApp,
    IconHotel
} from '@/constants/constants';

// --- 1. HERO SECTION (Updated Full Screen) ---
const HeroSection = () => (
    <section className="bg-[#0f1115] relative overflow-hidden min-h-screen flex flex-col items-center justify-center text-center px-4 pt-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full border border-pink-500/30 bg-pink-500/10 backdrop-blur-sm mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-xs md:text-sm font-bold text-pink-400 tracking-wider uppercase">✨ The #1 AI Super App for UMKM</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-orbitron text-white leading-tight tracking-tight drop-shadow-2xl">
                Revolusi Bisnis <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500">
                    Tanpa Batas
                </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Buat foto produk profesional, video promosi sinematik, hingga dokumen legal bisnis hanya dalam hitungan detik dengan kekuatan AI.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-lg rounded-full hover:scale-105 hover:shadow-lg hover:shadow-pink-500/40 transition-all duration-300">
                    Mulai Gratis Sekarang 🚀
                </Link>
                <Link href="#why-tokoboost" className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    Pelajari Lebih Lanjut
                </Link>
            </div>
        </div>

    </section>
);

// --- 2. BARU: WHY TOKOBOOST SECTION ---
const WhySection = () => (
    <section id="why-tokoboost" className="py-24 bg-[#0a0c10] relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pink-900/10 to-transparent pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
                
                {/* Bagian Kiri: Teks Storytelling */}
                <div className="lg:w-1/2 space-y-8">
                    <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white leading-tight">
                        Mengapa <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">TokoBoost?</span>
                    </h2>
                    
                    <div className="space-y-6 text-gray-300 text-lg leading-relaxed text-justify">
                        <p>
                            Dalam era digital yang serba cepat, kecepatan dan kualitas konten adalah kunci keberhasilan Usaha Mikro, Kecil, dan Menengah (UMKM). 
                            <strong className="text-white"> TokoBoost hadir sebagai platform revolusioner</strong> yang mendemokratisasi akses teknologi Artificial Intelligence (AI) canggih bagi para pengusaha di Indonesia.
                        </p>
                        <p>
                            <span className="text-pink-400 font-bold">Tidak perlu lagi mengeluarkan biaya jutaan rupiah</span> untuk menyewa fotografer, videografer, atau konsultan manajemen. 
                            Dengan TokoBoost, Anda memiliki <em className="text-white">tim profesional virtual</em> yang siap bekerja 24 jam.
                        </p>
                        <p>
                            Mulai dari menghasilkan foto produk yang memikat, video promosi viral, hingga menyusun SOP bisnis. Semua dirancang dengan antarmuka yang ramah pengguna, sehingga siapa pun—tanpa latar belakang teknis—bisa jadi juara di pasar digital.
                        </p>
                    </div>

                    <div className="pt-4">
                        <div className="flex items-center gap-4 text-white font-bold font-orbitron">
                            <div className="h-1 w-12 bg-pink-500 rounded-full"></div>
                            Solusi #1 UMKM Indonesia
                        </div>
                    </div>
                </div>

                {/* Bagian Kanan: Grid Benefit (Visual) */}
                <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Card 1 */}
                    <div className="glass-card p-6 border-l-4 border-l-pink-500 hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center text-2xl mb-4">💰</div>
                        <h3 className="text-xl font-bold text-white mb-2">Hemat Biaya</h3>
                        <p className="text-sm text-gray-400">Pangkas biaya operasional jutaan rupiah untuk tim kreatif & konsultan.</p>
                    </div>
                    {/* Card 2 */}
                    <div className="glass-card p-6 border-l-4 border-l-orange-500 hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center text-2xl mb-4">⚡</div>
                        <h3 className="text-xl font-bold text-white mb-2">Super Cepat</h3>
                        <p className="text-sm text-gray-400">Buat konten & dokumen dalam hitungan detik, bukan hari atau minggu.</p>
                    </div>
                    {/* Card 3 */}
                    <div className="glass-card p-6 border-l-4 border-l-purple-500 hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-2xl mb-4">🤖</div>
                        <h3 className="text-xl font-bold text-white mb-2">Teknologi AI</h3>
                        <p className="text-sm text-gray-400">Akses teknologi canggih setara perusahaan besar dengan mudah.</p>
                    </div>
                    {/* Card 4 */}
                    <div className="glass-card p-6 border-l-4 border-l-blue-500 hover:scale-105 transition-transform">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-2xl mb-4">📱</div>
                        <h3 className="text-xl font-bold text-white mb-2">Mudah Dipakai</h3>
                        <p className="text-sm text-gray-400">Tanpa skill coding atau desain, semua bisa pakai TokoBoost.</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
);

// --- 3. FEATURES SECTION ---
const FeaturesPreview = () => {
    const features = [
        { icon: <IconFlyer />, title: "Flyer & Foto Produk", desc: "Ubah foto Produk Jualan jadi foto profesional yang siap upload ke e-commerce." },
        { icon: <IconProductVideo />, title: "Video Promosi", desc: "Bikin foto produkmu menjadi video promosi 5 detik otomatis." },
        { icon: <IconSOP />, title: "SOP Generator", desc: "Buat Standar Operasional Prosedur (SOP) dengan instan dan terstruktur." },
        { icon: <IconJob />, title: "Job Description", desc: "Buat Uraian Pekerjaan (Job Description) dengan instan dan terstruktur." },
        { icon: <IconRecipe />, title: "Inspirasi Resep", desc: "Cukup masukan nama makanan dan dapatkan resep dengan cepat dan mudah." },
        { icon: <IconHookVideo />, title: "Video Hook", desc: "3 detik awal video untuk viral di TikTok." },
        { icon: <IconPrewedding />, title: "Pre-wedding AI", desc: "Foto nikah hemat budget berbagai tema, tanpa perlu fotografer." },
        { icon: <IconStudioPhoto />, title: "Studio Virtual", desc: "Edit Foto dengan efek studio profesional." },
        { icon: <IconCartoon />, title: "Foto Kartun", desc: "Ubah foto biasa menjadi kartun keren dengan sekali klik." },
        { icon: <IconOpeningVideo />, title: "Opening YouTube", desc: "Buat opening video YouTube yang menarik dan profesional." },
        { icon: <IconHotel />, title: "Hotel P&L Tools", desc: "Buat presentasi laporan keuangan hotel dengan mudah dan cepat menggunakan AI." },
        { icon: <IconQuranApp />, title: "Aplikasi Quran", desc: "Belajar Al-Qur'an, Tafsir, dilengkapi dengan audio per ayat dan rangkuman tafsir oleh AI." },
        // --- [NEW BABY: SPORT CENTER] ---
        { icon: <IconSportSimple />, title: "Sport Center", desc: "Pantau Klasemen Liga Eropa & Persiapan World Cup 2026 secara Real-time." },
    ];

    return (
        <section id="features" className="py-24 bg-[#0f1115] border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-6">Fitur Unggulan</h2>
                    <p className="text-gray-400 text-lg">Satu platform, beragam solusi untuk melejitkan omzet bisnis Anda.</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((f, idx) => (
                        <div key={idx} className="glass-card p-8 flex flex-col items-center text-center group hover:border-pink-500/30 transition-all duration-300 hover:-translate-y-2">
                            {/* ICON FIX */}
                            <div className="forced-icon-size shadow-lg shadow-pink-500/10 group-hover:scale-110 transition-transform duration-300 mb-6">
                                {f.icon}
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-3 font-orbitron">{f.title}</h3>
                            <p className="text-gray-400 leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- MAIN PAGE COMPONENT ---
export default function Home() {
    return (
        <main className="min-h-screen bg-[#0f1115]">
            <Header />
            <HeroSection />
            <WhySection />  {/* <--- POSISI STRATEGIS DI SINI */}
            <FeaturesPreview />
            
            {/* CTA Section */}
            <section className="py-24 px-4 text-center bg-gradient-to-b from-[#0f1115] to-[#1a1d24]">
                <div className="max-w-4xl mx-auto glass-card p-12 border-pink-500/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-[80px] -z-10"></div>
                    
                    <h2 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-6">Siap Mengubah Bisnis Anda?</h2>
                    <p className="text-gray-400 mb-10 text-xl max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan UMKM yang sudah menghemat waktu dan biaya operasional mereka.
                    </p>
                    <Link href="/register" className="inline-block px-10 py-4 bg-white text-black font-bold text-lg rounded-full hover:bg-gray-200 hover:scale-105 transition-all shadow-xl">
                        Daftar Gratis Sekarang
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    );
}