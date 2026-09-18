import React, { useEffect, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getGrainDataUrl } from '../utils/grain';

export interface EditorialPreloaderProps {
  theme?: 'light' | 'dark';
  forceShow?: boolean;
  onComplete?: () => void;
}

interface GreetingItem {
  text: string;
  transliteration?: string;
  language: string;
  color: string;
  accent: string;
}

const GREETINGS: GreetingItem[] = [
  { text: 'Hello', language: 'English', color: '#1E1E1C', accent: '#C6613F' },
  { text: 'নমস্কার', transliteration: 'Nomoskar', language: 'Bengali', color: '#B34B2E', accent: '#B34B2E' },
  { text: 'नमस्ते', transliteration: 'Namaste', language: 'Hindi', color: '#C6613F', accent: '#C6613F' },
  { text: 'வணக்கம்', transliteration: 'Vanakkam', language: 'Tamil', color: '#B34B2E', accent: '#B34B2E' },
  { text: 'Bonjour', language: 'French', color: '#5D4037', accent: '#5D4037' },
  { text: 'Guten Tag', language: 'German', color: '#1E1E1C', accent: '#C6613F' },
  { text: 'こんにちは', transliteration: 'Konnichiwa', language: 'Japanese', color: '#B34B2E', accent: '#B34B2E' },
  { text: '안녕하세요', transliteration: 'Annyeonghaseyo', language: 'Korean', color: '#C6613F', accent: '#C6613F' },
  { text: '你好', transliteration: 'Nǐ Hǎo', language: 'Chinese', color: '#5D4037', accent: '#5D4037' },
  { text: 'Javed Shariyar Mandal', transliteration: 'Human Being', language: 'Identity', color: '#1E1E1C', accent: '#B34B2E' },
];

export const EditorialPreloader: React.FC<EditorialPreloaderProps> = ({
  theme,
  forceShow = false,
  onComplete,
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const exitTriggeredRef = useRef(false);

  const activeTheme =
    theme ||
    (typeof document !== 'undefined' &&
    document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light');

  const [grainUrl, setGrainUrl] = useState<string>(() =>
    getGrainDataUrl(activeTheme, 'intro')
  );

  useEffect(() => {
    const currentTheme =
      theme ||
      (typeof document !== 'undefined' &&
      document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light');
    setGrainUrl(getGrainDataUrl(currentTheme, 'intro'));
  }, [theme]);

  const effectiveGrainUrl = grainUrl || getGrainDataUrl(activeTheme, 'intro');

  // Keep a fresh reference to onComplete so parent re-renders never trigger the effect
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finishAndExit = useCallback(() => {
    if (exitTriggeredRef.current) return;
    exitTriggeredRef.current = true;
    setProgress(100);
    setIsExiting(true);
  }, []);

  useEffect(() => {
    // Check reduced motion preference
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion && !forceShow) {
      onCompleteRef.current?.();
      return;
    }

    exitTriggeredRef.current = false;
    setShouldRender(true);
    setIsExiting(false);
    setCurrentIndex(0);
    setProgress(0);
    document.body.style.overflow = 'hidden';

    // Step through the greeting sequence at a calm, readable editorial cadence
    // ~520ms per greeting, with 920ms dwell on the final candidate identity
    const standardDwell = 520;
    const finalDwell = 920;
    const totalGreetings = GREETINGS.length;
    let currentStep = 0;
    let timer: NodeJS.Timeout;

    const scheduleNextGreeting = () => {
      const isLast = currentStep === totalGreetings - 1;
      const dwell = isLast ? finalDwell : standardDwell;

      timer = setTimeout(() => {
        if (currentStep < totalGreetings - 1) {
          currentStep++;
          setCurrentIndex(currentStep);
          scheduleNextGreeting();
        } else {
          // Pause on final identity before triggering the architectural curtain lift
          finishAndExit();
        }
      }, dwell);
    };

    scheduleNextGreeting();

    // Smooth progress counter from 0 to 100%
    const totalCycleTime = (totalGreetings - 1) * standardDwell + finalDwell;
    const startTime = performance.now();

    const updateProgress = () => {
      if (exitTriggeredRef.current) return;
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / totalCycleTime) * 100));
      setProgress(pct);
      if (pct < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    const frameId = requestAnimationFrame(updateProgress);

    // Allow user to bypass immediately with Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        finishAndExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [forceShow, finishAndExit]);

  // Lock and unlock body overflow
  useEffect(() => {
    if (shouldRender && !isExiting) {
      document.body.style.overflow = 'hidden';
    } else if (!shouldRender) {
      document.body.style.overflow = '';
    }
  }, [shouldRender, isExiting]);

  const handleExitComplete = () => {
    setShouldRender(false);
    document.body.style.overflow = '';
    onCompleteRef.current?.();
  };

  if (!shouldRender) return null;

  const currentGreeting = GREETINGS[currentIndex];
  const isDark = theme ? theme === 'dark' : (typeof document !== 'undefined' && document.documentElement.classList.contains('dark'));

  const greetingColor = isDark
    ? currentGreeting.color === '#1E1E1C'
      ? '#FAF8F5'
      : currentGreeting.color === '#5D4037'
      ? '#D88A75'
      : currentGreeting.color === '#C6613F' || currentGreeting.color === '#3D4C41'
      ? '#EB7C59'
      : '#E0633C'
    : currentGreeting.color;

  const greetingAccent = isDark
    ? currentGreeting.accent === '#B34B2E'
      ? '#E0633C'
      : currentGreeting.accent === '#C6613F' || currentGreeting.accent === '#3D4C41'
      ? '#EB7C59'
      : '#D88A75'
    : currentGreeting.accent;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isExiting && (
        <motion.div
          id="editorial-preloader-root"
          role="status"
          aria-live="polite"
          aria-label={`Initializing portfolio. Greeting: ${currentGreeting.text}`}
          initial={{ opacity: 1 }}
          exit={{ opacity: [1, 1, 0] }}
          transition={{ duration: 1.35, times: [0, 0.88, 1], ease: 'easeOut' }}
          className="fixed inset-0 z-[99999] pointer-events-auto overflow-hidden select-none"
        >
          {/* Layer 1: Architectural Underlay Sheet (#ECE8DE - Warm Stone) */}
          <motion.div
            key="curtain-underlay"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 1.22,
              ease: [0.65, 0.05, 0.36, 1],
              delay: 0.06,
            }}
            style={{ willChange: 'transform' }}
            className="absolute inset-0 bg-[#ECE8DE] z-10 will-change-transform shadow-[0_20px_40px_-10px_rgba(45,40,35,0.18)]"
            aria-hidden="true"
          >
            {/* Underlay Paper Grain Texture (Calibrated to match hero ambient grain) */}
            <div
              id="intro-underlay-grain"
              className="absolute inset-0 pointer-events-none select-none z-10"
              style={{
                backgroundImage: effectiveGrainUrl ? `url(${effectiveGrainUrl})` : 'var(--card-grain-url)',
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
                opacity: isDark ? 0.42 : 0.96,
              }}
              aria-hidden="true"
            />

            {/* Matching tension lip on underlay for unified geometry */}
            <svg
              className="absolute top-full left-0 w-full h-16 sm:h-28 fill-[#ECE8DE] pointer-events-none"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0,0 L1440,0 Q720,120 0,0 Z" />
            </svg>
          </motion.div>

          {/* Layer 2: Primary Canvas Sheet (#F6F4EE - Unbleached Warm Bone Paper) */}
          <motion.div
            key="curtain-primary"
            initial={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{
              duration: 1.15,
              ease: [0.65, 0.05, 0.36, 1],
            }}
            style={{ willChange: 'transform' }}
            className="absolute inset-0 bg-[#F6F4EE] z-20 flex flex-col justify-between p-6 sm:p-10 md:p-14 shadow-[0_25px_50px_-12px_rgba(45,40,35,0.22)] will-change-transform"
          >
            {/* Primary Paper Sheet Grain Texture (Tactile fine micro-grit across the curtain) */}
            <div
              id="intro-sheet-grain"
              className="absolute inset-0 pointer-events-none select-none z-30"
              style={{
                backgroundImage: effectiveGrainUrl ? `url(${effectiveGrainUrl})` : 'var(--card-grain-url)',
                backgroundRepeat: 'repeat',
                backgroundSize: '120px 120px',
                opacity: isDark ? 0.42 : 0.96,
              }}
              aria-hidden="true"
            />

            {/* Inner Content Wrapper: Softly dissolves and lifts as curtain rises */}
            <motion.div
              key="curtain-inner-content"
              exit={{ opacity: 0, y: -22, filter: 'blur(3px)' }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-20 flex flex-col justify-between h-full"
            >
              {/* Top Monospace Dossier Header Strip */}
              <header className="flex items-center justify-between text-[0.68rem] sm:text-[0.74rem] font-mono tracking-[0.2em] uppercase text-[#6E6A62]">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 bg-[#B34B2E]" />
                  <span className="text-[#1E1E1C] font-medium">JSCV // CURRICULUM VITAE</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#B34B2E] animate-pulse" />
                    <span>VOL. 01 — SYSTEM INITIALIZING</span>
                  </div>
                  <button
                    type="button"
                    onClick={finishAndExit}
                    title="Skip introduction (Press Esc)"
                    className="relative z-40 hidden sm:inline-flex items-center gap-1 border border-[rgba(45,40,35,0.18)] hover:border-[#B34B2E] px-2 py-0.5 text-[0.62rem] text-[#6E6A62] hover:text-[#B34B2E] transition-colors cursor-pointer"
                  >
                    <span>ESC // SKIP</span>
                  </button>
                </div>
              </header>

              {/* Center Greeting Showcase with Editorial Typography */}
              <div className="my-auto flex flex-col items-center justify-center text-center px-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`greeting-${currentIndex}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center justify-center"
                  >
                    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5">
                      {/* Preceding Bullet / Stamp */}
                      <span
                        className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full shrink-0 transition-colors duration-200"
                        style={{ backgroundColor: greetingAccent }}
                        aria-hidden="true"
                      />

                      {/* Graceful Instrument Serif Heading */}
                      <h1
                        className="font-serif italic font-normal tracking-tight leading-none text-[clamp(2.5rem,6vw,4.5rem)] transition-colors duration-200"
                        style={{ color: greetingColor }}
                      >
                        {currentGreeting.text}
                      </h1>
                    </div>

                    {/* Subtitle / Transliteration & Language Label */}
                    <div className="mt-3 sm:mt-4 flex items-center gap-2 text-[0.72rem] sm:text-[0.78rem] font-mono uppercase tracking-[0.18em] text-[#6E6A62]/80">
                      <span>{currentGreeting.language}</span>
                      {currentGreeting.transliteration && (
                        <>
                          <span className="text-[rgba(45,40,35,0.25)]">/</span>
                          <span className="italic normal-case font-serif text-[#1E1E1C] text-sm">
                            {currentGreeting.transliteration}
                          </span>
                        </>
                      )}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Monospace Progress Indicator & Hairline Rule */}
              <footer className="space-y-3">
                {/* Hairline Progress Rule */}
                <div className="w-full h-[1.5px] bg-[rgba(45,40,35,0.12)] overflow-hidden">
                  <motion.div
                    className="h-full bg-[#B34B2E]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: 'linear', duration: 0.05 }}
                  />
                </div>

                <div className="flex items-center justify-between text-[0.68rem] sm:text-[0.74rem] font-mono tracking-[0.16em] uppercase text-[#6E6A62]">
                  <div className="flex items-center gap-2">
                    <span>JAVED SHARIYAR MANDAL</span>
                    <span className="hidden sm:inline text-[rgba(45,40,35,0.25)]">•</span>
                    <span className="hidden sm:inline">WEST BENGAL, INDIA</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[rgba(45,40,35,0.4)]">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(GREETINGS.length).padStart(2, '0')}
                    </span>
                    <span className="text-[#1E1E1C] font-semibold tabular-nums">
                      {progress}%
                    </span>
                  </div>
                </div>
              </footer>
            </motion.div>

            {/* Architectural Paper-Pull SVG Lip (Curved upward tension during curtain lift) */}
            <svg
              className="absolute top-full left-0 w-full h-16 sm:h-28 fill-[#F6F4EE] pointer-events-none"
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M0,0 L1440,0 Q720,120 0,0 Z" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditorialPreloader;
