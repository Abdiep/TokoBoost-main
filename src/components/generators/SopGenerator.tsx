// src/components/generators/SopGenerator.tsx
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

export const SopGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth();
    const [procedure, setProcedure] = useState('');
    const [state, setState] = useState<GenerationState>('idle');
    const [error, setError] = useState('');
    const [result, setResult] = useState<GenerationResult>(null);

    // State Modal (Satpam)
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);

    const cost = OUTPUT_TOKEN_COSTS.TEXT;

    const handleGenerate = async () => {
        // 1. CEK LOGIN (Pakai Modal)
        if (!isLoggedIn) { 
            setIsLoginOpen(true); 
            return; 
        }

        // 2. CEK INPUT
        if (!procedure) {
            alert('Mohon isi judul atau aktivitas SOP.');
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

            const text = await geminiService.generateSop(procedure);
            // FIX: Pastikan text tidak undefined
            setResult({ type: 'text', content: text || "Gagal menghasilkan teks." });
            setState('success');
        } catch (err: any) {
            setError(err.message);
            setState('error');
        }
    };

    return (
        <>
            <FeaturePanel title="SOP Generator" description="Buat dokumen SOP perusahaan dalam hitungan detik.">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                        <TextAreaInput label="Judul / Aktivitas SOP" value={procedure} onChange={setProcedure} placeholder="Contoh: Prosedur Penanganan Komplain Pelanggan" />
                        <GenerateButton onClick={handleGenerate} disabled={state === 'loading'} loading={state === 'loading'} cost={cost} />
                        {error && <div className="mt-4 text-red-500">{error}</div>}
                    </div>
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex items-center justify-center">
                        {state === 'idle' && <p className="text-gray-500">Dokumen SOP akan muncul di sini</p>}
                        {state === 'loading' && <LoadingIndicator />}
                        {/* FIX DATE.NOW */}
                        {state === 'success' && result && <OutputDisplay result={result} downloadInfo={{ fileName: 'sop-dokumen' }} />}
                    </div>
                </div>
                <SEOContentSection 
                    title="Pentingnya Standar Operasional Prosedur (SOP) untuk Bisnis"
                    content={
                        <>
                            <p>
                                Bisnis yang sukses adalah bisnis yang bisa berjalan tanpa kehadiran pemiliknya setiap saat. Kuncinya ada pada sistem, dan pondasi sistem adalah <strong>SOP (Standard Operating Procedure)</strong>. Tanpa SOP, kualitas layanan akan tidak konsisten dan ketergantungan pada karyawan tertentu menjadi sangat tinggi.
                            </p>
                            <p>
                                Membuat SOP manual biasanya memakan waktu berhari-hari. Dengan <strong>AI SOP Generator TokoBoost</strong>, Anda bisa menyusun dokumen prosedur standar industri hanya dengan memasukkan judul aktivitasnya. AI kami dilatih dengan ribuan dokumen manajemen bisnis terbaik.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Manfaat SOP yang Baik:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Konsistensi Kualitas:</strong> Setiap pelanggan mendapatkan pengalaman yang sama baiknya.</li>
                                <li><strong>Efisiensi Training:</strong> Karyawan baru bisa belajar lebih cepat dengan panduan tertulis.</li>
                                <li><strong>Skalabilitas:</strong> Memudahkan membuka cabang baru karena sistem sudah terdokumentasi.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Apakah format SOP ini sesuai standar ISO?",
                            answer: "Generator kami menggunakan struktur umum (Tujuan, Ruang Lingkup, Prosedur) yang kompatibel dengan standar ISO 9001, namun Anda mungkin perlu menyesuaikan detail spesifik sesuai audit perusahaan."
                        },
                        {
                            question: "Bisa untuk bidang usaha apa saja?",
                            answer: "Sangat fleksibel. Mulai dari F&B (Resep & Layanan), Retail, Jasa, hingga Logistik."
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