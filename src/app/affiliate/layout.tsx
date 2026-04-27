import React from 'react';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Footer } from '@/components/layout/Footer';

export default function AffiliateLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0f1115] flex flex-col">
      
      {/* Header Member */}
      <DashboardHeader />
      
      {/* Content Area - Kasih pt-24 biar gak ketutup header yang nge-fix di atas */}
      <main className="max-w-7xl mx-auto w-full flex-grow pt-24 px-4 sm:px-6 lg:px-8">
          {children}
      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}