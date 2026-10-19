import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  ShieldCheck, 
  Landmark, 
  Home, 
  GraduationCap, 
  Laptop, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  Tag, 
  BadgePercent 
} from 'lucide-react';
import { TOOLKIT_RESOURCES } from '../data/siteData';
import { ToolkitResource } from '../types';

export const ResourcesToolkit: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const categories = ['All', 'Finance & Banking', 'Health Insurance', 'Housing', 'Language & Academics', 'Tech Gear'];

  const filteredResources = selectedCategory === 'All'
    ? TOOLKIT_RESOURCES
    : TOOLKIT_RESOURCES.filter(r => r.category === selectedCategory);

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
      case 'Landmark': return <Landmark className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Laptop': return <Laptop className="w-5 h-5" />;
      default: return <Tag className="w-5 h-5" />;
    }
  };

  return (
    <section id="toolkit" className="relative py-24 bg-white dark:bg-[#090A0F] overflow-hidden border-t border-slate-200 dark:border-white/[0.04] transition-colors duration-200">
      {/* Glow */}
      <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-cyan-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-xs font-mono text-cyan-700 dark:text-cyan-300 mb-3 shadow-xs">
            <BadgePercent className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
            <span>Curated Recommendations</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Student Toolkit
          </h2>

          <p className="text-slate-600 dark:text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed mb-8">
            The exact tools, websites, and services I use and recommend for international students.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
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

        {/* Affiliate-Optimized Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group rounded-2xl bg-white dark:bg-[#0E111C]/90 border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/40 p-6 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 shadow-sm hover:shadow-md dark:hover:shadow-cyan-950/20 relative"
            >
              <div>
                {/* Header with Icon and Badge */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-cyan-50 dark:bg-gradient-to-br dark:from-white/10 dark:to-white/[0.02] border border-cyan-200 dark:border-white/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-105 transition-transform shadow-xs">
                    {getIcon(item.iconName)}
                  </div>

                  {item.badge && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-50 dark:bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-500/30">
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
                    href={item.affiliateUrl}
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
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-xs text-slate-700 dark:text-gray-300 mb-5">
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono block text-[11px] mb-0.5">
                    KEY STUDENT PERK:
                  </span>
                  <span className="text-slate-700 dark:text-gray-300 text-[11px]">{item.benefit}</span>
                </div>
              </div>

              {/* Action Area: Promo Code & Direct Link */}
              <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
                {item.discountCode && (
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-black/50 border border-dashed border-slate-300 dark:border-white/20">
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <Tag className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                      <span className="text-slate-500 dark:text-gray-400 text-[11px]">
                        {item.id === 'expatrio' ? 'Referral Code:' : 'Code:'}
                      </span>
                      <span className="font-bold text-amber-700 dark:text-amber-300 font-mono tracking-wide">{item.discountCode}</span>
                    </div>
                    <button
                      onClick={(e) => handleCopyCode(item.discountCode!, e)}
                      className="px-2.5 py-1 rounded bg-slate-200 hover:bg-slate-300 dark:bg-white/10 dark:hover:bg-white/20 text-[10px] font-mono text-slate-800 dark:text-white flex items-center gap-1 transition-colors cursor-pointer"
                      title={item.id === 'expatrio' ? 'Copy Expatrio referral code' : 'Copy promo code'}
                    >
                      {copiedCode === item.discountCode ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                <a
                  href={item.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white/[0.06] dark:hover:bg-gradient-to-r dark:hover:from-cyan-600 dark:hover:to-indigo-600 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 dark:border-white/10 dark:hover:border-transparent transition-all shadow-sm group/btn"
                >
                  <span>{item.id === 'expatrio' ? 'Open Expatrio with Referral' : 'Open Official Service'}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover/btn:text-white transition-colors" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Affiliate Transparency Disclaimer */}
        <div className="mt-12 text-center text-xs font-mono text-gray-400 max-w-xl mx-auto p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
          <span className="text-gray-300 font-semibold">Affiliate Disclosure:</span> Some partner links provide special student perks or fee waivers at no extra cost to you. I only list tools I personally evaluated and used for my degree in Bremen.
        </div>
      </div>
    </section>
  );
};
