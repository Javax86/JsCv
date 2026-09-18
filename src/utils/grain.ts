/**
 * Tactile Ultra-Fine Grain Generator
 * 
 * Generates an offscreen HTML5 canvas micro-grit pattern encoded into a seamless PNG data URL.
 * Supports both Light and Dark modes with optimized memory caching.
 * 
 * - Light Mode: Deep carbon ink and burnt terracotta specks on crisp parchment.
 * - Dark Mode: Radiant bone-white and warm copper stardust specks over obsidian charcoal.
 */

let cachedLightAmbient: string | null = null;
let cachedDarkAmbient: string | null = null;
let cachedLightCard: string | null = null;
let cachedDarkCard: string | null = null;
let cachedLightIntro: string | null = null;
let cachedDarkIntro: string | null = null;

export function getGrainDataUrl(
  theme: 'light' | 'dark',
  type: 'ambient' | 'card' | 'intro' = 'ambient'
): string {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return '';
  }

  if (type === 'ambient') {
    if (theme === 'light' && cachedLightAmbient) return cachedLightAmbient;
    if (theme === 'dark' && cachedDarkAmbient) return cachedDarkAmbient;
  } else if (type === 'card') {
    if (theme === 'light' && cachedLightCard) return cachedLightCard;
    if (theme === 'dark' && cachedDarkCard) return cachedDarkCard;
  } else if (type === 'intro') {
    if (theme === 'light' && cachedLightIntro) return cachedLightIntro;
    if (theme === 'dark' && cachedDarkIntro) return cachedDarkIntro;
  }

  try {
    const size = 160;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    const isDark = theme === 'dark';
    const isCard = type === 'card';
    const isIntro = type === 'intro';
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    // Density threshold calibrated for delicate tactile presence
    // Light mode intro retains rich tactile paper grain (0.36); dark mode intro uses a restrained stardust density (0.16) to prevent excessive noise
    const densityThreshold = isIntro
      ? (isDark ? 0.16 : 0.36)
      : isCard
      ? (isDark ? 0.25 : 0.352)
      : (isDark ? 0.20 : 0.242);

    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() < densityThreshold) {
        const roughness = Math.random();

        if (isDark) {
          // Dark mode: Delicate bone-white and warm copper stardust
          const isCopper = Math.random() < (isIntro ? 0.18 : 0.22);
          if (isCopper) {
            data[i] = 224;     // R (#E0633C)
            data[i + 1] = 99;  // G
            data[i + 2] = 60;  // B
          } else {
            data[i] = 246;     // R (#F6F4EE)
            data[i + 1] = 244; // G
            data[i + 2] = 238; // B
          }

          let alpha: number;
          if (isIntro) {
            // Subtle, restrained stardust & warm copper whisper for dark mode curtain
            if (roughness > 0.90) {
              alpha = 0.055 + (roughness - 0.90) * 0.09;
            } else if (roughness > 0.60) {
              alpha = 0.035 + (roughness - 0.60) * 0.035;
            } else {
              alpha = 0.016 + roughness * 0.018;
            }
          } else {
            alpha = 0.028;
            if (roughness > 0.90) {
              alpha = 0.08 + (roughness - 0.90) * 0.15;
            } else if (roughness > 0.60) {
              alpha = 0.048 + (roughness - 0.60) * 0.05;
            } else {
              alpha = 0.022 + roughness * 0.025;
            }
          }
          data[i + 3] = Math.min(255, Math.floor(alpha * 255));
        } else {
          // Light mode: Deep carbon ink and burnt terracotta specks
          const isRust = Math.random() < (isIntro ? 0.24 : 0.18);
          if (isRust) {
            data[i] = 179;    // R (#B34B2E)
            data[i + 1] = 75; // G
            data[i + 2] = 46; // B
          } else {
            data[i] = 28;     // R (#1C1A18)
            data[i + 1] = 26; // G
            data[i + 2] = 24; // B
          }

          let alpha: number;
          if (isIntro) {
            // Rich, clearly visible tactile paper grain for the unbleached warm bone canvas
            if (roughness > 0.88) {
              alpha = 0.135 + (roughness - 0.88) * 0.28;
            } else if (roughness > 0.55) {
              alpha = 0.085 + (roughness - 0.55) * 0.11;
            } else {
              alpha = 0.055 + roughness * 0.055;
            }
          } else {
            alpha = 0.0308;
            if (roughness > 0.90) {
              alpha = 0.088 + (roughness - 0.90) * 0.165;
            } else if (roughness > 0.60) {
              alpha = 0.0528 + (roughness - 0.60) * 0.055;
            } else {
              alpha = 0.0242 + roughness * 0.0275;
            }
          }
          data[i + 3] = Math.min(255, Math.floor(alpha * 255));
        }
      } else {
        data[i + 3] = 0;
      }
    }

    ctx.putImageData(imgData, 0, 0);
    const url = canvas.toDataURL('image/png');

    if (type === 'ambient') {
      if (theme === 'light') cachedLightAmbient = url;
      else cachedDarkAmbient = url;
    } else if (type === 'card') {
      if (theme === 'light') cachedLightCard = url;
      else cachedDarkCard = url;
    } else if (type === 'intro') {
      if (theme === 'light') cachedLightIntro = url;
      else cachedDarkIntro = url;
    }

    return url;
  } catch (e) {
    console.warn('Grain generation error', e);
    return '';
  }
}
