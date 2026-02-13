'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductOpen, setProductOpen] = useState(false);
    const productRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (productRef.current && !productRef.current.contains(event.target as Node)) {
                setProductOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                isScrolled ? 'bg-[#0f1115]/30 backdrop-blur-md border-white/10 py-3' : 'bg-transparent border-transparent py-5'
            }`}
        >
            <nav className="container mx-auto px-4 md:px-8">
                {/* FLEX CONTAINER BARU: 3 KOLOM SEIMBANG */}
                <div className="flex items-center justify-between h-12">
                    
                    {/* KOLOM 1: LOGO (Mengambil ruang sisa di kiri) */}
                    <div className="flex-1 flex justify-start">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="text-xl md:text-2xl font-bold font-orbitron gradient-text tracking-wide">
                                TokoBoost
                            </span>
                        </Link>
                    </div>

                    {/* KOLOM 2: MENU TENGAH (Lebar pas konten) */}
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

                        <Link href="https://blog.tokoboost.com/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
                            Blog Edukasi
                        </Link>
                    </div>

                    {/* KOLOM 3: TOMBOL KANAN (Mengambil ruang sisa di kanan) */}
                    <div className="flex-1 flex justify-end items-center gap-4">
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/dashboard" className="px-5 py-2 bg-gradient-to-r from-pink-600 to-orange-600 text-white text-sm font-bold rounded-full hover:scale-105 transition-all shadow-lg shadow-pink-500/20">
                                Coba Gratis
                            </Link>
                        </div>

                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 text-gray-300 hover:text-white"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-4 bg-[#1a1d24] rounded-xl border border-white/10 p-4 animate-in slide-in-from-top-2">
                        <nav className="flex flex-col gap-2">
                            <Link href="/" className="px-4 py-3 rounded-lg bg-white/5 text-white font-medium">Beranda</Link>
                            <Link href="/blog" className="px-4 py-3 rounded-lg hover:bg-white/5 text-gray-300">Blog Edukasi</Link>
                            <div className="flex gap-2 mt-4 pt-4 border-t border-white/5">
                                <Link href="/login" className="flex-1 py-2 text-center text-gray-300 bg-gray-800 rounded-lg">Masuk</Link>
                                <Link href="/register" className="flex-1 py-2 text-center bg-pink-600 text-white rounded-lg font-bold">Daftar</Link>
                            </div>
                        </nav>
                    </div>
                )}
            </nav>
        </header>
    );
};