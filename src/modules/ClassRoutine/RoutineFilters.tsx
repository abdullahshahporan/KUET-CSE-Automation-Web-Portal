"use client";

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { TERMS, SECTIONS, SESSIONS } from './constants';

interface RoutineFiltersProps {
  selectedTerm: string;
  selectedSession: string;
  selectedSection: string;
  onTermChange: (term: string) => void;
  onSessionChange: (session: string) => void;
  onSectionChange: (section: string) => void;
}

export default function RoutineFilters({
  selectedTerm,
  selectedSession,
  selectedSection,
  onTermChange,
  onSessionChange,
  onSectionChange,
}: RoutineFiltersProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {/* Term Selector */}
      <div className="relative">
        <select
          value={selectedTerm}
          onChange={(e) => onTermChange(e.target.value)}
          className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 dark:border-gray-300 rounded-xl bg-white dark:bg-white/5 text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 focus:border-transparent font-medium text-sm cursor-pointer"
        >
          {TERMS.map((t) => (
            <option key={t.value} value={t.value} className="bg-white dark:bg-gray-50">
              {t.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/40 pointer-events-none" />
      </div>

      {/* Session Selector */}
      <div className="relative">
        <select
          value={selectedSession}
          onChange={(e) => onSessionChange(e.target.value)}
          className="appearance-none pl-4 pr-10 py-2.5 border border-gray-200 dark:border-gray-300 rounded-xl bg-white dark:bg-white/5 text-gray-700 dark:text-white focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500 focus:border-transparent font-medium text-sm cursor-pointer"
        >
          {SESSIONS.map((s) => (
            <option key={s} value={s} className="bg-white dark:bg-gray-50">
              {s}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-white/40 pointer-events-none" />
      </div>

      {/* Section Toggle */}
      <div className="flex rounded-xl overflow-hidden border border-gray-200">
        {SECTIONS.map((sec) => (
          <button
            key={sec}
            onClick={() => onSectionChange(sec)}
            className={`px-5 py-2.5 text-sm font-medium transition-colors ${
              selectedSection === sec
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-500 hover:bg-gray-50'
            }`}
          >
            SEC - {sec}
          </button>
        ))}
      </div>
    </div>
  );
}
