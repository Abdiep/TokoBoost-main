'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/services/supabase';
import { useRouter } from 'next/navigation';
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

// Komponen BenefitCard dari desain lama lu
const BenefitCard = ({ icon, title, desc }: { icon: string, title: string, desc: string }) => (
    <div className="p-5 bg-gray-800/30 rounded-xl border border-gray-700 hover:border-pink-500/50 transition-colors">
        <div className="text-3xl mb-3">{icon}</div>
        <h3 className="font-bold text-lg text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{desc}</p>
    </div>
);

export default function AffiliatePage() {
    const { user, isLoggedIn } = useAuth();
    const router = useRouter();
    
    const [referralCode, setReferralCode] = useState<string | null>(null);
    const [balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(true);
    const [copySuccess, setCopySuccess] = useState(false);
    const [totalClicks, setTotalClicks] = useState(0);
    const [totalJoins, setTotalJoins] = useState(0);

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/login');
            return;
        }

        const fetchAffiliateData = async () => {
            if (!user) return;
            
            // 1. Ambil data klik dan saldo
            const { data: profile } = await supabase
                .from('profiles')
                .select('referral_code, commission_balance, referral_clicks')
                .eq('id', user.uid)
                .single();

            // 2. Hitung berapa orang yang sudah join pake ID lu
            const { count } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .eq('referred_by', user.uid);

            if (profile) {
                setReferralCode(profile.referral_code);
                setBalance(profile.commission_balance || 0);
                setTotalClicks(profile.referral_clicks || 0);
                setTotalJoins(count || 0);
            }
            setLoading(false);
        };

        fetchAffiliateData();
    }, [isLoggedIn, user, router]);

    const generateCode = async () => {
        if (!user) return;
        setLoading(true);
        const namePart = user.name.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, 'TKB');
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        const newCode = `${namePart}${randomNum}`;

        const { error } = await supabase
            .from('profiles')
            .update({ referral_code: newCode })
            .eq('id', user.uid);

        if (!error) setReferralCode(newCode);
        setLoading(false);
    };

    const copyToClipboard = () => {
        const link = `${window.location.origin}?ref=${referralCode}`;
        navigator.clipboard.writeText(link);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#0f1115]">Loading...</div>;

    return (
        <InfoPageContainer title="Program Affiliate">
            <div className="space-y-10">
                {/* Bagian Copywriting (Dari desain lama) */}
                <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-4">
                        Bantu UMKM, Panen Cuan Rutin.
                    </h2>
                    <p className="text-lg text-gray-300">Dapatkan komisi 30% seumur hidup dari setiap user yang Anda ajak bergabung ke TokoBoost.</p>
                </div>

                {/* Bagian Benefit Cards (Dari desain lama) */}
                <div className="grid md:grid-cols-3 gap-4">
                    <BenefitCard icon="💰" title="Komisi 30%" desc="Recurring income setiap user topup atau berlangganan." />
                    <BenefitCard icon="⚡" title="WD Ringan" desc="Minimal penarikan hanya Rp 50.000 langsung ke rekening." />
                    <BenefitCard icon="🗓️" title="Cair 2x Sebulan" desc="Pembayaran otomatis setiap tanggal 1 dan 15." />
                </div>

                <div className="border-t border-gray-800 my-8"></div>

                {/* Bagian Mesin Affiliate (Dashboard Saldo & Link) */}
                {/* Row Statistik Baru */}
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800/30 border border-gray-700 p-4 rounded-xl text-center">
                        <p className="text-gray-400 text-xs uppercase tracking-wider">Total Klik Link</p>
                        <p className="text-2xl font-bold text-white">{totalClicks}</p>
                    </div>
                    <div className="bg-gray-800/30 border border-gray-700 p-4 rounded-xl text-center">
                        <p className="text-gray-400 text-xs uppercase tracking-wider">User Berhasil Join</p>
                        <p className="text-2xl font-bold text-pink-500">{totalJoins}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Card Saldo */}
                    <div className="bg-gray-900/50 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <h3 className="text-gray-400 text-sm mb-1">Saldo Komisi Anda</h3>
                            <div className="text-4xl font-bold text-white mb-4">
                                Rp {balance.toLocaleString('id-ID')}
                            </div>
                        </div>
                        <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full">
                            Tarik Saldo (Withdraw)
                        </button>
                    </div>

                    {/* Card Link Referral */}
                    <div className="bg-gradient-to-br from-pink-900/20 to-orange-900/20 border border-pink-500/30 p-6 rounded-2xl flex flex-col justify-center">
                        {!referralCode ? (
                            <div className="text-center">
                                <p className="mb-4 text-gray-300 text-sm">Anda belum memiliki link referral khusus.</p>
                                <button 
                                    onClick={generateCode}
                                    className="bg-gradient-to-r from-pink-600 to-orange-600 hover:scale-[1.02] text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg shadow-pink-500/20 w-full"
                                >
                                    Generate Link Afiliasi Saya
                                </button>
                            </div>
                        ) : (
                            <div>
                                <h3 className="text-gray-400 text-sm mb-3">Link Referral Unik Anda</h3>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="text" 
                                        readOnly 
                                        value={`${window.location.origin}?ref=${referralCode}`}
                                        className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-pink-400 font-mono text-sm outline-none"
                                    />
                                    <button 
                                        onClick={copyToClipboard}
                                        className={`${copySuccess ? 'bg-green-600' : 'bg-pink-600 hover:bg-pink-500'} text-white font-semibold p-3.5 rounded-xl transition-colors whitespace-nowrap min-w-[100px]`}
                                    >
                                        {copySuccess ? 'Tersalin!' : 'Copy Link'}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-3 text-center">
                                    Sebarkan link ini di bio Instagram, TikTok, atau WhatsApp Anda.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </InfoPageContainer>
    );
}