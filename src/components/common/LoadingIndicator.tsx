import React from 'react';

export const LoadingIndicator: React.FC<{ isVideo?: boolean }> = ({ isVideo = false }) => (
    <div className="flex flex-col items-center justify-center space-y-4 my-8 p-4 bg-gray-800/50 rounded-lg">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-pink-500"></div>
        <p className="text-white font-semibold">AI sedang bekerja... mohon tunggu</p>
        <p className="text-sm text-gray-400 text-center">
            {isVideo 
                ? "Pembuatan video bisa memakan waktu beberapa menit. Jangan tutup halaman ini."
                : "Proses ini mungkin memakan waktu beberapa saat."
            }
        </p>
    </div>
);
