import { useState, useEffect, useCallback } from 'react';
import { YOUTUBE_RECENT_VIDEOS } from '../data/siteData';
import { 
  fetchYouTubeViewCount, 
  fetchBatchYouTubeViewCounts, 
  formatViewCountDisplay,
  formatPublishedDate,
  getCachedYouTubeData,
  setCachedYouTubeData,
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
  publishedAt?: string;
  description?: string;
  likeCount?: number;
}

export const YOUTUBE_CHANNEL_INFO = {
  handle: '@PrakharRajput',
  displayName: 'Journey with Prakhar',
  channelId: 'UC3YMsynPRyw5xqZ-Xl-66Sw',
  channelUrl: 'https://www.youtube.com/@prakhar.rajput?sub_confirmation=1',
  videosPageUrl: 'https://www.youtube.com/@prakhar.rajput/videos',
  avatarUrl: '/image for website.jpg',
  subscribers: '1.6K+ subscribers',
  subscribersCount: '1.6K+',
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

const CACHE_KEY_POPULAR = 'channel_popular_videos';

export function useYouTube() {
  // Initialize with cached videos if available within TTL for zero-delay hydration
  const [videos, setVideos] = useState<YouTubeVideo[]>(() => {
    const cached = getCachedYouTubeData<YouTubeVideo[]>(CACHE_KEY_POPULAR);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached;
    }
    return YOUTUBE_RECENT_VIDEOS.slice(0, 5).map((v) => ({
      ...v,
      publishDate: formatPublishedDate(v.publishDate)
    }));
  });

  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo>(() => {
    const cached = getCachedYouTubeData<YouTubeVideo[]>(CACHE_KEY_POPULAR);
    if (cached && Array.isArray(cached) && cached.length > 0) {
      return cached[0];
    }
    return {
      ...YOUTUBE_RECENT_VIDEOS[0],
      publishDate: formatPublishedDate(YOUTUBE_RECENT_VIDEOS[0].publishDate)
    };
  });

  const [currentVideoStats, setCurrentVideoStats] = useState<YouTubeVideoStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshingStats, setIsRefreshingStats] = useState(false);
  const [isLivePlayerActive, setIsLivePlayerActive] = useState(false);
  const [lastViewCountUpdate, setLastViewCountUpdate] = useState<string>('Just now');

  // Request real-time view count for the active video
  const updateRealtimeViewCountForVideo = useCallback(async (videoId: string) => {
    setIsRefreshingStats(true);
    try {
      const stats = await fetchYouTubeViewCount(videoId);
      setCurrentVideoStats(stats);
      setLastViewCountUpdate(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }));

      const formattedDate = formatPublishedDate(stats.publishedAt);

      // Update the video in the active videos array state
      setVideos((prevVideos) =>
        prevVideos.map((v) => {
          if (v.id === videoId || v.youtubeId === videoId) {
            return {
              ...v,
              viewCount: stats.viewCount,
              views: stats.formattedViews,
              likeCount: stats.likeCount ?? v.likeCount,
              title: stats.title || v.title,
              publishDate: formattedDate !== 'Recent' ? formattedDate : v.publishDate,
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
            title: stats.title || prev.title,
            publishDate: formattedDate !== 'Recent' ? formattedDate : prev.publishDate,
          };
        }
        return prev;
      });
    } catch (err) {
      console.warn('Auto-sync note for video count:', err);
    } finally {
      setIsRefreshingStats(false);
    }
  }, []);

  // Automatic Background Sync on mount / page refresh
  useEffect(() => {
    let isMounted = true;

    async function syncYouTubeDataInBackground() {
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
              const accurateDate = formatPublishedDate(v.publishedAt || v.publishDate);
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
                publishDate: accurateDate,
                publishedAt: v.publishedAt,
                description: v.description || 'Watch authentic experiences and university guidance in Germany with Prakhar Rajput.',
                likeCount: v.likeCount
              };
            });

            if (isMounted && mappedVideos.length > 0) {
              setVideos(mappedVideos);
              setSelectedVideo(mappedVideos[0]);
              setCachedYouTubeData(CACHE_KEY_POPULAR, mappedVideos);
            }
          }
        }

        // Step 2: Fetch real-time view counts for all videos via YouTube Data API v3 batch
        const allVideoIds = YOUTUBE_RECENT_VIDEOS.map((v) => v.youtubeId || v.id);
        const batchStats = await fetchBatchYouTubeViewCounts(allVideoIds);

        if (isMounted && Object.keys(batchStats).length > 0) {
          setVideos((prevVideos) => {
            const updated = prevVideos.map((v) => {
              const videoKey = v.youtubeId || v.id;
              const stat = batchStats[videoKey];
              if (stat) {
                const accurateDate = formatPublishedDate(stat.publishedAt || v.publishDate);
                return {
                  ...v,
                  viewCount: stat.viewCount,
                  views: stat.formattedViews,
                  likeCount: stat.likeCount ?? v.likeCount,
                  publishDate: accurateDate !== 'Recent' ? accurateDate : v.publishDate,
                };
              }
              return v;
            });
            setCachedYouTubeData(CACHE_KEY_POPULAR, updated);
            return updated;
          });

          const activeKey = selectedVideo.youtubeId || selectedVideo.id;
          if (batchStats[activeKey]) {
            setCurrentVideoStats(batchStats[activeKey]);
          }
        }
      } catch (err) {
        console.debug('Background YouTube sync note:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    syncYouTubeDataInBackground();

    return () => {
      isMounted = false;
    };
  }, []);

  // When user clicks/selects a different video, automatically fetch its stats
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
