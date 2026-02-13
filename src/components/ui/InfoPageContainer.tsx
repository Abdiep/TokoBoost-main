'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface InfoPageProps {
    title: string;
    children: React.ReactNode;
}

export const InfoPageContainer: React.FC<InfoPageProps> = ({ title, children }) => {
    return (
        <main className="min-h-screen bg-[#0f1115] text-gray-300 font-sans">
            <Header />
            
            {/* Content Wrapper */}
            <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
                {/* Judul Halaman */}
                <h1 className="text-3xl md:text-5xl font-bold font-orbitron text-white mb-8 border-b border-gray-800 pb-6">
                    {title}
                </h1>
                
                {/* Isi Konten (Typography Style) */}
                <div className="prose prose-invert prose-lg max-w-none prose-headings:font-orbitron prose-a:text-pink-500 hover:prose-a:text-pink-400">
                    {children}
                </div>
            </div>

            <Footer />
        </main>
    );
};