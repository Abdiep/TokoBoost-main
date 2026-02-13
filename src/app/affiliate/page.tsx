'use client';
import React, { useState } from 'react';
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

export default function AffiliatePage() {
    const [email, setEmail] = useState('');

    const handleJoin = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Terima kasih! Anda masuk dalam Waitlist Affiliate.");
        setEmail('');
    };

    return (
        <InfoPageContainer title="Program Affiliate">
            <div className="space-y-8">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                        Bantu UMKM, Panen Cuan Rutin.
                    </h2>
                    <p className="text-lg mt-2">Dapatkan komisi 30% seumur hidup dari setiap user yang Anda ajak.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-4 my-8">
                    <BenefitCard icon="💰" title="Komisi 30%" desc="Recurring income setiap user topup." />
                    <BenefitCard icon="⚡" title="WD Ringan" desc="Minimal penarikan hanya Rp 50.000." />
                    <BenefitCard icon="🗓️" title="Cair 2x Sebulan" desc="Setiap tanggal 1 dan 15." />
                </div>

                {/* Waitlist Form */}
                <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
                    <h3 className="font-bold text-white mb-4">Daftar Waitlist (Early Bird)</h3>
                    <form onSubmit={handleJoin} className="flex gap-4 flex-col sm:flex-row">
                        <input 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Masukkan email Anda"
                            className="flex-1 bg-black border border-gray-600 rounded-lg p-3 text-white"
                            required
                        />
                        <button type="submit" className="bg-pink-600 px-6 py-3 rounded-lg text-white font-bold hover:bg-pink-700">
                            Gabung Sekarang
                        </button>
                    </form>
                </div>
            </div>
        </InfoPageContainer>
    );
}

const BenefitCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
    <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
    </div>
);