import { Metadata } from 'next';
import { PreweddingGenerator } from '@/components/generators/PreweddingGenerator';

export const metadata: Metadata = {
  title: 'Prewedding AI Generator - Foto Couple Tanpa Studio',
  description: 'Buat foto prewedding impian tanpa sewa MUA atau fotografer. Cukup upload foto wajah, pilih tema adat atau internasional.',
  openGraph: {
    images: ['/imageDashboard/Card-Prewed.webp']
  }
};

export default function Page() {
  return <PreweddingGenerator />;
}