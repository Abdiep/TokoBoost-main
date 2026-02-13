import React from 'react';
import { useRouter } from 'next/navigation';

interface FeaturePanelProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const FeaturePanel: React.FC<FeaturePanelProps> = ({ title, description, children }) => {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Tombol Kembali */}
            <button 
                onClick={() => router.back()} 
                className="mb-6 flex items-center text-gray-400 hover:text-white transition-colors text-sm"
            >
                ← Kembali ke Dashboard
            </button>

            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-3">{title}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">{description}</p>
            </div>

            {/* GANTI: Pakai glass-card + padding yang pas */}
            <div className="glass-card p-6 md:p-8">
                {children}
            </div>
        </div>
    );
};