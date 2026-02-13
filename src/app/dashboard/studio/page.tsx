import { Metadata } from 'next';
import { StudioPhotoGenerator } from '@/components/generators/StudioPhotoGenerator';

export const metadata: Metadata = {
  title: 'Studio Foto AI - Ganti Background Foto Produk & Model',
  description: 'Foto produk atau model di mana saja tanpa sewa studio. Ganti background otomatis dengan pencahayaan realistis menggunakan AI.',
  openGraph: {
    images: ['/imageDashboard/Card-Studio.webp']
  }
};

export default function Page() {
  return <StudioPhotoGenerator />;
}