import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Video, BookOpen, Layers, Menu, X, ArrowUpRight, ArrowRight, GraduationCap, Globe2, Calculator } from 'lucide-react';
import { PERSONAL_INFO } from '../data/siteData';
import { ThemeToggle } from './ThemeToggle';

interface NavbarProps {
  onBookCallClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookCallClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Consulting', href: '#consulting' },
    { name: 'Calculators', href: '#tools' },
    { name: 'YouTube', href: '#youtube' },
    { name: 'Toolkit', href: '#toolkit' },
    { name: 'Blog', href: '#blog' },
    { name: 'FAQ & News', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#090A0F]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-md dark:shadow-2xl dark:shadow-black/50 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            className="group flex items-center gap-2.5 focus:outline-none"
            aria-label="germanywithprakhar - Prakhar Rajput"
          >
            <div className="brand-logo-container relative h-10 w-10 sm:h-11 sm:w-11 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-1 overflow-hidden group-hover:border-cyan-400/40 transition-all shadow-sm">
              <img
                src="/logo.png"
                alt="germanywithprakhar Logo"
                className="brand-logo-img w-full h-full object-contain filter drop-shadow-sm group-hover:scale-105 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <span className="brand-title font-bold tracking-tight text-white text-base sm:text-lg transition-all">
                germany<span className="brand-accent text-cyan-400">with</span>prakhar
              </span>
              <span className="brand-subtitle text-[11px] text-gray-400 font-mono hidden md:block transition-colors">
                by Prakhar Rajput
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-slate-100/90 dark:bg-[#111420]/70 border border-slate-200 dark:border-white/[0.06] rounded-full px-3.5 py-1.5 backdrop-blur-md shadow-xs dark:shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white rounded-full hover:bg-slate-200/70 dark:hover:bg-white/[0.06] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Book CTA (Large Desktop) */}
          <div className="hidden xl:flex items-center gap-3">
            <a
              href={PERSONAL_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 border border-transparent hover:border-red-200 dark:hover:border-red-500/20 transition-all"
            >
              <Video className="w-3.5 h-3.5 text-red-500" />
              <span>YouTube</span>
            </a>

            {/* Theme Toggle (Desktop) */}
            <ThemeToggle id="nav-theme-toggle-desktop" />

            {/* Glowing CTA Button (Modern Layered Glassmorphic Tactile Elevation) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBookCallClick}
              id="nav-book-call-btn"
              className="relative group rounded-xl p-[1px] focus:outline-none focus:ring-2 focus:ring-indigo-500/60 cursor-pointer"
            >
              <span className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/30 to-cyan-500/30 rounded-xl blur-xs opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-900/90 dark:hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-2 backdrop-blur-md border border-slate-700/80 dark:border-white/20 shadow-md shadow-indigo-900/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] transition-all">
                <Calendar className="w-3.5 h-3.5 text-cyan-300 dark:text-cyan-400" />
                <span className="text-white font-semibold">Book a Call</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-1 group-hover:text-white transition-transform duration-200 ease-out" />
              </div>
            </motion.button>
          </div>

          {/* Mobile & Tablet Controls (< xl) */}
          <div className="flex xl:hidden items-center gap-2">
            {/* Theme Toggle (Mobile Header) */}
            <ThemeToggle id="nav-theme-toggle-mobile" />

            <button
              onClick={onBookCallClick}
              className="px-3.5 py-2 min-h-[40px] rounded-xl bg-indigo-600/90 hover:bg-indigo-600 dark:bg-indigo-600/85 dark:hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 backdrop-blur-md border border-white/25 dark:border-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-1.5 group cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Call</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 min-h-[40px] min-w-[40px] rounded-xl bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-white/10 active:bg-slate-200 flex items-center justify-center transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden mobile-drawer bg-white/95 dark:bg-[#0D0F18]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 overflow-hidden shadow-xl"
          >
            <div className="px-4 sm:px-6 py-5 space-y-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              {/* Brand Header inside Mobile Drawer */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                <a
                  href="#home"
                  onClick={() => setMobileMenuOpen(false)}
                  className="group flex items-center gap-2.5 focus:outline-none"
                  aria-label="germanywithprakhar - Prakhar Rajput"
                >
                  <div className="brand-logo-container relative h-9 w-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-1 overflow-hidden shadow-sm">
                    <img
                      src="/logo.png"
                      alt="germanywithprakhar Logo"
                      className="brand-logo-img w-full h-full object-contain filter drop-shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="brand-title font-bold text-sm tracking-tight text-white">
                      germany<span className="brand-accent text-cyan-400">with</span>prakhar
                    </span>
                    <span className="brand-subtitle text-[10px] text-gray-400 font-mono">
                      by Prakhar Rajput
                    </span>
                  </div>
                </a>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  CS @ Uni Bremen
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pb-4 border-b border-white/10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 rounded-xl text-sm font-medium text-gray-300 hover:text-white hover:bg-white/[0.08] active:bg-indigo-600/20 transition-colors flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>

              {/* Theme Toggle Switch Row */}
              <div className="pt-1">
                <ThemeToggle variant="switch" id="nav-theme-toggle-drawer" />
              </div>

              <div className="pt-1 flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onBookCallClick();
                  }}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 active:scale-[0.99] transition-transform"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a 1-on-1 Consultation</span>
                </button>
                <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-1 font-mono">
                  <span>University of Bremen, Germany</span>
                  <span className="text-emerald-400">● Open for Q2/Q3 slots</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

