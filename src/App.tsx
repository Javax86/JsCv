import React, { useState, useEffect, useCallback } from 'react';
import { Antigravity } from './components/Antigravity';
import { Masthead } from './components/Masthead';
import { HeroStatement } from './components/HeroStatement';
import { ProjectSection } from './components/ProjectSection';
import { SkillsSection } from './components/SkillsSection';
import { CredentialsSection } from './components/CredentialsSection';
import { CoordinatesSection } from './components/CoordinatesSection';
import { ColophonFooter } from './components/ColophonFooter';
import { EditorialPreloader } from './components/EditorialPreloader';
import { GrainOverlay } from './components/GrainOverlay';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem('jscv_theme_preference');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
  } catch (e) {
    // localstorage error fallback
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [replayKey, setReplayKey] = useState(0);
  const [forceShowPreloader, setForceShowPreloader] = useState(false);

  // Clear any legacy sessionStorage key so refresh always plays the intro
  useEffect(() => {
    try {
      sessionStorage.removeItem('jscv_intro_seen');
    } catch (e) {}
  }, []);

  // Keep DOM class and localStorage in sync with theme state
  useEffect(() => {
    try {
      localStorage.setItem('jscv_theme_preference', theme);
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      // ignore storage access errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleIntroComplete = useCallback(() => {
    setForceShowPreloader(false);
  }, []);

  const handleReplayIntro = () => {
    setReplayKey((prev) => prev + 1);
    setForceShowPreloader(true);
  };

  const handleSelectSkillFromRepertory = (skill: string) => {
    // Check if skill is associated with projects, and optionally scroll to projects
    setSelectedTag(skill);
    const projectsEl = document.getElementById('projects');
    if (projectsEl) {
      projectsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      id="cv-root"
      className="min-h-screen bg-[#F6F4EE] text-[#1E1E1C] relative selection:bg-[#B34B2E] selection:text-[#F6F4EE]"
    >
      {/* Editorial Greeting Preloader & Architectural Curtain Lift */}
      <EditorialPreloader
        key={replayKey}
        theme={theme}
        forceShow={forceShowPreloader}
        onComplete={handleIntroComplete}
      />

      {/* Antigravity Kinetic Particle Field (Floats across entire page, persists throughout scroll) */}
      <div
        id="antigravity-background"
        className={`fixed inset-0 pointer-events-none z-[15] overflow-hidden transition-opacity duration-700 ${
          isDark ? 'opacity-40' : 'opacity-35'
        }`}
        aria-hidden="true"
      >
        <Antigravity
          count={450}
          magnetRadius={8.5}
          ringRadius={5.5}
          waveSpeed={0.18}
          waveAmplitude={0.45}
          particleSize={0.36}
          lerpSpeed={0.045}
          color={isDark ? '#E0633C' : '#6E6A62'}
          autoAnimate={true}
          particleVariance={0.85}
          depthFactor={1.3}
          pulseSpeed={1.2}
          particleShape="box"
          fieldStrength={6.0}
        />
      </div>

      {/* Sticky Masthead & Global Navigation - pinned at top-0, elevated at z-50 */}
      <div className="sticky top-0 z-50">
        <Masthead theme={theme} onToggleTheme={toggleTheme} />
      </div>

      {/* Tactile Fine Subtle Grain Overlay (z-20, overlays page content and background, sits underneath navbar) */}
      <GrainOverlay theme={theme} />

      {/* Main Content wrapper */}
      <div className="relative z-10">
        {/* Main Editorial Container */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 00. Hero & Typographic Statement */}
          <HeroStatement />

          {/* 01. Selected Engineering Works */}
          <ProjectSection
            selectedTag={selectedTag}
            onSelectTag={setSelectedTag}
          />

          {/* 02. Technical Repertory & Tooling */}
          <SkillsSection
            selectedSkill={selectedTag}
            onSelectSkill={handleSelectSkillFromRepertory}
          />

          {/* 03. Education & Formal Qualifications */}
          <CredentialsSection />

          {/* 04. Direct Contact & Transmission */}
          <CoordinatesSection />
        </main>

        {/* Editorial Colophon & Imprint */}
        <ColophonFooter onReplayIntro={handleReplayIntro} />
      </div>
    </div>
  );
}
