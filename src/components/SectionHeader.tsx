import React from 'react';

interface SectionHeaderProps {
  number: string;
  subtitle: string;
  title: string;
  accentColor?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  number,
  subtitle,
  title,
  className = '',
}) => {
  return (
    <div className={`relative mb-10 md:mb-14 ${className}`}>
      {/* Oversized quiet numeral set in Instrument Serif with low contrast */}
      <span
        className="font-serif select-none pointer-events-none absolute -top-8 -left-2 md:-left-4 text-7xl md:text-8xl lg:text-9xl tracking-tight leading-none text-[#1E1E1C] opacity-[0.12] z-0"
        aria-hidden="true"
      >
        {number}
      </span>

      {/* Structured Header Group */}
      <div className="relative z-10 pt-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-[1px] bg-[#B34B2E]" />
          <p className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[#B34B2E] font-medium">
            {subtitle}
          </p>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1E1C] font-normal tracking-[-0.01em] leading-[1.15]">
          {title}
        </h2>
      </div>

      <div className="mt-4 w-full h-[1px] bg-[rgba(45,40,35,0.12)]" />
    </div>
  );
};
