/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
// HAPUS IMPORT YANG TIDAK DIPAKAI: useSearchParams, useLocation
import { GenerationState, GenerationResult } from '@/types/types';
import { STUDIO_PHOTO_BACKGROUNDS, OUTPUT_TOKEN_COSTS } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { FileInput, GenerateButton, OutputDisplay, VisualOptionSelector } from '../ui/GeneratorUI';
import { SEOContentSection } from '../common/SEOContentSection';
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';
import { ChevronLeft } from 'lucide-react';

export const StudioPhotoGenerator: React.FC = () => {
    const { deductTokens, tokens, isLoggedIn } = useAuth();
    
    // -- STATE --
    const [selectedTemplateLabel, setSelectedTemplateLabel] = useState<string>(''); // Kosong = Gallery Mode
    const [image, setImage] = useState<File | null>(null);
    
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.IMAGE;

    // Helper Visual Options
    const visualOptions = STUDIO_PHOTO_BACKGROUNDS.map(bg => {
        const slug = bg.label
            .toString()
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-') // Ganti semua simbol/spasi jadi strip
            .replace(/^-+|-+$/g, '');    // Hapus strip sisa di awal/akhir
        
        return {
            label: bg.label,
            value: bg.label,
            // Arahkan ke folder public studio
            image: `/images/templates/studio/${slug}.webp`
        };
    });

    const handleGenerate = async () => {
        if (!isLoggedIn) { setIsLoginOpen(true); return; }
        if (!image) { alert('Upload foto wajah dulu'); return; }
        if (tokens < cost) { setIsTopUpOpen(true); return; }

        try {
            setState('loading'); setError('');
            const success = await deductTokens(cost);
            if (!success) { setState('idle'); return; }

            const templateData = STUDIO_PHOTO_BACKGROUNDS.find(t => t.label === selectedTemplateLabel) || STUDIO_PHOTO_BACKGROUNDS[0];
            const imageUrl = await geminiService.generateStudioPhoto(image, templateData);
            
            setResult({ type: 'image', url: imageUrl });
            setState('success');
        } catch (err: any) {
            setError(err.message);
            setState('error');
        }
    };

    const handleBackToGallery = () => {
        setSelectedTemplateLabel('');
        setResult(null);
        setState('idle');
    };

    return (
        <>
            <FeaturePanel title="Studio Foto AI" description="Foto profil profesional (LinkedIn, CV) dalam sekejap.">
                
                {/* --- MODE 1: GALLERY SELECTOR --- */}
                {!selectedTemplateLabel && (
                     <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="text-center mb-8">
                           <h3 className="text-xl font-bold text-white mb-2">Pilih Background / Gaya</h3>
                           <p className="text-gray-400 text-sm">Klik salah satu gaya di bawah untuk mulai</p>
                       </div>
                        <VisualOptionSelector
                            value={selectedTemplateLabel}
                            onChange={setSelectedTemplateLabel}
                            options={visualOptions}
                        />
                    </div>
                )}

                {/* --- MODE 2: INPUT FORM --- */}
                {selectedTemplateLabel && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
                            <button 
                                onClick={handleBackToGallery} 
                                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors gap-1"
                            >
                                <ChevronLeft size={16} /> Ganti Gaya
                            </button>
                            <span className="text-blue-500 font-bold bg-blue-500/10 px-3 py-1 rounded-full text-sm border border-blue-500/20">
                                {selectedTemplateLabel}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div>
                                <h4 className="text-white font-bold mb-4">Upload Selfie</h4>
                                <FileInput label="Wajah (Jelas & Terang)" onChange={setImage} variant="default" />
                                
                                <GenerateButton onClick={handleGenerate} disabled={state === 'loading'} loading={state === 'loading'} cost={cost} />
                                {error && <div className="mt-4 text-red-500 text-sm bg-red-900/20 p-3 rounded border border-red-500/50">{error}</div>}
                            </div>

                            <div className="bg-[#0f1115] rounded-xl p-6 border border-gray-800 min-h-[500px] flex flex-col items-center justify-center sticky top-24">
                                {state === 'idle' && (
                                    <div className="text-center text-gray-500">
                                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl grayscale opacity-50">📸</div>
                                        <h3 className="text-gray-300 font-bold mb-1">Preview Hasil</h3>
                                        <p className="text-sm">Foto studio kamu akan muncul di sini</p>
                                    </div>
                                )}
                                {state === 'loading' && <LoadingIndicator />}
                                {state === 'success' && result && <OutputDisplay result={result} downloadInfo={{ fileName: 'studio-photo-tokoboost' }} />}
                            </div>
                        </div>
                    </div>
                )}

                <SEOContentSection 
                    title="Foto Profil Profesional & Studio Virtual AI"
                    content={
                        <>
                            <p>
                                Foto profil adalah kesan pertama Anda di dunia digital. Di LinkedIn atau CV, foto yang buram atau selfie biasa bisa mengurangi kredibilitas profesional Anda. Sewa studio foto untuk <em>headshot</em> korporat bisa memakan biaya ratusan ribu rupiah.
                            </p>
                            <p>
                                Fitur <strong>Studio Photo AI</strong> memungkinkan Anda memiliki foto profil berkelas studio hanya dengan upload foto selfie biasa. AI kami mengganti latar belakang, memperbaiki pencahayaan, bahkan bisa menyesuaikan pakaian Anda agar terlihat formal dan berwibawa.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Cocok Untuk:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Job Seeker:</strong> Untuk melengkapi CV dan profil JobStreet/LinkedIn.</li>
                                <li><strong>Influencer:</strong> Membuat konten visual estetik dengan berbagai tema lokasi tanpa perlu traveling.</li>
                                <li><strong>Tim Perusahaan:</strong> Menyeragamkan foto profil karyawan tanpa perlu memanggil fotografer ke kantor.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Apakah wajah saya akan terlihat diedit?",
                            answer: "Teknologi kami fokus mempertahankan fitur wajah asli Anda (Face Preservation) agar tetap dikenali, hanya lingkungan dan kualitas fotonya yang ditingkatkan."
                        },
                        {
                            question: "Resolusi fotonya berapa?",
                            answer: "Hasil foto berkualitas tinggi (HD) dan tajam, siap dicetak atau diupload ke media sosial."
                        }
                    ]} 
                />
            </FeaturePanel>
            
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
        </>
    );
};