import fs from 'fs';
import path from 'path';

/**
 * Sitemap Generator for germanywithprakhar.com
 * Automatically runs during build and outputs compliant XML sitemap to public/ and dist/
 */

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
  images?: Array<{
    loc: string;
    title?: string;
    caption?: string;
  }>;
}

const DOMAIN = 'https://germanywithprakhar.com';
const TODAY = new Date().toISOString().split('T')[0];

const URLS: SitemapUrl[] = [
  {
    loc: `${DOMAIN}/`,
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: 1.0,
    images: [
      {
        loc: `${DOMAIN}/logo.png`,
        title: 'germanywithprakhar Logo',
        caption: 'Official emblem and platform logo for germanywithprakhar by Prakhar Rajput'
      },
      {
        loc: `${DOMAIN}/image-for-website.jpg`,
        title: 'Prakhar Rajput - CS @ University of Bremen',
        caption: 'Prakhar Rajput, founder of germanywithprakhar and student mentor in Bremen, Germany'
      }
    ]
  },
  {
    loc: `${DOMAIN}/?section=consulting`,
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: 0.9
  },
  {
    loc: `${DOMAIN}/?section=stories`,
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: 0.85
  },
  {
    loc: `${DOMAIN}/?tool=bavarian-grade-calculator`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${DOMAIN}/?tool=cost-of-living-calculator`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${DOMAIN}/?tool=admission-profile-evaluator`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: 0.8
  },
  {
    loc: `${DOMAIN}/?section=toolkit`,
    lastmod: TODAY,
    changefreq: 'weekly',
    priority: 0.8
  },
  {
    loc: `${DOMAIN}/?post=bremen-5-things`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: 0.75,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1517760444937-f6397edcbbcd?w=800&auto=format&fit=crop&q=80',
        title: '5 Things I Wish I Knew Before Moving to Bremen',
        caption: 'Bremen student guide, semester ticket tips, and student jobs in Lower Saxony'
      }
    ]
  },
  {
    loc: `${DOMAIN}/?post=german-visa-interview`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: 0.75,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80',
        title: 'Acing the German Student Visa Interview',
        caption: 'VFS and German Consulate interview preparation, blocked account proof, and motives'
      }
    ]
  },
  {
    loc: `${DOMAIN}/?post=tech-portfolio-student`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: 0.75,
    images: [
      {
        loc: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
        title: 'How to Build a Tech Portfolio as an International Student',
        caption: 'Landing Werkstudent and HiWi student developer positions in Germany'
      }
    ]
  },
  {
    loc: `${DOMAIN}/?section=faq`,
    lastmod: TODAY,
    changefreq: 'monthly',
    priority: 0.7
  }
];

function generateSitemapXml(urls: SitemapUrl[]): string {
  const xmlEntries = urls.map((entry) => {
    let item = '  <url>\n';
    item += `    <loc>${entry.loc}</loc>\n`;
    if (entry.lastmod) {
      item += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      item += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (typeof entry.priority === 'number') {
      item += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    if (entry.images && entry.images.length > 0) {
      for (const img of entry.images) {
        item += '    <image:image>\n';
        item += `      <image:loc>${img.loc}</image:loc>\n`;
        if (img.title) {
          const escapedTitle = img.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          item += `      <image:title>${escapedTitle}</image:title>\n`;
        }
        if (img.caption) {
          const escapedCaption = img.caption.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          item += `      <image:caption>${escapedCaption}</image:caption>\n`;
        }
        item += '    </image:image>\n';
      }
    }
    item += '  </url>';
    return item;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${xmlEntries}
</urlset>
`;
}

function generateRobotsTxt(): string {
  return `# robots.txt for germanywithprakhar.com
User-agent: *
Allow: /

# Sitemap Index
Sitemap: ${DOMAIN}/sitemap.xml
`;
}

function run() {
  console.log('Generating sitemap.xml and robots.txt for germanywithprakhar.com...');

  const sitemapXml = generateSitemapXml(URLS);
  const robotsTxt = generateRobotsTxt();

  const rootDir = process.cwd();
  const publicDir = path.join(rootDir, 'public');
  const distDir = path.join(rootDir, 'dist');

  // Ensure public directory exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Write to public/
  const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
  const publicRobotsPath = path.join(publicDir, 'robots.txt');
  fs.writeFileSync(publicSitemapPath, sitemapXml, 'utf-8');
  fs.writeFileSync(publicRobotsPath, robotsTxt, 'utf-8');
  console.log(`✓ Generated ${publicSitemapPath} (${URLS.length} URLs indexed)`);
  console.log(`✓ Generated ${publicRobotsPath}`);

  // 2. Also write to dist/ if dist directory already exists
  if (fs.existsSync(distDir)) {
    const distSitemapPath = path.join(distDir, 'sitemap.xml');
    const distRobotsPath = path.join(distDir, 'robots.txt');
    fs.writeFileSync(distSitemapPath, sitemapXml, 'utf-8');
    fs.writeFileSync(distRobotsPath, robotsTxt, 'utf-8');
    console.log(`✓ Synchronized ${distSitemapPath}`);
    console.log(`✓ Synchronized ${distRobotsPath}`);
  }

  console.log('🎉 Sitemap and robots.txt generation complete!');
}

run();
