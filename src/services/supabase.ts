// src/services/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Sama seperti pola Firebase lu, kita buat client tunggal
export const supabase = createClient(supabaseUrl, supabaseAnonKey);