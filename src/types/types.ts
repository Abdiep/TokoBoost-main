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

// src/types/types.ts

// ... (bagian Feature enum biarkan tetap sama)

export interface User {
  uid: string;    // Tambahkan ini biar match dengan AuthContext
  name: string;
  email: string;
  avatar: string;
}

export interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  tokens: number;
  login: () => Promise<void>; 
  logout: () => Promise<void>;
  
  // Kita ganti namanya biar lebih modern sesuai kodingan Supabase tadi
  useTokens: (amount: number) => Promise<boolean>; 
  addTokens: (amount: number) => Promise<void>; 
  
  // Jika lu butuh setTokens manual untuk state lokal (opsional)
  setTokens: React.Dispatch<React.SetStateAction<number>>;
}

// ... (sisanya biarkan tetap sama)

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