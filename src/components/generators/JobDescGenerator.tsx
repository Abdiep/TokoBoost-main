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

export const JobDescGenerator: React.FC = () => {
    // const router = useRouter(); // <-- Hapus
    const { deductTokens, tokens, isLoggedIn } = useAuth();

    const [profession, setProfession] = useState('');
    
    // State Proses
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
        if (!profession) {
            alert('Mohon isi nama posisi pekerjaan.');
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
            const text = await geminiService.generateJobDesc(profession);
            
            setResult({ 
                type: 'text', 
                content: text || "Gagal membuat deskripsi pekerjaan." 
            });
            
            setState('success');
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Gagal membuat job desc.');
            setState('error');
        }
    };

    return (
        <>
            <FeaturePanel 
                title="Job Description Generator" 
                description="Buat deskripsi pekerjaan HRD yang lengkap, formal, dan menarik minat kandidat berkualitas."
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* INPUT SECTION */}
                    <div>
                        <TextInput 
                            label="Posisi Pekerjaan (Job Title)" 
                            value={profession} 
                            onChange={setProfession} 
                            placeholder="Contoh: Digital Marketing Specialist, Barista" 
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
                    <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 min-h-[400px] flex items-center justify-center">
                        {state === 'idle' && (
                            <div className="text-center text-gray-500">
                                <p>Dokumen Job Desc akan muncul di sini</p>
                            </div>
                        )}
                        
                        {state === 'loading' && <LoadingIndicator />}

                        {state === 'success' && result && (
                            <div className="w-full">
                                <OutputDisplay result={result} downloadInfo={{ fileName: 'job-desc-result' }} />
                            </div>
                        )}
                    </div>
                </div>

                <SEOContentSection 
                    title="Buat Deskripsi Pekerjaan (Job Desc) HRD Profesional"
                    content={
                        <>
                            <p>
                                Merekrut talenta yang tepat dimulai dari penulisan Job Description yang jelas. Banyak UMKM kesulitan menarik pelamar berkualitas karena info lowongan yang ditulis seadanya atau membingungkan.
                            </p>
                            <p>
                                <strong>Job Desc Generator</strong> membantu HRD dan pemilik bisnis menyusun dokumen lowongan kerja yang terstruktur, formal, dan menarik dalam hitungan detik. Dokumen ini mencakup Tanggung Jawab Utama, Kualifikasi (Hard/Soft Skill), hingga KPI dasar.
                            </p>
                            <h3 className="text-lg font-bold text-white mt-4">Pentingnya Job Desc yang Baik:</h3>
                            <ul className="list-disc list-inside ml-2 space-y-1">
                                <li><strong>Filter Kandidat:</strong> Mengurangi pelamar yang tidak relevan (<em>unqualified</em>).</li>
                                <li><strong>Ekspektasi Kerja:</strong> Karyawan baru langsung paham apa yang diharapkan darinya.</li>
                                <li><strong>Legalitas:</strong> Menjadi dasar kontrak kerja yang jelas antara pengusaha dan pekerja.</li>
                            </ul>
                        </>
                    }
                    faq={[
                        {
                            question: "Apakah formatnya standar perusahaan?",
                            answer: "Ya, format yang dihasilkan mengikuti standar HRD umum (Judul, Ringkasan, Tugas, Kualifikasi) yang biasa dipakai di JobStreet atau LinkedIn."
                        },
                        {
                            question: "Bisa untuk level Manager?",
                            answer: "Bisa. Cukup ketik spesifik, misal 'Marketing Manager' atau 'Chief Technology Officer', AI akan menyesuaikan bobot tugasnya."
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