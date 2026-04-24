// src/app/dashboard/layout.tsx
import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader'; 
// 1. IMPORT KOMPONEN FOOTER DI SINI
import { Footer } from '@/components/layout/Footer'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      
      {/* 1. DashboardHeader (Header Member) */}
      <DashboardHeader />
      
      {/* 2. Content Area (flex-grow biar main content selalu menuhin layar dan footer ada di bawah) */}
      <main className="max-w-7xl mx-auto w-full flex-grow">
          {children}
      </main>

      {/* 3. KOMPONEN FOOTER (Huruf F Besar) */}
      <Footer />
      
    </div>
  );
}