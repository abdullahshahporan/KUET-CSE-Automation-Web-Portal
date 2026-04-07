'use client';

import Footer from '@/components/Footer';
import { fetchLandingPageData } from '@/services/cmsService';
import type { CmsNavigationLink, LandingPageData } from '@/types/cms';
import { motion } from 'framer-motion';
import {
    ArrowRight, GraduationCap,
    Menu, X
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [data, setData] = useState<LandingPageData | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    fetchLandingPageData().then(setData).catch(() => {});
  }, []);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  if (!data) return <div className="min-h-screen bg-white" />;

  const navOf = (s: string): CmsNavigationLink[] => data.navLinks.filter(l => l.section === s);
  const navbarLinks = navOf('NAVBAR');
  const socialLinks = navOf('SOCIAL');
  const dept = data.departmentInfo;
  const shortName = dept['short_name'] || 'CSE, KUET';

  return (
    <div className="min-h-screen bg-white">
      {/* NAVBAR */}
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-lg shadow-gray-600/5 border-b border-gray-200/50'
          : 'bg-[#161a1d]/90 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
              scrolled ? 'bg-gray-600' : 'bg-white/15 backdrop-blur-md border border-white/20'
            }`}>
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className={`text-lg font-bold transition-colors ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              {shortName}
            </span>
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            {navbarLinks.map(l => (
              <Link key={l.id} href={l.url} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                pathname === l.url
                  ? (scrolled ? 'text-gray-600 bg-gray-50 font-bold' : 'text-gray-400 bg-white/10 font-bold')
                  : (scrolled ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-50' : 'text-white/80 hover:text-white hover:bg-white/10')
              }`}>{l.label}</Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/signin" className={`hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              scrolled ? 'bg-gray-600 text-white hover:bg-[#4E342E]' : 'bg-white/15 backdrop-blur-md text-white border border-white/25 hover:bg-white/25'
            }`}>Sign In <ArrowRight className="w-4 h-4" /></Link>
            <button onClick={() => setMobileMenu(!mobileMenu)} className={`lg:hidden p-2 rounded-lg ${scrolled ? 'text-gray-900' : 'text-white'}`}>
              {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileMenu && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200/50">
            <div className="px-4 py-4 space-y-1">
              {navbarLinks.map(l => (
                <Link key={l.id} href={l.url} onClick={() => setMobileMenu(false)}
                  className="block px-4 py-3 text-gray-900 font-medium rounded-lg hover:bg-gray-50">{l.label}</Link>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* PAGE CONTENT */}
      <main className="pt-20">{children}</main>

      {/* FOOTER (shared component) */}
      <Footer departmentInfo={dept} socialLinks={socialLinks} navOf={navOf} />
    </div>
  );
}
