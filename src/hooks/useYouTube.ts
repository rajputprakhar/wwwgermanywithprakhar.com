import { useState, useEffect, useCallback } from 'react';
import { YOUTUBE_RECENT_VIDEOS } from '../data/siteData';
import { 
  fetchYouTubeViewCount, 
  fetchBatchYouTubeViewCounts, 
  formatViewCountDisplay,
  YouTubeVideoStats,
  YOUTUBE_FEATURED_VIDEO_ID
} from '../lib/youtubeService';

export interface YouTubeVideo {
  id: string;
  youtubeId?: string;
  title: string;
  url: string;
  thumbnail: string;
  category?: string;
  duration?: string;
  viewCount?: number;
  views?: string;
  publishDate?: string;
  description?: string;
  likeCount?: number;
}

export const YOUTUBE_CHANNEL_INFO = {
  handle: '@prakhar.rajput',
  channelId: 'UC3YMsynPRyw5xqZ-Xl-66Sw',
  channelUrl: 'https://www.youtube.com/@prakhar.rajput',
  videosPageUrl: 'https://www.youtube.com/@prakhar.rajput/videos',
  subscribers: '1.6K+',
  verified: true,
};

/**
 * Cleanly formats real view count numbers:
 * e.g. 15340 -> "15.3K views", 2300000 -> "2.3M views", 9150 -> "9.2K views"
 */
export function formatViewCount(rawViews: number | string | undefined): string {
  if (rawViews === undefined || rawViews === null || rawViews === '') {
    return '0 views';
  }

  let count: number;

  if (typeof rawViews === 'number') {
    count = rawViews;
  } else {
    const trimmed = String(rawViews).trim();
    if (trimmed.toLowerCase().endsWith('views')) {
      return trimmed;
    }
    const numericPart = trimmed.replace(/[^0-9.]/g, '');
    const parsed = parseFloat(numericPart);

    if (isNaN(parsed)) {
      return `${trimmed} views`;
    }

    if (trimmed.toUpperCase().includes('M')) {
      count = parsed * 1_000_000;
    } else if (trimmed.toUpperCase().includes('K')) {
      count = parsed * 1_000;
    } else {
      count = parsed;
    }
  }

  return formatViewCountDisplay(count);
}

function parseDuration(durationStr: string): string {
  const match = durationStr.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '10:00';
  const h = match[1] ? parseInt(match[1], 10) : 0;
  const m = match[2] ? parseInt(match[2], 10) : 0;
  const s = match[3] ? parseInt(match[3], 10) : 0;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

export function useYouTube() {
  const [videos, setVideos] = useState<YouTubeVideo[]>(YOUTUBE_RECENT_VIDEOS.slice(0, 5));
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo>(YOUTUBE_RECENT_VIDEOS[0]);
  const [currentVideoStats, setCurrentVideoStats] = useState<YouTubeVideoStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshingStats, setIsRefreshingStats] = useState(false);
  const [isLivePlayerActive, setIsLivePlayerActive] = useState(false);
  const [lastViewCountUpdate, setLastViewCountUpdate] = useState<string>('Just now');

  // Request real-time view count for the active video using the fetchYouTubeViewCount API function
  const updateRealtimeViewCountForVideo = useCallback(async (videoId: string) => {
    setIsRefreshingStats(true);
    try {
      const stats = await fetchYouTubeViewCount(videoId);
      setCurrentVideoStats(stats);
      setLastViewCountUpdate(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

      // Also update the video in the active videos array state
      setVideos((prevVideos) =>
        prevVideos.map((v) => {
          if (v.id === videoId || v.youtubeId === videoId) {
            return {
              ...v,
              viewCount: stats.viewCount,
              views: stats.formattedViews,
              likeCount: stats.likeCount ?? v.likeCount,
            };
          }
          return v;
        })
      );

      // Update selected video object state
      setSelectedVideo((prev) => {
        if (prev.id === videoId || prev.youtubeId === videoId) {
          return {
            ...prev,
            viewCount: stats.viewCount,
            views: stats.formattedViews,
            likeCount: stats.likeCount ?? prev.likeCount,
          };
        }
        return prev;
      });
    } catch (err) {
      console.warn('Error updating real-time view count:', err);
    } finally {
      setIsRefreshingStats(false);
    }
  }, []);

  // Initial load: Fetch top popular videos & real-time batch statistics
  useEffect(() => {
    let isMounted = true;

    async function initializeYouTubeData() {
      setIsLoading(true);
      try {
        // Step 1: Query backend popular videos endpoint
        const response = await fetch(
          `/api/youtube/popular?channelId=${encodeURIComponent(YOUTUBE_CHANNEL_INFO.channelId)}&order=viewCount&maxResults=5`
        );

        if (response.ok) {
          const data = await response.json();
          if (data.success && Array.isArray(data.videos) && data.videos.length > 0) {
            const mappedVideos: YouTubeVideo[] = data.videos.slice(0, 5).map((v: any) => {
              const numericCount = typeof v.viewCount === 'number' ? v.viewCount : parseInt(v.viewCount || '0', 10);
              return {
                id: v.id,
                youtubeId: v.youtubeId || v.id,
                title: v.title,
                url: v.url || `https://www.youtube.com/watch?v=${v.id}`,
                thumbnail: v.thumbnail,
                category: v.category || 'Popular Video',
                duration: v.duration || '10:00',
                viewCount: numericCount,
                views: formatViewCount(numericCount > 0 ? numericCount : v.views),
                publishDate: v.publishDate || 'Recent',
                description: v.description || 'Watch authentic experiences and university guidance in Germany with Prakhar Rajput.',
                likeCount: v.likeCount
              };
            });

            if (isMounted && mappedVideos.length > 0) {
              setVideos(mappedVideos);
              setSelectedVideo(mappedVideos[0]);
            }
          }
        }

        // Step 2: Fetch real-time view counts for all videos via YouTube Data API v3 fetch function
        const allVideoIds = YOUTUBE_RECENT_VIDEOS.map((v) => v.youtubeId || v.id);
        const batchStats = await fetchBatchYouTubeViewCounts(allVideoIds);

        if (isMounted && Object.keys(batchStats).length > 0) {
          setVideos((prevVideos) =>
            prevVideos.map((v) => {
              const videoKey = v.youtubeId || v.id;
              const stat = batchStats[videoKey];
              if (stat) {
                return {
                  ...v,
                  viewCount: stat.viewCount,
                  views: stat.formattedViews,
                  likeCount: stat.likeCount ?? v.likeCount,
                };
              }
              return v;
            })
          );

          const activeKey = selectedVideo.youtubeId || selectedVideo.id;
          if (batchStats[activeKey]) {
            setCurrentVideoStats(batchStats[activeKey]);
          }
        }
      } catch (err) {
        console.debug('Dynamic YouTube popular videos fetch note: falling back to verified uploads', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initializeYouTubeData();

    return () => {
      isMounted = false;
    };
  }, []);

  // When user clicks/selects a different video, fetch its real-time stats
  const selectVideoWithStats = useCallback((video: YouTubeVideo) => {
    setSelectedVideo(video);
    updateRealtimeViewCountForVideo(video.youtubeId || video.id);
  }, [updateRealtimeViewCountForVideo]);

  return {
    videos,
    selectedVideo,
    setSelectedVideo: selectVideoWithStats,
    currentVideoStats,
    isLoading,
    isRefreshingStats,
    isLivePlayerActive,
    setIsLivePlayerActive,
    refreshRealtimeViews: () => updateRealtimeViewCountForVideo(selectedVideo.youtubeId || selectedVideo.id),
    lastViewCountUpdate,
    channelInfo: YOUTUBE_CHANNEL_INFO,
  };
}
