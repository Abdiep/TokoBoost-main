// src/components/generators/ReviewGenerator.tsx
'use client';

import React, { useState } from 'react';
import { GenerationState, GenerationResult } from '@/types/types';
import { OUTPUT_TOKEN_COSTS } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FileInput, GenerateButton, OutputDisplay, TextAreaInput } from '../ui/GeneratorUI';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';

export const ReviewGenerator: React.FC = () => {
    const { deductTokens, tokens, isLoggedIn } = useAuth(); 

    // Kembali ke 1 gambar utama
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');
    
    const [currentPart, setCurrentPart] = useState<'hook' | 'dive' | 'cta' | 'idle'>('idle');
    const [state, setState] = useState<GenerationState>('idle');
    const [results, setResults] = useState<{part1?: GenerationResult, part2?: GenerationResult, part3?: GenerationResult}>({});
    const [error, setError] = useState('');

    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const videoCost = OUTPUT_TOKEN_COSTS.VIDEO; 

    const handleGenerate = async (part: 'hook' | 'dive' | 'cta') => {
        if (!isLoggedIn) { setIsLoginOpen(true); return; }
        if (!image || !description) { alert('Foto Produk dan deskripsi wajib diisi.'); return; }
        if (tokens < videoCost) { setIsTopUpOpen(true); return; }

        try {
            setState('loading');
            setError('');
            
            // 1. SURUH AI KERJA DULUAN
            const videoUrl = await geminiService.generateUGCReview(image, description, part, voiceGender);
            
            // 2. KALAU VIDEO BERHASIL JADI, BARU POTONG TOKEN!
            const success = await deductTokens(videoCost);
            if (!success) { 
                setError('Gagal memotong token. Saldo tidak mencukupi.');
                setState('error'); 
                return; 
            }

            const newResult: GenerationResult = { type: 'video', url: videoUrl };
            setResults(prev => ({ 
                ...prev, 
                [`part${part === 'hook' ? 1 : part === 'dive' ? 2 : 3}`]: newResult 
            }));
            
            setCurrentPart(part);
            setState('success');
        } catch (err: any) {
            // KALAU ERROR, NGGAK PERLU REFUND KARENA EMANG BELUM DIPOTONG
            console.error("Generate error:", err);
            setError(err.message || `Gagal membuat Affiliate Video.`);
            setState('error');
        }
    };

    return (
        <>
            <FeaturePanel 
                title="Affiliate Video Generator" 
                description="Buat video review produk 24 detik dengan storytelling berkelanjutan. Cukup 1 foto, AI akan menganimasikan kelanjutannya!"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* INPUT SECTION */}
                    <div className="space-y-4">
                        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl space-y-4">
                            <h3 className="text-white font-bold text-sm">Step 1: Upload Foto Produk (9:16)</h3>
                            <FileInput label="Pilih Gambar (Disarankan ada Model/Orang)" onChange={setImage} />
                        </div>

                        <TextAreaInput 
                            label="Step 2: Tentang Produk ini (Keunggulan)" 
                            value={description} 
                            onChange={setDescription} 
                            placeholder="Contoh: Celana hiking warna maroon, bahan lentur, cocok untuk naik gunung."
                            rows={3}
                        />

                        <div className="p-4 bg-gray-800/50 border border-gray-700 rounded-xl">
                            <h3 className="text-white font-bold text-sm mb-3">Step 3: Pilih Suara Reviewer</h3>
                            <div className="flex gap-4">
                                <label className={`flex-1 flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer ${voiceGender === 'female' ? 'bg-pink-500/10 border-pink-500 text-pink-400' : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                                    <input type="radio" name="voiceGender" value="female" checked={voiceGender === 'female'} onChange={() => setVoiceGender('female')} className="accent-pink-500" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">Perempuan (Lala)</span>
                                        <span className="text-[10px]">Suara natural, ceria, UGC Style</span>
                                    </div>
                                </label>
                                <label className={`flex-1 flex items-center gap-3 p-3 rounded-lg border transition cursor-pointer ${voiceGender === 'male' ? 'bg-pink-500/10 border-pink-500 text-pink-400' : 'bg-gray-900/50 border-gray-700 text-gray-400 hover:border-gray-600'}`}>
                                    <input type="radio" name="voiceGender" value="male" checked={voiceGender === 'male'} onChange={() => setVoiceGender('male')} className="accent-pink-500" />
                                    <div className="flex flex-col">
                                        <span className="font-bold text-sm">Laki-laki (Adi)</span>
                                        <span className="text-[10px]">Suara berwibawa, meyakinkan</span>
                                    </div>
                                </label>
                            </div>
                        </div>

                        {/* Tombol Kontrol Dinamis */}
                        {state !== 'success' && currentPart === 'idle' && (
                             <GenerateButton 
                                onClick={() => handleGenerate('hook')} 
                                disabled={state === 'loading'} 
                                loading={state === 'loading'} 
                                cost={videoCost}
                                text="Generate Part 1 (The Hook)"
                             />
                        )}
                        
                        {state === 'success' && results.part1 && !results.part2 && (
                            <button 
                                onClick={() => handleGenerate('dive')}
                                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl font-bold text-white hover:opacity-90 transition shadow-lg shadow-pink-500/20"
                            >
                                🔥 Lanjut Part 2 (Adegan Berlanjut) - {videoCost} Token
                            </button>
                        )}

                        {state === 'success' && results.part2 && !results.part3 && (
                            <button 
                                onClick={() => handleGenerate('cta')}
                                className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-xl font-bold text-white hover:opacity-90 transition shadow-lg shadow-orange-500/20"
                            >
                                🚀 Selesaikan Part 3 (Adegan Puncak & CTA) - {videoCost} Token
                            </button>
                        )}

                        {error && <div className="p-3 bg-red-900/50 border border-red-500 rounded text-red-200 text-sm">{error}</div>}
                    </div>

                    {/* OUTPUT SECTION */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px]">
                        {state === 'loading' && <LoadingIndicator isVideo={true} />}
                        
                        <div className="space-y-6">
                            {results.part1 && (
                                <div className="border-l-4 border-pink-500 pl-4">
                                    <p className="text-xs text-pink-400 font-bold mb-2 uppercase">Part 1: The Hook</p>
                                    <OutputDisplay result={results.part1} downloadInfo={{ fileName: `review-part1` }} />
                                </div>
                            )}
                            {results.part2 && (
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <p className="text-xs text-purple-400 font-bold mb-2 uppercase">Part 2: Adegan Berlanjut</p>
                                    <OutputDisplay result={results.part2} downloadInfo={{ fileName: `review-part2` }} />
                                </div>
                            )}
                            {results.part3 && (
                                <div className="border-l-4 border-orange-500 pl-4">
                                    <p className="text-xs text-orange-400 font-bold mb-2 uppercase">Part 3: Conclusion</p>
                                    <OutputDisplay result={results.part3} downloadInfo={{ fileName: `review-part3` }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </FeaturePanel>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
        </>
    );
};