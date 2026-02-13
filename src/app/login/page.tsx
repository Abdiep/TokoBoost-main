'use client'; 

import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdSenseBanner } from '@/components/ads/AdSenseBanner';

export default function LoginPage() {
    // Kita pakai logic Auth yang sudah ada di project lama kamu
    const { login, isLoggedIn } = useAuth(); 
    const router = useRouter();

    // Kalau sudah login, lempar ke dashboard
    useEffect(() => {
        if (isLoggedIn) {
            router.push('/dashboard');
        }
    }, [isLoggedIn, router]);

    return (
        <main className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center relative overflow-hidden px-4">
            
            {/* --- BACKGROUND EFFECTS (Biar senada dengan Landing Page) --- */}
            {/* Glow Ungu di tengah */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
            {/* Pattern Grid Halus */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            {/* --- TOMBOL KEMBALI --- */}
            <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white flex items-center gap-2 transition-colors z-20 group">
                <span className="group-hover:-translate-x-1 transition-transform">←</span> Kembali ke Beranda
            </Link>

            {/* --- LOGIN CARD (Glass Effect) --- */}
            <div className="w-full max-w-md glass-card p-8 md:p-10 border border-white/10 text-center animate-in fade-in zoom-in-95 duration-500 relative z-10 bg-gray-900/60 backdrop-blur-xl rounded-2xl shadow-2xl">
                
                {/* Logo Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-orange-500 flex items-center justify-center text-white font-bold text-3xl shadow-lg shadow-pink-500/20">
                        ⚡
                    </div>
                </div>

                {/* Headline */}
                <h1 className="text-3xl font-bold font-orbitron text-white mb-2">Selamat Datang</h1>
                <p className="text-gray-400 mb-8 text-sm md:text-base">
                    Masuk untuk mulai menggunakan <span className="text-pink-400 font-semibold">TokoBoost AI</span>.
                </p>

                {/* --- TOMBOL GOOGLE (Dipercantik) --- */}
                <button
                    onClick={login}
                    className="w-full group relative flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3.5 px-4 rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all shadow-xl hover:shadow-pink-500/10 mb-8"
                >
                    {/* Google Icon SVG */}
                    <div className="w-6 h-6 group-hover:scale-110 transition-transform duration-300">
                        <svg viewBox="0 0 24 24">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        </svg>
                    </div>
                    <span>Lanjutkan dengan Google</span>
                </button>

                {/* Divider Tipis */}
                <div className="border-t border-white/10 my-6"></div>

                {/* Footer Links (Terms & Privacy) */}
                <p className="text-xs text-gray-500 leading-relaxed mb-6">
                    Dengan melanjutkan, Anda menyetujui <Link href="/terms" className="text-pink-500 hover:text-pink-400 hover:underline transition-colors">Syarat & Ketentuan</Link> serta <Link href="/privacy" className="text-pink-500 hover:text-pink-400 hover:underline transition-colors">Kebijakan Privasi</Link> kami.
                </p>

                {/* --- ADSENSE AREA --- */}
                {/* Ditaruh di dalam card tapi paling bawah biar rapi */}
                <div className="w-full overflow-hidden rounded-lg bg-black/20 min-h-[100px] flex items-center justify-center border border-white/5">
                    <div className="scale-90 origin-center">
                        <AdSenseBanner adSlot="" adFormat="rectangle" />
                    </div>
                </div>

            </div>
        </main>
    );
}