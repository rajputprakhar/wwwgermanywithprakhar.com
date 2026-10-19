import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Play, CheckCircle2, Sparkles, ArrowRight, ShieldCheck, Instagram, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/siteData';

interface HeroProps {
  onBookCallClick: () => void;
  onWatchVideoClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookCallClick, onWatchVideoClick }) => {
  const headshotUrl = '/image-for-website.jpg';

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Ambient background lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Column: Copy & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Status Pill - Clean & Minimal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/5 dark:bg-white/[0.04] border border-slate-300 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-gray-300 mb-6 backdrop-blur-md shadow-sm"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-800 dark:text-gray-200 font-medium">CS Student @ Uni Bremen</span>
              <span className="text-slate-400 dark:text-gray-600">•</span>
              <span className="text-cyan-700 dark:text-cyan-400 font-semibold">Admissions &amp; Visa Mentor</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-6">
              Your Gateway to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400">
                Studying &amp; Succeeding in Germany.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-700 dark:text-gray-300 font-normal leading-relaxed max-w-2xl mb-8">
              Simplifying your journey to German higher education: direct, honest guidance on university admissions, APS &amp; visa protocols, and flourishing as an international tech student.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-10">
              {/* Primary CTA */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onBookCallClick}
                id="hero-primary-book-btn"
                className="relative group overflow-hidden rounded-xl p-[1.5px] focus:outline-none"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl blur-[3px] opacity-80 group-hover:opacity-100 transition-opacity" />
                <div className="relative px-7 py-3.5 rounded-[10.5px] bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-indigo-600/30 group-hover:shadow-indigo-500/50 transition-all">
                  <Calendar className="w-4 h-4 text-cyan-200" />
                  <span>Book a Consultation</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.button>

              {/* Secondary CTA: Watch My Latest Video (Optimized for Light & Dark mode contrast) */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onWatchVideoClick}
                id="hero-secondary-video-btn"
                className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-300 hover:border-slate-400 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] dark:border-white/20 dark:hover:border-white/30 dark:text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-sm"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400 shadow-xs shrink-0">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <span className="font-bold text-slate-900 dark:text-white">Watch my Latest Video</span>
              </motion.button>
            </div>

            {/* Micro Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-3 gap-x-6 pt-6 border-t border-slate-200 dark:border-white/[0.08] w-full max-w-xl text-xs text-slate-700 dark:text-gray-400 font-mono">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="font-medium text-slate-800 dark:text-gray-300">APS &amp; Uni Verification</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="font-medium text-slate-800 dark:text-gray-300">Fluent German (C1)</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-700 dark:text-cyan-400 shrink-0" />
                <span className="font-medium text-slate-800 dark:text-gray-300">Direct Peer Mentorship</span>
              </div>
            </div>

            {/* Telegram Community Quick Access */}
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://t.me/+29XqTd_d_E8yNGZl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-sky-50 dark:bg-sky-500/10 hover:bg-sky-100 dark:hover:bg-sky-500/20 border border-sky-300 dark:border-sky-500/30 text-xs font-mono text-sky-800 dark:text-sky-300 transition-all shadow-xs"
              >
                <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
                <span className="font-medium">Join Free Telegram Community →</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Founder Portrait Card & Watch Latest Video Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative flex flex-col justify-center items-center"
          >
            {/* Soft Ambient Glow backdrop */}
            <div className="absolute w-72 sm:w-84 h-72 sm:h-84 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

            {/* Main Portrait Card Container - Directly links to Instagram */}
            <a
              id="hero-founder-photo-link"
              href={PERSONAL_INFO.socials.brandInstagram}
              target="_blank"
              rel="noopener noreferrer"
              title="Click to visit Prakhar's Instagram (@germanywithprakhar)"
              aria-label="Visit Prakhar Rajput on Instagram @germanywithprakhar"
              className="relative z-10 block w-72 sm:w-84 rounded-2xl p-1.5 bg-white dark:bg-white/5 backdrop-blur-xl shadow-xl dark:shadow-2xl border border-slate-200 dark:border-white/10 hover:border-pink-500/50 hover:shadow-pink-900/20 transition-all duration-300 group cursor-pointer"
            >
              <div className="relative rounded-xl overflow-hidden bg-[#0C0E17]">
                {/* Headshot Image */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0C14]">
                  <img
                    src={headshotUrl}
                    alt="Prakhar Rajput - germanywithprakhar"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.indexOf('image%20for%20website.jpg') === -1 && target.src.indexOf('image for website.jpg') === -1) {
                        target.src = '/image for website.jpg';
                      }
                    }}
                  />
                  
                  {/* Subtle lighting vignette overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090A0F]/90 via-transparent to-black/20 pointer-events-none" />

                  {/* Top-right Instagram badge on photo */}
                  <div className="brand-handle-badge absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white flex items-center gap-1.5 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:border-transparent transition-all shadow-md">
                    <Instagram className="w-3 h-3 text-pink-400 group-hover:text-white transition-colors" />
                    <span>@germanywithprakhar</span>
                  </div>

                  {/* Bottom Card Identity Info */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 group-hover:border-white/25 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
                          Prakhar Rajput
                          <span className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold" title="Verified Creator & Mentor">✓</span>
                        </div>
                        <div className="text-[11px] text-gray-300 font-mono">BSc Computer Science</div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-mono text-pink-400 group-hover:text-pink-300 flex items-center justify-end gap-1">
                          Instagram <ArrowUpRight className="w-2.5 h-2.5" />
                        </span>
                        <div className="text-[10px] text-gray-400 font-mono">@germanywithprakhar</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </a>

            {/* High-Contrast "Watch My Latest Video" Banner / Card */}
            <motion.div
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={onWatchVideoClick}
              id="hero-latest-video-banner-card"
              role="button"
              tabIndex={0}
              className="relative z-10 mt-3.5 w-72 sm:w-84 p-3 rounded-2xl bg-white dark:bg-[#0D101C] border border-slate-300 dark:border-white/15 shadow-md hover:shadow-lg dark:shadow-xl dark:hover:border-red-500/40 transition-all flex items-center justify-between gap-3 cursor-pointer group/vid"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/30 group-hover/vid:scale-105 transition-transform shrink-0">
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-900 dark:text-white group-hover/vid:text-red-600 dark:group-hover:text-red-400 transition-colors leading-tight">
                    Watch My Latest Video
                  </div>
                  <div className="text-[11px] text-slate-600 dark:text-gray-400 font-mono mt-0.5">
                    Life in Germany &amp; Uni Bremen
                  </div>
                </div>
              </div>
              <span className="px-2 py-1 rounded-md text-[10px] font-mono font-bold bg-red-50 dark:bg-red-500/15 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/30 shrink-0">
                PLAY
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
