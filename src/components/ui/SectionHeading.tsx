// ==========================================
// Reusable Section Heading
// Single Responsibility: Renders a centered section title with optional subtitle
// ==========================================

import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  /** Use light (white) colors — for dark backgrounds. */
  light?: boolean;
}

const SectionHeading: React.FC<SectionHeadingProps> = ({ title, subtitle, light }) => (
  <div className="text-center mb-12 md:mb-16">
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 ${
        light ? 'text-white' : 'text-gray-900'
      }`}
    >
      {title}
    </h2>
    {subtitle && (
      <p className={`text-lg max-w-2xl mx-auto ${light ? 'text-white/70' : 'text-gray-500'}`}>
        {subtitle}
      </p>
    )}
    <div
      className={`mt-5 mx-auto w-16 h-1 rounded-full ${light ? 'bg-[#D4A574]' : 'bg-gray-600'}`}
    />
  </div>
);

export default SectionHeading;
