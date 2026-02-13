'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { TopUpModal } from '@/components/common/TopUpModal'; 
import { LoginModal } from '@/components/common/LoginModal'; // <--- Import Baru
import { IconToken, IconTopUp, IconLogout } from '@/constants/constants'; 

export const DashboardHeader = () => {
    const { user, tokens, logout } = useAuth();
    const [isProductOpen, setProductOpen] = useState(false);
    const productRef = useRef<HTMLDivElement>(null);
    const [isTopUpOpen, setIsTopUpOpen] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false); // <--- State Login
    const [isProfileOpen, setProfileOpen] = useState(false);

    const userAvatar = user?.avatar 
        ? user.avatar 
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=random&color=fff`;

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-20 z-40 bg-[#0f1115]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-8">
                {/* KIRI: LOGO (Tetap Sama) */}
                <div className="flex-1 flex justify-start">
                    <Link href="/" className="flex items-center gap-2 group">
                        <span className="text-xl md:text-2xl font-bold font-orbitron gradient-text tracking-wide">
                            TokoBoost
                        </span>
                    </Link>
                </div>

                {/* TENGAH: MENU LINK (Blog, dll) */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Beranda
                    </Link>
                    <div className="relative" ref={productRef}>
                        <button 
                            onClick={() => setProductOpen(!isProductOpen)}
                            className={`flex items-center gap-1 text-sm font-medium transition-colors duration-200 ${isProductOpen ? 'text-white' : 'text-gray-300 hover:text-white'}`}
                        >
                            Ecosystem 
                            <span className={`text-[10px] transform transition-transform duration-200 ${isProductOpen ? 'rotate-180 text-pink-500' : ''}`}>▼</span>
                        </button>

                        {isProductOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 rounded-xl shadow-2xl bg-[#1a1d24] border border-white/10 overflow-hidden">
                                <div className="p-2">
                                    <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">Aplikasi Lain</div>
                                    <a href="https://sport.tokoboost.com" className="block px-3 py-2 rounded-lg hover:bg-white/5 group">
                                        <p className="text-sm font-bold text-white group-hover:text-pink-400">⚽ Sport Center</p>
                                    </a>
                                    <a href="https://tools-hotel.tokoboost.com" className="block px-3 py-2 rounded-lg hover:bg-white/5 group">
                                        <p className="text-sm font-bold text-white group-hover:text-pink-400">🏨 Hotel Tools</p>
                                    </a>
                                    <a href="https://quran.tokoboost.com" className="block px-3 py-2 rounded-lg hover:bg-white/5 group">
                                        <p className="text-sm font-bold text-white group-hover:text-pink-400">📖 Quran Digital</p>
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                
                    <Link href="https://blog.tokoboost.com" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                        Blog Edukasi
                    </Link>
                </div>

                {/* KANAN: LOGIC TAMU vs MEMBER */}
                <div className="flex-1 flex justify-end items-center gap-4 md:gap-6">
                    
                    {!user ? (
                        // --- TAMPILAN TAMU (Belum Login) ---
                        <button 
                            onClick={() => setIsLoginOpen(true)}
                            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-full transition-all border border-white/10"
                        >
                            Masuk Akun
                        </button>
                    ) : (
                        // --- TAMPILAN MEMBER (Sudah Login) ---
                        <>
                            {/* Token Badge */}
                            <div className="flex items-center bg-gray-900 border border-white/10 rounded-full p-1 pl-4">
                                <div className="flex flex-col items-end mr-3">
                                    <span className="text-[10px] text-gray-400 uppercase font-bold leading-none mb-0.5">Saldo</span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-400 text-xs"><IconToken /></span>
                                        <span className="text-sm font-bold text-white font-orbitron">{tokens ?? 0}</span>
                                    </div>
                                </div>
                                <button onClick={() => setIsTopUpOpen(true)} className="h-8 px-4 bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-500 text-white text-xs font-bold rounded-full transition-all flex items-center gap-1">
                                    <IconTopUp /> <span>Top Up</span>
                                </button>
                            </div>

                            {/* Profile Dropdown (Tetap Sama) */}
                            <div className="relative">
                                <button onClick={() => setProfileOpen(!isProfileOpen)} className="w-10 h-10 rounded-full p-[2px] bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition-transform">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={userAvatar} alt="Profile" className="w-full h-full rounded-full bg-gray-900 object-cover" referrerPolicy="no-referrer" />
                                </button>
                                {isProfileOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-[#1a1d24] border border-white/10 rounded-xl shadow-2xl p-2">
                                        <button onClick={logout} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-white/5 rounded-lg flex items-center gap-2">
                                            <IconLogout /> Keluar
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </header>

            {/* Pasang KEDUA Modal di sini */}
            <TopUpModal isOpen={isTopUpOpen} onClose={() => setIsTopUpOpen(false)} />
            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </>
    );
};