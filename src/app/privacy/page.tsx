import type { Metadata } from "next";
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

export const metadata: Metadata = {
    title: "Kebijakan Privasi - TokoBoost",
};

export default function PrivacyPage() {
    return (
        <InfoPageContainer title="Kebijakan Privasi">
             <p className="text-sm text-gray-500">Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <h3 className="text-white text-xl font-bold mt-6">1. Pengumpulan Informasi</h3>
            <p>Kami mengumpulkan informasi dasar (nama, email, foto profil) saat Anda login via Google untuk keperluan autentikasi dan fungsionalitas aplikasi.</p>
            
            <h3 className="text-white text-xl font-bold mt-6">2. Iklan & Cookie Pihak Ketiga</h3>
            <p>Kami menggunakan layanan iklan pihak ketiga (seperti Google AdSense). Perusahaan ini mungkin menggunakan informasi tentang kunjungan Anda untuk menyediakan iklan tentang barang dan jasa yang mungkin menarik bagi Anda.</p>
            
            <h3 className="text-white text-xl font-bold mt-6">3. Keamanan Data</h3>
            <p>Kami menjaga keamanan data Anda menggunakan standar enkripsi modern. Kami tidak memperjualbelikan data pribadi Anda kepada pihak ketiga yang tidak berwenang.</p>
        </InfoPageContainer>
    );
}