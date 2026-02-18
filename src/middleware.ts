import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Ambil path dari URL (contoh: /Dashboard atau /Video_Produk)
  const path = request.nextUrl.pathname;

  // Cek apakah path mengandung huruf besar (Uppercase)
  // DAN bukan file statis (gambar, icon, dll)
  if (path !== path.toLowerCase() && !path.match(/\.(png|jpg|jpeg|svg|css|js|ico)$/)) {
    
    // Kalau ada huruf besar, kita paksa jadi huruf kecil
    const url = request.nextUrl.clone();
    url.pathname = path.toLowerCase();

    // Lakukan Redirect 308 (Permanent) ke versi huruf kecil
    return NextResponse.redirect(url);
  }

  // Kalau sudah huruf kecil semua, silakan lewat
  return NextResponse.next();
}

// Konfigurasi: Middleware ini menjaga seluruh halaman
export const config = {
  matcher: [
    // Skip folder internal Next.js dan API
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};