import { Metadata } from 'next';
import { ProductVideoGenerator } from '@/components/generators/ProductVideoGenerator';

export const metadata: Metadata = {
  title: 'Video Produk AI - Ubah Foto Jadi Video Iklan Sinematik',
  description: 'Ubah foto produk biasa menjadi video iklan sinematik yang memukau dengan AI. Tingkatkan konversi penjualan di TikTok dan Instagram.',
  openGraph: {
    images: ['/imageDashboard/Card-VideoProduk.webp']
  }
};

export default function Page() {
  return <ProductVideoGenerator />;
}