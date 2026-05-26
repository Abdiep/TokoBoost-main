import React from 'react';
import { IconGoogle } from '@constants'; // Opsional, sesuaikan icon yang ada

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-gray-900/50 border border-pink-500/30 rounded-2xl p-8 backdrop-blur-sm shadow-2xl">
        <div className="flex justify-center mb-6">
           {/* Bisa pakai logo TokoBoost kalau ada */}
          <div className="h-16 w-16 bg-pink-500/20 rounded-full flex items-center justify-center border border-pink-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-4">
          Under Maintenance
        </h1>
        <p className="text-gray-400 mb-6 leading-relaxed">
          Sistem <span className="text-pink-400 font-semibold">TokoBoost</span> saat ini sedang dalam pemeliharaan terjadwal untuk peningkatan keamanan dan performa infrastruktur kami.
        </p>
        
        <div className="bg-gray-800/50 p-4 rounded-lg text-sm text-gray-300 border border-gray-700">
          Mohon maaf atas ketidaknyamanan ini. Kami akan segera kembali!
        </div>
      </div>
    </div>
  );
}