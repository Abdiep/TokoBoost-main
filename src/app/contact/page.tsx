'use client';

import React, { useState } from 'react';
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');
        
        // SIMULASI KIRIM PESAN (Aktifkan Firebase nanti)
        setTimeout(() => {
            setStatus('success');
            // Logic Firebase di sini nanti
        }, 1500);
    };

    return (
        <InfoPageContainer title="Hubungi Kami">
            <p className="mb-8">Punya pertanyaan atau penawaran kerjasama? Tim kami siap membantu.</p>

            {status === 'success' ? (
                <div className="bg-green-900/30 border border-green-500 text-green-400 p-6 rounded-xl text-center">
                    <h3 className="text-xl font-bold mb-2">Pesan Terkirim! ✅</h3>
                    <p>Terima kasih telah menghubungi kami. Kami akan membalas email Anda secepatnya.</p>
                    <button onClick={() => setStatus('idle')} className="mt-4 text-sm underline">Kirim pesan lagi</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                    <div>
                        <label className="block text-sm font-medium mb-2">Nama</label>
                        <input type="text" required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-pink-500 outline-none" placeholder="Nama Anda" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input type="email" required className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-pink-500 outline-none" placeholder="email@contoh.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Pesan</label>
                        <textarea required rows={5} className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-pink-500 outline-none" placeholder="Tulis pesan Anda di sini..."></textarea>
                    </div>
                    <button type="submit" disabled={status === 'submitting'} className="px-8 py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-all">
                        {status === 'submitting' ? 'Mengirim...' : 'Kirim Pesan'}
                    </button>
                </form>
            )}
        </InfoPageContainer>
    );
}