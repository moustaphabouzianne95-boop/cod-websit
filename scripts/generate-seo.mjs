import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const fallbackUrl = 'https://maison-noor.example';
const siteUrl = (process.env.SITE_URL || fallbackUrl).replace(/\/+$/, '');
const lastModified = process.env.SITE_LASTMOD || new Date().toISOString().slice(0, 10);
const publicDir = resolve(process.cwd(), 'public');

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteUrl}/</loc>\n    <lastmod>${lastModified}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>1.0</priority>\n  </url>\n</urlset>\n`;

await mkdir(publicDir, { recursive: true });
await Promise.all([
  writeFile(resolve(publicDir, 'robots.txt'), robots),
  writeFile(resolve(publicDir, 'sitemap.xml'), sitemap),
]);

if (!process.env.SITE_URL) {
  console.warn(`\n[seo] SITE_URL is not set. Generated SEO files use ${fallbackUrl}. Set SITE_URL before your production deployment.\n`);
} else {
  console.log(`[seo] Generated robots.txt and sitemap.xml for ${siteUrl}`);
}
