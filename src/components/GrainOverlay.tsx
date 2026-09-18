import React, { useEffect, useState } from 'react';
import { getGrainDataUrl } from '../utils/grain';

interface GrainOverlayProps {
  theme: 'light' | 'dark';
}

/**
 * Tactile Ultra-Fine Grain Overlay with High Density & Roughness
 * 
 * Key Architecture:
 * - Transparent background (alpha = 0 on non-grain pixels): Contrast of text,
 *   surfaces, and blacks is 100% PRESERVED in both Light and Dark modes.
 * - Sub-pixel micro-grit (160px canvas mapped to 110px-130px background-size) for ultra-fine grain.
 * - Dual-tone grain:
 *   - Light Mode: Deep carbon ink and burnt terracotta specks on crisp parchment.
 *   - Dark Mode: Radiant bone-white and warm copper stardust specks over obsidian charcoal.
 */
export const GrainOverlay: React.FC<GrainOverlayProps> = ({ theme }) => {
  const [grainUrl, setGrainUrl] = useState<string>(() => getGrainDataUrl(theme, 'ambient'));

  useEffect(() => {
    const ambientUrl = getGrainDataUrl(theme, 'ambient');
    const cardUrl = getGrainDataUrl(theme, 'card');
    setGrainUrl(ambientUrl);
    if (cardUrl) {
      document.documentElement.style.setProperty('--card-grain-url', `url(${cardUrl})`);
    }
  }, [theme]);

  if (!grainUrl) return null;

  return (
    <div
      id="grain-overlay"
      className="fixed inset-0 pointer-events-none z-20 select-none"
      style={{
        backgroundImage: `url(${grainUrl})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '130px 130px',
      }}
      aria-hidden="true"
    />
  );
};

