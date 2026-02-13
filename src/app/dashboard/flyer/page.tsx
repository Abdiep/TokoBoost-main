import { Metadata } from 'next';
import { FlyerGenerator } from '@/components/generators/FlyerGenerator';


export const metadata: Metadata = {
  title: 'Flyer Maker AI Gratis - Buat Poster Promosi Otomatis',
  description: 'Buat desain flyer promosi produk profesional dalam hitungan detik dengan AI. Tanpa skill desain, hemat biaya, hasil siap posting.',
  openGraph: {
    images: ['/imageDashboard/Card-Flyer.webp'] // Pastikan gambar ini ada di folder public/imageDashboard
  }
};

export default function Page() {
  return <FlyerGenerator />;
}