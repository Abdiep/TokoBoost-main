'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import { topUpPackages } from '@/constants/constants';

// 1. Tipe Data Hasil Transaksi Midtrans
interface MidtransResult {
    status_code: string;
    status_message: string;
    transaction_id: string;
    order_id: string;
    gross_amount: string;
    payment_type: string;
    transaction_time: string;
    transaction_status: 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire';
    fraud_status?: string;
}

// 2. Interface Khusus untuk Snap (Pengganti 'any')
// Ini memberitahu TypeScript bahwa Snap punya method .pay()
interface SnapDispatcher {
    pay: (token: string, options: {
        onSuccess: (result: MidtransResult) => void;
        onPending: (result: MidtransResult) => void;
        onError: (result: MidtransResult) => void;
        onClose: () => void;
    }) => void;
}

interface TopUpModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const TopUpModal: React.FC<TopUpModalProps> = ({ isOpen, onClose }) => {
    const { user, addTokens } = useAuth(); 
    const [isLoading, setIsLoading] = useState(false);

    // --- Load Script Midtrans ---
    useEffect(() => {
        if (!isOpen) return;

        const snapScriptId = 'midtrans-snap-script';
        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

        if (!clientKey) {
            console.error("❌ MIDTRANS CLIENT KEY BELUM DISET DI .env.local!");
            return;
        }

        if (!document.getElementById(snapScriptId)) {
            const script = document.createElement("script");
            script.src = "https://app.sandbox.midtrans.com/snap/snap.js"; 
            script.id = snapScriptId;
            script.setAttribute("data-client-key", clientKey);
            script.async = true;
            document.body.appendChild(script);
        }
    }, [isOpen]);

    // --- Handle Transaksi ---
    const handleTopUp = async (pkg: typeof topUpPackages[0]) => {
        setIsLoading(true);

        try {
            if (!user) {
                alert("Silakan login terlebih dahulu.");
                setIsLoading(false);
                return;
            }

            const orderId = `TKB-${user.name?.split(' ')[0] || 'User'}-${Date.now()}`;
            const amount = parseInt(pkg.price.replace(/\./g, '')); 

            const transactionData = {
                order_id: orderId,
                gross_amount: amount,
                customer_details: {
                    first_name: user.name || "Pengguna TokoBoost",
                    email: user.email || "user@tokoboost.com",
                },
            };

            // Panggil API Backend Next.js
            const response = await fetch('/api/payment/create-transaction', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(transactionData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Gagal membuat transaksi');
            }

            // --- BAGIAN YANG DIPERBAIKI (LINE 97) ---
            // Kita cek keberadaan window.snap, lalu cast ke interface 'SnapDispatcher'
            if (window.snap) {
                // Gunakan casting ke tipe khusus, bukan 'any'
                (window.snap as unknown as SnapDispatcher).pay(data.token, {
                    onSuccess: (result: MidtransResult) => {
                        console.log('Payment Success:', result);
                        if (addTokens) addTokens(pkg.tokens + pkg.bonus);
                        alert(`Pembayaran Berhasil! ${pkg.tokens + pkg.bonus} Token telah ditambahkan.`);
                        setIsLoading(false);
                        onClose();
                    },
                    onPending: (result: MidtransResult) => {
                        console.log('Payment Pending:', result);
                        alert('Pembayaran tertunda. Silakan selesaikan pembayaran Anda.');
                        setIsLoading(false);
                        onClose();
                    },
                    onError: (result: MidtransResult) => {
                        console.error('Payment Error:', result);
                        alert('Pembayaran gagal atau dibatalkan.');
                        setIsLoading(false);
                    },
                    onClose: () => {
                        setIsLoading(false);
                    }
                });
            } else {
                alert("Gagal memuat sistem pembayaran. Coba refresh halaman.");
                setIsLoading(false);
            }

        } catch (error: unknown) {
            console.error('TopUp Error:', error);
            const errorMessage = error instanceof Error ? error.message : "Terjadi kesalahan sistem";
            alert(`Error: ${errorMessage}`);
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>
            <div className="relative bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl p-6 md:p-8 text-white overflow-hidden max-h-[90vh] overflow-y-auto">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl z-10">&times;</button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold font-orbitron text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-500">Top Up Token</h2>
                    <p className="text-gray-400 mt-2">Investasi kecil untuk hasil bisnis raksasa 🚀</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {topUpPackages.map((pkg, index) => (
                        <div 
                            key={index} 
                            className={`relative bg-[#1a1d24] p-6 rounded-xl border transition-all duration-300 hover:scale-105 ${pkg.popular ? 'border-pink-500 shadow-[0_0_20px_rgba(236,72,153,0.2)]' : 'border-white/5 hover:border-pink-500/50'}`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Paling Laris
                                </div>
                            )}

                            <div className="text-center space-y-4">
                                <div>
                                    <h3 className="text-4xl font-bold font-orbitron text-white">{pkg.tokens}</h3>
                                    <span className="text-sm text-gray-400">Token AI</span>
                                </div>
                                {pkg.bonus > 0 ? (
                                    <div className="py-1 px-2 bg-green-500/20 text-green-400 rounded text-xs font-bold inline-block">
                                        + {pkg.bonus} Bonus
                                    </div>
                                ) : <div className="h-6"></div>}

                                <div className="border-t border-white/5 pt-4">
                                    <p className="text-2xl font-bold text-white">Rp {pkg.price}</p>
                                    <p className="text-xs text-gray-500">Sekali Bayar</p>
                                </div>

                                <button 
                                    onClick={() => handleTopUp(pkg)} 
                                    disabled={isLoading}
                                    className={`w-full py-3 rounded-lg font-bold text-sm transition-all ${
                                        isLoading 
                                        ? 'bg-gray-700 cursor-wait' 
                                        : 'bg-white text-black hover:bg-pink-500 hover:text-white'
                                    }`}
                                >
                                    {isLoading ? 'Memproses...' : 'Pilih Paket'}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};