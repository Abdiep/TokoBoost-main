// src/components/ads/AdSenseBanner.tsx
'use client';
import React, { useEffect, useRef } from 'react';

// Definisi Global untuk Window
declare global {
    interface Window {
        adsbygoogle: any[];
    }
}

interface AdSenseBannerProps {
    className?: string;
    style?: React.CSSProperties;
    adSlot: string; // ID Slot Iklan dari Google
    adFormat?: 'auto' | 'fluid' | 'rectangle';
    fullWidthResponsive?: string;
}

export const AdSenseBanner: React.FC<AdSenseBannerProps> = ({ 
    className, 
    style, 
    adSlot, 
    adFormat = 'auto',
    fullWidthResponsive = 'true'
}) => {
    // 1. SATPAM: useRef untuk menandai apakah iklan sudah dipanggil
    const isLoaded = useRef(false);

    useEffect(() => {
        // 2. CEK SATPAM: Kalau sudah loaded, stop di sini. Jangan lanjut.
        if (isLoaded.current) return;

        try {
            // Cek apakah script adsense ada di window
            if (typeof window !== 'undefined') {
                // 3. PUSH REQUEST IKLAN
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                
                // 4. KUNCI SATPAM: Tandai bahwa kita sudah request iklan
                isLoaded.current = true;
            }
        } catch (e: any) {
            // 5. FILTER ERROR: Kalau errornya cuma "slot penuh", abaikan saja (jangan menuhin console)
            if (process.env.NODE_ENV !== 'production' && e.message?.includes("All 'ins' elements in the DOM with class=adsbygoogle already have ads")) {
                // Silent ignore - ini normal di development
            } else {
                console.error("AdSense error:", e);
            }
        }
    }, []);

    return (
        <div className={`text-center my-4 overflow-hidden ${className}`} style={{ minHeight: '90px', ...style }}>
            {/* ID Publisher Kamu: ca-pub-6221594639128289 */}
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-6221594639128289" 
                 data-ad-slot={adSlot}
                 data-ad-format={adFormat}
                 data-full-width-responsive={fullWidthResponsive}></ins>
            <span className="text-[10px] text-gray-600 uppercase tracking-widest mt-1 block opacity-50">Iklan Sponsor</span>
        </div>
    );
};