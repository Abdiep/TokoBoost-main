/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // <-- Hapus router
import { GenerationState, GenerationResult } from '@/types/types';
import { OUTPUT_TOKEN_COSTS, CARTOON_STYLES } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { FileInput, GenerateButton, OutputDisplay, SelectInput } from '../ui/GeneratorUI';
import { SEOContentSection } from '../common/SEOContentSection';

// --- IMPORT MODAL BARU ---
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';

export const CartoonPhotoGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth();

    const [image, setImage] = useState<File | null>(null);
    
    // Logic default value tetap dipertahankan
    const [styleLabel, setStyleLabel] = useState<string>(
        (typeof CARTOON_STYLES[0] === 'object' && 'label' in CARTOON_STYLES[0]) 
            ? (CARTOON_STYLES[0] as any).label 
            : CARTOON_STYLES[0]
    );

    // State Proses
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);

    // State Modal (Satpam)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.IMAGE;

    const handleGenerate = async () => {
        // 1. CEK LOGIN (Pakai Modal)
        if (!isLoggedIn) { 
            setIsLoginOpen(true); 
            return; 
        }

        // 2. CEK INPUT
        if (!image) { 
            alert('Mohon upload foto wajah Anda.'); 
            return; 
        }
        if (!styleLabel) { 
            alert('Pilih gaya kartun.'); 
            return; 
        }

        // 3. CEK TOKEN (Pakai Modal TopUp)
        if (tokens < cost) { 
            setIsTopUpOpen(true); 
            return; 
        }

        // 4. PROSES GENERATE
        try {
            setState('loading');
            setError('');
            
            // Potong Token
            const success = await deductTokens(cost);
            if (!success) { 
                setState('idle'); 
                return; 
            }

            // Panggil Service
            const imageUrl = await geminiService.generateCartoonPhoto(image, styleLabel);
            
            setResult({ type: 'image', url: imageUrl });
            setState('success');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Gagal mengubah foto.');
            setState('error');
        }
    };

    // Helper options tetap dipertahankan
    const getOptions = () => {
        return CARTOON_STYLES.map((s: any) => {
            if (typeof s === 'string') return { label: s, value: s };
            return { label: s.label, value: s.label }; 
        });
    };

    return (
        <>
            <FeaturePanel title="Ubah Foto Jadi Kartun & Anime" description="Ubah selfie kamu menjadi karakter unik.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* INPUT SECTION */}
                    <div>
                        <FileInput label="Upload Foto Selfie" onChange={setImage} helperText="Wajah harus terlihat jelas." />
                        
                        <SelectInput
                            label="Pilih Gaya Kartun"
                            value={styleLabel}
                            onChange={setStyleLabel}
                            options={getOptions()}
                        />

                        <GenerateButton onClick={handleGenerate} disabled={state === 'loading'} loading={state === 'loading'} cost={cost} />
                        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
                    </div>

                    {/* OUTPUT SECTION */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex items-center justify-center">
                        {state === 'idle' && <p className="text-gray-500">Avatar kartun akan muncul di sini</p>}
                        {state === 'loading' && <LoadingIndicator />}
                        {state === 'success' && result && <OutputDisplay result={result} downloadInfo={{ fileName: 'cartoon-result' }} />}
                    </div>
                </div>
                <SEOContentSection 
                    title="Ubah Foto Jadi Kartun & Anime Viral"
                    content={
                        <>
                            <p>
                                Tren foto profil kartun atau anime (Avatar) tidak pernah mati di media sosial. Gaya visual ini unik, artistik, dan menjaga sedikit privasi dibanding foto asli.
                            </p>
                            <p>
                                Dengan <strong>Cartoon Photo Generator</strong>, ubah selfie atau foto bareng teman menjadi karya seni digital. Tersedia berbagai gaya mulai dari Anime Jepang, Kartun 3D ala Pixar, hingga sketsa pensil.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Ide Penggunaan:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Hadiah Unik:</strong> Cetak hasilnya di mug atau kaos untuk kado ulang tahun.</li>
                                <li><strong>Gaming Avatar:</strong> Pakai untuk profil Mobile Legends, PUBG, atau Discord.</li>
                                <li><strong>Konten Kreatif:</strong> Bahan thumbnail YouTube yang menarik perhatian (Eye-catching).</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Berapa lama prosesnya?",
                            answer: "Sangat cepat, sekitar 10-20 detik per foto."
                        },
                        {
                            question: "Apakah ada watermark?",
                            answer: "Tidak ada watermark yang mengganggu di tengah gambar, hasil bersih siap pakai."
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