/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
import { GenerationState, GenerationResult } from '@/types/types';
import { OUTPUT_TOKEN_COSTS, PREWEDDING_THEMES, PREWEDDING_SCENES } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { FileInput, GenerateButton, OutputDisplay, VisualOptionSelector, SelectInput, TextInput } from '../ui/GeneratorUI';
import { SEOContentSection } from '../common/SEOContentSection';
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';
import { ChevronLeft } from 'lucide-react';

export const PreweddingGenerator: React.FC = () => {
    const { deductTokens, tokens, isLoggedIn } = useAuth();

    // -- STATE MANAGAMENT --
    const [selectedThemeLabel, setSelectedThemeLabel] = useState<string>(''); // Kosong = Mode Galeri
    const [womanImage, setWomanImage] = useState<File | null>(null);
    const [manImage, setManImage] = useState<File | null>(null);
    
    // Scene Default
    const firstScene = PREWEDDING_SCENES[0];
    const initialScene = (typeof firstScene === 'object' && 'label' in firstScene) ? (firstScene as any).label : String(firstScene || '');
    const [scene, setScene] = useState<string>(initialScene); 
    const [outfit, setOutfit] = useState('');
    
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.IMAGE;

    // -- HELPERS --
    // Mengubah data tema jadi format Visual Selector (Grid)
    const getVisualOptions = (dataArray: any[], type: 'theme' | 'scene') => {
        return dataArray.map((item: any) => {
            const label = typeof item === 'string' ? item : item.label;
            const value = typeof item === 'string' ? item : (item.value || item.label);

            const slug = label
                .toLowerCase()              // 1. Huruf kecil semua
                .replace(/\s+-\s+/g, '-')   // 2. Ubah pemisah " - " jadi satu strip "-"
                .replace(/\s+/g, '-')       // 3. Ubah sisa spasi jadi strip "-"
                .replace(/[^a-z0-9-]/g, '') // 4. Hapus karakter aneh
                .replace(/-+/g, '-');       // 5. Rapikan strip ganda
            
            let imgUrl;
            if (type === 'theme') {
                // Contoh: /images/templates/prewedding/countryside-picnic.webp
                imgUrl = `/images/templates/prewedding/${slug}.webp`; 
            } else {
                // Untuk Scene/Lokasi (opsional, kalau belum ada gambar pakai placeholder biru dulu)
                imgUrl = `https://placehold.co/400x500/3b82f6/ffffff?text=${encodeURIComponent(label)}`;
            }

            return { label, value, image: imgUrl };
        });
    };

    const handleGenerate = async () => {
        if (!isLoggedIn) { setIsLoginOpen(true); return; }
        if (!womanImage || !manImage) { alert('Mohon upload foto wajah Pria dan Wanita'); return; }
        if (tokens < cost) { setIsTopUpOpen(true); return; }

        try {
            setState('loading'); setError('');
            const success = await deductTokens(cost);
            if (!success) { setState('idle'); return; }

            const selectedThemeObj = PREWEDDING_THEMES.find((t: any) => t.label === selectedThemeLabel);
            const imageUrl = await geminiService.generatePreweddingImage(womanImage, manImage, selectedThemeObj, scene, outfit);
            
            setResult({ type: 'image', url: imageUrl });
            setState('success');
        } catch (err: any) {
            setError(err.message || 'Gagal generate gambar.');
            setState('error');
        }
    };

    // Reset jika ganti tema
    const handleBackToGallery = () => {
        setSelectedThemeLabel('');
        setResult(null);
        setState('idle');
    };

    return (
        <>
            <FeaturePanel title="Prewedding AI" description="Foto couple impian tanpa sewa studio mahal.">
                
                {/* --- MODE 1: GALLERY SELECTOR (TAMPIL PERTAMA) --- */}
                {!selectedThemeLabel && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                         <div className="text-center mb-8">
                            <h3 className="text-xl font-bold text-white mb-2">Pilih Tema / Vibe</h3>
                            <p className="text-gray-400 text-sm">Klik salah satu tema di bawah untuk mulai</p>
                        </div>
                        <VisualOptionSelector
                            value={selectedThemeLabel}
                            onChange={setSelectedThemeLabel}
                            options={getVisualOptions(PREWEDDING_THEMES, 'theme')}
                        />
                    </div>
                )}

                {/* --- MODE 2: INPUT FORM (TAMPIL SETELAH PILIH TEMA) --- */}
                {selectedThemeLabel && (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        {/* Header: Tombol Kembali & Info Tema */}
                        <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-800">
                            <button 
                                onClick={handleBackToGallery} 
                                className="flex items-center text-sm text-gray-400 hover:text-white transition-colors gap-1"
                            >
                                <ChevronLeft size={16} /> Ganti Tema
                            </button>
                            <span className="text-pink-500 font-bold bg-pink-500/10 px-3 py-1 rounded-full text-sm border border-pink-500/20">
                                {selectedThemeLabel}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* KOLOM KIRI: INPUT */}
                            <div>
                                <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <span className="w-6 h-6 rounded-full bg-pink-600 text-xs flex items-center justify-center">1</span> 
                                    Upload Foto
                                </h4>
                                
                                {/* 2 Upload Box Side-by-Side tapi Compact */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <FileInput label="Wanita" onChange={setWomanImage} variant="compact" />
                                    <FileInput label="Pria" onChange={setManImage} variant="compact" />
                                </div>

                                <h4 className="text-white font-bold mb-4 flex items-center gap-2 mt-8">
                                    <span className="w-6 h-6 rounded-full bg-blue-600 text-xs flex items-center justify-center">2</span> 
                                    Detail Foto
                                </h4>

                                <SelectInput
                                    label="Pilih Pose / Lokasi"
                                    value={scene}
                                    onChange={setScene}
                                    options={PREWEDDING_SCENES.map((s: any) => typeof s === 'string' ? { label: s, value: s } : { label: s.label, value: s.value || s.label })}
                                />
                                <TextInput label="Detail Pakaian (Opsional)" value={outfit} onChange={setOutfit} placeholder="Contoh: Gaun putih, Jas Hitam..." />
                                
                                <GenerateButton onClick={handleGenerate} disabled={state === 'loading'} loading={state === 'loading'} cost={cost} />
                                {error && <div className="mt-4 text-red-500 text-sm bg-red-900/20 p-3 rounded border border-red-500/50">{error}</div>}
                            </div>

                            {/* KOLOM KANAN: PREVIEW HASIL */}
                            <div className="bg-[#0f1115] rounded-xl p-6 border border-gray-800 min-h-[500px] flex flex-col items-center justify-center sticky top-24">
                                {state === 'idle' && (
                                    <div className="text-center text-gray-500">
                                        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl grayscale opacity-50">👩‍❤️‍👨</div>
                                        <h3 className="text-gray-300 font-bold mb-1">Preview Hasil</h3>
                                        <p className="text-sm">Foto prewedding kamu akan muncul di sini</p>
                                    </div>
                                )}
                                {state === 'loading' && <LoadingIndicator />}
                                {state === 'success' && result && <OutputDisplay result={result} downloadInfo={{ fileName: 'prewedding-ai-result' }} />}
                            </div>
                        </div>
                    </div>
                )}

                <SEOContentSection 
                    title="Foto Pre-wedding Impian Tanpa Biaya Mahal" 
                    content={
                        <>
                            <p>
                                Biaya pernikahan terus meningkat, dan sesi foto pre-wedding seringkali memakan porsi budget yang besar (sewa lokasi, gaun, makeup, fotografer). Banyak pasangan muda mencari alternatif cerdas untuk tetap memiliki kenangan indah tanpa menguras tabungan masa depan.
                            </p>
                            <p>
                                <strong>Pre-wedding AI Generator</strong> adalah solusinya. Cukup upload foto wajah Anda dan pasangan, pilih tema (Adat, Modern, Casual, Nature), dan biarkan AI merangkai momen romantis kalian. Hasilnya sangat realistis dan cocok untuk undangan digital atau pajangan resepsi.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Hemat Hingga Jutaan Rupiah:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Tanpa Sewa Gaun:</strong> Virtual try-on berbagai busana pengantin internasional/tradisional.</li>
                                <li><strong>Lokasi Tanpa Batas:</strong> Foto di Paris, Jepang, atau pantai Bali tanpa beli tiket pesawat.</li>
                                <li><strong>Privasi Terjaga:</strong> Tidak perlu canggung berpose di depan fotografer asing.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Apakah bisa pakai foto selfie terpisah?",
                            answer: "Bisa! Anda tidak perlu foto berdua dulu. Upload foto wajah Pria dan Wanita secara terpisah, AI akan menggabungkannya dalam satu frame."
                        },
                        {
                            question: "Apakah hasilnya mirip asli?",
                            answer: "Tingkat kemiripan wajah mencapai 90%+, dengan penyesuaian lighting agar menyatu sempurna dengan background."
                        }
                    ]} 
                />
            </FeaturePanel>
            
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
        </>
    );
};