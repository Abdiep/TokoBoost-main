'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // <-- Hapus router
import { GenerationState, GenerationResult } from '@/types/types';
import { OUTPUT_TOKEN_COSTS } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { FileInput, GenerateButton, OutputDisplay } from '../ui/GeneratorUI';
import { SEOContentSection } from '../common/SEOContentSection';

// --- IMPORT MODAL BARU ---
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';

export const ProductVideoGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth();

    const [image, setImage] = useState<File | null>(null);
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);

    // State Modal (Satpam)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.VIDEO;

    const handleGenerate = async () => {
        // 1. CEK LOGIN (Pakai Modal)
        if (!isLoggedIn) { 
            setIsLoginOpen(true); 
            return; 
        }

        // 2. CEK INPUT
        if (!image) { 
            alert('Upload foto produk dulu'); 
            return; 
        }

        // 3. CEK TOKEN (Pakai Modal TopUp)
        if (tokens < cost) { 
            setIsTopUpOpen(true); 
            return; 
        }

        try {
            setState('loading');
            setError('');
            const success = await deductTokens(cost);
            if (!success) { setState('idle'); return; }

            const videoUrl = await geminiService.generateProductVideo(image);
            setResult({ type: 'video', url: videoUrl });
            setState('success');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Gagal membuat video produk.');
            setState('error');
        }
    };

    return (
        <>
            <FeaturePanel title="Video Produk Sinematik" description="Ubah foto produk biasa menjadi video iklan mewah (9:16) dalam sekejap.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <FileInput label="Upload Foto Produk (Jelas & Terang)" onChange={setImage} helperText="Format JPG/PNG. Pastikan produk terlihat utuh." />
                        <GenerateButton onClick={handleGenerate} disabled={state === 'loading'} loading={state === 'loading'} cost={cost} />
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex items-center justify-center">
                        {state === 'idle' && <p className="text-gray-500">Video akan muncul di sini</p>}
                        {state === 'loading' && <LoadingIndicator isVideo={true} />}
                        {state === 'success' && result && <OutputDisplay result={result} downloadInfo={{ fileName: `product-video` }} />}
                    </div>
                </div>
                <SEOContentSection 
                    title="Buat Video Iklan Produk Sinematik Tanpa Videografer"
                    content={
                        <>
                            <p>
                                Video marketing mendominasi media sosial. Data menunjukkan <strong>72% pelanggan</strong> lebih suka mempelajari produk lewat video daripada teks. Namun, produksi video iklan biasanya mahal, butuh kamera canggih, lighting studio, dan skill editing rumit.
                            </p>
                            <p>
                                <strong>AI Product Video Generator TokoBoost</strong> mengubah satu foto produk diam menjadi video promosi 5 detik yang dinamis dan elegan. Teknologi kami menganalisis objek produk, menambahkan efek pergerakan kamera (pan/zoom), dan pencahayaan realistis.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Keuntungan Video AI untuk Bisnis:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Meningkatkan Engagement:</strong> Algoritma Instagram Reels dan TikTok memprioritaskan konten video.</li>
                                <li><strong>Visual Mewah:</strong> Memberikan kesan &quot;Mahal&quot; pada produk UMKM Anda.</li>
                                <li><strong>Siap Pakai:</strong> Format rasio 9:16 (Vertikal) yang langsung cocok untuk Story atau Shorts.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Berapa lama proses pembuatan videonya?",
                            answer: "Rata-rata hanya membutuhkan waktu 1-2 menit tergantung antrean server AI."
                        },
                        {
                            question: "Apakah video ini ada suaranya?",
                            answer: "Saat ini video difokuskan pada visual sinematik (tanpa suara), Anda bisa menambahkan musik trending sendiri di TikTok/Instagram agar lebih viral."
                        }
                    ]}
                />
            </FeaturePanel>

            {/* --- PASANG MODAL SATPAM DI SINI --- */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
        </>
    );
};