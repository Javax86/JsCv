import React from 'react';
import { ArrowUpRight, Github, Linkedin, Mail, Phone, MapPin, GraduationCap } from 'lucide-react';
import { cvData } from '../data/cvData';

export const HeroStatement: React.FC = () => {
  const { basics, education } = cvData;
  const edu = education[0];

  return (
    <section id="statement" className="pt-12 sm:pt-16 pb-16 md:pb-24 border-b border-[rgba(45,40,35,0.12)]">
      {/* Top Colophon Meta Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-[0.75rem] font-mono uppercase tracking-[0.18em] text-[#6E6A62]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-[#B34B2E]" />
          <span>JAVAX86 // CURRICULUM VITAE</span>
        </div>
        <div className="text-right">
          <span>VOL. 01 — CLOUD ARCHITECTURES & SYSTEMS</span>
        </div>
      </div>

      {/* Name and Designation Ledger */}
      <div className="mb-8">
        <h1
          id="candidate-name"
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#1E1E1C] font-normal leading-[1.0] mb-3"
        >
          {basics.name}
        </h1>
        <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.16em] text-[#B34B2E] font-medium max-w-3xl">
          {basics.label}
        </p>
      </div>

      {/* Editorial Display Statement (Typographic centerpiece) */}
      <div
        id="editorial-display-banner"
        className="card-tactile relative overflow-hidden my-10 sm:my-14 py-8 border-y border-[rgba(45,40,35,0.12)] bg-[#ECE8DE]/30 px-4 sm:px-8 rounded-none"
      >
        <blockquote
          id="editorial-display-statement"
          className="font-serif text-[clamp(2.5rem,5.8vw,4.75rem)] leading-[1.06] tracking-[-0.02em] text-[#1E1E1C] font-normal"
        >
          Architecting responsive modern interfaces while forging scalable,{' '}
          <span className="italic font-normal text-[#B34B2E]">distributed cloud infrastructure</span>{' '}
          and resilient backend systems.
        </blockquote>
      </div>

      {/* Two-Column Editorial Ledger: Bio Narrative + Structural Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pt-4">
        {/* Left Column: Summary and Core Philosophy */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 bg-[#C6613F]" />
            <h3 className="font-mono text-[0.75rem] uppercase tracking-[0.18em] text-[#6E6A62]">
              Architectural Intent & Summary
            </h3>
          </div>

          <p className="text-[1.05rem] text-[#2D2A26] leading-[1.7] font-normal">
            {basics.summary}
          </p>

          <p className="text-[0.95rem] text-[#6E6A62] leading-[1.65]">
            Bridging front-end precision with backend reliability. Focused on containerization, CI/CD pipelines,
            Google Cloud Platform solutions, and type-safe systems design that endure high load without structural compromise.
          </p>

          {/* Quick Profile Links */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            {basics.profiles.map((profile) => (
              <a
                key={profile.network}
                id={`hero-link-${profile.network.toLowerCase()}`}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ECE8DE] hover:bg-[#E4DFD3] border border-[rgba(45,40,35,0.14)] text-[#1E1E1C] hover:text-[#B34B2E] transition-all rounded-xs text-[0.75rem] font-mono tracking-wider uppercase font-medium"
              >
                {profile.network === 'GitHub' && <Github className="w-3.5 h-3.5 text-[#1E1E1C] group-hover:text-[#B34B2E]" />}
                {profile.network === 'LinkedIn' && <Linkedin className="w-3.5 h-3.5 text-[#1E1E1C] group-hover:text-[#B34B2E]" />}
                <span>{profile.network} ({profile.username})</span>
                <ArrowUpRight className="w-3 h-3 text-[#6E6A62] group-hover:text-[#B34B2E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}

            <a
              id="hero-link-email"
              href={`mailto:${basics.email}`}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#1E1E1C] hover:bg-[#B34B2E] text-[#F6F4EE] transition-all rounded-xs text-[0.75rem] font-mono tracking-wider uppercase font-medium"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Direct Transmission</span>
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Field Spec Ledger */}
        <div id="field-spec-ledger" className="card-tactile lg:col-span-5 bg-[#ECE8DE] border border-[rgba(45,40,35,0.12)] p-5 sm:p-6 relative self-start">
          <div className="border-b border-[rgba(45,40,35,0.1)] pb-3 mb-4">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#B34B2E] font-medium">
              FIELD SPECIFICATION
            </span>
          </div>

          <dl className="space-y-3.5 text-[0.82rem]">
            <div className="border-b border-[rgba(45,40,35,0.08)] pb-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62]">
                Academic Base
              </dt>
              <dd className="font-medium text-[#1E1E1C] sm:text-right">
                {edu.institution}
                <div className="text-[0.75rem] text-[#6E6A62] font-mono">
                  {edu.studyType} in {edu.area}
                </div>
              </dd>
            </div>

            <div className="border-b border-[rgba(45,40,35,0.08)] pb-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62]">
                Target Graduation
              </dt>
              <dd className="font-mono text-[#C6613F] font-semibold sm:text-right">
                Class of {edu.endDate}
              </dd>
            </div>

            <div className="border-b border-[rgba(45,40,35,0.08)] pb-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62]">
                Geographic Station
              </dt>
              <dd className="font-medium text-[#1E1E1C] sm:text-right flex items-center sm:justify-end gap-1">
                <MapPin className="w-3 h-3 text-[#B34B2E]" />
                <span>{basics.location.region}, India</span>
              </dd>
            </div>

            <div className="border-b border-[rgba(45,40,35,0.08)] pb-3 flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62]">
                Electronic Mail
              </dt>
              <dd className="font-mono text-[0.78rem] text-[#1E1E1C] sm:text-right">
                <a href={`mailto:${basics.email}`} className="hover:text-[#B34B2E] transition-colors underline decoration-[#B34B2E]/40 underline-offset-2">
                  {basics.email}
                </a>
              </dd>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <dt className="font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62]">
                Direct Wire / Phone
              </dt>
              <dd className="font-mono text-[0.78rem] text-[#1E1E1C] sm:text-right">
                <a href={`tel:${basics.phone}`} className="hover:text-[#B34B2E] transition-colors">
                  {basics.phone}
                </a>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};
