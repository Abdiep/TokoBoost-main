import type { Metadata } from "next";
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

export const metadata: Metadata = {
    title: "Tentang Kami - TokoBoost",
    description: "Platform AI praktis untuk UMKM Indonesia, dibuat oleh praktisi hotelier berpengalaman.",
};

export default function AboutPage() {
    return (
        <InfoPageContainer title="Tentang Kami">
            <p><strong>TokoBoost</strong> adalah sebuah platform inovatif yang dirancang khusus untuk memberdayakan para pelaku Usaha Mikro, Kecil, dan Menengah (UMKM) di Indonesia. Misi kami adalah menyediakan alat bantu berbasis Kecerdasan Buatan (AI) yang canggih, namun tetap mudah digunakan.</p>
            <p>Kami percaya bahwa setiap bisnis, tidak peduli ukurannya, berhak mendapatkan akses ke teknologi terbaik untuk berkembang. Dengan TokoBoost, Anda dapat membuat materi promosi yang menarik, mengelola operasional dengan lebih efisien, dan menyajikan produk Anda secara profesional tanpa memerlukan keahlian desain atau teknis yang mendalam.</p>
            <p>Platform kami didukung oleh teknologi canggih dari Google Gemini, memastikan setiap hasil yang Anda dapatkan memiliki kualitas terbaik.</p>
            <div className="mt-8 p-6 bg-gray-800/50 border-l-4 border-pink-500 rounded-r-xl">
                <p className="italic text-gray-200">
                    &quot;Platform ini didirikan dan dikurasi langsung oleh praktisi perhotelan (Hotelier) dengan pengalaman lebih dari 25 tahun di industri hospitality dan 15 tahun manajemen F&B. Seluruh logika dalam Tools Hotel dan struktur SOP yang dihasilkan telah disesuaikan dengan standar industri profesional yang teruji.&quot;
                </p>
            </div>
        </InfoPageContainer>
    );
}