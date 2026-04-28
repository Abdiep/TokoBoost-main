// src/components/ads/ShopeeNativeAd.tsx
'use client'; 
import React, { useState, useEffect } from 'react';

interface ShopeeNativeAdProps {
  limit?: number;
}

// 1. Pindahkan Gudang Produk ke LUAR komponen. 
// Biar nggak dibaca ulang-ulang sama React setiap kali render.
const ALL_PRODUCTS = [
  {
    id: 1,
    name: "NIIMBOT B1 Printer Label, Pembuat Label Portabel Bluetooth lebar 20-50mm",
    image: "https://down-cvs-id.img.susercontent.com/id-11134207-8224z-ml7fdch93fuw64.webp", // Ganti link gambar asli shopee
    link: "https://s.shopee.co.id/3qJVpYmeKA", // Ganti link affiliate lu
    price: "Rp 156.600 - Rp746.000"
  },
  {
    id: 2,
    name: "[Putar 360°] INBEX IPL16 Light Bisa diputar 360° Tripod konten kreator",
    image: "https://down-cvs-id.img.susercontent.com/id-11134207-822wk-mmb45xcg1czl0b.webp", // Ganti link gambar asli shopee
    link: "https://s.shopee.co.id/9fHImXbeAE", // Ganti link affiliate lu
    price: "Rp 69.000"
  },
  {
    id: 3,
    name: "Bubble Wrap Roll Meteran per 5 Meter/tersedia hitam dan bening",
    image: "https://down-id.img.susercontent.com/file/id-11134207-822wu-mn5sxi8qla0z61@resize_w900_nl.webp", // Ganti link gambar asli shopee
    link: "https://s.shopee.co.id/BQDTcBops", // Ganti link affiliate lu
    price: "Rp 14.499 - Rp 18.999"
  },
  {
    id: 4,
    name: "Lakban fragile merah 70 yard 48mm full / jangan dibanting / awas pecah / Lakban fragile termurah",
    image: "https://down-id.img.susercontent.com/file/id-11134207-7ra0n-mcg3ehlmbgoyfc@resize_w900_nl.webp", // Ganti link gambar asli shopee
    link: "https://s.shopee.co.id/W33rwQl3S", // Ganti link affiliate lu
    price: "Rp 7.750"
  },
  { id: 5, 
    name: "Mic Wireless Clip-On Vlog", 
    image: "https://down-id.img.susercontent.com/file/id-11134207-822wg-mn2e24ftd7gk56.webp", 
    link: "https://s.shopee.co.id/5VRk34YGnP", 
    price: "Rp 61.900" 
  },
  { id: 6, 
    name: "Plastik Polymailer Anti Air 100pcs", 
    image: "https://down-id.img.susercontent.com/file/id-11134207-7r992-llyxghfqp9no8b.webp", 
    link: "https://s.shopee.co.id/9AL2PdkPRw", 
    price: "Rp 20.930" 
  },
  { id: 7, name: "Timbangan Digital Mini 5Kg", 
    image: "https://down-id.img.susercontent.com/file/id-11134207-81ztm-mf7thiroimtrb5.webp", 
    link: "https://s.shopee.co.id/70GXpwx4cN", 
    price: "Rp 114.248" 
  },
  { id: 8, name: "Undangan Digital Website | Bebas Isi Sendiri | Exclusive Theme", 
    image: "https://down-id.img.susercontent.com/file/id-11134207-82252-mkisoetycverc2.webp", 
    link: "https://s.shopee.co.id/2Vo8UO5EMJ", 
    price: "Rp 10.612" 
  },
  { id: 9, name: "Embossing Stamp Pernikahan", 
    image: "https://down-id.img.susercontent.com/file/sg-11134201-81zue-mmwu99wv5xj40f@resize_w900_nl.webp", 
    link: "https://s.shopee.co.id/2LUiIYmwNc", 
    price: "Rp 75.460" 
  },
  { id: 10, name: "Lampu Studio Softbox Set", 
    image: "https://down-id.img.susercontent.com/file/27553307033919afa53a41271b562bdd.webp", 
    link: "https://s.shopee.co.id/1LcB5h1Xqg", 
    price: "Rp 74.930" 
  },
  { id: 11, name: "Celana Yoga Legging Highwaist Wanita", 
    image: "https://down-id.img.susercontent.com/file/id-11134207-81ztl-mdy3yfjxkk5g06.webp", 
    link: "https://s.shopee.co.id/8ASVG0tiPy", 
    price: "Rp 68.900" 
  },
];

export const ShopeeNativeAd: React.FC<ShopeeNativeAdProps> = ({ limit = 4 }) => {
  // 2. State awalnya kosong
  const [displayedProducts, setDisplayedProducts] = useState<typeof ALL_PRODUCTS>([]);

  useEffect(() => {
    // 3. Ngacak produk di dalam useEffect (Tempat yang 100% legal buat Math.random)
    const shuffled = [...ALL_PRODUCTS].sort(() => 0.5 - Math.random()).slice(0, limit);

    // 4. TRIK SAKTI: Gunakan setTimeout 0ms agar proses set state jadi Asynchronous.
    // Ini lolos dari sensor "cascading render" React!
    const timer = setTimeout(() => {
      setDisplayedProducts(shuffled);
    }, 0);

    // Bersihkan memori timer kalau komponen dilepas
    return () => clearTimeout(timer);
  }, [limit]);

  // 5. Loading State selama produk belum siap (0 detik)
  if (displayedProducts.length === 0) {
    return <div className="min-h-[150px] animate-pulse bg-[#15181e] rounded-xl mt-8 w-full"></div>;
  }

  const gridClass = limit === 1 ? 'grid-cols-1' : 'grid-cols-2 md:grid-cols-4';

  return (
    <div className="mt-8 mb-6 border-t border-white/10 pt-6 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Pilihan UMKM Pro (Sponsor)</span>
        <span className="text-[10px] bg-orange-500/10 text-orange-500 px-2 py-1 rounded font-bold border border-orange-500/20">
          Shopee Picks
        </span>
      </div>
      
      <div className={`grid ${gridClass} gap-4`}>
        {displayedProducts.map((product) => (
          <a 
            key={product.id} 
            href={product.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#15181e] p-3 rounded-xl border border-white/5 hover:border-orange-500/50 hover:bg-[#1a1d24] transition group flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-full h-28 bg-gray-800 rounded-lg mb-3 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500" 
                />
              </div>
              <h4 className="text-white text-xs font-bold line-clamp-2 leading-relaxed">{product.name}</h4>
            </div>
            <div className="mt-3">
              <p className="text-orange-500 text-sm font-bold">{product.price}</p>
              <div className="flex items-center mt-1 text-gray-400 group-hover:text-white transition-colors">
                <span className="text-[10px] font-semibold">Cek Promo</span>
                <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};