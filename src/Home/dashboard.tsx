"use client";

import Sidebar from '@/components/Sidebar';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      
      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-800">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Welcome to KUET CSE Automation
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Select an option from the sidebar to get started.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
