// The sitemap: the pages that are offered, which is the landing page while
// there is no pricing page (see SHOW_PRICING).
import type { APIRoute } from 'astro';
import { SITE_URL, SHOW_PRICING } from '../data/site';

export const GET: APIRoute = ({ site }) => {
  const base = (site ?? new URL(SITE_URL)).href.replace(/\/$/, '');
  const paths = ['/', ...(SHOW_PRICING ? ['/pricing'] : [])];
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map(
      (path) =>
        `  <url>\n    <loc>${base}${path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`
    )
    .join('\n');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { 'Content-Type': 'application/xml' } }
  );
};
