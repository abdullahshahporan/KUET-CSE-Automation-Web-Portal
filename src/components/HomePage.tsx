"use client";

import AuthCard from '@/Auth/AuthCard';
import ThemeToggle from './ThemeToggle';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-slate-900 dark:to-gray-900 transition-colors duration-500 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
      
      <ThemeToggle />
      
      <div className="relative z-10 text-center pt-4 pb-2">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          KUET CSE Automation
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
          Khulna University of Engineering & Technology
        </p>
        <div className="mt-2 flex justify-center gap-2 flex-wrap">
          <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
            Computer Science & Engineering
          </span>
          <span className="px-3 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-semibold">
            Student Portal
          </span>
        </div>
      </div>
      
      <div className="relative z-10 flex items-center justify-center px-4">
        <AuthCard />
      </div>
    </div>
  );
}
