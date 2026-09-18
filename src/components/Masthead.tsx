import React, { useRef, useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import pfpImg from '../assets/pfp.webp';
import { ThemeToggle } from './ThemeToggle';

const NAV_ITEMS = [
  { id: 'statement', num: '00', label: 'Overview' },
  { id: 'projects', num: '01', label: 'Projects' },
  { id: 'skills', num: '02', label: 'Skills' },
  { id: 'credentials', num: '03', label: 'Education' },
  { id: 'contact', num: '04', label: 'Contact' },
];

export interface MastheadProps {
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Masthead: React.FC<MastheadProps> = ({
  theme = 'light',
  onToggleTheme,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const isHoveredRef = useRef(false);
  const angleRef = useRef(0);
  const speedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Close mobile drawer on outside tap, Escape key, or screen expansion to desktop breakpoint
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('touchstart', handleOutsideClick);
      document.addEventListener('keydown', handleKeyDown);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  // Track page scroll progress with 60fps frame request
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min(Math.max(scrollTop / scrollHeight, 0), 1));
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateScrollProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    const loop = (currentTime: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = currentTime;
      }
      const dt = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = currentTime;

      if (isHoveredRef.current) {
        // Starts spinning slowly, then progressively ramps up to extreme speed
        if (speedRef.current < 90) {
          speedRef.current = 90;
        }
        // Accelerate: compounding growth curve with 50% decreased acceleration
        const acceleration = 175 + speedRef.current * 0.8;
        speedRef.current = Math.min(speedRef.current + acceleration * dt, 9000);
      } else {
        // Graceful inertial wind-down when mouse unhovers
        speedRef.current *= Math.pow(0.15, dt);
        if (speedRef.current < 2) {
          speedRef.current = 0;
        }
      }

      if (speedRef.current > 0) {
        angleRef.current = (angleRef.current + speedRef.current * dt) % 360;
        if (imgRef.current) {
          imgRef.current.style.transform = `rotate(${angleRef.current}deg)`;
        }
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <header
      ref={headerRef}
      id="site-masthead"
      className="w-full relative border-b border-[rgba(45,40,35,0.12)] bg-[#F6F4EE]/95 backdrop-blur-md transition-colors"
    >
      {/* Editorial Navigation Strip */}
      <nav
        id="masthead-navigation"
        aria-label="Section Index"
        className="bg-[#ECE8DE]/50 px-4 sm:px-6 lg:px-8 py-2.5"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-[0.75rem] font-mono tracking-widest uppercase">
          {/* Brand Logo & Website Title */}
          <a
            id="masthead-brand-logo"
            href="#statement"
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={() => {
              isHoveredRef.current = true;
            }}
            onMouseLeave={() => {
              isHoveredRef.current = false;
            }}
            className="flex items-center gap-2.5 group shrink-0 text-[#1E1E1C]"
          >
            <img
              ref={imgRef}
              src={pfpImg}
              alt=""
              aria-hidden="true"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[rgba(45,40,35,0.18)] group-hover:border-[#B34B2E] transition-colors shadow-2xs will-change-transform select-none pointer-events-auto"
            />
            <span className="font-mono text-[0.78rem] tracking-[0.16em] font-semibold text-[#1E1E1C] group-hover:text-[#B34B2E] transition-colors normal-case">
              Javax86
            </span>
          </a>

          {/* Navigation Controls: Desktop Links + Theme Toggle + Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Desktop Section Jump Links */}
            <div className="hidden md:flex items-center gap-4 sm:gap-6 whitespace-nowrap text-[#6E6A62] py-0.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  href={`#${item.id}`}
                  className="hover:text-[#B34B2E] transition-colors pb-0.5 border-b border-transparent hover:border-[#B34B2E]"
                >
                  <span className="text-[#B34B2E] mr-1">{item.num}</span>
                  {item.label}
                </a>
              ))}
            </div>

            {/* Subtle Divider between Navigation and Theme Toggle on desktop */}
            {onToggleTheme && (
              <span
                className="hidden md:block w-[1px] h-3.5 bg-[rgba(45,40,35,0.18)] dark:bg-white/15"
                aria-hidden="true"
              />
            )}

            {/* Single Interactive Theme Toggle Button (Light Mode / Dark Mode) */}
            {onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}

            {/* Mobile Minimal Menu Toggle Button (< 768px) */}
            <button
              type="button"
              id="mobile-nav-toggle"
              onClick={() => setIsMenuOpen((prev) => !prev)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
              className="md:hidden p-1.5 text-[#1E1E1C] hover:text-[#B34B2E] transition-colors border border-[rgba(45,40,35,0.18)] hover:border-[#B34B2E] bg-[#ECE8DE]/60 hover:bg-[#ECE8DE] cursor-pointer flex items-center justify-center"
            >
              {isMenuOpen ? (
                <X className="w-4 h-4 text-[#B34B2E]" />
              ) : (
                <Menu className="w-4 h-4 text-[#1E1E1C]" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Minimal Mobile Collapsible Navigation Menu */}
      <div
        id="mobile-nav-drawer"
        aria-hidden={!isMenuOpen}
        className={`md:hidden overflow-hidden transition-all duration-200 ease-in-out border-t border-[rgba(45,40,35,0.12)] bg-[#F6F4EE] ${
          isMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="py-2 px-4 sm:px-6 divide-y divide-[rgba(45,40,35,0.06)]">
          {NAV_ITEMS.map((item) => (
            <a
              key={`mobile-${item.id}`}
              id={`mobile-nav-link-${item.id}`}
              href={`#${item.id}`}
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center py-2.5 text-[0.75rem] font-mono tracking-widest text-[#1E1E1C] hover:text-[#B34B2E] transition-colors uppercase"
            >
              <span className="text-[#B34B2E] mr-2.5 font-medium">{item.num}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Extremely Minimal Scroll Progress Indicator */}
      <div
        id="scroll-progress-track"
        className="absolute bottom-[-1px] left-0 w-full h-[1.5px] bg-[rgba(45,40,35,0.06)] pointer-events-none overflow-hidden z-50"
        aria-hidden="true"
      >
        <div
          id="scroll-progress-bar"
          className="h-full bg-[#B34B2E] transition-transform duration-75 ease-out origin-left will-change-transform"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
    </header>
  );
};
