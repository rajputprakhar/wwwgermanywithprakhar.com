import { useState, useEffect } from 'react';
import { YOUTUBE_RECENT_VIDEOS } from '../data/siteData';

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
 * e.g. 15340 -> "15K views", 2300000 -> "2.3M views", 9150 -> "9.1K views"
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

  if (count >= 1_000_000) {
    const formatted = (count / 1_000_000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}M views`;
  }
  if (count >= 10_000) {
    const formatted = (count / 1_000).toFixed(0);
    return `${formatted}K views`;
  }
  if (count >= 1_000) {
    const formatted = (count / 1_000).toFixed(1).replace(/\.0$/, '');
    return `${formatted}K views`;
  }
  return `${Math.round(count).toLocaleString()} views`;
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLivePlayerActive, setIsLivePlayerActive] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function fetchTopPopularVideos() {
      setIsLoading(true);
      try {
        // Step 1: Query backend popular videos endpoint (strict order=viewCount, maxResults=5)
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
                description: v.description || 'Watch authentic experiences and university guidance in Germany with Prakhar Rajput.'
              };
            });

            if (isMounted && mappedVideos.length > 0) {
              setVideos(mappedVideos);
              return;
            }
          }
        }

        // Step 2: Direct YouTube Data API v3 fallback if a key is available in environment
        const clientApiKey = (import.meta as any).env?.VITE_YOUTUBE_API_KEY;
        if (clientApiKey) {
          const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${encodeURIComponent(YOUTUBE_CHANNEL_INFO.channelId)}&order=viewCount&maxResults=5&type=video&key=${clientApiKey}`;
          const searchRes = await fetch(searchUrl);

          if (searchRes.ok) {
            const searchData = await searchRes.json();
            const videoIds = (searchData.items || [])
              .map((item: any) => item.id?.videoId)
              .filter(Boolean);

            if (videoIds.length > 0) {
              const statsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(',')}&key=${clientApiKey}`;
              const statsRes = await fetch(statsUrl);

              if (statsRes.ok) {
                const statsData = await statsRes.json();
                const fetched: YouTubeVideo[] = (statsData.items || []).map((item: any) => {
                  const rawCount = parseInt(item.statistics?.viewCount || '0', 10);
                  return {
                    id: item.id,
                    youtubeId: item.id,
                    title: item.snippet?.title || '',
                    url: `https://www.youtube.com/watch?v=${item.id}`,
                    thumbnail: item.snippet?.thumbnails?.maxres?.url || 
                               item.snippet?.thumbnails?.high?.url || 
                               `https://i.ytimg.com/vi/${item.id}/maxresdefault.jpg`,
                    category: 'Popular Video',
                    duration: parseDuration(item.contentDetails?.duration || ''),
                    viewCount: rawCount,
                    views: formatViewCount(rawCount),
                    publishDate: item.snippet?.publishedAt ? new Date(item.snippet.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent',
                    description: item.snippet?.description?.slice(0, 180) || ''
                  };
                });

                fetched.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
                const top5 = fetched.slice(0, 5);

                if (isMounted && top5.length > 0) {
                  setVideos(top5);
                  return;
                }
              }
            }
          }
        }
      } catch (err) {
        console.debug('Dynamic YouTube popular videos fetch note: falling back to verified top 5 uploads', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchTopPopularVideos();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    videos,
    selectedVideo,
    setSelectedVideo,
    isLoading,
    isLivePlayerActive,
    setIsLivePlayerActive,
    channelInfo: YOUTUBE_CHANNEL_INFO,
  };
}

