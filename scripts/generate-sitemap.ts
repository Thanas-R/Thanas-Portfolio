/**
 * Generates public/sitemap.xml from a single source of truth.
 * Wired to predev + prebuild in package.json so it always reflects the
 * current routes + project list.
 */
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { projectsMeta } from '../src/data/projectsMeta';

const BASE_URL = 'https://thanas.vercel.app';
const today = new Date().toISOString().slice(0, 10);

interface Entry {
  path: string;
  changefreq?: string;
  priority?: string;
}

const entries: Entry[] = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/projects', changefreq: 'weekly', priority: '0.9' },
  { path: '/blogs', changefreq: 'weekly', priority: '0.9' },
  { path: '/resume', changefreq: 'monthly', priority: '0.8' },
  ...projectsMeta.map((p) => ({
    path: `/projects/${p.id}`,
    changefreq: 'monthly',
    priority: '0.7',
  })),
];

const urls = entries
  .map(
    (e) =>
      [
        '  <url>',
        `    <loc>${BASE_URL}${e.path}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
        e.priority ? `    <priority>${e.priority}</priority>` : null,
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n'),
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve('public/sitemap.xml'), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
