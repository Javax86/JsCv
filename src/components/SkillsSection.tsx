import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { cvData } from '../data/cvData';
import { Terminal, Cpu, Database, Cloud, Check } from 'lucide-react';

interface SkillsSectionProps {
  onSelectSkill?: (skill: string) => void;
  selectedSkill?: string | null;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  onSelectSkill,
  selectedSkill,
}) => {
  const { skills } = cvData;
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const getCategoryIcon = (name: string) => {
    switch (name) {
      case 'Programming & Scripting':
        return <Terminal className="w-4 h-4 text-[#B34B2E]" />;
      case 'Frameworks & Runtimes':
        return <Cpu className="w-4 h-4 text-[#C6613F]" />;
      case 'Databases':
        return <Database className="w-4 h-4 text-[#B34B2E]" />;
      case 'Cloud, DevOps & Tools':
        return <Cloud className="w-4 h-4 text-[#C6613F]" />;
      default:
        return <Terminal className="w-4 h-4 text-[#6E6A62]" />;
    }
  };

  const handleSkillClick = (skill: string) => {
    if (onSelectSkill) {
      onSelectSkill(skill);
    }
    setCopiedSkill(skill);
    setTimeout(() => setCopiedSkill(null), 1800);
  };

  return (
    <section id="skills" className="py-16 md:py-24 border-b border-[rgba(45,40,35,0.12)]">
      <SectionHeader
        number="02"
        subtitle="CAPABILITIES & TOOLING"
        title="Technical Repertory"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {skills.map((group, idx) => {
          const catCode = `CAT. 0${idx + 1}`;
          return (
            <div
              key={group.name}
              id={`skill-group-${group.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="bg-[#ECE8DE]/50 border border-[rgba(45,40,35,0.12)] p-6 sm:p-7 flex flex-col justify-between transition-colors hover:border-[rgba(45,40,35,0.22)]"
            >
              <div>
                {/* Header Strip */}
                <div className="flex items-center justify-between border-b border-[rgba(45,40,35,0.1)] pb-3 mb-4 text-[0.72rem] font-mono uppercase tracking-[0.16em] text-[#6E6A62]">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(group.name)}
                    <span className="font-semibold text-[#1E1E1C]">{catCode}</span>
                  </div>
                  <span>{group.keywords.length} MODULES</span>
                </div>

                {/* Group Title */}
                <h3 className="font-serif text-2xl text-[#1E1E1C] font-normal mb-5">
                  {group.name}
                </h3>

                {/* Keyword Pills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {group.keywords.map((kw) => {
                    const isSelected = selectedSkill === kw;
                    const isCopied = copiedSkill === kw;
                    return (
                      <button
                        key={kw}
                        id={`skill-pill-${kw.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                        onClick={() => handleSkillClick(kw)}
                        title={`Click to reference ${kw}`}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[0.75rem] font-mono tracking-wide uppercase transition-all border rounded-xs cursor-pointer ${
                          isSelected
                            ? 'bg-[#B34B2E] text-[#F6F4EE] border-[#B34B2E] font-medium shadow-xs'
                            : 'bg-[#F6F4EE] text-[#1E1E1C] hover:bg-[#E4DFD3] border-[rgba(45,40,35,0.14)]'
                        }`}
                      >
                        {isCopied ? (
                          <Check className="w-3 h-3 text-[#C6613F]" />
                        ) : null}
                        <span>{kw}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom ledger annotation */}
              <div className="border-t border-[rgba(45,40,35,0.08)] pt-3 text-[0.68rem] font-mono text-[#6E6A62] flex items-center justify-between">
                <span>INDEXED REPERTORY</span>
                <span>STATUS: ACTIVE PROFICIENCY</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Engineering Focus Micro-Manifesto */}
      <div id="skills-micro-manifesto" className="card-tactile mt-8 p-6 bg-[#ECE8DE] border border-[rgba(45,40,35,0.12)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-serif text-xl text-[#1E1E1C] font-normal mb-1">
            Infrastructure Trajectory & Core Specialization
          </h4>
          <p className="text-[0.9rem] text-[#6E6A62] leading-relaxed max-w-2xl">
            Currently advancing practical proficiencies in distributed fault tolerance, container orchestration (Docker), Linux kernel internals, and GCP cloud architecture.
          </p>
        </div>
        <div className="shrink-0 font-mono text-[0.72rem] tracking-wider uppercase text-[#C6613F] border border-[#C6613F]/30 px-3 py-1.5 bg-[#C6613F]/5">
          2026 ROADMAP: CLOUD NATIVE
        </div>
      </div>
    </section>
  );
};
