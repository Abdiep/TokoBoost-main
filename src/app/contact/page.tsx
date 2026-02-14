'use client';

import React, { useState } from 'react';
import { InfoPageContainer } from '@/components/ui/InfoPageContainer';

// 1. IMPORT FIREBASE
import { db } from '@/services/firebase'; // Sesuaikan path jika beda folder
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function ContactPage() {
    // 2. STATE UNTUK INPUT FORM
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    
    // State status pengiriman
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            // 3. LOGIC KIRIM KE FIREBASE FIRESTORE
            await addDoc(collection(db, "contactSubmissions"), {
                name: name,
                email: email,
                subject: "Pesan dari TokoBoost Web", // Default subject (opsional)
                message: message,
                submittedAt: Timestamp.now(),
                status: "unread" // Biar nanti bisa difilter di admin dashboard
            });

            // Jika Sukses
            setStatus('success');
            // Reset Form
            setName('');
            setEmail('');
            setMessage('');
            
        } catch (error) {
            console.error("Error mengirim pesan: ", error);
            setStatus('error');
        }
    };

    return (
        <InfoPageContainer title="Hubungi Kami">
            <p className="mb-8 text-gray-300">Punya pertanyaan atau penawaran kerjasama? Tim kami siap membantu.</p>

            {status === 'success' ? (
                <div className="bg-green-900/30 border border-green-500 text-green-400 p-6 rounded-xl text-center animate-fade-in">
                    <h3 className="text-xl font-bold mb-2">Pesan Terkirim! ✅</h3>
                    <p>Terima kasih telah menghubungi kami. Kami akan membalas email Anda secepatnya.</p>
                    <button onClick={() => setStatus('idle')} className="mt-4 text-sm underline hover:text-white transition-colors">
                        Kirim pesan lagi
                    </button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                    {status === 'error' && (
                        <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded-lg text-center text-sm">
                            Maaf, terjadi kesalahan. Periksa koneksi internet Anda dan coba lagi.
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Nama</label>
                        <input 
                            type="text" 
                            required 
                            value={name} // Binding Value
                            onChange={(e) => setName(e.target.value)} // Update State
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-pink-500 outline-none text-white transition-all focus:ring-1 focus:ring-pink-500" 
                            placeholder="Nama Anda" 
                            disabled={status === 'submitting'}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                        <input 
                            type="email" 
                            required 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-pink-500 outline-none text-white transition-all focus:ring-1 focus:ring-pink-500" 
                            placeholder="email@contoh.com" 
                            disabled={status === 'submitting'}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">Pesan</label>
                        <textarea 
                            required 
                            rows={5} 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 focus:border-pink-500 outline-none text-white transition-all focus:ring-1 focus:ring-pink-500" 
                            placeholder="Tulis pesan Anda di sini..."
                            disabled={status === 'submitting'}
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        disabled={status === 'submitting'} 
                        className="w-full px-8 py-3 bg-gradient-to-r from-pink-600 to-orange-600 text-white font-bold rounded-lg hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                    >
                        {status === 'submitting' ? (
                            <>
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Mengirim...
                            </>
                        ) : 'Kirim Pesan'}
                    </button>
                </form>
            )}
        </InfoPageContainer>
    );
}