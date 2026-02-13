/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState } from 'react';
// import { useRouter } from 'next/navigation'; // <-- Tidak perlu router lagi untuk login
import { GenerationState, GenerationResult } from '@/types/types';
import { OUTPUT_TOKEN_COSTS } from '@/constants/constants';
import * as geminiService from '@/services/geminiService';
import { useAuth } from '@/context/AuthContext';
import { FileInput, GenerateButton, OutputDisplay, TextAreaInput } from '../ui/GeneratorUI';
import { FeaturePanel } from '../common/FeaturePanel';
import { LoadingIndicator } from '../common/LoadingIndicator';
import { SEOContentSection } from '../common/SEOContentSection';

// --- IMPORT MODAL BARU ---
import { LoginModal } from '@/components/common/LoginModal';
import { TopUpModal } from '@/components/common/TopUpModal';

export const FlyerGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth(); 

    // State Form
    const [image, setImage] = useState<File | null>(null);
    const [description, setDescription] = useState('');
    
    // State Proses
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);

    // State Modal (Satpam)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.IMAGE;

    const handleGenerate = async () => {
        // 1. CEK LOGIN (Pakai Modal, bukan Redirect)
        if (!isLoggedIn) {
            setIsLoginOpen(true);
            return;
        }

        // 2. CEK INPUT
        if (!image) {
            alert('Mohon upload foto produk Anda.');
            return;
        }
        if (!description) {
            alert('Mohon isi deskripsi produk/tema.');
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

            // Panggil AI Service
            const { imageUrl, caption } = await geminiService.generateFlyer(image, description);
            
            setResult({ 
                type: 'image', 
                url: imageUrl,
                caption: caption 
            });
            
            setState('success');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Gagal membuat flyer.');
            setState('error');
        }
    };

    return (
        <>
            <FeaturePanel 
                title="Flyer Promosi Instan" 
                description="Ubah foto produk biasa menjadi poster iklan profesional dengan AI. Lengkap dengan caption sosmed."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* INPUT SECTION */}
                    <div>
                        <FileInput 
                            label="Upload Foto Produk" 
                            onChange={setImage} 
                            helperText="Pastikan produk terlihat jelas dan cahaya cukup terang."
                        />
                        
                        <TextAreaInput 
                            label="Deskripsi Produk & Tema Flyer" 
                            value={description} 
                            onChange={setDescription} 
                            placeholder="Contoh: Keripik pisang coklat lumer, tema ceria warna kuning, background piknik."
                            rows={4}
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

                    {/* OUTPUT SECTION */}
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex flex-col items-center justify-center">
                        {state === 'idle' && (
                            <div className="text-center text-gray-500">
                                <p>Hasil flyer akan muncul di sini</p>
                            </div>
                        )}
                        
                        {state === 'loading' && <LoadingIndicator />}

                        {state === 'success' && result && (
                            <div className="w-full">
                                <OutputDisplay result={result} downloadInfo={{ fileName: `flyer-tokoboost` }} />
                            </div>
                        )}
                    </div>
                </div>

                <SEOContentSection 
                    title="Revolusi Foto Produk UMKM dengan AI Generator"
                    content={
                        <>
                            <p>
                                Visual adalah kunci utama penjualan online. Riset menunjukkan bahwa <strong>93% konsumen</strong> mempertimbangkan tampilan visual sebagai faktor penentu keputusan pembelian. Namun, bagi UMKM, menyewa studio foto profesional dan model seringkali memakan biaya jutaan rupiah.
                            </p>
                            <p>
                                <strong>Flyer Generator TokoBoost</strong> hadir sebagai solusi hemat biaya. Menggunakan teknologi Generative AI terbaru dari Google Gemini, alat ini mampu mengubah foto produk sederhana dari kamera HP menjadi materi promosi kelas profesional dalam hitungan detik.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Mengapa Menggunakan Tools Ini?</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Hemat Biaya Operasional:</strong> Nol biaya sewa model, MUA, atau fotografer.</li>
                                <li><strong>Kecepatan Produksi:</strong> Buat ratusan variasi materi promosi dalam satu hari.</li>
                                <li><strong>Kualitas E-Commerce:</strong> Hasil gambar memiliki pencahayaan, bayangan, dan komposisi yang setara dengan standar marketplace global.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Apakah foto hasil generate boleh dipakai untuk iklan FB/IG Ads?",
                            answer: "Tentu saja! Semua gambar yang dihasilkan bebas hak cipta (copyright-free) dan milik Anda sepenuhnya untuk tujuan komersial."
                        },
                        {
                            question: "Tips agar hasilnya bagus?",
                            answer: "Gunakan foto produk dengan cahaya yang cukup dan latar belakang yang tidak terlalu ramai. Deskripsikan suasana yang diinginkan secara spesifik di kolom deskripsi."
                        }
                    ]}
                />
            </FeaturePanel>

            {/* --- PASANG MODAL DI SINI --- */}
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
        </>
    );
};