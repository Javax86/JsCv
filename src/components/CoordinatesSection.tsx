import React, { useState } from 'react';
import { SectionHeader } from './SectionHeader';
import { cvData } from '../data/cvData';
import { Mail, Phone, MapPin, Github, Linkedin, Copy, Check, Send, ArrowUpRight } from 'lucide-react';

export const CoordinatesSection: React.FC = () => {
  const { basics } = cvData;
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  // Quick message composer state
  const [senderName, setSenderName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(basics.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText(basics.phone);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleDispatchMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailSubject = encodeURIComponent(subject || `Inquiry from ${senderName || 'Colleague'}`);
    const mailBody = encodeURIComponent(
      `Hello Javed,\n\n${message || 'I came across your curriculum vitae and would like to connect regarding an engineering opportunity.'}\n\nBest regards,\n${senderName || 'Anonymous'}`
    );
    window.location.href = `mailto:${basics.email}?subject=${mailSubject}&body=${mailBody}`;
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-b border-[rgba(45,40,35,0.12)]">
      <SectionHeader
        number="04"
        subtitle="TRANSMISSION & CONTACT"
        title="Direct Contact & Dispatch"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        {/* Left Column: Direct Contact Ledger */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <p className="font-serif text-2xl sm:text-3xl text-[#1E1E1C] font-normal leading-snug mb-4">
              Open to engineering internships, cloud architecture dialogues, and technical collaborations.
            </p>
            <p className="text-[0.95rem] text-[#6E6A62] leading-relaxed">
              Based in West Bengal, India. Available for remote, hybrid, or on-site engagements with teams building
              enduring software systems.
            </p>
          </div>

          {/* Contact Details Ledger Cards */}
          <div className="space-y-4">
            {/* Email Card */}
            <div className="card-tactile bg-[#ECE8DE]/60 border border-[rgba(45,40,35,0.12)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F6F4EE] border border-[rgba(45,40,35,0.1)] flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-[#B34B2E]" />
                </div>
                <div>
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[#6E6A62] block">
                    ELECTRONIC MAIL
                  </span>
                  <a
                    href={`mailto:${basics.email}`}
                    className="font-mono text-sm sm:text-base text-[#1E1E1C] hover:text-[#B34B2E] transition-colors"
                  >
                    {basics.email}
                  </a>
                </div>
              </div>

              <button
                id="btn-copy-email-contact"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F4EE] hover:bg-[#E4DFD3] border border-[rgba(45,40,35,0.14)] text-[0.72rem] font-mono uppercase tracking-wider text-[#1E1E1C] transition-all rounded-xs cursor-pointer self-start sm:self-auto"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C6613F]" />
                    <span className="text-[#C6613F] font-semibold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6E6A62]" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Telephone Card */}
            <div className="card-tactile bg-[#ECE8DE]/60 border border-[rgba(45,40,35,0.12)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#F6F4EE] border border-[rgba(45,40,35,0.1)] flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-[#C6613F]" />
                </div>
                <div>
                  <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[#6E6A62] block">
                    TELEPHONE / WIRE
                  </span>
                  <a
                    href={`tel:${basics.phone}`}
                    className="font-mono text-sm sm:text-base text-[#1E1E1C] hover:text-[#B34B2E] transition-colors"
                  >
                    {basics.phone}
                  </a>
                </div>
              </div>

              <button
                id="btn-copy-phone-contact"
                onClick={handleCopyPhone}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F4EE] hover:bg-[#E4DFD3] border border-[rgba(45,40,35,0.14)] text-[0.72rem] font-mono uppercase tracking-wider text-[#1E1E1C] transition-all rounded-xs cursor-pointer self-start sm:self-auto"
              >
                {copiedPhone ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#C6613F]" />
                    <span className="text-[#C6613F] font-semibold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#6E6A62]" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>

            {/* Location Card */}
            <div className="card-tactile bg-[#ECE8DE]/60 border border-[rgba(45,40,35,0.12)] p-4 sm:p-5 flex items-center gap-3">
              <div className="w-9 h-9 bg-[#F6F4EE] border border-[rgba(45,40,35,0.1)] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-[#B34B2E]" />
              </div>
              <div>
                <span className="font-mono text-[0.68rem] uppercase tracking-widest text-[#6E6A62] block">
                  PRIMARY RESIDENCE
                </span>
                <span className="font-medium text-[#1E1E1C] text-sm sm:text-base">
                  {basics.location.region}, India (IN)
                </span>
              </div>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="pt-2">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#6E6A62] block mb-3">
              EXTERNAL ARCHIVES & NETWORKS
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {basics.profiles.map((p) => (
                <a
                  key={p.network}
                  id={`profile-card-${p.network.toLowerCase()}`}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-tactile group bg-[#ECE8DE] hover:bg-[#E4DFD3] border border-[rgba(45,40,35,0.14)] p-4 flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    {p.network === 'GitHub' && <Github className="w-4 h-4 text-[#1E1E1C]" />}
                    {p.network === 'LinkedIn' && <Linkedin className="w-4 h-4 text-[#1E1E1C]" />}
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-[#1E1E1C] font-semibold block">
                        {p.network}
                      </span>
                      <span className="font-mono text-[0.72rem] text-[#6E6A62]">
                        @{p.username}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#6E6A62] group-hover:text-[#B34B2E] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Dispatch Composer */}
        <div id="transmission-terminal" className="card-tactile lg:col-span-6 bg-[#ECE8DE] border border-[rgba(45,40,35,0.14)] p-6 sm:p-7 self-start">
          <div className="border-b border-[rgba(45,40,35,0.1)] pb-4 mb-5">
            <span className="font-mono text-[0.72rem] uppercase tracking-[0.2em] text-[#B34B2E] font-medium block">
              DIRECT INQUIRY DISPATCH
            </span>
            <h3 className="font-serif text-2xl text-[#1E1E1C] font-normal mt-0.5">
              Draft a Transmission
            </h3>
          </div>

          <form onSubmit={handleDispatchMail} className="space-y-4">
            <div>
              <label htmlFor="sender-name" className="block font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62] mb-1.5">
                Your Name / Organization
              </label>
              <input
                type="text"
                id="sender-name"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                placeholder="e.g. Elena Rostova / Cloud Systems Lead"
                className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[rgba(45,40,35,0.16)] text-[#1E1E1C] text-sm placeholder:text-[#6E6A62]/60 focus:outline-none focus:border-[#B34B2E] transition-colors font-sans"
              />
            </div>

            <div>
              <label htmlFor="inquiry-subject" className="block font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62] mb-1.5">
                Subject Matter
              </label>
              <input
                type="text"
                id="inquiry-subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Cloud Infrastructure Internship 2026 / Technical Discussion"
                className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[rgba(45,40,35,0.16)] text-[#1E1E1C] text-sm placeholder:text-[#6E6A62]/60 focus:outline-none focus:border-[#B34B2E] transition-colors font-sans"
              />
            </div>

            <div>
              <label htmlFor="inquiry-message" className="block font-mono text-[0.72rem] uppercase tracking-wider text-[#6E6A62] mb-1.5">
                Dispatch Content / Notes
              </label>
              <textarea
                id="inquiry-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Outline project specifications, role expectations, or research questions..."
                className="w-full px-3.5 py-2.5 bg-[#F6F4EE] border border-[rgba(45,40,35,0.16)] text-[#1E1E1C] text-sm placeholder:text-[#6E6A62]/60 focus:outline-none focus:border-[#B34B2E] transition-colors font-sans resize-y"
              />
            </div>

            <button
              type="submit"
              id="btn-dispatch-message"
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3 px-6 bg-[#1E1E1C] hover:bg-[#B34B2E] text-[#F6F4EE] font-mono text-xs uppercase tracking-[0.16em] font-medium transition-all rounded-xs cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Launch Transmission in Mail Client</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export const ContactSection = CoordinatesSection;
