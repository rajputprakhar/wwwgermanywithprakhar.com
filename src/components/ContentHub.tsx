import React from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  Youtube, 
  Clock, 
  Eye, 
  ArrowUpRight, 
  BookOpen, 
  Calendar,
  Volume2,
  Tv,
  RefreshCw,
  Radio
} from 'lucide-react';
import { BLOG_POSTS } from '../data/siteData';
import { BlogPost } from '../types';
import { useYouTube, formatViewCount } from '../hooks/useYouTube';

interface YouTubeSectionProps {
  onOpenVideoModal: () => void;
}

export const YouTubeSection: React.FC<YouTubeSectionProps> = ({ onOpenVideoModal }) => {
  const { 
    videos, 
    selectedVideo, 
    setSelectedVideo, 
    isLivePlayerActive, 
    setIsLivePlayerActive, 
    channelInfo,
    isRefreshingStats,
    refreshRealtimeViews,
    lastViewCountUpdate
  } = useYouTube();

  return (
    <section id="youtube" className="relative py-24 bg-[#08090E] overflow-hidden border-t border-white/[0.04]">
      {/* Ambient background aura */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-mono text-red-400 mb-3">
              <Youtube className="w-3.5 h-3.5" />
              <span>YouTube • {channelInfo.handle}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Life in Germany &amp; Tech
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
              Authentic student vlogs, honest living cost breakdowns, campus life at Uni Bremen, and budget travel across Europe.
            </p>
          </div>

          {/* Subscribe on YouTube Button */}
          <motion.a
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            href={channelInfo.channelUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="youtube-subscribe-btn"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FF0000] hover:bg-[#E60000] text-white font-semibold text-sm shadow-xl shadow-red-600/25 transition-all self-start md:self-auto"
          >
            <Youtube className="w-5 h-5 fill-current" />
            <span>Subscribe on YouTube</span>
            <span className="px-2 py-0.5 rounded-full bg-black/25 text-[11px] font-mono">{channelInfo.subscribers}</span>
          </motion.a>
        </div>

        {/* Dynamic Video Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Selected Video Player Box */}
          <div className="lg:col-span-8 rounded-2xl overflow-hidden bg-[#0C0E17] border border-white/10 shadow-2xl">
            <div className="relative aspect-video w-full bg-black overflow-hidden group">
              {isLivePlayerActive ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId || selectedVideo.id}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <>
                  <img
                    src={selectedVideo.thumbnail}
                    alt={selectedVideo.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsLivePlayerActive(true)}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-2xl shadow-red-600/50 backdrop-blur-sm transition-all pl-1 cursor-pointer"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 fill-current" />
                    </motion.button>
                  </div>

                  {/* Badges on Video Cover */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-black/70 backdrop-blur-md text-white border border-white/10">
                      {selectedVideo.category}
                    </span>
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-medium bg-red-600/80 text-white">
                      Featured
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4 px-2.5 py-1 rounded bg-black/80 text-xs font-mono text-white">
                    {selectedVideo.duration}
                  </div>
                </>
              )}
            </div>

            {/* Video Details & Quick Controls */}
            <div className="p-4 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    {selectedVideo.publishDate || 'Recent'}
                  </span>
                  
                  {/* Real-time YouTube Data API v3 View Count */}
                  <span className="flex items-center gap-1.5 text-gray-200">
                    <Eye className="w-3.5 h-3.5 text-red-500" />
                    <span className="font-semibold text-white">
                      {formatViewCount(selectedVideo.viewCount ?? selectedVideo.views)}
                    </span>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-red-500/15 text-red-400 border border-red-500/30">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      LIVE
                    </span>
                  </span>

                  {selectedVideo.duration && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-gray-500" />
                      {selectedVideo.duration}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Refresh Real-Time View Count Button */}
                  <button
                    onClick={() => refreshRealtimeViews()}
                    disabled={isRefreshingStats}
                    title="Fetch real-time view count from YouTube Data API v3"
                    className="text-xs font-mono text-gray-400 hover:text-white flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/10 hover:border-white/20 transition-all cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 text-red-400 ${isRefreshingStats ? 'animate-spin' : ''}`} />
                    <span>{isRefreshingStats ? 'Updating...' : 'Sync Views'}</span>
                  </button>

                  <button
                    onClick={onOpenVideoModal}
                    className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 hover:underline cursor-pointer"
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span>Open Theatre Mode</span>
                  </button>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug mb-2">
                {selectedVideo.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-2 sm:line-clamp-3">
                {selectedVideo.description || 'Watch authentic experiences and university guidance from Prakhar Rajput studying Computer Science at University of Bremen, Germany.'}
              </p>
            </div>
          </div>

          {/* Right Sidebar: Playlist & Video Selector (Top 5 Popular Videos) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-2 flex items-center justify-between">
              <span>Top 5 Most Popular</span>
              <span className="text-red-400 font-semibold">{videos.slice(0, 5).length} Videos</span>
            </div>

            <div className="space-y-3">
              {videos.slice(0, 5).map((video) => {
                const isCurrent = video.id === selectedVideo.id;
                const formattedViews = formatViewCount(video.viewCount ?? video.views);
                return (
                  <button
                    key={video.id}
                    onClick={() => {
                      setSelectedVideo(video);
                      setIsLivePlayerActive(true);
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex gap-3.5 items-center cursor-pointer ${
                      isCurrent
                        ? 'bg-[#141829] border-red-500/40 shadow-lg shadow-black/40'
                        : 'bg-[#0D0F18]/80 border-white/[0.06] hover:border-white/20 hover:bg-[#121522]'
                    }`}
                  >
                    <div className="relative w-28 aspect-video rounded-lg overflow-hidden shrink-0 bg-black">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded text-[9px] font-mono bg-black/80 text-white">
                        {video.duration}
                      </span>
                      {isCurrent && (
                        <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center">
                          <Volume2 className="w-4 h-4 text-white animate-pulse" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className={`text-xs font-semibold line-clamp-2 leading-snug mb-1 ${
                        isCurrent ? 'text-red-400 font-bold' : 'text-gray-200'
                      }`}>
                        {video.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-gray-400">
                        <span className="text-gray-300 font-medium">{formattedViews}</span>
                        <span>•</span>
                        <span>{video.publishDate || 'Recent'}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Below 5th video: Clean Secondary CTA button */}
            <a
              href="https://www.youtube.com/@prakhar.rajput/videos"
              target="_blank"
              rel="noopener noreferrer"
              id="youtube-explore-more-btn"
              className="mt-3.5 w-full py-3 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] active:bg-white/[0.12] border border-white/10 hover:border-red-500/40 text-gray-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all group"
            >
              <Youtube className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              <span>Explore More on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

interface BlogSectionProps {
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectPost }) => {
  return (
    <section id="blog" className="relative py-24 bg-[#08090E] overflow-hidden border-t border-white/[0.06]">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-mono text-blue-300 mb-3">
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Field Notes &amp; Guides</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Articles &amp; Practical Advice
            </h2>
            <p className="text-gray-400 text-sm sm:text-base mt-2 max-w-xl">
              Straightforward insights on survival, bureaucratic nuances, and technical career acceleration in Germany.
            </p>
          </div>

          <span className="text-xs font-mono text-gray-400 hidden sm:block">
            Updated for 2026 Admissions
          </span>
        </div>

        {/* Grid of 3 Modern Blog Cards with hover effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => onSelectPost(post)}
              className="group relative rounded-2xl bg-[#0D0F18]/90 border border-white/[0.08] hover:border-indigo-500/40 p-5 flex flex-col justify-between backdrop-blur-xl transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/40 cursor-pointer overflow-hidden"
            >
              {/* Subtle top card glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/0 group-hover:bg-indigo-500/10 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

              <div>
                {/* Card Cover Image */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-5 bg-[#141824]">
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-mono font-medium bg-black/70 backdrop-blur-md text-cyan-300 border border-white/10">
                    {post.category}
                  </span>

                  {/* Read time */}
                  <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded text-[10px] font-mono bg-black/60 text-gray-300">
                    {post.readTime}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug group-hover:text-indigo-300 transition-colors mb-3">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
              </div>

              {/* Footer of Card */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs">
                <span className="text-gray-400 font-mono">{post.date}</span>
                <div className="flex items-center gap-1 font-semibold text-indigo-400 group-hover:text-cyan-300 transition-colors">
                  <span>Read Guide</span>
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

interface ContentHubProps {
  onSelectPost: (post: BlogPost) => void;
  onOpenVideoModal: () => void;
}

export const ContentHub: React.FC<ContentHubProps> = ({ onSelectPost, onOpenVideoModal }) => {
  return (
    <>
      <YouTubeSection onOpenVideoModal={onOpenVideoModal} />
      <BlogSection onSelectPost={onSelectPost} />
    </>
  );
};
