import type { Metadata } from "next";
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

export const metadata: Metadata = {
    title: "Syarat & Ketentuan - TokoBoost",
};

export default function TermsPage() {
    return (
        <InfoPageContainer title="Syarat dan Ketentuan">
            <p>Selamat datang di TokoBoost. Dengan mengakses layanan kami, Anda setuju untuk terikat oleh ketentuan berikut.</p>
            
            <h3 className="text-white text-xl font-bold mt-6">1. Akun Pengguna</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Anda bertanggung jawab menjaga kerahasiaan akun.</li>
                <li>Kami berhak menangguhkan akun yang melanggar ketentuan.</li>
            </ul>
            
            <h3 className="text-white text-xl font-bold mt-6">2. Sistem Token</h3>
            <p>Token yang telah dibeli <strong>tidak dapat diuangkan kembali (non-refundable)</strong>. Token gratis harian akan hangus jika tidak digunakan.</p>

            <h3 className="text-white text-xl font-bold mt-6">3. Larangan Konten</h3>
            <p>Dilarang menggunakan AI TokoBoost untuk membuat konten ilegal, pornografi, ujaran kebencian, atau hoax.</p>
            
            <h3 className="text-white text-xl font-bold mt-6">4. Hak Cipta</h3>
            <p>Anda memiliki hak penuh atas hasil generasi konten untuk penggunaan komersial maupun pribadi.</p>
        </InfoPageContainer>
    );
}