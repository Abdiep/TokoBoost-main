/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // <-- Hapus router
import { GenerationState, GenerationResult } from '@/types/types';
import { OUTPUT_TOKEN_COSTS, OPENING_VIDEO_THEMES } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { FileInput, TextInput, SelectInput, GenerateButton, OutputDisplay } from '../ui/GeneratorUI';
import { SEOContentSection } from '../common/SEOContentSection';

// --- IMPORT MODAL BARU ---
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';

export const OpeningVideoGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth();

    // State Form
    const [inputType, setInputType] = useState<'logo' | 'text'>('logo');
    const [logo, setLogo] = useState<File | null>(null);
    const [channelName, setChannelName] = useState('');
    const [theme, setTheme] = useState('');
    
    // State Proses
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
        if (inputType === 'logo' && !logo) {
            alert('Mohon upload logo channel Anda');
            return;
        }
        if (inputType === 'text' && !channelName) {
            alert('Mohon isi nama channel Anda');
            return;
        }
        if (!theme) {
            alert('Pilih tema video');
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
            const videoUrl = await geminiService.generateOpeningVideo(
                inputType === 'logo' ? logo : null,
                channelName,
                theme
            );

            setResult({ type: 'video', url: videoUrl || "" });
            setState('success');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Gagal membuat video opening.');
            setState('error');
        }
    };

    // Helper options
    const getThemeOptions = () => {
        return OPENING_VIDEO_THEMES.map(t => ({ value: t, label: t }));
    };

    return (
        <>
            <FeaturePanel 
                title="Opening Video Generator" 
                description="Buat intro video YouTube profesional dalam hitungan detik. Pilih tema, upload logo, jadi!"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* LEFT: INPUT */}
                    <div>
                        <div className="mb-6 flex space-x-4 p-1 bg-gray-800 rounded-lg">
                            <button 
                                onClick={() => setInputType('logo')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${inputType === 'logo' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                            >
                                Pakai Logo Gambar
                            </button>
                            <button 
                                onClick={() => setInputType('text')}
                                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${inputType === 'text' ? 'bg-gray-700 text-white shadow' : 'text-gray-400 hover:text-white'}`}
                            >
                                Pakai Teks Nama
                            </button>
                        </div>

                        {inputType === 'logo' ? (
                            <FileInput 
                                label="Upload Logo Channel (PNG Transparan lebih bagus)" 
                                onChange={setLogo} 
                            />
                        ) : (
                            <TextInput 
                                label="Nama Channel YouTube" 
                                value={channelName} 
                                onChange={setChannelName} 
                                placeholder="Contoh: GadgetIn, Deddy Corbuzier" 
                            />
                        )}

                        <SelectInput
                            label="Pilih Tema Animasi"
                            value={theme}
                            onChange={setTheme}
                            options={getThemeOptions()}
                        />

                        <GenerateButton 
                            onClick={handleGenerate} 
                            disabled={state === 'loading'} 
                            loading={state === 'loading'} 
                            cost={cost}
                        />
                        
                        {error && (
                            <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">
                                {error}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: OUTPUT */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex flex-col items-center justify-center">
                        {state === 'idle' && <p className="text-gray-500 text-center">Hasil video akan muncul di sini</p>}
                        {state === 'loading' && <LoadingIndicator isVideo={true} />}
                        {state === 'success' && result && (
                            <div className="w-full">
                                <OutputDisplay result={result} downloadInfo={{ fileName: 'opening-video-result' }} />
                            </div>
                        )}
                    </div>
                </div>

                <SEOContentSection 
                    title="Bikin Intro YouTube & Branding Video Otomatis"
                    content={
                        <>
                            <p>
                                <em>Branding</em> adalah segalanya bagi seorang konten kreator. Video intro (Opening) yang konsisten membuat channel YouTube Anda terlihat profesional dan mudah diingat (<em>Memorable</em>).
                            </p>
                            <p>
                                Tidak perlu sewa animator mahal atau belajar After Effects. <strong>Opening Video Generator</strong> membuatkan animasi logo reveal atau teks intro dinamis untuk channel Anda. Cukup upload logo, pilih tema, dan download.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Fitur Utama:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Logo Animation:</strong> Menghidupkan logo statis menjadi animasi bergerak.</li>
                                <li><strong>Teks Kinetik:</strong> Jika belum punya logo, gunakan nama channel dengan efek tipografi keren.</li>
                                <li><strong>Resolusi HD:</strong> Siap digabungkan ke video project 1080p Anda.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Format file videonya apa?",
                            answer: "Format MP4 standar yang kompatibel dengan semua software editing (Premiere, CapCut, DaVinci)."
                        },
                        {
                            question: "Apakah boleh dipakai untuk komersial?",
                            answer: "Ya, video intro ini bebas royalti dan menjadi milik Anda sepenuhnya."
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