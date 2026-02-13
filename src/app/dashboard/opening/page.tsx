
import { Metadata } from 'next';
import { OpeningVideoGenerator } from '@/components/generators/OpeningVideoGenerator';

export const metadata: Metadata = {
  title: 'Opening Video Maker - Intro YouTube Logo Animation',
  description: 'Buat intro video YouTube profesional dengan animasi logo otomatis. Tingkatkan branding channel Anda secara instan.',
  openGraph: {
    images: ['/imageDashboard/Card-Opening.webp']
  }
};

export default function Page() {
  return <OpeningVideoGenerator />;
}