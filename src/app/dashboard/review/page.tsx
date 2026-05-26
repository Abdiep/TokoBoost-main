// src/app/dashboard/review/page.tsx
import { Metadata } from 'next';
import { ReviewGenerator } from '@/components/generators/ReviewGenerator';

export const metadata: Metadata = {
  title: 'Affiliate Video Generator - TokoBoost',
  description: 'Buat video review produk otomatis dengan AI untuk meningkatkan konversi jualan dan affiliate.',
};

export default function Page() {
  return <ReviewGenerator />;
}