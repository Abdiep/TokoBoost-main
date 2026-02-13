/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // <-- Hapus router
import { GenerationState, GenerationResult } from '@/types/types';
import { OUTPUT_TOKEN_COSTS } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { TextInput, GenerateButton, OutputDisplay } from '../ui/GeneratorUI';
import { SEOContentSection } from '../common/SEOContentSection';

// --- IMPORT MODAL BARU ---
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';

export const RecipeGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth();
    const [dish, setDish] = useState('');
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);

    // State Modal (Satpam)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.IMAGE; // Image + Text

    const handleGenerate = async () => {
        // 1. CEK LOGIN (Pakai Modal)
        if (!isLoggedIn) { 
            setIsLoginOpen(true); 
            return; 
        }

        // 2. CEK INPUT
        if (!dish) { 
            alert('Isi nama masakan'); 
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

            const { imageUrl, content } = await geminiService.generateRecipe(dish);
            // Gabungkan hasil jadi satu object visual (Image with caption text)
            // Tapi karena OutputDisplay handle salah satu, kita akali:
            // Kita tampilin Teks, tapi URL gambarnya kita selipkan di properti lain kalau perlu.
            // Atau lebih baik: Kita update OutputDisplay di masa depan untuk handle Mixed Content.
            // Untuk sekarang: Kita return Image-nya, teksnya masuk caption (walaupun panjang).
            
            // ATAU: Kita ubah UI RecipeGenerator biar menampilkan 2 OutputDisplay manual?
            // Demi simplicity migrasi, kita tampilin Image-nya, Resepnya di bawah gambar.
            setResult({ type: 'image', url: imageUrl, caption: content });
            setState('success');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Gagal membuat resep.');
            setState('error');
        }
    };

    return (
        <>
            <FeaturePanel title="Resep & Ide Menu Jualan" description="Cari inspirasi menu, resep lengkap, dan foto penyajian (plating) profesional.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <TextInput label="Mau masak apa hari ini?" value={dish} onChange={setDish} placeholder="Contoh: Cromboloni, Seblak Prasmanan, Es Kopi Gula Aren" />
                        <GenerateButton onClick={handleGenerate} disabled={state === 'loading'} loading={state === 'loading'} cost={cost} />
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex items-center justify-center">
                        {state === 'idle' && <p className="text-gray-500">Resep & Foto akan muncul di sini</p>}
                        {state === 'loading' && <LoadingIndicator />}
                        {state === 'success' && result && <OutputDisplay result={result} downloadInfo={{ fileName: `resep-${dish}` }} />}
                    </div>
                </div>
                <SEOContentSection 
                    title="Inspirasi Resep Masakan & Ide Bisnis Kuliner"
                    content={
                        <>
                            <p>
                                Bingung mau masak apa hari ini? Atau sedang mencari ide menu baru untuk cafe Anda? <strong>Recipe Generator TokoBoost</strong> bukan sekadar buku resep biasa. Ini adalah asisten <em>Research & Development</em> (R&D) kuliner pribadi Anda.
                            </p>
                            <p>
                                Dapatkan resep lengkap mulai dari bahan, takaran presisi, hingga langkah pembuatan yang sistematis. Fitur ini juga menyertakan visualisasi hasil masakan yang menggugah selera (<em>plating</em> profesional) sebagai referensi penyajian.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Fitur Andalan:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Ide Jualan Kekinian:</strong> Cari resep &quot;Es Kopi Gula Aren&quot; atau &quot;Cromboloni&quot; untuk memulai bisnis.</li>
                                <li><strong>Visualisasi Menu:</strong> Gunakan gambar hasil generate untuk buku menu sementara sebelum sesi foto asli.</li>
                                <li><strong>Efisiensi Bahan:</strong> Takaran yang pas membantu menghitung HPP (Harga Pokok Penjualan) lebih akurat.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Apakah resepnya terjamin enak?",
                            answer: "AI kami merangkum basis data kuliner dari ribuan sumber terpercaya, namun selera rasa bersifat subjektif. Selalu lakukan tes dapur (test food) sebelum menjualnya."
                        },
                        {
                            question: "Apakah bahasanya Indonesia?",
                            answer: "Ya, instruksi diberikan dalam Bahasa Indonesia yang mudah dipahami, lengkap dengan istilah lokal."
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