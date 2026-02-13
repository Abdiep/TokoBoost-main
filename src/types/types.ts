// src/types/types.ts

export enum Feature {
  FLYER = 'Flyer Promosi',
  PRODUCT_VIDEO = 'Video Produk',
  STUDIO_PHOTO = 'Studio Photo',
  PREWEDDING = 'Pre-wedding Image',
  CARTOON = 'Kartun Photo',
  HOOK_VIDEO = 'Hook Video',
  OPENING_VIDEO = 'Opening Video Youtube',
  RECIPE = 'Resep',
  SOP = 'SOP',
  JOB_DESC = 'Job Description',
}

export interface User {
  name: string;
  email: string;
  avatar: string;
}

// --- PERBAIKAN DI SINI ---
// Kita ubah return type fungsi-fungsi yang berinteraksi dengan Firebase jadi Promise
export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  tokens: number;
  
  // Login & Logout itu async (butuh waktu ke Firebase)
  login: () => Promise<void>; 
  logout: () => Promise<void>;
  
  // Deduct tokens itu async (cek DB dulu), jadi return Promise<boolean>
  deductTokens: (amount: number) => Promise<boolean>; 
  
  setTokens: (tokens: number) => void; // Ini state lokal react, jadi void biasa aman
  
  // Add tokens juga interaksi ke DB, jadi Promise<void>
  addTokens: (amount: number) => Promise<void>; 
}

export interface TextGenerationResult {
  type: 'text';
  content: string;
}

export interface ImageGenerationResult {
  type: 'image';
  url: string;
  caption?: string;
}

export interface VideoGenerationResult {
    type: 'video';
    url: string;
}

export type GenerationState = 'idle' | 'loading' | 'success' | 'error';

export type GenerationResult = TextGenerationResult | ImageGenerationResult | VideoGenerationResult | null;

export type Page = 'features' | 'tentang' | 'kontak' | 'privasi' | 'affiliate' | 'blog';

declare global {
  interface Window {
    snap: any;
  }
}