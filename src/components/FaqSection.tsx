import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Sparkles, 
  RefreshCw, 
  ExternalLink, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Building2,
  Calendar,
  Layers,
  Zap,
  Info,
  Search,
  Compass,
  Radio,
  BookOpen,
  Share2,
  Check,
  TrendingUp,
  Cpu,
  Plane,
  FileText
} from 'lucide-react';
import { 
  FaqCategory, 
  FaqItem, 
  CORE_JOURNEY_FAQS 
} from '../data/faqData';
import { 
  LiveNewsItem, 
  NewsCategory, 
  FALLBACK_LIVE_NEWS, 
  formatNewsTime 
} from '../data/newsData';

interface FaqSectionProps {
  onBookCallClick: () => void;
}

type ActiveSectionView = 'faq' | 'news' | 'both';

export const FaqSection: React.FC<FaqSectionProps> = ({ onBookCallClick }) => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<ActiveSectionView>('faq');

  // -------------------------------------------------------------
  // Section A: Core FAQ State
  // -------------------------------------------------------------
  const [selectedFaqCategory, setSelectedFaqCategory] = useState<string>('All');
  const [faqSearchQuery, setFaqSearchQuery] = useState<string>('');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['journey-1', 'travel-1']);
  const [visibleFaqCount, setVisibleFaqCount] = useState<number>(6);

  const faqCategories: (string)[] = [
    'All',
    'The Journey & Background',
    'Travel & Europe Life',
    'Tech & University of Bremen',
    'Admissions & Visas'
  ];

  const toggleFaq = (id: string) => {
    setOpenFaqIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleExpandAllFaqs = () => {
    setOpenFaqIds(filteredFaqs.map(f => f.id));
  };

  const handleCollapseAllFaqs = () => {
    setOpenFaqIds([]);
  };

  // -------------------------------------------------------------
  // Section B: Real-time News & Trending Updates State
  // -------------------------------------------------------------
  const [newsItems, setNewsItems] = useState<LiveNewsItem[]>(FALLBACK_LIVE_NEWS);
  const [selectedNewsCategory, setSelectedNewsCategory] = useState<string>('All');
  const [newsSearchQuery, setNewsSearchQuery] = useState<string>('');
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');
  const [isSyncingNews, setIsSyncingNews] = useState<boolean>(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'cached' | 'error'>('idle');
  const [copiedNewsId, setCopiedNewsId] = useState<string | null>(null);

  const newsCategories: string[] = [
    'All',
    'German Immigration & Policy',
    'Tech & AI Trends',
    'Student Life & Travel',
    'University & Career'
  ];

  // Dynamic Live Fetching Logic (fetch() on mount & on user click)
  const fetchLiveNewsUpdates = async (forceRefresh: boolean = false) => {
    setIsSyncingNews(true);
    setSyncStatus('idle');
    try {
      const url = forceRefresh ? '/api/live-news?refresh=true' : '/api/live-news';
      const res = await fetch(url, {
        method: forceRefresh ? 'POST' : 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.items && Array.isArray(data.items) && data.items.length > 0) {
          setNewsItems(data.items);
          if (data.lastUpdated) {
            const date = new Date(data.lastUpdated);
            setLastSyncTime(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));
          } else {
            setLastSyncTime('Just now');
          }
          setSyncStatus('success');
        } else {
          // Keep resilient fallback
          setSyncStatus('cached');
        }
      } else {
        // Fallback silently if rate-limited or error
        console.warn('Live news API responded with status', res.status, '- retaining fallback dataset.');
        setSyncStatus('cached');
      }
    } catch (err) {
      console.warn('Network error fetching real-time updates, utilizing verified offline cache:', err);
      setSyncStatus('cached');
    } finally {
      setIsSyncingNews(false);
      setTimeout(() => setSyncStatus('idle'), 4000);
    }
  };

  useEffect(() => {
    fetchLiveNewsUpdates(false);
  }, []);

  const handleCopyNewsLink = (item: LiveNewsItem, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.source.url || window.location.href);
    setCopiedNewsId(item.id);
    setTimeout(() => setCopiedNewsId(null), 2000);
  };

  // -------------------------------------------------------------
  // Filter Logic: Section A (Core FAQ)
  // -------------------------------------------------------------
  const filteredFaqs = CORE_JOURNEY_FAQS.filter((faq) => {
    const matchesCategory = selectedFaqCategory === 'All' || faq.category === selectedFaqCategory;
    const matchesSearch = 
      faqSearchQuery.trim() === '' ||
      faq.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
      (faq.tags && faq.tags.some(t => t.toLowerCase().includes(faqSearchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const displayedFaqs = filteredFaqs.slice(0, visibleFaqCount);
  const hasMoreFaqs = visibleFaqCount < filteredFaqs.length;

  // -------------------------------------------------------------
  // Filter Logic: Section B (Live News)
  // -------------------------------------------------------------
  const filteredNews = newsItems.filter((news) => {
    const matchesCategory = selectedNewsCategory === 'All' || news.category === selectedNewsCategory;
    const matchesSearch = 
      newsSearchQuery.trim() === '' ||
      news.title.toLowerCase().includes(newsSearchQuery.toLowerCase()) ||
      news.summary.toLowerCase().includes(newsSearchQuery.toLowerCase()) ||
      (news.tags && news.tags.some(t => t.toLowerCase().includes(newsSearchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const featuredNews = filteredNews.find(n => n.isBreaking) || filteredNews[0];
  const remainingNews = featuredNews 
    ? filteredNews.filter(n => n.id !== featuredNews.id)
    : filteredNews;

  return (
    <section id="faq" className="relative py-24 bg-[#08090E] overflow-hidden border-t border-white/[0.06]">
      {/* Background Ambience Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[380px] bg-gradient-to-br from-cyan-600/10 via-indigo-600/5 to-purple-600/5 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          
          {/* Visual Kicker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
            </span>
            <span className="font-bold tracking-wide">Journey with Prakhar</span>
            <span className="text-white/40">•</span>
            <span className="text-gray-300">Dual-Section Intelligence Hub</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Frequently Asked Questions &amp; Live News
          </h2>

          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Essential foundational knowledge on my journey, low-cost European travel, and computer science at the University of Bremen—paired with real-time, live-fetched regulatory directives and tech headlines.
          </p>
        </div>

        {/* Dual-Section Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#0F121F] border border-white/10 shadow-xl">
            
            {/* Tab: Section A (Core FAQ) */}
            <button
              onClick={() => setActiveView('faq')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer ${
                activeView === 'faq'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Section A: Core FAQ</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/10 text-gray-200">
                {CORE_JOURNEY_FAQS.length}
              </span>
            </button>

            {/* Tab: Section B ('What's Cutting Edge / Today's News') */}
            <button
              onClick={() => setActiveView('news')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2.5 cursor-pointer relative ${
                activeView === 'news'
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-600/30 font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              <Radio className={`w-4 h-4 ${activeView === 'news' ? 'text-white' : 'text-cyan-400'}`} />
              <span>Section B: Today&apos;s News</span>
              
              {/* LIVE badge indicator */}
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400"></span>
                </span>
                LIVE
              </span>
            </button>

            {/* Tab: Dual Grid View (Side by Side) */}
            <button
              onClick={() => setActiveView('both')}
              className={`hidden md:flex px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all items-center gap-2 cursor-pointer ${
                activeView === 'both'
                  ? 'bg-white text-black shadow-lg font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/[0.04]'
              }`}
              title="View both sections side-by-side"
            >
              <Layers className="w-4 h-4" />
              <span>Dual Grid</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: SECTION A (CORE FAQ)                                              */}
        {/* ========================================================================= */}
        {(activeView === 'faq' || activeView === 'both') && (
          <div className={`${activeView === 'both' ? 'mb-16 border-b border-white/10 pb-16' : ''}`}>
            
            {/* Section A Title Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 bg-[#0E111E] border border-white/[0.08] p-5 rounded-2xl shadow-xl">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold mb-1">
                  <BookOpen className="w-4 h-4" />
                  <span>SECTION A · CORE FOUNDATIONS</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Standard FAQ: Journey, Travel, Tech &amp; Background
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                  Comprehensive, verified answers to common questions about moving to Germany, university studies, and travel.
                </p>
              </div>

              {/* Expand / Collapse All Controls */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleExpandAllFaqs}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
                >
                  Expand All
                </button>
                <button
                  onClick={handleCollapseAllFaqs}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 text-xs font-mono transition-colors"
                >
                  Collapse All
                </button>
              </div>
            </div>

            {/* Filter and Search Bar for Section A */}
            <div className="space-y-4 mb-8">
              
              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2">
                {faqCategories.map((cat) => {
                  const count = CORE_JOURNEY_FAQS.filter(
                    f => cat === 'All' || f.category === cat
                  ).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => { setSelectedFaqCategory(cat); setVisibleFaqCount(6); }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        selectedFaqCategory === cat
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30 border border-blue-400/40 font-semibold'
                          : 'bg-[#101322] text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="ml-1.5 text-[10px] font-mono opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Box */}
              <div className="max-w-xl mx-auto relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={faqSearchQuery}
                  onChange={(e) => setFaqSearchQuery(e.target.value)}
                  placeholder="Search questions on journey, Bremen CS, budget travel, visas..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D101C] border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
                {faqSearchQuery && (
                  <button
                    onClick={() => setFaqSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3.5">
              {displayedFaqs.length === 0 ? (
                <div className="text-center py-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-gray-400">
                  <p className="text-sm">No matching questions found.</p>
                  <button 
                    onClick={() => { setSelectedFaqCategory('All'); setFaqSearchQuery(''); }}
                    className="mt-3 text-xs text-cyan-400 hover:underline font-mono"
                  >
                    Reset FAQ Filters
                  </button>
                </div>
              ) : (
                displayedFaqs.map((faq) => {
                  const isOpen = openFaqIds.includes(faq.id);

                  return (
                    <div
                      key={faq.id}
                      className={`rounded-2xl border transition-all duration-200 ${
                        isOpen 
                          ? 'bg-[#0E1222] border-indigo-500/35 shadow-xl shadow-indigo-950/20'
                          : 'bg-[#0A0C16] border-white/[0.07] hover:border-white/15'
                      }`}
                    >
                      <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer"
                        aria-expanded={isOpen}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3.5 pr-4">
                          {/* Category Marker - Zero-pill clean text discipline */}
                          <div className="flex items-center gap-2 shrink-0 text-xs font-mono text-cyan-300">
                            <span>{faq.category}</span>
                            <span className="text-white/20">/</span>
                          </div>

                          <span className="text-sm sm:text-base font-semibold text-white tracking-tight">
                            {faq.question}
                          </span>
                        </div>

                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 shrink-0 ${
                            isOpen ? 'rotate-180 text-cyan-400' : ''
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

                              {/* Key Takeaway Box */}
                              {faq.keyTakeaway && (
                                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-cyan-500/20 flex items-start gap-2.5 text-xs text-gray-300">
                                  <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                                  <div>
                                    <span className="font-semibold text-white">Direct Guidance: </span>
                                    <span>{faq.keyTakeaway}</span>
                                  </div>
                                </div>
                              )}

                              {/* Tags */}
                              {faq.tags && faq.tags.length > 0 && (
                                <div className="flex items-center gap-2 pt-1 text-xs text-gray-500 font-mono">
                                  <span>Topics:</span>
                                  <span>{faq.tags.join(' · ')}</span>
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

            {/* Load More FAQs Button */}
            {hasMoreFaqs && (
              <div className="mt-8 flex flex-col items-center justify-center">
                <button
                  onClick={() => setVisibleFaqCount(filteredFaqs.length)}
                  className="px-6 py-3 rounded-xl bg-[#111528] hover:bg-[#181E38] border border-cyan-500/30 hover:border-cyan-400 text-white font-semibold text-xs sm:text-sm flex items-center gap-2.5 transition-all shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <ChevronDown className="w-4 h-4 text-cyan-400" />
                  <span>Show All Core Questions</span>
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                    +{filteredFaqs.length - visibleFaqCount} more
                  </span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: SECTION B ('WHAT'S CUTTING EDGE / TODAY'S NEWS')                   */}
        {/* ========================================================================= */}
        {(activeView === 'news' || activeView === 'both') && (
          <div className="mt-4">
            
            {/* Live News Status Banner & Refresh Trigger Bar */}
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#0C0F1E] via-[#0E1326] to-[#121128] border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5 sm:mt-0">
                  <Radio className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 text-xs font-bold text-white mb-1">
                    <span className="text-sm font-extrabold tracking-tight">SECTION B · WHAT&apos;S CUTTING EDGE / TODAY&apos;S NEWS</span>
                    
                    {/* Visual Badge: LIVE */}
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                      </span>
                      LIVE FEED
                    </span>

                    {/* Visual Badge: UPDATED TODAY */}
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                      UPDATED TODAY
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Real-time updates pulled from official German government portals, DAAD, European tech publications &amp; Schengen immigration desks.
                  </p>
                </div>
              </div>

              {/* Action Controls: Refresh Updates Button */}
              <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                <div className="text-[11px] font-mono text-gray-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Synced: {lastSyncTime}</span>
                </div>

                <button
                  onClick={() => fetchLiveNewsUpdates(true)}
                  disabled={isSyncingNews}
                  id="refresh-news-updates-btn"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-black hover:text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 cursor-pointer shrink-0"
                  title="Trigger real-time fetch to refresh trending news feed"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isSyncingNews ? 'animate-spin' : ''}`} />
                  <span>{isSyncingNews ? 'Polling Feeds...' : 'Refresh Updates'}</span>
                </button>
              </div>
            </div>

            {/* Filter and Search Bar for Section B */}
            <div className="space-y-4 mb-8">
              
              {/* News Category Filter Buttons */}
              <div className="flex flex-wrap items-center justify-start sm:justify-center gap-2">
                {newsCategories.map((cat) => {
                  const count = newsItems.filter(
                    n => cat === 'All' || n.category === cat
                  ).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedNewsCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                        selectedNewsCategory === cat
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold shadow-md shadow-cyan-500/20 border border-cyan-400'
                          : 'bg-[#101322] text-gray-400 border border-white/[0.08] hover:text-white hover:border-white/20'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="ml-1.5 text-[10px] font-mono opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>

              {/* News Search Box */}
              <div className="max-w-xl mx-auto relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={newsSearchQuery}
                  onChange={(e) => setNewsSearchQuery(e.target.value)}
                  placeholder="Filter news by topic (Sperrkonto, Werkstudent, Blue Card, Spain...)"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0D101C] border border-white/10 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
                {newsSearchQuery && (
                  <button
                    onClick={() => setNewsSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            {/* Breaking / Featured News Card at the Top */}
            {featuredNews && (
              <div className="mb-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-[#101426] via-[#141A33] to-[#0D1120] border-2 border-cyan-500/40 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/15 transition-colors" />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center gap-1.5 animate-pulse">
                        <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
                        FEATURED DIRECTIVE
                      </span>
                      <span className="text-xs font-mono text-cyan-300">
                        {featuredNews.category}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-gray-400 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      <span>{formatNewsTime(featuredNews.publishedAt)}</span>
                    </div>
                  </div>

                  <h4 className="text-lg sm:text-2xl font-extrabold text-white mb-3 tracking-tight group-hover:text-cyan-300 transition-colors">
                    {featuredNews.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4 max-w-4xl">
                    {featuredNews.summary}
                  </p>

                  {featuredNews.keyTakeaway && (
                    <div className="mb-4 p-3 rounded-xl bg-white/[0.03] border border-cyan-500/20 text-xs text-gray-300 flex items-start gap-2.5">
                      <Zap className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 fill-current" />
                      <div>
                        <span className="font-semibold text-white">Direct Impact: </span>
                        <span>{featuredNews.keyTakeaway}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2 text-gray-400">
                      <span>Source:</span>
                      <span className="text-gray-200 font-semibold">{featuredNews.source.name}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={(e) => handleCopyNewsLink(featuredNews, e)}
                        className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                        title="Copy article link"
                      >
                        {copiedNewsId === featuredNews.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5 text-gray-400" />
                            <span>Share</span>
                          </>
                        )}
                      </button>

                      <a
                        href={featuredNews.source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                      >
                        <span>Read Source Article</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid of Remaining News Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {remainingNews.map((news) => (
                <div
                  key={news.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0B0D18] border border-white/[0.08] hover:border-cyan-500/35 transition-all shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between group"
                >
                  <div>
                    {/* Metadata Header */}
                    <div className="flex items-center justify-between text-xs font-mono mb-2.5">
                      <span className="text-cyan-400 font-medium">
                        {news.category}
                      </span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatNewsTime(news.publishedAt)}
                      </span>
                    </div>

                    <h5 className="text-base font-bold text-white mb-2.5 tracking-tight group-hover:text-cyan-300 transition-colors">
                      {news.title}
                    </h5>

                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                      {news.summary}
                    </p>
                  </div>

                  <div>
                    {news.keyTakeaway && (
                      <div className="mb-3.5 p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.06] text-[11px] text-gray-300 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{news.keyTakeaway}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.05] text-xs font-mono">
                      <span className="text-gray-400 truncate max-w-[180px]">
                        {news.source.name}
                      </span>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleCopyNewsLink(news, e)}
                          className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
                          title="Copy link"
                        >
                          {copiedNewsId === news.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <a
                          href={news.source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors underline decoration-cyan-500/30 underline-offset-2"
                        >
                          <span>Official Portal</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="text-center py-12 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-gray-400">
                <p className="text-sm">No live news items found matching your filter criteria.</p>
                <button
                  onClick={() => { setSelectedNewsCategory('All'); setNewsSearchQuery(''); }}
                  className="mt-3 text-xs text-cyan-400 hover:underline font-mono"
                >
                  Reset News Filters
                </button>
              </div>
            )}
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
              Have a specific question regarding your German university journey?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Cut through unverified social forum rumors. Book a 1-on-1 strategy consultation directly with Prakhar (CS @ University of Bremen) to audit your ECTS credits, APS dossier, and university list.
            </p>
          </div>
          <button
            onClick={onBookCallClick}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-lg shadow-cyan-600/30 hover:scale-[1.02] shrink-0 cursor-pointer"
          >
            Book Strategy Call
          </button>
        </div>

      </div>
    </section>
  );
};
