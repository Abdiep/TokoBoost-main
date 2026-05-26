import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // --- DETEKSI FILE STATIS ---
  // Cek apakah URL berakhiran ekstensi file (gambar, font, css, dll)
  const isStaticFile = path.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|woff|woff2|ttf|mp4)$/i);

  // --- 1. BLOKIR API ROUTE (URGENT: STOP TAGIHAN FIREBASE) ---
  // Hentikan semua bot/hacker yang mencoba hit endpoint backend kita
  if (path.startsWith('/api/')) {
    return NextResponse.json(
      { error: 'System is under maintenance. API is temporarily disabled.' },
      { status: 503 } // 503 Service Unavailable
    );
  }

  // --- 2. LOGIC MAINTENANCE MODE UI ---
  // Jika BUKAN file statis dan bukan sedang di halaman '/maintenance', lempar paksa!
  if (!isStaticFile && path.toLowerCase() !== '/maintenance') {
    const url = request.nextUrl.clone();
    url.pathname = '/maintenance';
    return NextResponse.redirect(url); // 307 Temporary Redirect
  }

  // --- 3. LOGIC LOWERCASE URL (SEO) ---
  // Tetap dipertahankan. Jika ada yang ketik '/Maintenance', dipaksa jadi '/maintenance'
  if (!isStaticFile && path !== path.toLowerCase()) {
    const url = request.nextUrl.clone();
    url.pathname = path.toLowerCase();
    // Redirect Permanent (308) agar SEO Google ikut update
    return NextResponse.redirect(url, 308);
  }

  // Kalau aman, silakan lanjut
  return NextResponse.next();
}

export const config = {
  matcher: [
    // PERHATIAN: Kata 'api' SAYA HAPUS dari pengecualian di bawah ini!
    // Agar middleware ini bisa menangkap dan memblokir traffic yang masuk ke backend/API.
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};