'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { IconGoogle } from '@/constants/constants'; // Pastikan ada icon Google

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
    const { login } = useAuth();

    const handleLogin = async () => {
        await login();
        onClose(); // Tutup modal setelah login sukses
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0" onClick={onClose}></div>
            
            <div className="relative bg-[#0f1115] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">&times;</button>
                
                <div className="w-16 h-16 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                    🔒
                </div>

                <h2 className="text-2xl font-bold font-orbitron text-white mb-2">Login Diperlukan</h2>
                <p className="text-gray-400 mb-8">
                    Untuk menggunakan kekuatan AI dan menyimpan hasil karya Anda, silakan masuk terlebih dahulu.
                </p>

                <button 
                    onClick={handleLogin}
                    className="w-full flex items-center justify-center gap-3 bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition-all hover:scale-[1.02]"
                >
                    <IconGoogle />
                    <span>Lanjut dengan Google</span>
                </button>
                
                <p className="text-xs text-gray-500 mt-6">
                    Anda akan mendapatkan <strong>10 Token Gratis</strong> sebagai pengguna baru!
                </p>
            </div>
        </div>
    );
};