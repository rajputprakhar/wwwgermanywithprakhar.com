import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal, 
  Languages, 
  Video, 
  Clock, 
  MapPin, 
  Award, 
  Sparkles, 
  Code2, 
  Cpu, 
  Check, 
  Film, 
  Mic2,
  TrendingUp,
  Volume2,
  CheckCircle2,
  ExternalLink,
  Instagram,
  ArrowUpRight
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/siteData';

export const AboutBento: React.FC = () => {
  const [bremenTime, setBremenTime] = useState<string>('');
  const [activeLang, setActiveLang] = useState<'de' | 'en' | 'hi'>('de');
  const [activeCodeTab, setActiveCodeTab] = useState<'cv' | 'ds'>('cv');

  // Live German Time in Bremen (CET/CEST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Berlin',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      setBremenTime(timeStr);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const languageSamples = {
    de: {
      lang: 'German (Deutsch)',
      level: 'German up to C1 Level (Fluent)',
      sample: '„Erfolg beim Studium in Deutschland beginnt mit der richtigen Vorbereitung und klaren Zielen.“',
      translation: '"Success studying in Germany starts with the right preparation and clear goals."',
      context: 'Fluent in daily university bureaucracy, faculty consultations, and corporate Werkstudent work.'
    },
    en: {
      lang: 'English',
      level: 'Fluent / Academic C2',
      sample: '"Demystifying the German higher education system for ambitious international tech students."',
      translation: 'Native-level academic and technical communication.',
      context: 'Primary medium for global 1-on-1 strategy sessions and international CS research.'
    },
    hi: {
      lang: 'Hindi (हिन्दी)',
      level: 'Native (मातृभाषा)',
      sample: '„जर्मनी में पढ़ाई और करियर की हर बारीक जानकारी, बिना किसी भ्रामक वादों के।“',
      translation: '"Every detail of studying and building a career in Germany, without misleading promises."',
      context: 'Comfortable mentoring Indian students in their mother tongue for nuanced family discussions.'
    }
  };

  return (
    <section id="about" className="relative py-24 bg-white dark:bg-[#08090D] overflow-hidden border-t border-slate-200 dark:border-white/[0.06] transition-colors duration-200">
      {/* Background glow accent */}
      <div className="absolute top-1/2 -left-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/20 text-xs font-mono text-indigo-700 dark:text-indigo-300 mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Credentials &amp; Authority</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
            Built on Experience, Code &amp; Real German Groundwork
          </h2>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl text-sm sm:text-base leading-relaxed">
            I don&apos;t just consult from theory. I live the international student journey every day as a Computer Science student at the University of Bremen.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* ======================================================== */}
          {/* BOX 1: Founder Visual Spotlight (Cols 5 on MD)            */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:col-span-5 bg-white dark:bg-[#0E111C]/80 border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group transition-all shadow-sm dark:shadow-md"
          >
            <div className="absolute top-0 right-0 w-52 h-52 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                      Prakhar Rajput
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-400">
                      Founder &amp; Lead Consultant
                    </span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-500/30 font-semibold">
                  Lead Mentor
                </span>
              </div>

              {/* Travel Photograph from Palma de Mallorca, Spain - Links directly to Instagram */}
              <a
                id="about-travel-photo-link"
                href={PERSONAL_INFO.socials.brandInstagram}
                target="_blank"
                rel="noopener noreferrer"
                title="View Prakhar's photo on Instagram (@germanywithprakhar)"
                aria-label="View Prakhar Rajput on Instagram @germanywithprakhar"
                className="relative aspect-[4/3] sm:aspect-[4/3.8] max-h-[340px] w-full rounded-xl overflow-hidden bg-[#0A0C14] border border-slate-200 dark:border-white/10 hover:border-pink-500/50 shadow-md my-3 block group/photo cursor-pointer transition-all"
              >
                <img
                  src="/travel-photo.jpg"
                  alt="Prakhar Rajput - Palma de Mallorca, Spain"
                  className="w-full h-full object-cover object-center group-hover/photo:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none" />
                
                {/* Top-right Instagram badge */}
                <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-gray-200 border border-white/15 flex items-center gap-1.5 text-[10px] font-mono group-hover/photo:border-pink-500/40 group-hover/photo:text-white transition-colors shadow-md">
                  <Instagram className="w-3 h-3 text-pink-400" />
                  <span>@germanywithprakhar</span>
                </div>

                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                  <div className="text-xs font-bold text-white font-mono flex items-center gap-1.5">
                    Prakhar Rajput
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 fill-blue-400/20" />
                  </div>
                  <span className="text-[10px] font-mono text-gray-300 bg-black/60 px-2 py-0.5 rounded-md border border-white/10 flex items-center gap-1 group-hover/photo:text-pink-300 transition-colors">
                    <span>Palma de Mallorca, Spain</span>
                    <ArrowUpRight className="w-3 h-3 text-gray-400 group-hover/photo:text-pink-300" />
                  </span>
                </div>
              </a>

              <p className="text-slate-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed mb-3">
                Direct student guidance grounded in real-time academic, visa, and campus experience at the University of Bremen. No corporate intermediaries.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 font-mono">
              <span>University of Bremen</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Computer Science</span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* BOX 2: Computer Science at Uni Bremen (Cols 7 on MD)      */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-7 bg-white dark:bg-[#0E111C]/80 border border-slate-200 dark:border-white/[0.08] hover:border-indigo-500/40 rounded-2xl p-6 sm:p-8 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group transition-all shadow-sm dark:shadow-md"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/10 transition-colors" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-500/15 border border-indigo-300 dark:border-indigo-500/30 flex items-center justify-center text-indigo-700 dark:text-indigo-400">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      Computer Science at Uni Bremen
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-400">
                      BSc Computer Science • University of Bremen
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-mono bg-blue-50 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-500/30 font-semibold">
                  CS Student
                </span>
              </div>

              <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed mb-6">
                Active Computer Science undergraduate at the University of Bremen. I leverage direct academic knowledge of German university Prüfungsordnungen (examination regulations), APS documentation, and faculty standards to help students craft competitive applications.
              </p>

              {/* Interactive Code Snippet / Pipeline Showcase */}
              <div className="keep-dark rounded-xl bg-[#080A10] border border-white/[0.08] p-4 font-mono text-xs overflow-hidden mb-6 shadow-md">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-white/[0.08] text-gray-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] text-gray-400 ml-2">vision_pipeline.py</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveCodeTab('cv')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        activeCodeTab === 'cv' ? 'bg-indigo-500/30 text-indigo-300' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      OpenCV / YOLO
                    </button>
                    <button
                      onClick={() => setActiveCodeTab('ds')}
                      className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                        activeCodeTab === 'ds' ? 'bg-indigo-500/30 text-indigo-300' : 'text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      PyTorch / ECTS
                    </button>
                  </div>
                </div>

                {activeCodeTab === 'cv' ? (
                  <pre className="text-gray-300 space-y-1 overflow-x-auto text-[11px]">
                    <span className="text-purple-400">import</span> cv2<br />
                    <span className="text-purple-400">import</span> torch<br />
                    <span className="text-gray-500"># Real-time inference on edge devices</span><br />
                    model = torch.hub.load(<span className="text-emerald-300">&apos;ultralytics/yolov8&apos;</span>, <span className="text-emerald-300">&apos;custom&apos;</span>)<br />
                    <span className="text-blue-400">def</span> <span className="text-amber-300">process_frame</span>(stream_tensor):<br />
                    &nbsp;&nbsp;results = model(stream_tensor, conf=<span className="text-cyan-300">0.85</span>)<br />
                    &nbsp;&nbsp;<span className="text-purple-400">return</span> results.render()
                  </pre>
                ) : (
                  <pre className="text-gray-300 space-y-1 overflow-x-auto text-[11px]">
                    <span className="text-purple-400">import</span> pandas <span className="text-purple-400">as</span> pd<br />
                    <span className="text-gray-500"># Uni Bremen ECTS module equivalence mapper</span><br />
                    curriculum = pd.read_csv(<span className="text-emerald-300">&quot;ects_requirements.csv&quot;</span>)<br />
                    admissions_match = curriculum.query(<span className="text-emerald-300">&quot;math_ects &gt;= 24 and theoretical_cs &gt;= 18&quot;</span>)<br />
                    <span className="text-blue-400">print</span>(f<span className="text-emerald-300">&quot;Profile Match Status: &#123;admissions_match.status&#125;&quot;</span>)
                  </pre>
                )}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Python 3.12', 'Computer Vision (OpenCV)', 'PyTorch', 'Data Science', 'FastAPI', 'Docker', 'Linux/Bash'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.04] text-gray-300 border border-white/[0.08]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* BOX 3: Trilingual Communicator (Cols 4 on LG)            */}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="md:col-span-6 lg:col-span-4 bg-white dark:bg-[#0E111C]/80 border border-slate-200 dark:border-white/[0.08] hover:border-purple-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group transition-all shadow-sm dark:shadow-md"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors" />

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-500/15 border border-purple-300 dark:border-purple-500/30 flex items-center justify-center text-purple-700 dark:text-purple-400">
                  <Languages className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    Trilingual Communicator
                  </h3>
                  <span className="text-xs font-mono text-slate-500 dark:text-gray-400">
                    Cultural &amp; Bureaucratic Fluency
                  </span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed mb-5">
                Connecting German authorities, university admissions committees, and international students without linguistic barriers.
              </p>

              {/* Language Switcher Tabs */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-[#090B12] p-1 border border-slate-200 dark:border-white/[0.08] mb-4">
                {(['de', 'en', 'hi'] as const).map((code) => (
                  <button
                    key={code}
                    onClick={() => setActiveLang(code)}
                    className={`flex-1 py-1.5 px-1 text-[11px] sm:text-xs font-medium rounded-lg transition-all text-center ${
                      activeLang === code
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm font-semibold'
                        : 'text-slate-600 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white'
                    }`}
                  >
                    {code === 'de' ? (
                      <span><span className="sm:hidden">Deutsch</span><span className="hidden sm:inline">German (C1)</span></span>
                    ) : code === 'en' ? (
                      <span><span className="sm:hidden">English</span><span className="hidden sm:inline">English (C2)</span></span>
                    ) : (
                      <span><span className="sm:hidden">Hindi</span><span className="hidden sm:inline">Hindi (Native)</span></span>
                    )}
                  </button>
                ))}
              </div>

              {/* Active Language Detail Card */}
              <div className="rounded-xl bg-slate-50 dark:bg-[#090B12] border border-slate-200 dark:border-white/[0.08] p-4 text-xs shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">{languageSamples[activeLang].lang}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-500/30 font-semibold">
                    {languageSamples[activeLang].level}
                  </span>
                </div>
                <p className="italic text-slate-800 dark:text-gray-300 mb-2 font-serif text-sm">
                  {languageSamples[activeLang].sample}
                </p>
                <p className="text-slate-600 dark:text-gray-400 text-[11px] mb-3">
                  {languageSamples[activeLang].translation}
                </p>
                <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06] text-[11px] text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{languageSamples[activeLang].context}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 font-mono">
              <span>Goethe C1 Certified</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Available in all 3 languages</span>
            </div>
          </motion.div>

          {/* ======================================================== */}
          {/* BOX 4: Content Creator (Cols 4 on LG) - Clickable link   */}
          {/* ======================================================== */}
          <motion.a
            href="https://www.youtube.com/@prakhar.rajput"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.25 }}
            id="creator-youtube-card-link"
            className="md:col-span-6 lg:col-span-4 bg-white dark:bg-[#0E111C]/80 border border-slate-200 dark:border-white/[0.08] hover:border-red-500/50 hover:shadow-xl hover:shadow-red-600/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group cursor-pointer transition-all block shadow-sm dark:shadow-md"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-red-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-red-500/15 transition-colors" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-500/15 border border-red-300 dark:border-red-500/30 flex items-center justify-center text-red-600 dark:text-red-400 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                    <Video className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-1.5">
                      <span>Content Creator</span>
                      <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-400">
                      YouTube: Tech &amp; Germany
                    </span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-500/20 group-hover:bg-red-600 group-hover:text-white transition-all font-semibold">
                  Channel ↗
                </span>
              </div>

              <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed mb-5">
                Producing cinema-grade educational films and honest vlogs detailing student life in Germany, cost realities, campus walkthroughs, and practical coding tutorials.
              </p>

              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div className="rounded-xl bg-slate-50 dark:bg-[#090B12] p-3 border border-slate-200 dark:border-white/[0.06] group-hover:border-slate-300 dark:group-hover:border-white/15 transition-colors">
                  <div className="text-base font-bold text-slate-900 dark:text-white font-mono">4K 60fps</div>
                  <div className="text-[11px] text-slate-500 dark:text-gray-400">Sony Alpha Cinema</div>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#090B12] p-3 border border-slate-200 dark:border-white/[0.06] group-hover:border-red-400 dark:group-hover:border-red-500/40 transition-colors">
                  <div className="text-base font-bold text-red-600 dark:text-red-400 font-mono">Premiere</div>
                  <div className="text-[11px] text-slate-600 dark:text-gray-300 font-medium">Adobe Premiere</div>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-[#090B12] p-3 border border-slate-200 dark:border-white/[0.06] group-hover:border-emerald-400 dark:group-hover:border-white/15 transition-colors">
                  <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 font-mono">100%</div>
                  <div className="text-[11px] text-slate-500 dark:text-gray-400">Fact-Checked</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-white/[0.06] text-xs font-mono text-slate-600 dark:text-gray-300">
              <span className="flex items-center gap-1.5">
                <Film className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                <span>Scripting, Audio &amp; Post</span>
              </span>
              <span className="text-red-600 dark:text-red-400 font-semibold group-hover:underline flex items-center gap-1">
                @prakhar.rajput
                <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </motion.a>

          {/* ======================================================== */}
          {/* BOX 5: Live Bremen Time & Grounded Presence (Cols 4 on LG)*/}
          {/* ======================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="md:col-span-12 lg:col-span-4 bg-white dark:bg-[#0E111C]/80 border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between backdrop-blur-xl relative overflow-hidden group transition-all shadow-sm dark:shadow-md"
          >
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/15 border border-cyan-300 dark:border-cyan-500/30 flex items-center justify-center text-cyan-700 dark:text-cyan-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      On-Ground in Bremen
                    </h3>
                    <span className="text-xs font-mono text-slate-500 dark:text-gray-400">
                      Central European Time (CET)
                    </span>
                  </div>
                </div>
                {/* Live Clock Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-black/60 border border-slate-300 dark:border-cyan-500/30 font-mono text-xs text-cyan-700 dark:text-cyan-300 shadow-inner w-fit font-bold">
                  <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 animate-pulse" />
                  <span>{bremenTime || '12:00:00'} CET</span>
                </div>
              </div>

              <p className="text-slate-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
                Living inside the German ecosystem means up-to-the-minute awareness of immigration policies, the 2026 Opportunity Card (Chancenkarte), Ausländerbehörde regulations, and real-time student job markets.
              </p>

              <div className="flex flex-wrap gap-2 text-xs">
                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/[0.08]">
                  Uni Bremen Campus Active
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/[0.08]">
                  Local Bank &amp; TK Knowledge
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-gray-300 border border-slate-200 dark:border-white/[0.08]">
                  Bremen &amp; Transit Active
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs text-slate-500 dark:text-gray-400 font-mono">
              <span>Direct Insights • No Agency Markups</span>
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">100% Student-First</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
