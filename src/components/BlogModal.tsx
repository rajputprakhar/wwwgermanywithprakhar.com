import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Tag, ArrowRight, Share2, Bookmark, Check } from 'lucide-react';
import { BlogPost } from '../types';
import { PERSONAL_INFO } from '../data/siteData';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onBookCallClick: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose, onBookCallClick }) => {
  if (!post) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.article
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0D0F18] border border-white/15 rounded-3xl shadow-2xl shadow-black/90 p-6 sm:p-10 z-10 my-8 max-h-[90vh] overflow-y-auto text-left"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors z-20"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-4 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {post.category}
            </span>
            <span className="text-gray-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="text-gray-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          {/* Cover Image */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8 border border-white/10">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Paragraphs */}
          <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed mb-10">
            {post.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Key Takeaways Box */}
          <div className="p-5 rounded-2xl bg-[#121625] border border-indigo-500/30 mb-8">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              Key Student Takeaways
            </h4>
            <ul className="text-xs text-gray-300 space-y-1.5 font-mono">
              <li>• Never submit raw English CVs; translate into Tabellarischer Lebenslauf.</li>
              <li>• Always cross-reference ECTS credits against Prüfungsordnungen.</li>
              <li>• Health insurance M10 reporting must be completed digitally before enrollment.</li>
            </ul>
          </div>

          {/* Author Card & Call to action */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <a
              id="blog-modal-author-instagram-link"
              href={PERSONAL_INFO.socials.brandInstagram}
              target="_blank"
              rel="noopener noreferrer"
              title="View Prakhar on Instagram (@germanywithprakhar)"
              aria-label="View Prakhar on Instagram"
              className="flex items-center gap-3 group/author cursor-pointer"
            >
              <img
                src="/image-for-website.jpg"
                alt="Prakhar Rajput"
                className="w-10 h-10 rounded-full object-cover border border-white/20 group-hover/author:border-pink-500 shrink-0 transition-colors"
                referrerPolicy="no-referrer"
              />
              <div>
                <span className="text-xs font-bold text-white block group-hover/author:text-pink-400 transition-colors">Prakhar Rajput</span>
                <span className="text-[11px] font-mono text-gray-400">Uni Bremen CS Student • @germanywithprakhar</span>
              </div>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookCallClick();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
            >
              <span>Discuss this in a 1-on-1 Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.article>
      </div>
    </AnimatePresence>
  );
};
