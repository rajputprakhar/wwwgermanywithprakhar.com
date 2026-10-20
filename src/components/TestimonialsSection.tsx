import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  GraduationCap, 
  CheckCircle2, 
  Quote, 
  Sparkles, 
  Building2, 
  Award, 
  Clock, 
  ArrowUpRight, 
  ArrowRight,
  Play, 
  Pause, 
  MapPin, 
  Calendar,
  X,
  FileCheck2,
  TrendingUp,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { TESTIMONIALS, PERSONAL_INFO } from '../data/siteData';
import { Testimonial } from '../types';

interface TestimonialsSectionProps {
  onBookCallClick: () => void;
}

type CategoryFilter = 'all' | 'tu9' | 'cs-ai' | 'aps-visa' | 'engineering';

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ onBookCallClick }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [selectedStory, setSelectedStory] = useState<Testimonial | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);

  // Filtered stories
  const filteredStories = TESTIMONIALS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  // Check scroll capability and calculate progress
  const updateScrollState = useCallback(() => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);

    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress((scrollLeft / maxScroll) * 100);
      
      // Approximate active card index
      const cardWidth = 380; // approximate width of card + gap
      const newIndex = Math.min(
        filteredStories.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );
      setActiveIndex(newIndex);
    }
  }, [filteredStories.length]);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener('scroll', updateScrollState);
  }, [updateScrollState, activeCategory]);

  // Handle scroll left / right
  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return;
    const scrollAmount = sliderRef.current.clientWidth * 0.75;
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  // Scroll to specific index
  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.querySelectorAll('.testimonial-card');
    if (cards[index]) {
      cards[index].scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'start'
      });
    }
  };

  // Auto-play horizontal slider interval
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      if (isHoveredRef.current || !sliderRef.current) return;
      
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (scrollLeft + clientWidth >= scrollWidth - 15) {
        // Rewind to beginning smoothly
        sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        scroll('right');
      }
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const categories: { label: string; value: CategoryFilter; count: number }[] = [
    { label: 'All Stories', value: 'all', count: TESTIMONIALS.length },
    { label: 'TU9 & Elite Universities', value: 'tu9', count: TESTIMONIALS.filter(t => t.category === 'tu9').length },
    { label: 'CS & AI Masters', value: 'cs-ai', count: TESTIMONIALS.filter(t => t.category === 'cs-ai').length },
    { label: 'APS & Visa Fast-Track', value: 'aps-visa', count: TESTIMONIALS.filter(t => t.category === 'aps-visa').length },
    { label: 'Robotics & Engineering', value: 'engineering', count: TESTIMONIALS.filter(t => t.category === 'engineering').length },
  ];

  return (
    <section 
      id="testimonials" 
      className="py-24 relative overflow-hidden bg-[#08090D] border-t border-white/[0.06]"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-indigo-900/15 via-cyan-900/15 to-transparent blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-600/5 blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Verified Student Admits & Mentorship Stories</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Success Stories from <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-indigo-400">
                German University Applicants
              </span>
            </h2>
            <p className="mt-3 text-gray-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              Real international students who landed admissions at tuition-free public universities across Germany (TU Munich, RWTH Aachen, Uni Bremen, KIT, TU Berlin) through tailored 1-on-1 strategy sessions.
            </p>
          </div>

          {/* Social Proof Mini Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#101422]/70 border border-white/10 rounded-2xl p-4 backdrop-blur-md self-start md:self-auto shrink-0 shadow-lg shadow-black/40">
            <div className="border-r border-white/10 pr-4">
              <div className="text-2xl font-bold text-white font-mono flex items-center gap-1">
                <span>150+</span>
              </div>
              <div className="text-xs text-gray-400">Mentored Students</div>
            </div>
            <div className="border-r border-white/10 pr-4">
              <div className="text-2xl font-bold text-emerald-400 font-mono">
                €0
              </div>
              <div className="text-xs text-gray-400">Tuition Public Admits</div>
            </div>
            <div className="col-span-2 sm:col-span-1 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10 sm:border-transparent">
              <div className="text-2xl font-bold text-amber-400 font-mono flex items-center gap-1">
                <span>4.98</span>
                <Star className="w-4 h-4 fill-amber-400 text-amber-400 inline" />
              </div>
              <div className="text-xs text-gray-400">Topmate Rating</div>
            </div>
          </div>
        </div>

        {/* Filter Pills & Slider Controls Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-white/[0.06]">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => {
                  setActiveCategory(cat.value);
                  if (sliderRef.current) {
                    sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                  }
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-cyan-500 text-black font-semibold shadow-lg shadow-cyan-500/20'
                    : 'bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.05]'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeCategory === cat.value ? 'bg-black/20 text-black' : 'bg-white/10 text-gray-300'
                }`}>
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Slider Navigation Buttons & Autoplay Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2 rounded-xl text-xs flex items-center gap-1.5 transition-colors border cursor-pointer ${
                isAutoPlaying 
                  ? 'bg-white/[0.04] border-white/10 text-cyan-400 hover:bg-white/10' 
                  : 'bg-white/[0.02] border-white/5 text-gray-500 hover:text-gray-300'
              }`}
              title={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span className="text-[11px] font-mono hidden md:inline">{isAutoPlaying ? 'Auto' : 'Paused'}</span>
            </button>

            <div className="h-4 w-px bg-white/10 mx-1 hidden sm:block" />

            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                canScrollLeft 
                  ? 'bg-[#151928] border-white/15 text-white hover:bg-white/15 hover:border-cyan-400/40 active:scale-95' 
                  : 'bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-40'
              }`}
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                canScrollRight 
                  ? 'bg-[#151928] border-white/15 text-white hover:bg-white/15 hover:border-cyan-400/40 active:scale-95' 
                  : 'bg-white/[0.02] border-white/5 text-gray-600 cursor-not-allowed opacity-40'
              }`}
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Horizontal Slider Track Container */}
        <div
          ref={sliderRef}
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; }}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 no-scrollbar focus:outline-none"
          tabIndex={0}
          role="region"
          aria-label="Student testimonials slider"
        >
          {filteredStories.map((story, index) => {
            const isFeatured = index === 0;

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className={`testimonial-card shrink-0 w-[320px] sm:w-[380px] lg:w-[420px] snap-start flex flex-col justify-between rounded-2xl bg-gradient-to-b from-[#121626] to-[#0A0D16] border transition-all duration-300 p-6 sm:p-7 relative group cursor-pointer hover:-translate-y-1 ${
                  isFeatured 
                    ? 'border-cyan-500/30 hover:border-cyan-400 shadow-xl shadow-cyan-950/20' 
                    : 'border-white/[0.08] hover:border-white/25 hover:shadow-2xl hover:shadow-black/70'
                }`}
                onClick={() => setSelectedStory(story)}
              >
                {/* Subtle top gradient accent on hover */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-2xl" />

                {/* Card Top: Target University & Admit Badge */}
                <div>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        {story.admitBadge || 'Admit Confirmed'}
                      </span>
                      {story.intake && (
                        <span className="text-[11px] font-mono text-gray-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                          {story.intake}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-0.5 text-amber-400 bg-amber-400/10 px-2 py-1 rounded-lg border border-amber-400/20">
                      {[...Array(story.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>

                  {/* University & Course Name */}
                  <div className="mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-cyan-300 font-mono mb-1">
                      <Building2 className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{story.university}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                      {story.degree}
                    </h3>
                  </div>

                  {/* German Grade & Key Milestone Chip */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {story.germanGrade && (
                      <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                        Grade: {story.germanGrade}
                      </span>
                    )}
                    {story.keyWin && (
                      <span className="text-[11px] font-mono text-gray-300 bg-white/[0.05] border border-white/10 px-2 py-0.5 rounded truncate max-w-[220px]">
                        ★ {story.keyWin}
                      </span>
                    )}
                  </div>

                  {/* Quote Content */}
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-white/[0.06] absolute -top-3 -left-2 pointer-events-none group-hover:text-cyan-500/15 transition-colors" />
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed relative z-10 italic">
                      "{story.quote}"
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Student Info & Deep Dive Link */}
                <div className="pt-4 border-t border-white/[0.07] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={story.avatar}
                        alt={story.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white/15 group-hover:border-cyan-400/60 transition-colors"
                        loading="lazy"
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0A0D16] flex items-center justify-center">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white group-hover:text-cyan-100 transition-colors">
                        {story.name}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span>{story.homeCity ? `${story.homeCity}, ` : ''}{story.country}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedStory(story);
                    }}
                    className="p-2 rounded-xl bg-white/[0.04] text-gray-400 group-hover:text-white group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 border border-white/[0.06] transition-all cursor-pointer"
                    title="View success story breakdown"
                  >
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Progress Bar & Dot Indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
          <div className="flex items-center gap-1.5">
            {filteredStories.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'w-8 bg-cyan-400 shadow-md shadow-cyan-400/30'
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Jump to story ${i + 1}`}
              />
            ))}
          </div>

          <div className="w-full sm:w-48 h-1 bg-white/[0.08] rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-500 rounded-full transition-all duration-150"
              style={{ width: `${Math.max(12, scrollProgress)}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 font-mono">
            Showing {filteredStories.length} of {TESTIMONIALS.length} verified admission stories
          </p>
        </div>

        {/* Call To Action Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-[#121628] via-[#101935] to-[#151028] border border-cyan-500/20 p-8 sm:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-96 h-full bg-radial-gradient opacity-40 pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-mono mb-2 uppercase tracking-wide">
                <Compass className="w-3.5 h-3.5" />
                <span>Next Application Cycle: Winter 2026 / Summer 2027</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                Ready to Be the Next German University Success Story?
              </h3>
              <p className="mt-2 text-gray-300 text-sm sm:text-base leading-relaxed">
                Skip expensive agents and generic agencies charging thousands. Book a direct 1-on-1 strategy call with Prakhar for genuine university shortlisting, ECTS matching, and visa guidance.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <button
                onClick={onBookCallClick}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-black font-bold text-sm sm:text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Book 1-on-1 Strategy Call</span>
                <ArrowUpRight className="w-4 h-4 text-black" />
              </button>
              <a
                href="#consulting"
                className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/[0.06] hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-colors text-center"
              >
                View Consulting Tiers
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Case Study / Story Detail Modal */}
      <AnimatePresence>
        {selectedStory && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedStory(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0D101D] border border-cyan-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto shadow-2xl shadow-cyan-950/40"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedStory(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.06] hover:bg-white/15 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Student Header */}
              <div className="flex items-start gap-4 mb-6 pr-8">
                <img
                  src={selectedStory.avatar}
                  alt={selectedStory.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-400/50 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {selectedStory.admitBadge || 'Admit Confirmed'}
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                      {selectedStory.intake}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {selectedStory.name}
                  </h3>
                  <p className="text-sm text-gray-400 flex items-center gap-1.5 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{selectedStory.homeCity ? `${selectedStory.homeCity}, ` : ''}{selectedStory.country}</span>
                  </p>
                </div>
              </div>

              {/* Admission Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
                <div>
                  <div className="text-xs font-mono text-gray-400">Admitted University</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{selectedStory.university}</div>
                </div>
                <div>
                  <div className="text-xs font-mono text-gray-400">Target Degree</div>
                  <div className="text-sm font-semibold text-cyan-300 mt-0.5">{selectedStory.degree}</div>
                </div>
                {selectedStory.germanGrade && (
                  <div>
                    <div className="text-xs font-mono text-gray-400">Bavarian Grade Equivalent</div>
                    <div className="text-sm font-semibold text-emerald-400 mt-0.5">{selectedStory.germanGrade}</div>
                  </div>
                )}
                {selectedStory.mentorshipFocus && (
                  <div>
                    <div className="text-xs font-mono text-gray-400">Mentorship Focus Area</div>
                    <div className="text-sm font-semibold text-indigo-300 mt-0.5">{selectedStory.mentorshipFocus}</div>
                  </div>
                )}
              </div>

              {/* Full Testimonial Quote */}
              <div className="bg-[#121628] rounded-2xl p-5 border border-white/[0.08] relative mb-6">
                <Quote className="w-8 h-8 text-cyan-400/20 absolute top-3 left-3" />
                <p className="text-gray-200 text-sm sm:text-base leading-relaxed pl-6 italic">
                  "{selectedStory.quote}"
                </p>
              </div>

              {/* Mentorship Impact Summary */}
              <div className="space-y-3 mb-6 text-sm text-gray-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Curricular Analysis:</strong> Tailored academic course descriptions to satisfy German university ECTS prerequisites.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Bureaucracy Cleared:</strong> Document checklist for APS India verification and German student visa (Type D) appointment.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <TrendingUp className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Financial Independence:</strong> Zero agent commissions paid; saved money on Sperrkonto and student housing.
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setSelectedStory(null);
                    onBookCallClick();
                  }}
                  className="w-full sm:w-auto flex-1 px-5 py-3 rounded-xl bg-indigo-600/95 hover:bg-indigo-600 text-white font-bold text-sm transition-all duration-200 ease-out backdrop-blur-md hover:scale-105 active:scale-[0.98] border border-white/25 shadow-md shadow-indigo-600/20 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] cursor-pointer flex items-center justify-center gap-2 group/cta"
                >
                  <span>Book Call with Prakhar on Topmate</span>
                  <ArrowRight className="w-4 h-4 text-white group-hover/cta:translate-x-1 transition-transform duration-200" />
                </button>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 text-gray-300 text-sm font-medium transition-colors cursor-pointer"
                >
                  Close Story
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
