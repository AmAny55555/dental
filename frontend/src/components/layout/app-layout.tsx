'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Search, LayoutDashboard, Users, Menu, X } from 'lucide-react';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isDashboard = pathname === '/dashboard';
  const isPatients = pathname.startsWith('/patients');

  return (
    <div className="flex min-h-screen bg-[#ffffff] text-[#1a1c1b] font-body selection:bg-[#adedd3] selection:text-[#306d58] rtl">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-[#00150f]/20 backdrop-blur-sm z-[60] lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SideBar */}
      <aside className={`fixed lg:sticky top-0 right-0 h-screen w-[280px] shrink-0 bg-[#faf9f7] border-l border-[#e3e2e0] z-[70] lg:z-50 py-10 flex flex-col transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
        <div className="px-8 mb-12 flex items-center justify-between text-right">
          <h1 className="font-cairo font-black text-[#00150f] text-2xl tracking-tighter">نظام العيادة</h1>
          <button 
            className="lg:hidden p-2 -ml-2 text-[#717975] hover:text-[#00150f] hover:bg-[#e3e2e0] rounded-full transition-all"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 space-y-1">
          <button 
            onClick={() => { router.push('/dashboard'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-end px-8 py-3.5 font-bold text-sm transition-all ${isDashboard ? 'bg-white text-[#2b6954] border-r-4 border-[#2b6954] shadow-sm' : 'text-[#00150f]/60 hover:bg-white hover:text-[#00150f]'}`}
          >
            <span>لوحة التحكم</span>
            <LayoutDashboard className={`ml-4 w-5 h-5 ${isDashboard ? 'opacity-90' : 'opacity-70'}`} />
          </button>
          
          <button 
            onClick={() => { router.push('/patients'); setIsMobileMenuOpen(false); }}
            className={`w-full flex items-center justify-end px-8 py-3.5 font-bold text-sm transition-all ${isPatients ? 'bg-white text-[#2b6954] border-r-4 border-[#2b6954] shadow-sm' : 'text-[#00150f]/60 hover:bg-white hover:text-[#00150f]'}`}
          >
            <span>سجل المرضى</span>
            <Users className={`ml-4 w-5 h-5 ${isPatients ? 'opacity-90' : 'opacity-70'}`} />
          </button>
        </nav>
      </aside>

      {/* Main Canvas */}
      <main className="flex-1 min-w-0 bg-[#ffffff] flex flex-col order-first w-full lg:w-auto">
        {/* TopNavBar */}
        <header className="h-20 flex justify-between items-center px-4 lg:px-8 xl:px-12 border-b border-[#e3e2e0] bg-[#ffffff]/90 backdrop-blur sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-2 lg:gap-4">
            <button 
              className="lg:hidden p-2 text-[#717975] hover:text-[#00150f] hover:bg-[#faf9f7] rounded-full transition-all"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="font-bold text-sm text-[#00150f]">نظرة عامة</h2>
            <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium mr-8">
              <span className="text-[#00150f] border-b-2 border-[#2b6954] py-7 -mb-0.5 cursor-pointer font-bold">الأداء</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block ml-4">
              <input 
                type="text" 
                placeholder="ابحث برقم المريض، الاسم..." 
                className="bg-[#faf9f7] border border-[#e3e2e0] rounded-lg px-4 py-2 pr-10 text-xs w-64 focus:ring-1 focus:border-[#2b6954] focus:ring-[#2b6954]/20 outline-none transition-all text-right font-medium"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[#717975] w-4 h-4" />
            </div>
            
            <div className="flex items-center gap-2 pr-4 border-r border-[#e3e2e0]">
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 bg-[#faf9f7]">
          {children}
        </div>
      </main>
    </div>
  );
}