import { Metadata } from 'next';
import { SopGenerator } from '@/components/generators/SopGenerator';

export const metadata: Metadata = {
  title: 'SOP Generator Otomatis - Buat Standar Operasional Bisnis',
  description: 'Buat dokumen SOP perusahaan yang rapi dan standar ISO dalam hitungan detik. Cukup masukkan judul aktivitasnya.',
  openGraph: {
    images: ['/imageDashboard/Card-SOP.webp']
  }
};

export default function Page() {
  return <SopGenerator />;
}