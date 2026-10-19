import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  ShieldCheck, 
  Home, 
  GraduationCap, 
  ExternalLink, 
  BadgePercent,
  Download,
  FileText,
  Copy,
  Check,
  Tag
} from 'lucide-react';
import { TOOLKIT_RESOURCES } from '../data/siteData';

export const ResourcesToolkit: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = ['All', 'Finance & Banking', 'Health Insurance', 'Housing', 'Language & Academics', 'Tech Gear'];

  const filteredResources = selectedCategory === 'All'
    ? TOOLKIT_RESOURCES
    : TOOLKIT_RESOURCES.filter(r => r.category === selectedCategory);

  const showTechGearCta = selectedCategory === 'All' || selectedCategory === 'Tech Gear';

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="toolkit" className="relative py-24 bg-white dark:bg-[#090A0F] overflow-hidden border-t border-slate-200 dark:border-white/[0.04] transition-colors duration-200">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-300 mb-3 shadow-xs">
            <BadgePercent className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Curated Student Resources</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Student Toolkit
          </h2>

          <p className="text-slate-600 dark:text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed mb-8">
            Essential tools, trusted providers, and curated documentation to navigate your study and arrival in Germany.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-900/30 font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200 border border-slate-200 dark:bg-white/[0.04] dark:text-gray-400 dark:hover:text-white dark:hover:bg-white/[0.08] dark:border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredResources.map((item) => {
            const isExpatrio = item.id === 'expatrio';
            const targetUrl = isExpatrio ? 'https://www.expatrio.com?f=prakharr2' : item.affiliateUrl;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`group rounded-2xl bg-white dark:bg-[#0E111C]/90 border p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 shadow-sm hover:shadow-md relative ${
                  isExpatrio
                    ? 'border-indigo-200 dark:border-indigo-500/30 hover:border-indigo-400 dark:hover:border-indigo-400 shadow-indigo-950/5'
                    : 'border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/40 dark:hover:shadow-cyan-950/20'
                }`}
              >
                <div>
                  {/* Header with Icon and Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs ${
                      isExpatrio 
                        ? 'bg-indigo-50 dark:bg-indigo-500/15 border border-indigo-200 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                        : 'bg-cyan-50 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/[0.02] border border-cyan-200 dark:border-white/10 text-cyan-600 dark:text-cyan-400'
                    }`}>
                      {getIcon(item.iconName)}
                    </div>

                    {item.badge && (
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider ${
                        isExpatrio
                          ? 'bg-indigo-50 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-500/40'
                          : 'bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </div>

                  {/* Title & Category */}
                  <div className="mb-2">
                    <span className="text-[11px] font-mono text-slate-500 dark:text-gray-400 block mb-1">
                      {item.category}
                    </span>
                    <a
                      href={targetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-bold text-slate-900 dark:text-white tracking-tight hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-1.5 group/title"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/title:text-cyan-600 dark:group-hover/title:text-cyan-300 transition-colors" />
                    </a>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Key Student Benefit */}
                  <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-xs text-slate-700 dark:text-gray-300 mb-4">
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono block text-[11px] mb-0.5">
                      KEY STUDENT PERK:
                    </span>
                    <span className="text-slate-700 dark:text-gray-300 text-[11px]">{item.benefit}</span>
                  </div>
                </div>

                {/* Action Area: Referral Snippet (Expatrio) & Direct Link Button */}
                <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] space-y-3">
                  {/* Restored Expatrio Referral Code UI Snippet */}
                  {isExpatrio && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-dashed border-amber-300 dark:border-amber-500/40">
                      <div className="flex items-center gap-1.5 text-xs font-mono">
                        <Tag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                        <span className="text-slate-600 dark:text-gray-300 text-[11px]">
                          Code:
                        </span>
                        <span className="font-bold text-amber-700 dark:text-amber-300 font-mono tracking-wide">
                          prakharr2
                        </span>
                      </div>
                      <button
                        onClick={(e) => handleCopyCode('prakharr2', e)}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-amber-500/20 hover:bg-amber-100 dark:hover:bg-amber-500/30 text-[11px] font-mono text-amber-800 dark:text-amber-200 border border-amber-200 dark:border-amber-500/40 flex items-center gap-1 transition-all cursor-pointer shadow-xs active:scale-95"
                        title="Copy Expatrio referral code prakharr2"
                        aria-label="Copy Expatrio referral code prakharr2"
                      >
                        {copiedCode === 'prakharr2' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 text-amber-700 dark:text-amber-300" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}

                  {/* Dedicated Get Started / Action Link Button */}
                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={isExpatrio ? 'expatrio-get-started-btn' : `toolkit-link-${item.id}`}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm group/btn cursor-pointer ${
                      isExpatrio
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white shadow-md shadow-indigo-600/25'
                        : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/[0.06] dark:hover:bg-gradient-to-r dark:hover:from-cyan-600 dark:hover:to-indigo-600 border border-slate-700 dark:border-white/10 dark:hover:border-transparent'
                    }`}
                  >
                    <span>{isExpatrio ? 'Get Started on Expatrio' : 'Open Official Service'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-white/80 group-hover/btn:text-white transition-colors" />
                  </a>
                </div>
              </motion.div>
            );
          })}

          {/* Dedicated Tech Gear Overhaul CTA Card (Single clean card replacing individual product cards) */}
          {showTechGearCta && (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl bg-gradient-to-br from-white via-indigo-50/30 to-cyan-50/30 dark:from-[#0E111C]/95 dark:via-[#111629] dark:to-[#0D1322] border-2 border-indigo-200/80 dark:border-indigo-500/30 hover:border-indigo-400 dark:hover:border-indigo-400/60 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 shadow-md hover:shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />

              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500/40 flex items-center justify-center text-indigo-700 dark:text-indigo-400 group-hover:scale-105 transition-transform shadow-xs">
                    <FileText className="w-5 h-5" />
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-500/40">
                    Free PDF Guide
                  </span>
                </div>

                {/* Title & Category */}
                <div className="mb-2">
                  <span className="text-[11px] font-mono text-indigo-700 dark:text-indigo-300 font-semibold block mb-1">
                    Tech Gear &amp; Hardware
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                    Download My Complete Tech &amp; Gear List
                  </h3>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-gray-300 leading-relaxed mb-4">
                  The complete breakdown of laptops, monitors, noise-canceling headphones, EU travel adapters, and student ergonomics I personally use as a Computer Science student at the University of Bremen.
                </p>

                {/* Key Student Benefit */}
                <div className="p-2.5 rounded-lg bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-500/20 text-xs text-slate-700 dark:text-gray-300 mb-5">
                  <span className="text-indigo-700 dark:text-indigo-300 font-semibold font-mono block text-[11px] mb-0.5">
                    KEY STUDENT PERK:
                  </span>
                  <span className="text-slate-700 dark:text-gray-300 text-[11px]">
                    Direct Google Drive PDF guide with student discount portals and battery life tips for German lecture halls.
                  </span>
                </div>
              </div>

              {/* Action Area: Download CTA Button */}
              <div className="pt-4 border-t border-indigo-100 dark:border-white/[0.08]">
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="download-tech-gear-list-btn"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/25 group/btn cursor-pointer"
                >
                  <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                  <span>Download My Complete Tech &amp; Gear List</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-200 group-hover/btn:text-white transition-colors" />
                </a>
              </div>
            </motion.div>
          )}
        </div>

        {/* Informational Note */}
        <div className="mt-12 text-center text-xs font-mono text-slate-500 dark:text-gray-400 max-w-xl mx-auto p-3.5 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
          <span className="text-slate-700 dark:text-gray-300 font-semibold">Student Transparency:</span> I only recommend verified tools and institutional portals that I actively tested during my degree and relocation to Bremen.
        </div>
      </div>
    </section>
  );
};
