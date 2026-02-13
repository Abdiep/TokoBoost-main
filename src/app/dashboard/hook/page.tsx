import { Metadata } from 'next';
import { HookVideoGenerator } from '@/components/generators/HookVideoGenerator';

export const metadata: Metadata = {
  title: 'Hook Video Generator - Ide Konten Viral 3 Detik Pertama',
  description: 'Bikin penonton betah nonton sampai habis! Generate ide visual hook video 3 detik pertama yang memancing rasa penasaran.',
  openGraph: {
    images: ['/imageDashboard/Card-Hook.webp']
  }
};

export default function Page() {
  return <HookVideoGenerator />;
}