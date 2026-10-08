import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink,
  Users,
  Zap,
  Check
} from 'lucide-react';
import { CONSULTING_SERVICES, TESTIMONIALS, PERSONAL_INFO } from '../data/siteData';
import { ConsultingService } from '../types';

interface ConsultingProps {
  onOpenBookingModal?: (service?: ConsultingService) => void;
}

export const Consulting: React.FC<ConsultingProps> = () => {
  const topmateProfileUrl = PERSONAL_INFO.socials.topmate || 'https://topmate.io/prakhar_rajput/';

  return (
    <section id="consulting" className="relative py-24 bg-[#090A0F] overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-xs font-mono text-indigo-300 mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Official Booking Menu</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Consulting &amp; Strategy Calls
          </h2>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Direct, 1-on-1 guidance and group seminars with Prakhar. All scheduling, live calendar slots, and Google Meet invites are powered directly by Topmate.
          </p>
        </div>

        {/* Topmate Verified Profile Banner */}
        <div className="max-w-4xl mx-auto mb-12 p-4 sm:p-5 rounded-2xl bg-[#0E111C]/90 border border-white/[0.08] backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
            <a
              id="consulting-avatar-instagram-link"
              href={PERSONAL_INFO.socials.brandInstagram}
              target="_blank"
              rel="noopener noreferrer"
              title="View Prakhar Rajput on Instagram (@germanywithprakhar)"
              aria-label="View Prakhar on Instagram"
              className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-500/50 hover:border-pink-500 shrink-0 shadow-md transition-all cursor-pointer group/avatar block"
            >
              <img
                src="/image-for-website.jpg"
                alt="Prakhar Rajput"
                className="w-full h-full object-cover group-hover/avatar:scale-110 transition-transform duration-300"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('image%20for%20website.jpg')) {
                    target.src = '/image for website.jpg';
                  }
                }}
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0C0E17]" />
            </a>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm sm:text-base font-bold text-white tracking-tight">Prakhar Rajput</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  TOPMATE VERIFIED
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400 font-mono mt-0.5">
                <span className="text-amber-400 flex items-center gap-1 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" /> 5.0
                </span>
                <span>•</span>
                <span>Uni Bremen CS Student</span>
                <span>•</span>
                <span className="text-emerald-400">Slots Open This Week</span>
              </div>
            </div>
          </div>

          <a
            href={topmateProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="topmate-profile-link-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-indigo-500/40 text-xs font-mono text-white transition-all group shrink-0"
          >
            <span>topmate.io/prakhar_rajput</span>
            <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-cyan-300 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* The 3 Tiers Display Menu Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
          {CONSULTING_SERVICES.map((tier) => {
            const isPopular = Boolean(tier.popular);
            const isSeminar = Boolean(tier.limit);

            return (
              <motion.a
                key={tier.id}
                href={topmateProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -6, scale: 1.015 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.25 }}
                id={`consulting-tier-card-${tier.id}`}
                className={`relative rounded-3xl p-[1.5px] flex flex-col group cursor-pointer transition-all duration-300 ${
                  isPopular
                    ? 'bg-gradient-to-b from-amber-400 via-indigo-500 to-cyan-500 shadow-2xl shadow-indigo-950/80'
                    : isSeminar
                    ? 'bg-gradient-to-b from-purple-500/40 via-white/10 to-indigo-500/30 hover:shadow-xl hover:shadow-purple-950/50'
                    : 'bg-gradient-to-b from-white/15 via-white/5 to-transparent hover:shadow-xl hover:shadow-indigo-950/40'
                }`}
              >
                {/* Popularity / Limit Ribbon Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-black text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5 z-20">
                    <Sparkles className="w-3 h-3 fill-current" />
                    <span>POPULAR</span>
                  </div>
                )}

                {isSeminar && tier.limit && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-purple-600 text-white text-[11px] font-bold tracking-wide shadow-lg flex items-center gap-1.5 z-20 border border-purple-400/40">
                    <Users className="w-3 h-3" />
                    <span>{tier.limit}</span>
                  </div>
                )}

                {/* Main Card Body */}
                <div className="h-full w-full rounded-[22px] bg-[#0C0E17] p-7 sm:p-8 flex flex-col justify-between backdrop-blur-2xl border border-white/[0.06] group-hover:border-white/20 transition-colors">
                  <div>
                    {/* Top Tier Header & Meta */}
                    <div className="flex items-start justify-between gap-2 mb-4">
                      <div>
                        <span className="text-[11px] font-mono text-cyan-400 tracking-wider uppercase font-semibold">
                          {isSeminar ? 'Group Workshop' : '1-on-1 Mentorship'}
                        </span>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight mt-0.5">
                          {tier.title}
                        </h3>
                      </div>

                      <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-gray-300">
                        <Clock className="w-3.5 h-3.5 text-gray-400" />
                        <span>{tier.duration}</span>
                      </div>
                    </div>

                    {/* Price Presentation */}
                    <div className="flex items-baseline gap-2 mb-5 pb-5 border-b border-white/[0.08]">
                      <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                        {tier.price}
                      </span>
                      <span className="text-xs text-gray-400 font-mono">
                        / session via Topmate
                      </span>
                    </div>

                    {/* Exact User Provided Description */}
                    <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
                      {tier.description}
                    </p>

                    {/* Deliverables / Scope Bullet Points */}
                    <div className="space-y-2.5 mb-8">
                      {tier.deliverables.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 leading-snug">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${
                            isPopular ? 'text-amber-400' : isSeminar ? 'text-purple-400' : 'text-emerald-400'
                          }`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Redirect Button */}
                  <div>
                    <div
                      className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all ${
                        isPopular
                          ? 'bg-gradient-to-r from-amber-500 via-indigo-600 to-cyan-500 group-hover:from-amber-400 group-hover:to-cyan-400 text-white shadow-indigo-900/50'
                          : isSeminar
                          ? 'bg-purple-600 group-hover:bg-purple-500 text-white shadow-purple-900/40'
                          : 'bg-white/[0.08] group-hover:bg-white/[0.15] text-white border border-white/10 group-hover:border-white/30'
                      }`}
                    >
                      <Calendar className="w-4 h-4 text-white/90" />
                      <span>
                        {isSeminar ? 'Reserve Seat on Topmate' : 'Book on Topmate'}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </div>

                    <div className="mt-2.5 text-center text-[11px] font-mono text-gray-500">
                      Redirects to topmate.io/prakhar_rajput
                    </div>
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Trust Badges & Booking Guarantee Strip */}
        <div className="p-6 rounded-2xl bg-[#0B0D15] border border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto text-xs text-gray-400 font-mono">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-white font-semibold block text-sm">Automated Calendar &amp; Meet Sync</span>
              <span>Instant Google Meet invitation and calendar link dispatched immediately upon booking.</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 shrink-0 text-gray-300">
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-cyan-400" />
              <span>No corporate agency markups</span>
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Direct peer-to-peer insights</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
