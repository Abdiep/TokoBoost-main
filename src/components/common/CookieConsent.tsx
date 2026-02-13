// src/components/common/CookieConsent.tsx
'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const CookieConsent: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Cek apakah user sudah pernah setuju sebelumnya
        const consent = localStorage.getItem('tokoboost_cookie_consent');
        if (!consent) {
            // Tampilkan banner setelah delay sedikit (biar animasi smooth)
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        // Simpan status setuju di localStorage
        localStorage.setItem('tokoboost_cookie_consent', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="max-w-4xl mx-auto bg-gray-900/95 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
                
                {/* Text Area */}
                <div className="text-sm text-gray-300 text-center md:text-left">
                    <p>
                        🍪 <strong>Kami menggunakan cookies</strong> untuk meningkatkan pengalaman Anda dan menayangkan iklan yang relevan. 
                        Dengan melanjutkan, Anda menyetujui <Link href="/privasi" className="text-pink-400 hover:text-pink-300 underline underline-offset-2">Kebijakan Privasi</Link> kami.
                    </p>
                </div>

                {/* Button Area */}
                <button
                    onClick={handleAccept}
                    className="whitespace-nowrap px-6 py-2.5 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold text-sm rounded-lg hover:shadow-lg hover:shadow-pink-500/20 transform hover:-translate-y-0.5 transition-all"
                >
                    Saya Setuju
                </button>
            </div>
        </div>
    );
};