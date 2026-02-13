/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { GenerationResult } from '@/types/types'; 
import { IconGaleri, IconKamera, IconHapus } from '@/constants/constants'; 
import { AdSenseBanner } from '../ads/AdSenseBanner'; 
import { X, CheckCircle2, ChevronRight, UploadCloud } from 'lucide-react'; 

// --- REUSABLE ICONS ---

export const IconDownload = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

export const IconCopy = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2V10a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
);

// --- 1. FILE INPUT ---
export const FileInput: React.FC<{ 
  id?: string; 
  label: string; 
  onChange: (file: File | null) => void; 
  file?: File | null;
  helperText?: string;
  accept?: string;
  variant?: 'default' | 'compact';
}> = ({ id, label, onChange, accept, variant = 'default' }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); 

  const updateFile = (newFile: File | null) => {
    onChange(newFile);
    if (newFile) {
        const url = URL.createObjectURL(newFile);
        setPreviewUrl(url);
    } else {
        setPreviewUrl(null);
    }
  };

  useEffect(() => {
    if (!isCameraOpen) return;
    let stream: MediaStream | null = null;
    (async () => {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        } catch {
            try { stream = await navigator.mediaDevices.getUserMedia({ video: true }); } catch { setIsCameraOpen(false); return; }
        }
        if (videoRef.current && stream) videoRef.current.srcObject = stream;
    })();
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  }, [isCameraOpen]);

  const handleSnap = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const v = videoRef.current; const c = canvasRef.current;
      c.width = v.videoWidth; c.height = v.videoHeight;
      c.getContext('2d')?.drawImage(v, 0, 0);
      c.toBlob(b => { if(b) { updateFile(new File([b], `snap-${Date.now()}.png`, { type: 'image/png' })); setIsCameraOpen(false); } });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openGallery = () => fileInputRef.current?.click();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => updateFile(e.target.files?.[0] || null);
  
  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const heightClass = variant === 'compact' ? 'h-[200px]' : 'h-[300px]';

  return (
    <div className="w-full">
      <label className="text-sm font-medium text-gray-400 mb-2 font-orbitron flex justify-between">
          {label}
          {previewUrl && <span className="text-green-500 text-xs flex items-center gap-1"><CheckCircle2 size={12}/> Siap</span>}
      </label>
      
      <div 
        className={`w-full ${heightClass} bg-[#0f1115] border-2 ${previewUrl ? 'border-pink-500/50' : 'border-gray-800 border-dashed'} rounded-xl flex flex-col items-center justify-center relative overflow-hidden transition-all group hover:border-pink-500/30 hover:bg-gray-800/50`}
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); updateFile(e.dataTransfer.files?.[0] || null); }}
      >
        <input ref={fileInputRef} id={id} type="file" className="sr-only" accept={accept || "image/*"} onChange={handleFileChange} />
        <canvas ref={canvasRef} className="hidden" />

        {previewUrl ? (
          <>
            <img src={previewUrl} alt="Preview" className="absolute inset-0 w-full h-full object-contain bg-black/40 backdrop-blur-sm p-2" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button onClick={() => updateFile(null)} className="flex items-center gap-2 px-4 py-2 bg-red-600/90 rounded-full text-white text-sm font-bold shadow-lg hover:bg-red-700 transition-all">
                    <IconHapus /> Ganti Foto
                </button>
            </div>
          </>
        ) : isCameraOpen ? (
          <div className="absolute inset-0 bg-black z-20 flex flex-col items-center justify-center">
            <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
            <div className="absolute bottom-4 flex gap-4">
              <button onClick={handleSnap} className="w-12 h-12 bg-white rounded-full border-4 border-pink-500 shadow-lg"></button>
              <button onClick={() => setIsCameraOpen(false)} className="px-4 py-2 bg-black/50 text-white rounded-full text-xs backdrop-blur-md">Batal</button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center p-4">
             <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mb-3 text-pink-500 group-hover:scale-110 transition-transform">
                <UploadCloud size={24} />
             </div>
             <p className="text-xs text-gray-300 font-medium mb-1">Klik / Tarik Foto</p>
             <p className="text-[10px] text-gray-500 mb-4">JPG/PNG Max 5MB</p>
             
             <div className="flex gap-2">
                <button onClick={openGallery} className="px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-md text-gray-200 hover:bg-pink-600/20 hover:border-pink-500 hover:text-pink-500 transition-all text-xs flex items-center gap-1.5">
                    <IconGaleri /> Galeri
                </button>
                <button onClick={() => setIsCameraOpen(true)} className="px-3 py-1.5 bg-gray-700/50 border border-gray-600 rounded-md text-gray-200 hover:bg-pink-600/20 hover:border-pink-500 hover:text-pink-500 transition-all text-xs flex items-center gap-1.5">
                    <IconKamera /> Kamera
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 2. VISUAL OPTION SELECTOR (GALLERY GRID) ---
interface VisualOption { label: string; value: string; image?: string; }
interface VisualOptionSelectorProps {
    value: string;
    onChange: (val: string) => void;
    options: VisualOption[];
}

export const VisualOptionSelector: React.FC<VisualOptionSelectorProps> = ({ value, onChange, options }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {options.map((opt, idx) => (
            <div 
                key={`${opt.value}-${idx}`}
                onClick={() => onChange(opt.value)}
                className={`
                    relative group cursor-pointer rounded-xl overflow-hidden transition-all duration-300
                    ${value === opt.value 
                        ? 'ring-2 ring-pink-500 shadow-lg shadow-pink-500/20 scale-[1.02]' 
                        : 'border border-gray-800 hover:border-gray-600 hover:scale-[1.01]'
                    }
                `}
            >
                {/* UBAH ASPECT RATIO DI SINI: Dari aspect-[3/4] jadi aspect-[2/3] (lebih tinggi) */}
                <div className="aspect-[2/3] md:aspect-[3/4] bg-gray-800 relative">
                    {opt.image ? (
                            <img src={opt.image} alt={opt.label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900`}>
                            <span className="text-2xl">🎨</span>
                        </div>
                    )}
                    
                    {/* Overlay Gradient Lebih Gelap di Bawah */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    
                    {value === opt.value && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg animate-in zoom-in z-10">
                            <CheckCircle2 size={16} />
                        </div>
                    )}
                    
                    {/* Padding Teks Lebih Lega */}
                    <div className="absolute bottom-0 left-0 w-full p-4">
                        <p className={`text-sm md:text-base font-bold leading-tight ${value === opt.value ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                            {opt.label}
                        </p>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// --- 3. BASIC INPUTS ---
export const TextAreaInput: React.FC<{ label: string; value: string; onChange: (value: string) => void; placeholder: string; rows?: number }> = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">{label}</label>
    <textarea rows={rows} className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-4 text-white focus:border-pink-500 outline-none transition placeholder-gray-600 text-sm" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
);

export const SelectInput: React.FC<{ label: string; value: string; onChange: (value: string) => void; options: any[]; placeholder?: string }> = ({ label, value, onChange, options, placeholder = "-- Pilih --" }) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">{label}</label>
    <div className="relative">
        <select className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-4 text-white focus:border-pink-500 outline-none appearance-none cursor-pointer text-sm" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="" disabled className="text-gray-500">{placeholder}</option>
        {options.map((opt, i) => {
            const val = typeof opt === 'string' ? opt : opt.value;
            const lab = typeof opt === 'string' ? opt : opt.label;
            return <option key={i} value={val}>{lab}</option>;
        })}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500"><ChevronRight size={16} className="rotate-90"/></div>
    </div>
  </div>
);

export const TextInput: React.FC<{ label: string; value: string; onChange: (value: string) => void; placeholder: string }> = ({ label, value, onChange, placeholder }) => (
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-400 mb-2 font-orbitron">{label}</label>
        <input type="text" className="w-full bg-[#0f1115] border border-gray-700 rounded-xl p-4 text-white focus:border-pink-500 outline-none transition placeholder-gray-600 text-sm" placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
);

export const GenerateButton: React.FC<{ onClick: () => void; cost: number; disabled: boolean; loading: boolean; text?: string }> = ({ onClick, cost, disabled, loading, text = "Generate" }) => (
  <button onClick={onClick} disabled={disabled} className="w-full mt-2 flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-pink-600 to-purple-500 hover:from-pink-500 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-[1.01] shadow-lg shadow-pink-900/20 group relative overflow-hidden">
    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
    {loading ? (
        <span className="flex items-center gap-2"><svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sedang Meracik...</span>
    ) : <span className="relative flex items-center gap-2">{text} <span className="bg-white/20 px-2 py-0.5 rounded text-xs">-{cost} Token</span> 🚀</span>}
  </button>
);

// --- MODAL IKLAN ---
const DownloadSuccessModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-center relative">
                <h3 className="text-white font-bold text-lg font-orbitron">Download Berhasil!</h3>
                <button onClick={onClose} className="absolute top-3 right-3 text-white/80 hover:text-white"><X size={20} /></button>
            </div>
            <div className="p-6 bg-gray-800">
                <div className="bg-black/40 rounded-lg overflow-hidden border border-gray-700 min-h-[250px] flex items-center justify-center mb-4"><AdSenseBanner adSlot="" adFormat="rectangle" /></div>
                <button onClick={onClose} className="w-full py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm font-medium">Tutup</button>
            </div>
        </div>
    </div>
);

// --- OUTPUT DISPLAY (FIXED TYPES) ---
export const OutputDisplay: React.FC<{ result: GenerationResult; downloadInfo?: { fileName: string } }> = ({ result, downloadInfo }) => {
    const [isCopied, setIsCopied] = useState(false);
    const [showAdModal, setShowAdModal] = useState(false);
    const handleCopy = useCallback((text: string) => { navigator.clipboard.writeText(text); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); }, []);
    
    const handleDownload = useCallback((url: string, name: string) => {
        const link = document.createElement('a'); link.href = url; link.download = name; document.body.appendChild(link); link.click(); document.body.removeChild(link);
        setShowAdModal(true);
    }, []);

    if (!result) return null;
    
    // SAFE PROPERTY ACCESS WITH CASTING
    const contentText = (result as any).content || (result as any).caption || "";
    const mediaUrl = (result as any).url || "";

    return (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
            <h3 className="text-xl font-semibold gradient-text mb-4">Hasil Generasi</h3>
            <div className="bg-[#0f1115] p-6 rounded-xl border border-gray-800 shadow-2xl">
                {result.type === 'video' ? (
                     <video src={mediaUrl} controls autoPlay loop className="rounded-lg w-full max-w-lg mx-auto border border-gray-700" />
                ) : result.type === 'image' ? (
                    <img src={mediaUrl} alt="Generated" className="rounded-lg w-full max-w-lg mx-auto border border-gray-700" />
                ) : (
                    <div className="text-gray-300 whitespace-pre-wrap font-sans h-[500px] overflow-y-auto custom-scrollbar p-4 bg-black/20 rounded">{contentText}</div>
                )}
                
                {contentText && result.type !== 'text' && (
                     <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-800 relative group">
                        <button onClick={() => handleCopy(contentText)} className="absolute top-2 right-2 text-xs flex items-center gap-1 text-gray-400 bg-gray-800 px-2 py-1 rounded hover:text-white border border-gray-700">
                            <IconCopy /> {isCopied ? "Disalin!" : "Salin"}
                        </button>
                        <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">{contentText}</pre>
                    </div>
                )}

                <button onClick={() => handleDownload(mediaUrl || "", `${downloadInfo?.fileName || 'result'}.${result.type === 'video' ? 'mp4' : result.type === 'text' ? 'doc' : 'png'}`)} className="mt-6 w-full flex items-center justify-center px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold shadow-lg transition-all hover:scale-[1.01]">
                    <span className="flex items-center gap-2"><IconDownload /> Download Hasil</span>
                </button>
            </div>
            {showAdModal && <DownloadSuccessModal onClose={() => setShowAdModal(false)} />}
        </div>
    );
};