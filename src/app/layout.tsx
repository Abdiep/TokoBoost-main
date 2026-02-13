import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google"; 
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });

export const metadata: Metadata = {
  title: "TokoBoost - Solusi AI Store untuk Bisnis & UMKM Indonesia",
  description: "Platform AI All-in-One untuk produktivitas bisnis. Buat foto produk, video promosi, SOP, dan dokumen HRD instan. Kunjungi juga Blog kami untuk tips bisnis dan Tools Hotelier gratis.",
  icons: {
    icon: '/favicon.svg', // Ganti dengan nama file kamu di folder public
    shortcut: '/favicon.svg', // Biasanya sama dengan icon
    apple: {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  keywords: ["AI generator, foto produk AI, video promosi, SOP generator, tools UMKM, tools hotelier, tokoboost, Content Creator Indonesia, AI untuk bisnis, AI untuk UMKM, dokumen HRD, AI marketing tools, platform AI Indonesia"],
  themeColor: "#0f1115",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://tokoboost.com/",
    siteName: "TokoBoost",
    title: "TokoBoost - Solusi AI Store untuk Bisnis & UMKM Indonesia",
    description: "Platform AI All-in-One untuk produktivitas bisnis. Buat foto produk, video promosi, SOP, dan dokumen HRD instan. Kunjungi juga Blog kami untuk tips bisnis dan Tools Hotelier gratis.",
    images: [
      {
        url: "https://tokoboost.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokoBoost Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@TokoBoostCom",
    title: "TokoBoost - Solusi AI Store untuk Bisnis & UMKM Indonesia",
    description: "Platform AI All-in-One untuk produktivitas bisnis. Buat foto produk, video promosi, SOP, dan dokumen HRD instan. Kunjungi juga Blog kami untuk tips bisnis dan Tools Hotelier gratis.",
    images: [
      {
        url: "https://tokoboost.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokoBoost Twitter Card Image",
      },
    ],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6221594639128289" crossOrigin="anonymous"></script>
      </head>
      <body className={`${inter.variable} ${orbitron.variable} font-sans antialiased bg-[#0f1115] text-white`}>
        <AuthProvider>
          {/* Header dihapus dari sini agar tidak double */}
          <main className="min-h-screen"> 
            {children}
          </main>
          {/* Footer dihapus dari sini */}
        </AuthProvider>
      </body>
    </html>
  );
}