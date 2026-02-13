import { Metadata } from 'next';
import { CartoonPhotoGenerator } from '@/components/generators/CartoonPhotoGenerator';

export const metadata: Metadata = {
  title: 'Ubah Foto Jadi Kartun & Anime 3D - AI Avatar Maker',
  description: 'Ubah selfie kamu menjadi karakter kartun Disney, Pixar, atau Anime Jepang yang keren. Cocok untuk foto profil unik.',
  openGraph: {
    images: ['/imageDashboard/Card-Cartoon.webp']
  }
};

export default function Page() {
  return <CartoonPhotoGenerator />;
}