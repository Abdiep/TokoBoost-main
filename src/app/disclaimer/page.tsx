import type { Metadata } from "next";
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

export const metadata: Metadata = {
    title: "Disclaimer - TokoBoost",
};

export default function DisclaimerPage() {
    return (
        <InfoPageContainer title="Disclaimer (Sanggahan)">
            <h3 className="text-white text-xl font-bold mt-6">1. Penggunaan Teknologi AI</h3>
            <p>Layanan kami menggunakan teknologi Kecerdasan Buatan (Google Gemini). Hasil generasi adalah &quot;draft awal&quot; yang sebaiknya ditinjau kembali oleh manusia sebelum digunakan untuk keperluan profesional.</p>
            
            <h3 className="text-white text-xl font-bold mt-6">2. Nasihat Profesional</h3>
            <p>Alat-alat seperti SOP Generator dan Finance Tools dimaksudkan sebagai referensi, bukan pengganti nasihat hukum atau konsultan keuangan profesional.</p>

            <h3 className="text-white text-xl font-bold mt-6">3. Batasan Tanggung Jawab</h3>
            <p>TokoBoost tidak bertanggung jawab atas kerugian yang timbul dari penggunaan informasi di situs web ini tanpa verifikasi lebih lanjut.</p>
        </InfoPageContainer>
    );
}