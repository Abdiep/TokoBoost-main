'use client';

import React from 'react';
import { AdSenseBanner } from '../ads/AdSenseBanner';

interface SEOContentProps {
    title: string;
    content: React.ReactNode;
    faq?: { question: string; answer: string }[];
}

export const SEOContentSection: React.FC<SEOContentProps> = ({ title, content, faq }) => {
    return (
        <div className="mt-16 pt-10 border-t border-gray-800 max-w-4xl mx-auto space-y-8">
            <div className="prose prose-invert max-w-none text-gray-300">
                <h2 className="text-2xl font-bold font-orbitron gradient-text mb-6 text-center md:text-left">{title}</h2>
                <div className="space-y-4 leading-relaxed text-sm md:text-base text-justify">
                    {content}
                </div>
            </div>

            {/* IKLAN DI TENGAH ARTIKEL */}
            <div className="py-4">
                 <span className="text-xs text-gray-600 block text-center mb-1">Sponsored</span>
                 <AdSenseBanner adSlot="" adFormat="fluid" />
            </div>

            {faq && faq.length > 0 && (
                <div className="bg-gray-800/30 rounded-xl p-6 border border-white/5">
                    <h3 className="text-xl font-bold text-white mb-4">Pertanyaan Umum (FAQ)</h3>
                    <div className="space-y-4">
                        {faq.map((item, idx) => (
                            <div key={idx} className="border-b border-gray-700 pb-4 last:border-0">
                                <h4 className="font-semibold text-pink-400 mb-2">{item.question}</h4>
                                <p className="text-sm text-gray-400">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};