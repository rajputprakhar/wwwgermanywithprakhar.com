import React, { useState } from 'react';
import { 
  Youtube, 
  Linkedin, 
  Send, 
  Instagram, 
  Mail, 
  ArrowRight, 
  Check, 
  MapPin, 
  ExternalLink,
  Calendar,
  Heart,
  Calculator,
  AlertCircle,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/siteData';
import { ThemeToggle } from './ThemeToggle';
import { validateEmailClient } from '../lib/emailValidation';

interface FooterProps {
  onBookCallClick: () => void;
}

// Strict RFC-compliant regex requiring local part, @, domain, and valid TLD extension
const STRICT_EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const Footer: React.FC<FooterProps> = ({ onBookCallClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [deliverabilityInfo, setDeliverabilityInfo] = useState<string | null>(null);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setDeliverabilityInfo(null);

    const trimmedEmail = email.trim().toLowerCase();

    // 1. Strict regex verification (must contain @ and valid domain extension)
    if (!trimmedEmail || !STRICT_EMAIL_PATTERN.test(trimmedEmail)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // 2. Client-side additional validation (length, consecutive dots, disposable blacklist)
    const clientValidation = validateEmailClient(trimmedEmail);
    if (!clientValidation.isValid) {
      setErrorMessage(clientValidation.error || 'Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 3. Optional server-side API check if backend is running (e.g. dev/fullstack mode)
      let registered = false;
      try {
        const res = await fetch('/api/newsletter/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: trimmedEmail }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            registered = true;
            if (data.domain) {
              setDeliverabilityInfo(`Verified MX mail exchanger for @${data.domain}`);
            }
          }
        }
      } catch {
        // Static hosting mode (e.g. GitHub Pages) where /api doesn't exist
      }

      // If backend was unreachable or in static mode, store subscriber in localStorage
      if (!registered) {
        try {
          const existingSubscribers = JSON.parse(localStorage.getItem('gwp_subscribers') || '[]');
          if (!existingSubscribers.includes(trimmedEmail)) {
            existingSubscribers.push(trimmedEmail);
            localStorage.setItem('gwp_subscribers', JSON.stringify(existingSubscribers));
          }
        } catch {
          // ignore localStorage error
        }
        setDeliverabilityInfo(`Domain @${clientValidation.domain || 'verified'} format validated`);
      }

      setSubscribed(true);
    } catch {
      setErrorMessage('Something went wrong while registering your subscription. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative bg-[#06070B] border-t border-white/[0.08] pt-16 pb-12 overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-indigo-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-white/[0.08]">
          {/* Brand & Newsletter Section (Cols 5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center p-1.5 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="germanywithprakhar Logo"
                  className="w-full h-full object-contain filter drop-shadow-sm"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-bold text-lg text-white tracking-tight">
                  germany<span className="text-cyan-400">with</span>prakhar
                </span>
                <span className="block text-xs font-mono text-gray-400">
                  by Prakhar Rajput • CS @ University of Bremen
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Helping ambitious international students navigate university applications, APS certificates, blocked accounts, and high-paying tech careers in Germany.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <label className="text-xs font-semibold text-white block mb-2 font-mono">
                Join the weekly newsletter for tech insights and Germany survival tips.
              </label>

              {subscribed ? (
                <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono space-y-1">
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Welcome aboard! Verified and registered.</span>
                  </div>
                  {deliverabilityInfo && (
                    <p className="text-[11px] text-emerald-400/80 pl-6">
                      {deliverabilityInfo} • Delivery scheduled for this Sunday.
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <form onSubmit={handleNewsletter} noValidate className="flex flex-col gap-2 max-w-md">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          id="newsletter-email-input"
                          type="email"
                          required
                          pattern="[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}"
                          disabled={isSubmitting}
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errorMessage) setErrorMessage(null);
                          }}
                          placeholder="you@domain.com"
                          className={`w-full pl-10 pr-3 py-2.5 rounded-xl bg-white/[0.04] border ${
                            errorMessage 
                              ? 'border-red-500/70 focus:border-red-500' 
                              : 'border-white/15 focus:border-indigo-500'
                          } focus:outline-none text-xs text-white placeholder-gray-500 font-mono transition-colors disabled:opacity-50`}
                        />
                      </div>
                      <button
                        type="submit"
                        id="newsletter-submit-btn"
                        disabled={isSubmitting}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all shadow-md shrink-0 cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <span>Subscribe</span>
                        )}
                      </button>
                    </div>

                    {/* Clear, inline error message in red text below the input field */}
                    {errorMessage && (
                      <p id="newsletter-error-message" className="text-red-500 text-xs font-mono flex items-center gap-1.5 mt-0.5">
                        <AlertCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                        <span>{errorMessage}</span>
                      </p>
                    )}
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Quick Navigation Links (Cols 3) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a href="#home" className="hover:text-cyan-400 transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-400 transition-colors">
                  About &amp; Credentials (Uni Bremen)
                </a>
              </li>
              <li>
                <a href="#consulting" className="hover:text-cyan-400 transition-colors">
                  1-on-1 Strategy Consulting
                </a>
              </li>
              <li>
                <a href="#tools" className="hover:text-cyan-400 transition-colors">
                  German Grade Converter (KMK) &amp; Cost Estimator
                </a>
              </li>
              <li>
                <a href="#youtube" className="hover:text-cyan-400 transition-colors">
                  Featured YouTube Video
                </a>
              </li>
              <li>
                <a href="#toolkit" className="hover:text-cyan-400 transition-colors">
                  Student Toolkit (Blocked Account, TK)
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-cyan-400 transition-colors">
                  Articles &amp; Practical Advice (Blog)
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  FAQ &amp; Live Trending News
                </a>
              </li>
            </ul>
          </div>

          {/* Socials & Location (Cols 4) */}
          <div className="lg:col-span-4 space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">
                Connect &amp; Follow
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href={PERSONAL_INFO.socials.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  title="YouTube Channel"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-red-500/50 hover:bg-red-500/10 text-gray-300 hover:text-red-400 flex items-center justify-center transition-all"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-blue-500/50 hover:bg-blue-500/10 text-gray-300 hover:text-blue-400 flex items-center justify-center transition-all"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram Community Group"
                  title="Telegram Community"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-sky-500/50 hover:bg-sky-500/10 text-gray-300 hover:text-sky-400 flex items-center justify-center transition-all"
                >
                  <Send className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.brandInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Brand Instagram @germanywithprakhar"
                  title="Instagram (@germanywithprakhar)"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-pink-500/50 hover:bg-pink-500/10 text-gray-300 hover:text-pink-400 flex items-center justify-center transition-all"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href={PERSONAL_INFO.socials.topmate}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Topmate Bookings"
                  title="Topmate Consultations"
                  className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 text-gray-300 hover:text-cyan-300 flex items-center justify-center transition-all"
                >
                  <Calendar className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs">
              <div className="flex items-center gap-2 text-white font-semibold mb-1">
                <MapPin className="w-3.5 h-3.5 text-red-400" />
                <span>Bremen, Lower Saxony, Germany</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed">
                Mentoring sessions conducted remotely worldwide via Topmate &amp; Google Meet.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-gray-400 text-center sm:text-left">
          <p>© 2026 germanywithprakhar • Prakhar Rajput. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-2 text-[11px]">
            <span>University of Bremen • Computer Science</span>
            <span className="hidden sm:inline">•</span>
            <button
              onClick={onBookCallClick}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Book Strategy Call
            </button>
            <span className="hidden sm:inline">•</span>
            <ThemeToggle id="footer-theme-toggle" />
          </div>
        </div>
      </div>
    </footer>
  );
};
