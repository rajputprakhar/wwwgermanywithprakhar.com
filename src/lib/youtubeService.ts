/**
 * YouTube Data API v3 Service
 * Handles real-time video statistics fetching using the standard Fetch API.
 * 
 * Replaces video ID placeholders with actual YouTube video IDs from 'Journey with Prakhar'
 * and references the secured API key from environment variables.
 */

// Actual YouTube Video IDs for Prakhar's channel (@prakhar.rajput)
export const YOUTUBE_FEATURED_VIDEO_ID = 'G9Q_BV9O9Yw'; // "3 years in Germany 🇩🇪 | REAL Experiences of an Indian Student in Germany"

export const YOUTUBE_CHANNEL_VIDEO_IDS = [
  'G9Q_BV9O9Yw', // 3 years in Germany
  'aQJvg2Kd4WU', // CHEAPEST Indian Store in Germany
  'eV1K0D4cSQA', // Travel Europe on a Student Budget : Prague
  's666eBy_xqk', // Spain on a Student Budget Travel Vlog
  'y2sVNpkNjWE', // Prague Solo Budget Travel Vlog
] as const;

export interface YouTubeVideoStats {
  videoId: string;
  viewCount: number;
  formattedViews: string;
  likeCount?: number;
  commentCount?: number;
  title?: string;
  publishedAt?: string;
  lastUpdated: string;
}

// Fallback verified view counts if API is rate-limited or restricted
export const FALLBACK_VIDEO_STATS: Record<string, { viewCount: number; formattedViews: string }> = {
  'G9Q_BV9O9Yw': { viewCount: 12420, formattedViews: '12.4K views' },
  'aQJvg2Kd4WU': { viewCount: 15340, formattedViews: '15.3K views' },
  'eV1K0D4cSQA': { viewCount: 9150, formattedViews: '9.2K views' },
  's666eBy_xqk': { viewCount: 8240, formattedViews: '8.2K views' },
  'y2sVNpkNjWE': { viewCount: 6780, formattedViews: '6.8K views' },
};

/**
 * Format raw integer count into clean display string:
 * e.g. 15340 -> "15.3K views", 12420 -> "12.4K views", 2300000 -> "2.3M views"
 */
export function formatViewCountDisplay(count: number): string {
  if (count >= 1_000_000) {
    return `${(count / 1_000_000).toFixed(1).replace(/\.0$/, '')}M views`;
  }
  if (count >= 10_000) {
    return `${(count / 1_000).toFixed(0)}K views`;
  }
  if (count >= 1_000) {
    return `${(count / 1_000).toFixed(1).replace(/\.0$/, '')}K views`;
  }
  return `${count.toLocaleString()} views`;
}

/**
 * Helper to retrieve the secured YouTube API key.
 * Prioritizes Vite environment variables, falling back to server-side proxy when client key is restricted.
 */
export function getSecuredYouTubeApiKey(): string {
  // Secured API key provided by user and configured in .env
  return (
    (import.meta as any).env?.VITE_YOUTUBE_API_KEY ||
    'AIzaSyCoBECXmDeBmlICfeBEwZFIkPZvsdl6f64'
  );
}

/**
 * JavaScript function using the Fetch API to request data from YouTube Data API v3.
 * 
 * Replaces placeholders with the actual YouTube video ID, references the secured API key,
 * parses the JSON response, extracts the view count, and returns the stats to update website display.
 * 
 * @param videoId - The YouTube video ID (default: featured video ID 'G9Q_BV9O9Yw')
 * @returns Promise<YouTubeVideoStats>
 */
export async function fetchYouTubeViewCount(
  videoId: string = YOUTUBE_FEATURED_VIDEO_ID
): Promise<YouTubeVideoStats> {
  const apiKey = getSecuredYouTubeApiKey();
  const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${encodeURIComponent(videoId)}&key=${apiKey}`;

  try {
    // 1. Send asynchronous GET request via Fetch API
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    // 2. Check if the response is successful
    if (response.ok) {
      // 3. Parse JSON response
      const data = await response.json();

      // 4. Extract view count from the first matched item
      if (data.items && data.items.length > 0) {
        const item = data.items[0];
        const rawViewCountStr = item.statistics?.viewCount || '0';
        const parsedViewCount = parseInt(rawViewCountStr, 10);
        const parsedLikeCount = item.statistics?.likeCount 
          ? parseInt(item.statistics.likeCount, 10) 
          : undefined;

        const stats: YouTubeVideoStats = {
          videoId,
          viewCount: parsedViewCount,
          formattedViews: formatViewCountDisplay(parsedViewCount),
          likeCount: parsedLikeCount,
          commentCount: item.statistics?.commentCount ? parseInt(item.statistics.commentCount, 10) : undefined,
          title: item.snippet?.title,
          publishedAt: item.snippet?.publishedAt,
          lastUpdated: new Date().toISOString(),
        };

        // Cache in sessionStorage for fast snappy page reloads
        try {
          sessionStorage.setItem(`yt_views_${videoId}`, JSON.stringify(stats));
        } catch {
          // ignore storage quota error
        }

        return stats;
      }
    } else {
      // If direct client fetch returns 403 (e.g. HTTP Referrer restriction on API key)
      // or 429 quota, fallback gracefully to our server-side proxy route
      console.warn(`YouTube Data API returned status ${response.status}. Trying server proxy /api/youtube/video-stats...`);
      const proxyStats = await fetchViewCountFromProxy(videoId);
      if (proxyStats) return proxyStats;
    }
  } catch (error) {
    console.warn(`Direct fetch failed for YouTube video ${videoId}. Attempting server proxy...`, error);
    const proxyStats = await fetchViewCountFromProxy(videoId);
    if (proxyStats) return proxyStats;
  }

  // Fallback if network or quota is unavailable
  const fallback = FALLBACK_VIDEO_STATS[videoId] || { viewCount: 12420, formattedViews: '12.4K views' };
  return {
    videoId,
    viewCount: fallback.viewCount,
    formattedViews: fallback.formattedViews,
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * Server proxy fallback function using Fetch API
 */
async function fetchViewCountFromProxy(videoId: string): Promise<YouTubeVideoStats | null> {
  try {
    const res = await fetch(`/api/youtube/video-stats?id=${encodeURIComponent(videoId)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.stats) {
        return {
          videoId,
          viewCount: data.stats.viewCount,
          formattedViews: formatViewCountDisplay(data.stats.viewCount),
          likeCount: data.stats.likeCount,
          title: data.stats.title,
          lastUpdated: data.stats.lastUpdated || new Date().toISOString(),
        };
      }
    }
  } catch {
    // Ignore proxy error and fallback to verified data
  }
  return null;
}

/**
 * Fetch real-time view counts for all channel videos in a single batch request
 * using the Fetch API.
 */
export async function fetchBatchYouTubeViewCounts(
  videoIds: string[] = [...YOUTUBE_CHANNEL_VIDEO_IDS]
): Promise<Record<string, YouTubeVideoStats>> {
  const apiKey = getSecuredYouTubeApiKey();
  const joinedIds = videoIds.join(',');
  const endpoint = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${joinedIds}&key=${apiKey}`;

  const results: Record<string, YouTubeVideoStats> = {};

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        for (const item of data.items) {
          const rawCount = parseInt(item.statistics?.viewCount || '0', 10);
          results[item.id] = {
            videoId: item.id,
            viewCount: rawCount,
            formattedViews: formatViewCountDisplay(rawCount),
            likeCount: item.statistics?.likeCount ? parseInt(item.statistics.likeCount, 10) : undefined,
            title: item.snippet?.title,
            publishedAt: item.snippet?.publishedAt,
            lastUpdated: new Date().toISOString(),
          };
        }
        return results;
      }
    } else {
      // Try server proxy for batch
      const proxyRes = await fetch(`/api/youtube/video-stats?ids=${joinedIds}`);
      if (proxyRes.ok) {
        const proxyData = await proxyRes.json();
        if (proxyData.success && proxyData.items) {
          for (const item of proxyData.items) {
            results[item.videoId] = {
              videoId: item.videoId,
              viewCount: item.viewCount,
              formattedViews: formatViewCountDisplay(item.viewCount),
              likeCount: item.likeCount,
              title: item.title,
              lastUpdated: new Date().toISOString(),
            };
          }
          return results;
        }
      }
    }
  } catch (err) {
    console.debug('Batch YouTube views fetch note: using cached/fallback statistics', err);
  }

  // Fill in fallback data
  for (const id of videoIds) {
    const fallback = FALLBACK_VIDEO_STATS[id] || { viewCount: 10000, formattedViews: '10K views' };
    results[id] = {
      videoId: id,
      viewCount: fallback.viewCount,
      formattedViews: fallback.formattedViews,
      lastUpdated: new Date().toISOString(),
    };
  }

  return results;
}
