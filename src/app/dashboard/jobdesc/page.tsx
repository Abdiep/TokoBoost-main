import { Metadata } from 'next';
import { JobDescGenerator } from '@/components/generators/JobDescGenerator';

export const metadata: Metadata = {
  title: 'Job Description Generator - Buat Deskripsi Pekerjaan HRD',
  description: 'Bantu HRD merekrut kandidat tepat. Buat job description lengkap dengan kualifikasi dan tanggung jawab secara otomatis.',
  openGraph: {
    images: ['/imageDashboard/Card-Job.webp']
  }
};

export default function Page() {
  return <JobDescGenerator />;
}