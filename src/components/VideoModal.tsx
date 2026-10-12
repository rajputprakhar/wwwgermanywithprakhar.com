import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Youtube, ExternalLink, Play, Clock, Eye } from 'lucide-react';
import { YOUTUBE_FEATURED, PERSONAL_INFO } from '../data/siteData';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookCallClick: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, onBookCallClick }) => {
  if (!isOpen) return null;

  const chapters = [
    { time: '00:00', title: 'Why I Picked Uni Bremen for Computer Science' },
    { time: '02:45', title: 'Tuition-Free Model & Semester Ticket Secrets' },
    { time: '05:30', title: 'Coursework: Python, Data Science & Real-Time CV' },
    { time: '08:15', title: 'Living Costs Breakdown (Rent, Groceries, Insurance)' },
    { time: '11:20', title: 'Landing a Werkstudent Software Developer Job' },
    { time: '13:40', title: 'Final Advice for Upcoming Applicants' }
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0D0F18] border border-white/15 rounded-3xl shadow-2xl p-5 sm:p-8 z-10 my-4 sm:my-8 max-h-[92vh] overflow-y-auto text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors z-20"
            aria-label="Close video player"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Video Title & Meta */}
          <div className="flex items-center gap-2.5 mb-3 text-xs font-mono">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-500/20 text-red-400 font-bold">
              YOUTUBE FEATURED
            </span>
            <span className="text-gray-400">{YOUTUBE_FEATURED.duration}</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-300 flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-red-400" />
              <span>12.4K views</span>
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 pr-8 leading-snug">
            {YOUTUBE_FEATURED.videoTitle}
          </h3>

          {/* Video Player Display Container */}
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-black mb-6 border border-white/10 shadow-2xl">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_FEATURED.embedId}?autoplay=1&rel=0`}
              title={YOUTUBE_FEATURED.videoTitle}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          </div>

          {/* Chapters Breakdown */}
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.08] p-4 mb-6">
            <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-3">
              Video Chapters &amp; Timestamps
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-gray-300">
              {chapters.map((ch) => (
                <div key={ch.time} className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold shrink-0">{ch.time}</span>
                  <span className="truncate text-gray-300">{ch.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/10">
            <a
              href={PERSONAL_INFO.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <Youtube className="w-4 h-4 fill-current" />
              <span>Subscribe on YouTube (1.6K+)</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookCallClick();
              }}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book Strategy Call Instead</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
