import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Sparkles, 
  RefreshCw, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Building2,
  Calendar,
  Layers,
  Zap,
  Info
} from 'lucide-react';
import { 
  FaqCategory, 
  FaqItem, 
  EVERGREEN_FAQS, 
  INITIAL_POLICY_UPDATES 
} from '../data/faqData';

interface FaqSectionProps {
  onBookCallClick: () => void;
}

type LayerFilter = 'all' | 'policy-update' | 'evergreen';

export const FaqSection: React.FC<FaqSectionProps> = ({ onBookCallClick }) => {
  const INITIAL_LIMIT = 5;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [layerFilter, setLayerFilter] = useState<LayerFilter>('all');
  const [openId, setOpenId] = useState<string | null>('adm-policy-1');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_LIMIT);
  
  // Live dynamic policy items loaded from /api/faq-updates with resilient fallback
  const [policyUpdates, setPolicyUpdates] = useState<FaqItem[]>(INITIAL_POLICY_UPDATES);
  const [lastSyncTime, setLastSyncTime] = useState<string>('August 2026');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const categories: (string)[] = ['All', 'Admissions', 'Visa & APS', 'Financial & Sperrkonto', 'Jobs & Tech'];

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setVisibleCount(INITIAL_LIMIT);
  };

  const handleLayerFilterChange = (filter: LayerFilter) => {
    setLayerFilter(filter);
    setVisibleCount(INITIAL_LIMIT);
  };

  // Fetch updates from the automated ingestion endpoint
  const fetchPolicyUpdates = async (forceRefresh: boolean = false) => {
    setIsSyncing(true);
    setSyncStatus('idle');
    try {
      const url = forceRefresh ? '/api/faq-updates?refresh=true' : '/api/faq-updates';
      const res = await fetch(url, {
        method: forceRefresh ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setPolicyUpdates(data.items);
          if (data.lastUpdated) {
            const date = new Date(data.lastUpdated);
            setLastSyncTime(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }));
          }
          setSyncStatus('success');
        }
      } else {
        setSyncStatus('idle');
      }
    } catch (err) {
      console.warn('API fetch error, keeping current verified dataset:', err);
      setSyncStatus('idle');
    } finally {
      setIsSyncing(false);
      setTimeout(() => setSyncStatus('idle'), 3500);
    }
  };

  useEffect(() => {
    fetchPolicyUpdates(false);
  }, []);

  // Combine Layer A and Layer B
  const allFaqs: FaqItem[] = [...policyUpdates, ...EVERGREEN_FAQS];

  // Filter based on category and layer
  const filteredFaqs = allFaqs.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesLayer = 
      layerFilter === 'all' 
        ? true 
        : layerFilter === 'policy-update' 
          ? item.layer === 'policy-update' 
          : item.layer === 'evergreen';
    return matchesCategory && matchesLayer;
  });

  // Display a maximum of 5 questions initially across all categories
  const displayedFaqs = filteredFaqs.slice(0, visibleCount);
  const hasMore = visibleCount < filteredFaqs.length;
  const remainingCount = filteredFaqs.length - visibleCount;

  const toggleAccordion = (id: string) => {
    setOpenId(prev => prev === id ? null : id);
  };

  const policyUpdateCount = policyUpdates.length;
  const evergreenCount = EVERGREEN_FAQS.length;

  return (
    <section id="faq" className="relative py-24 bg-[#090A0F] overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-cyan-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[250px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          {/* Prominent Visual Tag: ⚡ Dynamic Policy Tracker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-bold tracking-wide">⚡ Dynamic Policy Tracker</span>
            <span className="text-white/40">•</span>
            <span className="text-[11px] text-gray-400">DAAD, Auswärtiges Amt &amp; APS Directives</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Dual-layer intelligence hub: Evergreen university prerequisites paired with live, AI-monitored regulatory policy updates from Germany’s official immigration and academic portals.
          </p>
        </div>

        {/* Live Policy Tracker Status & Trigger Bar */}
        <div className="mb-8 p-4 rounded-2xl bg-[#0F121E] border border-cyan-500/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <span>Automated Regulatory Alignment</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Live Synced
                </span>
              </div>
              <p className="text-[11px] text-gray-400 mt-0.5">
                Monitoring DAAD, Make-it-in-Germany, Auswärtiges Amt &amp; APS notice boards. Last checked: <span className="text-gray-300 font-mono">{lastSyncTime}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={() => fetchPolicyUpdates(true)}
              disabled={isSyncing}
              className="px-3.5 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 text-xs font-mono flex items-center gap-2 transition-all disabled:opacity-50 shrink-0"
              title="Poll latest regulatory press releases via Gemini ingestion pipeline"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Scanning Portals...' : 'Sync Directives'}</span>
            </button>
            {syncStatus === 'success' && (
              <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Up to date</span>
              </span>
            )}
          </div>
        </div>

        {/* Dual-Layer Toggle & Category Filter Strip */}
        <div className="space-y-4 mb-8">
          
          {/* Layer Split Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleLayerFilterChange('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                layerFilter === 'all'
                  ? 'bg-white text-black shadow-md'
                  : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Questions ({policyUpdateCount + evergreenCount})</span>
            </button>

            <button
              onClick={() => handleLayerFilterChange('policy-update')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                layerFilter === 'policy-update'
                  ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20'
                  : 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20'
              }`}
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>⚡ Live Policy Updates ({policyUpdateCount})</span>
            </button>

            <button
              onClick={() => handleLayerFilterChange('evergreen')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                layerFilter === 'evergreen'
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-white/[0.03] text-gray-400 border border-white/10 hover:text-white'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Core Foundational ({evergreenCount})</span>
            </button>
          </div>

          {/* Core Categories: Admissions, Visa & APS, Financial & Sperrkonto, Jobs & Tech */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => {
              const count = allFaqs.filter(
                f => (cat === 'All' || f.category === cat) && 
                     (layerFilter === 'all' || f.layer === layerFilter)
              ).length;

              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-cyan-600/25 border border-cyan-400/30'
                      : 'bg-[#101322] text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/20'
                  }`}
                >
                  <span>{cat === 'Financial & Sperrkonto' ? 'Financial & Sperrkonto' : cat}</span>
                  <span className="ml-1.5 text-[10px] opacity-70 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Accordion List - Displaying initial 5 items with dynamic expansion */}
        <div className="space-y-3.5">
          {displayedFaqs.length === 0 ? (
            <div className="text-center py-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-gray-400">
              <p className="text-sm">No items found matching the selected category and filter combination.</p>
              <button 
                onClick={() => { handleCategoryChange('All'); handleLayerFilterChange('all'); }}
                className="mt-3 text-xs text-cyan-400 hover:underline font-mono"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            displayedFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              const isPolicyUpdate = faq.layer === 'policy-update';

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-200 ${
                    isOpen 
                      ? isPolicyUpdate
                        ? 'bg-[#0D1224] border-cyan-500/40 shadow-xl shadow-cyan-950/20'
                        : 'bg-[#0E111E] border-indigo-500/35 shadow-xl shadow-indigo-950/20'
                      : isPolicyUpdate
                        ? 'bg-[#0A0D18] border-cyan-500/20 hover:border-cyan-500/35'
                        : 'bg-[#0A0C14] border-white/[0.07] hover:border-white/15'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 pr-4">
                      <div className="flex items-center gap-2 shrink-0">
                        {isPolicyUpdate ? (
                          <span className="inline-flex items-center gap-1.5 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold shadow-sm shadow-cyan-500/10">
                            <Zap className="w-3 h-3 text-cyan-400 fill-current" />
                            <span>Verified Policy Update</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.08] text-gray-300">
                            Core Prerequisite
                          </span>
                        )}

                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.02] border border-white/[0.05] text-indigo-300">
                          {faq.category}
                        </span>
                      </div>

                      <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
                        {faq.question}
                      </span>
                    </div>

                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? (isPolicyUpdate ? 'rotate-180 text-cyan-400' : 'rotate-180 text-indigo-400') : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-gray-300 leading-relaxed border-t border-white/[0.04] space-y-3.5">
                          <p className="text-gray-300 leading-relaxed font-normal">
                            {faq.answer}
                          </p>

                          {/* Key Takeaway Highlight Box */}
                          {faq.keyTakeaway && (
                            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-2.5 text-xs">
                              <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <div>
                                <span className="font-semibold text-white">Direct Guidance: </span>
                                <span className="text-gray-300">{faq.keyTakeaway}</span>
                              </div>
                            </div>
                          )}

                          {/* Source & Timestamp Stamp for Policy Items */}
                          {isPolicyUpdate && (
                            <div className="pt-2 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-gray-400 border-t border-white/[0.04]">
                              <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                                <span className="text-cyan-300">{faq.timestamp || 'Updated: August 2026'}</span>
                              </div>
                              {faq.source && (
                                <div className="flex items-center gap-1.5">
                                  <span>Official Source:</span>
                                  {faq.source.url ? (
                                    <a
                                      href={faq.source.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-gray-300 hover:text-cyan-400 flex items-center gap-1 transition-colors underline decoration-white/20 underline-offset-2"
                                    >
                                      <span>{faq.source.name}</span>
                                      <ExternalLink className="w-3 h-3 text-gray-400" />
                                    </a>
                                  ) : (
                                    <span className="text-gray-300">{faq.source.name}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>

        {/* Prominent Pagination Controls: Expand to reveal remaining questions */}
        {hasMore && (
          <div className="mt-8 flex flex-col items-center justify-center">
            <button
              onClick={() => setVisibleCount(filteredFaqs.length)}
              id="load-more-faqs-btn"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#111528] via-[#161C36] to-[#1C1A38] hover:from-[#181E3B] hover:to-[#232047] border border-cyan-500/40 hover:border-cyan-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-3 transition-all shadow-xl shadow-cyan-950/40 hover:shadow-cyan-900/50 hover:scale-[1.01] cursor-pointer group"
            >
              <ChevronDown className="w-4 h-4 text-cyan-400 group-hover:translate-y-0.5 transition-transform" />
              <span>Load More Frequently Asked Questions</span>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold">
                +{remainingCount} more
              </span>
            </button>
            <span className="text-[11px] font-mono text-gray-400 mt-2.5">
              Showing initial 5 of {filteredFaqs.length} verified questions • Click to expand full policy &amp; core guide
            </span>
          </div>
        )}

        {!hasMore && filteredFaqs.length > INITIAL_LIMIT && (
          <div className="mt-6 text-center">
            <span className="text-[11px] font-mono text-gray-400 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.02] border border-white/[0.06]">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Showing all {filteredFaqs.length} questions across current filters
            </span>
          </div>
        )}

        {/* Still have questions CTA */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#0C0F1D] via-[#0F1428] to-[#14122C] border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left shadow-2xl">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-300 mb-2">
              <Sparkles className="w-3 h-3" />
              <span>Personalized Profile Evaluation</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">
              Have a nuanced question regarding your transcripts or visa status?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Cut through unverified social forum rumors. Book a 1-on-1 strategy consultation directly with Prakhar (CS @ University of Bremen) to audit your ECTS credits, APS dossier, and university list.
            </p>
          </div>
          <button
            onClick={onBookCallClick}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-600/30 hover:scale-[1.02] shrink-0"
          >
            Book Strategy Call
          </button>
        </div>

      </div>
    </section>
  );
};
