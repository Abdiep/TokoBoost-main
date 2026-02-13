// src/app/dashboard/layout.tsx
import React from 'react';
// Pastikan hanya import DashboardHeader, JANGAN import Header biasa
import { DashboardHeader } from '@/components/layout/DashboardHeader'; 

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1115]">
      
      {/* 1. Pasang DashboardHeader (Header Member) */}
      <DashboardHeader />
      
      {/* 2. Content Area */}
      {/* pt-20 atau pt-24 disesuaikan dengan tinggi header biar tidak ketutup */}
      <main className="max-w-7xl mx-auto">
          {/* Kita tidak perlu padding-top (pt) disini jika di page.tsx sudah ada pt-20 */}
          {/* Tapi best practice: Layout yg atur padding, page.tsx bersih. */}
          {/* Untuk sekarang, biarkan page.tsx yang atur padding sesuai kodemu */}
          {children}
      </main>
      <footer/>
    </div>
  );
}