import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export interface ThemeToggleProps {
  theme: 'light' | 'dark';
  onToggle: () => void;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  theme,
  onToggle,
  className = '',
}) => {
  const isDark = theme === 'dark';

  return (
    <motion.button
      type="button"
      id="theme-toggle-button"
      onClick={onToggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      aria-label={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
      className={`group relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-xs border select-none cursor-pointer overflow-hidden ${
        isDark
          ? 'bg-[#1C1A18] hover:bg-[#262420] text-[#E0633C] hover:text-[#EB744F] border-[rgba(255,255,255,0.15)] hover:border-[#E0633C]'
          : 'bg-[#ECE8DE]/80 hover:bg-[#E4DFD3] text-[#B34B2E] hover:text-[#943820] border-[rgba(45,40,35,0.18)] hover:border-[#B34B2E]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        <AnimatePresence initial={false}>
          {isDark ? (
            <motion.span
              key="dark-moon"
              initial={{ rotate: -90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: 90, scale: 0, opacity: 0 }}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </motion.span>
          ) : (
            <motion.span
              key="light-sun"
              initial={{ rotate: 90, scale: 0, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              exit={{ rotate: -90, scale: 0, opacity: 0 }}
              transition={{
                duration: 0.22,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};
