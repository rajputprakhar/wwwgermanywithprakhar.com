import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'switch' | 'compact';
  className?: string;
  id?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
  id = 'theme-toggle-btn'
}) => {
  const { theme, isDark, toggleTheme } = useTheme();

  if (variant === 'switch') {
    return (
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        onClick={toggleTheme}
        className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl transition-all border ${
          isDark
            ? 'bg-white/[0.04] border-white/10 text-gray-200 hover:bg-white/[0.08]'
            : 'bg-slate-100 border-slate-200 text-slate-800 hover:bg-slate-200'
        } ${className}`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
              isDark
                ? 'bg-amber-400/10 text-amber-400 border border-amber-400/20'
                : 'bg-indigo-50 text-indigo-600 border border-indigo-200'
            }`}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </div>
          <div className="text-left">
            <div className="text-xs font-semibold leading-tight">Theme</div>
            <div className="text-[10px] font-mono opacity-70">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </div>
          </div>
        </div>

        {/* Toggle Pill */}
        <div
          className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-300 ease-in-out relative flex items-center ${
            isDark ? 'bg-indigo-600' : 'bg-slate-300'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-5 h-5 rounded-full bg-white shadow-md flex items-center justify-center ${
              isDark ? 'ml-5' : 'ml-0'
            }`}
          >
            {isDark ? (
              <Moon className="w-3 h-3 text-indigo-700" />
            ) : (
              <Sun className="w-3 h-3 text-amber-500" />
            )}
          </motion.div>
        </div>
      </button>
    );
  }

  // Default icon button (used in Navbar)
  return (
    <motion.button
      id={id}
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={isDark ? 'Switch to Light theme' : 'Switch to Dark theme'}
      className={`relative group p-2 min-h-[38px] min-w-[38px] rounded-xl flex items-center justify-center transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/60 ${
        isDark
          ? 'bg-white/[0.05] hover:bg-white/[0.1] text-amber-300 border border-white/10 hover:border-amber-400/40'
          : 'bg-white hover:bg-slate-50 text-indigo-600 border border-slate-200 hover:border-indigo-300 shadow-sm'
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.div
            key="dark-sun"
            initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Sun className="w-4 h-4 text-amber-300 group-hover:text-amber-200 transition-colors" />
          </motion.div>
        ) : (
          <motion.div
            key="light-moon"
            initial={{ rotate: 90, scale: 0.5, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: -90, scale: 0.5, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center justify-center"
          >
            <Moon className="w-4 h-4 text-indigo-600 group-hover:text-indigo-700 transition-colors" />
          </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
};
