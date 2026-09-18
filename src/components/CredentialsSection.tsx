import React from 'react';
import { SectionHeader } from './SectionHeader';
import { cvData } from '../data/cvData';
import { GraduationCap, Award, Globe, CheckCircle2 } from 'lucide-react';

export const CredentialsSection: React.FC = () => {
  const { education, certificates, languages } = cvData;

  return (
    <section id="credentials" className="py-16 md:py-24 border-b border-[rgba(45,40,35,0.12)]">
      <SectionHeader
        number="03"
        subtitle="ACCREDITATION & STUDY"
        title="Education & Credentials"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
        {/* Left Column (7 cols): Education + Formal Accreditations */}
        <div className="lg:col-span-7 space-y-12">
          {/* Education Block */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-4 h-4 text-[#B34B2E]" />
              <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#6E6A62]">
                ACADEMIC FOUNDATION
              </h3>
            </div>

            {education.map((edu, idx) => (
              <div
                key={idx}
                id="education-record"
                className="bg-[#ECE8DE]/50 border border-[rgba(45,40,35,0.12)] p-6 sm:p-7 relative"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h4 className="font-serif text-2xl sm:text-3xl text-[#1E1E1C] font-normal">
                    {edu.institution}
                  </h4>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#C6613F] font-semibold bg-[#C6613F]/10 px-2.5 py-0.5 rounded-xs">
                    CLASS OF {edu.endDate}
                  </span>
                </div>

                <p className="font-mono text-[0.82rem] uppercase tracking-wider text-[#B34B2E] mb-4">
                  {edu.studyType} in {edu.area}
                </p>

                <p className="text-[0.92rem] text-[#2D2A26] leading-relaxed">
                  Rigorous foundational curriculum encompassing data structures, algorithm analysis, computer systems architecture,
                  operating systems theory, database design, and object-oriented paradigms.
                </p>

                <div className="mt-4 pt-3 border-t border-[rgba(45,40,35,0.08)] flex items-center justify-between text-[0.68rem] font-mono text-[#6E6A62]">
                  <span>LOCATION: WEST BENGAL, INDIA</span>
                  <span>ENROLLMENT: ACTIVE</span>
                </div>
              </div>
            ))}
          </div>

          {/* Certifications Block */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Award className="w-4 h-4 text-[#C6613F]" />
              <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#6E6A62]">
                VERIFIED TECHNICAL CERTIFICATIONS ({certificates.length})
              </h3>
            </div>

            <div className="space-y-3">
              {certificates.map((cert, cIdx) => (
                <div
                  key={cIdx}
                  id={`cert-item-${cIdx}`}
                  className="bg-[#ECE8DE]/40 hover:bg-[#ECE8DE] border border-[rgba(45,40,35,0.12)] p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors relative overflow-hidden"
                >
                  <div className="flex items-start gap-3">
                    <span className="font-mono text-[0.72rem] text-[#B34B2E] pt-0.5 shrink-0">
                      {String(cIdx + 1).padStart(2, '0')}.
                    </span>
                    <div>
                      <h4 className="font-serif text-xl sm:text-2xl text-[#1E1E1C] font-normal leading-snug">
                        {cert.name}
                      </h4>
                      <p className="font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62] mt-1">
                        ISSUED BY: {cert.issuer}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 inline-flex items-center gap-1 text-[0.68rem] font-mono text-[#C6613F] bg-[#C6613F]/10 px-2 py-0.5 uppercase tracking-wider">
                    <CheckCircle2 className="w-3 h-3 text-[#C6613F]" />
                    VERIFIED
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Linguistic Matrix & Field Ledger */}
        <div className="lg:col-span-5 self-start space-y-12">
          {/* Languages Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-4 h-4 text-[#B34B2E]" />
              <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.2em] text-[#6E6A62]">
                LINGUISTIC PROFICIENCIES
              </h3>
            </div>

            <div
              id="linguistic-record"
              className="bg-[#ECE8DE]/50 border border-[rgba(45,40,35,0.12)] p-6 sm:p-7 relative"
            >
              <div className="divide-y divide-[rgba(45,40,35,0.08)]">
                {languages.map((lang, lIdx) => (
                  <div key={lIdx} className="py-3.5 first:pt-0 last:pb-0">
                    <div className="flex items-baseline justify-between mb-1">
                      <h4 className="font-serif text-2xl text-[#1E1E1C] font-normal">
                        {lang.language}
                      </h4>
                      <span className="font-mono text-[0.68rem] text-[#C6613F] uppercase tracking-wider">
                        {lang.language === 'English' ? 'PRIMARY / BILINGUAL' : 'CONVERSATIONAL'}
                      </span>
                    </div>
                    <p className="text-[0.85rem] text-[#6E6A62] leading-snug">
                      {lang.fluency}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t border-[rgba(45,40,35,0.08)] flex items-center justify-between text-[0.68rem] font-mono text-[#6E6A62]">
                <span>MULTILINGUAL WORKING CAPACITY</span>
                <span>3 LANGUAGES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
