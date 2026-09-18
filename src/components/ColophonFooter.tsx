import React from 'react';
import { ArrowUp } from 'lucide-react';
import pfpImg from '../assets/pfp.webp';

export interface ColophonFooterProps {
  onReplayIntro?: () => void;
}

export const ColophonFooter: React.FC<ColophonFooterProps> = ({ onReplayIntro }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="colophon" className="py-8 sm:py-10 border-t border-[rgba(45,40,35,0.14)] bg-[#ECE8DE]/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[0.7rem] sm:text-[0.72rem] font-mono text-[#6E6A62] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <img
              src={pfpImg}
              alt="Javax86 logo"
              className="w-4 h-4 rounded-full object-cover border border-[rgba(45,40,35,0.2)]"
            />
            <span>© {new Date().getFullYear()} JAVAX86 • JAVED SHARIYAR MANDAL</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-5">
            {onReplayIntro && (
              <button
                type="button"
                onClick={onReplayIntro}
                className="hover:text-[#B34B2E] transition-colors border-b border-dashed border-[rgba(45,40,35,0.25)] hover:border-[#B34B2E] cursor-pointer text-[0.7rem]"
              >
                REPLAY INTRO ↻
              </button>
            )}

            <button
              id="btn-back-to-top"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F6F4EE] hover:bg-[#E4DFD3] border border-[rgba(45,40,35,0.16)] text-[#1E1E1C] hover:text-[#B34B2E] transition-all font-mono text-[0.7rem] uppercase tracking-wider cursor-pointer"
            >
              <span>TOP OF PAGE</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

