import React from 'react';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className="bg-[#0a0c10] border-t border-white/5 pt-16 pb-8 text-sm">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <img src="/favicon.svg" alt="TokoBoost Logo" className="w-8 h-8"/>
                            <span className="text-xl font-bold font-orbitron text-white">TokoBoost</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Platform AI All-in-One untuk membantu UMKM Indonesia naik kelas. Buat konten, kelola toko, dan optimasi bisnis dalam satu klik.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-orbitron">Produk</h4>
                        <ul className="space-y-2">
                            <li><Link href="/dashboard/flyer" className="text-gray-400 hover:text-pink-500 transition-colors">Flyer Generator</Link></li>
                            <li><Link href="/dashboard/video" className="text-gray-400 hover:text-pink-500 transition-colors">Video Promosi Generator</Link></li>
                            <li><Link href="/dashboard/foto" className="text-gray-400 hover:text-pink-500 transition-colors">Studio Foto Generator</Link></li>
                            <li><Link href="/dashboard/wedding" className="text-gray-400 hover:text-pink-500 transition-colors">Foto Wedding Generator</Link></li>
                            <li><Link href="/dashboard/cartoon" className="text-gray-400 hover:text-pink-500 transition-colors">Kartun Generator</Link></li>
                            <li><Link href="/dashboard/hook" className="text-gray-400 hover:text-pink-500 transition-colors">Hook Video Generator</Link></li>
                            <li><Link href="/dashboard/opening" className="text-gray-400 hover:text-pink-500 transition-colors">Opening Video Generator</Link></li>
                            <li><Link href="/dashboard/recipe" className="text-gray-400 hover:text-pink-500 transition-colors">Recipe Generator</Link></li>
                            <li><Link href="/dashboard/sop" className="text-gray-400 hover:text-pink-500 transition-colors">SOP Generator</Link></li>
                            <li><Link href="/dashboard/jobdesc" className="text-gray-400 hover:text-pink-500 transition-colors">Job Description Generator</Link></li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-orbitron">Perusahaan</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about" className="text-gray-400 hover:text-pink-500 transition-colors">Tentang Kami</Link></li>
                            <li><Link href="https://blog.tokoboost.com/" className="text-gray-400 hover:text-pink-500 transition-colors">Blog Edukasi</Link></li>
                            <li><Link href="/affiliate" className="text-gray-400 hover:text-pink-500 transition-colors">Program Affiliate</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-pink-500 transition-colors">Hubungi Kami</Link></li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h4 className="text-white font-bold mb-4 font-orbitron">Legal</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-gray-400 hover:text-pink-500 transition-colors">Kebijakan Privasi</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-pink-500 transition-colors">Syarat & Ketentuan</Link></li>
                            <li><Link href="/disclaimer" className="text-gray-400 hover:text-pink-500 transition-colors">Disclaimer</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500">© 2024 TokoBoost AI. Karya Anak Bangsa 🇮🇩</p>
                    <div className="flex gap-4">
                        {/* Social Icons (Dummy SVG) */}
                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-pink-600 hover:text-white transition-all">IG</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">LI</a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all">YT</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};