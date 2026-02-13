import { Metadata } from 'next';
import { RecipeGenerator } from '@/components/generators/RecipeGenerator';

export const metadata: Metadata = {
  title: 'Resep & Menu Generator - Ide Bisnis Kuliner',
  description: 'Cari ide menu jualan kekinian lengkap dengan resep, perhitungan bahan, dan foto ilustrasi penyajiannya.',
  openGraph: {
    images: ['/imageDashboard/Card-Recipe.webp']
  }
};

export default function Page() {
  return <RecipeGenerator />;
}