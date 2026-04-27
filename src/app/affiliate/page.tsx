'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/services/supabase';
import { useRouter } from 'next/navigation';
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

// Tipe data untuk Riwayat WD
interface WdHistory {
    id: string;
    amount: number;
    payment_number: string;
    status: string;
    created_at: string;
}

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

    // State untuk Withdrawal
    const [isWdModalOpen, setIsWdModalOpen] = useState(false);
    const [gopayNumber, setGopayNumber] = useState('');
    const [isSubmittingWd, setIsSubmittingWd] = useState(false);
    const [wdHistory, setWdHistory] = useState<WdHistory[]>([]); // <--- STATE BARU UNTUK RIWAYAT

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

            // 3. AMBIL RIWAYAT PENARIKAN (Dari tabel withdraw_requests)
            const { data: historyData } = await supabase
                .from('withdraw_requests')
                .select('*')
                .eq('affiliate_id', user.uid)
                .order('created_at', { ascending: false });

            if (profile) {
                setReferralCode(profile.referral_code);
                setBalance(profile.commission_balance || 0);
                setTotalClicks(profile.referral_clicks || 0);
                setTotalJoins(count || 0);
            }
            if (historyData) {
                setWdHistory(historyData);
            }
            
            setLoading(false);
        };

        fetchAffiliateData();
    }, [isLoggedIn, user, router]);

    const generateCode = async () => { /* Logika generate code */ };
    const copyToClipboard = () => { /* Logika copy */ };

    // --- FUNGSI PROSES TARIK SALDO ---
    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        if (gopayNumber.length < 10) return alert("Masukkan nomor GoPay yang valid.");
        
        setIsSubmittingWd(true);

        const { data: success, error } = await supabase.rpc('request_withdrawal', {
            p_user_id: user.uid,
            p_amount: balance, 
            p_gopay_number: gopayNumber
        });

        if (error || !success) {
            alert("Gagal memproses penarikan. Pastikan saldo Anda cukup.");
        } else {
            // ==========================================
            // KODINGAN BARU: Tembak Notifikasi Email
            // ==========================================
            try {
                await fetch('/api/notify-wd', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        affiliateId: user.uid,
                        amount: balance,
                        gopayNumber: gopayNumber
                    })
                });
            } catch (err) {
                console.error("Gagal kirim notif email:", err);
                // Kita diamkan saja errornya biar user nggak keganggu
            }
            // ==========================================

            alert("Berhasil! Penarikan sedang diproses. Dana akan cair pada tanggal 1 atau 15.");
            
            // Update UI langsung tanpa refresh
            const newHistoryItem: WdHistory = {
                id: Date.now().toString(),
                amount: balance,
                payment_number: gopayNumber,
                status: 'pending',
                created_at: new Date().toISOString(),
            };
            
            setWdHistory([newHistoryItem, ...wdHistory]);
            setBalance(0); 
            setIsWdModalOpen(false);
            setGopayNumber('');
        }
        setIsSubmittingWd(false);
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center text-white bg-[#0f1115]">Loading...</div>;

    const isEligibleForWd = balance >= 50000;

    return (
        <InfoPageContainer title="Program Affiliate">
            <div className="space-y-10">
                {/* Bagian Copywriting */}
                <div className="text-center md:text-left animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 mb-4">
                        Bantu UMKM, Panen Cuan Rutin.
                    </h2>
                    <p className="text-lg text-gray-300">Dapatkan komisi 30% seumur hidup dari setiap user yang Anda ajak bergabung ke TokoBoost.</p>
                </div>

                {/* Bagian Benefit Cards */}
                <div className="grid md:grid-cols-3 gap-4">
                    <BenefitCard icon="💰" title="Komisi 30%" desc="Recurring income setiap user topup atau berlangganan." />
                    <BenefitCard icon="⚡" title="WD Ringan" desc="Minimal penarikan hanya Rp 50.000 langsung ke rekening." />
                    <BenefitCard icon="🗓️" title="Cair 2x Sebulan" desc="Pembayaran otomatis setiap tanggal 1 dan 15." />
                </div>

                <div className="border-t border-gray-800 my-8"></div>

                {/* Row Statistik */}
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
                            <div className="text-4xl font-bold text-white mb-2">
                                Rp {balance.toLocaleString('id-ID')}
                            </div>
                            {!isEligibleForWd && balance > 0 && (
                                <p className="text-xs text-red-400 mb-4">
                                    *Kurang Rp {(50000 - balance).toLocaleString('id-ID')} lagi untuk ditarik.
                                </p>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsWdModalOpen(true)}
                            disabled={!isEligibleForWd}
                            className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all w-full ${
                                isEligibleForWd 
                                ? 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-500/20' 
                                : 'bg-white/5 text-gray-500 cursor-not-allowed border border-white/5'
                            }`}
                        >
                            {isEligibleForWd ? 'Tarik Saldo Sekarang' : 'Saldo Belum Mencukupi'}
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

                {/* --- TABEL RIWAYAT PENARIKAN (BARU) --- */}
                <div className="mt-8 bg-gray-900/50 border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-lg font-bold text-white mb-4 font-orbitron">Riwayat Penarikan</h3>
                    {wdHistory.length === 0 ? (
                        <p className="text-gray-500 text-sm text-center py-4 bg-black/30 rounded-xl">Belum ada riwayat penarikan.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-400">
                                <thead className="text-xs uppercase bg-black/50 text-gray-500">
                                    <tr>
                                        <th className="px-4 py-3 rounded-tl-lg">Tanggal</th>
                                        <th className="px-4 py-3">Nominal</th>
                                        <th className="px-4 py-3">GoPay</th>
                                        <th className="px-4 py-3 rounded-tr-lg">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wdHistory.map((item) => (
                                        <tr key={item.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-4 py-4 text-white font-medium whitespace-nowrap">
                                                Rp {item.amount.toLocaleString('id-ID')}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap">{item.payment_number}</td>
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                                                    item.status === 'pending' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                                                    item.status === 'processed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                                    'bg-red-500/20 text-red-400 border border-red-500/30'
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* --- MODAL INPUT GOPAY --- */}
            {isWdModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#1a1d24] border border-white/10 rounded-2xl w-full max-w-md p-6 relative">
                        <button onClick={() => setIsWdModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl">&times;</button>
                        <h3 className="text-2xl font-bold text-white mb-2 font-orbitron">Tarik Saldo</h3>
                        <p className="text-sm text-gray-400 mb-6">Penarikan akan diproses ke rekening GoPay Anda pada tanggal 1 atau 15 setiap bulannya.</p>
                        
                        <div className="bg-black/50 rounded-lg p-4 mb-6 border border-white/5">
                            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Nominal Ditarik</p>
                            <p className="text-xl font-bold text-green-400">Rp {balance.toLocaleString('id-ID')}</p>
                        </div>

                        <form onSubmit={handleWithdraw}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">Nomor HP GoPay</label>
                                <input 
                                    type="number" 
                                    value={gopayNumber}
                                    onChange={(e) => setGopayNumber(e.target.value)}
                                    placeholder="081234567890"
                                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white outline-none focus:border-pink-500 transition-colors"
                                    required
                                />
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmittingWd}
                                className={`w-full py-4 rounded-xl font-bold transition-all ${
                                    isSubmittingWd ? 'bg-gray-600 text-gray-300' : 'bg-gradient-to-r from-pink-600 to-orange-600 text-white hover:scale-[1.02]'
                                }`}
                            >
                                {isSubmittingWd ? 'Memproses...' : 'Konfirmasi Penarikan'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </InfoPageContainer>
    );
}