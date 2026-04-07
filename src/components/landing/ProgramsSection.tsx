// ==========================================
// Programs Section
// Single Responsibility: Renders academic program cards
// ==========================================

'use client';

import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import type { CmsProgram } from '@/types/cms';
import { BookOpen, Clock } from 'lucide-react';
import React from 'react';

interface ProgramsSectionProps {
  programs: CmsProgram[];
  sectionTitle?: string;
  sectionSubtitle?: string;
}

const DEGREE_BADGE_CLASSES: Record<string, string> = {
  UNDERGRADUATE: 'bg-gray-600/10 text-gray-600',
  POSTGRADUATE: 'bg-amber-500/10 text-amber-600',
};
const DEFAULT_BADGE_CLASS = 'bg-[#D4A574]/20 text-[#A87B50]';

const ProgramsSection: React.FC<ProgramsSectionProps> = ({ programs, sectionTitle, sectionSubtitle }) => {
  if (!programs.length) return null;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <Reveal>
          <SectionHeading
            title={sectionTitle || 'Academic Programs'}
            subtitle={sectionSubtitle || "Comprehensive programs designed for tomorrow's tech leaders"}
          />
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {programs.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.1}>
              <div className="group bg-white rounded-2xl p-7 border border-gray-200 hover:shadow-warm-lg hover:-translate-y-1 transition-all duration-300">
                <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mb-4 ${
                  DEGREE_BADGE_CLASSES[p.degree_type] || DEFAULT_BADGE_CLASS
                }`}>
                  {p.degree_type}
                </span>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-gray-600">
                  {p.short_name || p.name}
                </h3>
                {p.description && <p className="text-gray-500 text-sm mb-4 line-clamp-3">{p.description}</p>}
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  {p.duration && (
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{p.duration}</span>
                  )}
                  {p.total_credits && (
                    <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{p.total_credits} credits</span>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
