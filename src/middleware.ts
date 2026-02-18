import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // --- DETEKSI FILE STATIS ---
  // Cek apakah URL berakhiran ekstensi file (gambar, font, css, dll)
  // Huruf 'i' di akhir regex artinya case-insensitive (JPG, jpg, Png, PNG dianggap sama)
  const isStaticFile = path.match(/\.(png|jpg|jpeg|gif|webp|svg|ico|css|js|json|woff|woff2|ttf|mp4)$/i);

  // --- LOGIC UTAMA ---
  // Jika BUKAN file statis, DAN path mengandung huruf besar
  if (!isStaticFile && path !== path.toLowerCase()) {
    
    // Paksa jadi huruf kecil (hanya untuk halaman website, bukan gambar)
    const url = request.nextUrl.clone();
    url.pathname = path.toLowerCase();

    // Redirect Permanent (308) agar SEO Google ikut update
    return NextResponse.redirect(url);
  }

  // Kalau aman, silakan lanjut
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip folder internal Next.js, API, dan folder _next
    // Tambahkan pengecualian untuk folder 'public' jika perlu, tapi regex di atas sudah cukup kuat
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};