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
import { TextAreaInput, GenerateButton, OutputDisplay } from '../ui/GeneratorUI';
import { SEOContentSection } from '../common/SEOContentSection';

// --- IMPORT MODAL BARU ---
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';

export const HookVideoGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth();
    
    const [theme, setTheme] = useState('');
    const [isIdeaLoading, setIsIdeaLoading] = useState(false);
    
    // State Proses
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);

    // State Modal (Satpam)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.VIDEO;

    // Fungsi Bantuan: Cari Ide Dulu
    const handleGetIdea = async () => {
        // Cek Login dulu (Gratis, tapi harus member)
        if (!isLoggedIn) {
            setIsLoginOpen(true);
            return;
        }

        if (!theme) return alert("Isi topik dulu!");
        setIsIdeaLoading(true);
        try {
            const idea = await geminiService.generateHookIdea(theme);
            setTheme(idea || ""); 
        } catch (e) {
            console.error("Gagal cari ide:", e);
            alert("Gagal mencari ide. Coba lagi.");
        } finally {
            setIsIdeaLoading(false);
        }
    };

    const handleGenerate = async () => {
        // 1. CEK LOGIN (Pakai Modal)
        if (!isLoggedIn) { 
            setIsLoginOpen(true); 
            return; 
        }
        
        // 2. CEK INPUT
        if (!theme) { 
            alert('Mohon isi topik atau deskripsi video.'); 
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
            setResult(null);

            // Potong Token
            const success = await deductTokens(cost);
            if (!success) { 
                setState('idle'); 
                return; 
            }

            // Panggil Service
            const videoUrl = await geminiService.generateHookVideo(theme);
            
            setResult({ type: 'video', url: videoUrl });
            setState('success');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Gagal membuat video.');
            setState('error');
        }
    };

    return (
        <>
            <FeaturePanel title="Hook Video Generator" description="Bikin video 3 detik pertama yang memancing rasa penasaran (Scroll-Stopper).">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* INPUT SECTION */}
                    <div>
                        <TextAreaInput 
                            label="Topik / Ide Video Hook" 
                            value={theme} 
                            onChange={setTheme} 
                            placeholder="Contoh: POV ketahuan makan seblak di kelas..."
                            rows={4}
                        />

                        {/* Tombol Bantuan Ide */}
                        <div className="mb-4 flex justify-end">
                            <button 
                                onClick={handleGetIdea}
                                disabled={isIdeaLoading || !theme}
                                className="text-xs text-pink-400 hover:text-pink-300 underline disabled:opacity-50"
                            >
                                {isIdeaLoading ? "Sedang mikir..." : "✨ Minta AI perbaiki kalimat prompt"}
                            </button>
                        </div>

                        <GenerateButton 
                            onClick={handleGenerate} 
                            disabled={state === 'loading'} 
                            loading={state === 'loading'} 
                            cost={cost}
                            text="Buat Video Hook"
                        />
                        
                        {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}
                    </div>

                    {/* OUTPUT SECTION */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex items-center justify-center">
                        {state === 'idle' && <p className="text-gray-500">Video akan muncul di sini</p>}
                        {state === 'loading' && <LoadingIndicator isVideo={true} />}
                        {state === 'success' && result && <OutputDisplay result={result} downloadInfo={{ fileName: 'hook-video-result' }} />}
                    </div>
                </div>
                <SEOContentSection 
                title="Kuasai 3 Detik Pertama dengan Hook Video Generator"
                content={
                    <>
                        <p>
                            Di era <em>short-form video</em> (TikTok, Shorts, Reels), Anda hanya punya waktu <strong>3 detik</strong> untuk menangkap perhatian penonton sebelum mereka <em>scroll</em> melewati konten Anda. Inilah yang disebut &quot;Hook&quot;.
                        </p>
                        <p>
                            <strong>AI Hook Generator</strong> membantu kreator mengatasi <em>writers block</em>. Alat ini menciptakan video intro visual yang meledak, aneh, atau memuaskan (satisfying) secara otomatis untuk menahan mata penonton. Gabungkan video hook ini di awal konten edukasi atau jualan Anda untuk meningkatkan <em>Watch Time</em>.
                        </p>
                        <h3 className="text-lg font-bold text-white mt-4">Strategi FYP (For You Page):</h3>
                        <ul className="list-disc list-inside ml-2 space-y-1">
                            <li><strong>Visual Shock:</strong> Gunakan visual yang tidak biasa di detik pertama.</li>
                            <li><strong>Retensi Tinggi:</strong> Video hook meningkatkan rata-rata durasi tonton, sinyal utama algoritma untuk memviralkan konten.</li>
                            <li><strong>Tanpa Shooting:</strong> Tidak perlu repot setup kamera untuk intro, biarkan AI yang buatkan.</li>
                        </ul>
                    </>
                }
                faq={[
                    {
                        question: "Apa itu Hook Video?",
                        answer: "Klip pendek (biasanya 3 detik) di awal video yang bertujuan memancing rasa penasaran penonton agar menonton sampai habis."
                    },
                    {
                        question: "Bisa digabung dengan aplikasi edit video?",
                        answer: "Sangat bisa. Download hasilnya, lalu masukkan ke CapCut atau InShot sebagai klip pembuka video Anda."
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