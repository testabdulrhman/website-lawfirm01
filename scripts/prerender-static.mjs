/**
 * Static SEO pre-rendering (no browser required).
 * Reads the built dist/public/index.html and, for each route in seo-data.json,
 * injects unique <title>, meta description/keywords, Open Graph, Twitter and
 * canonical tags, then writes route/index.html.
 *
 * This runs in ANY deployment environment because it does NOT use Chromium/puppeteer.
 * Run after `vite build`: node scripts/prerender-static.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist', 'public');
const SEO_DATA = JSON.parse(readFileSync(join(__dirname, 'seo-data.json'), 'utf-8'));

const SITE = 'https://redwan.sa';

// Escape values for safe insertion into HTML attribute / text contexts.
function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Replace first occurrence matched by regex; if not found, return original.
function replaceTag(html, regex, replacement) {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html;
}

function applySEO(html, seo, route) {
  const title = seo.title || '';
  const description = seo.description || '';
  const keywords = seo.keywords || '';
  const ogTitle = seo.ogTitle || title;
  const ogDesc = seo.ogDesc || description;
  const canonical = seo.canonical || (route === '/' ? `${SITE}/` : `${SITE}${route}`);
  const ogUrl = seo.ogUrl || canonical;
  const ogType = seo.ogType || 'website';

  // <title>
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);

  // meta description
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${esc(description)}" />`
  );

  // meta keywords
  if (keywords) {
    html = replaceTag(
      html,
      /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${esc(keywords)}" />`
    );
  }

  // canonical
  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${esc(canonical)}" />`
  );

  // og:type
  html = replaceTag(
    html,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${esc(ogType)}" />`
  );

  // og:url
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${esc(ogUrl)}" />`
  );

  // og:title
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${esc(ogTitle)}" />`
  );

  // og:description
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${esc(ogDesc)}" />`
  );

  // twitter:title
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${esc(ogTitle)}" />`
  );

  // twitter:description
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${esc(ogDesc)}" />`
  );

  // og:image + twitter:image (only when a page-specific image is provided)
  if (seo.ogImage) {
    html = replaceTag(
      html,
      /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${esc(seo.ogImage)}" />`
    );
    html = replaceTag(
      html,
      /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${esc(seo.ogImage)}" />`
    );
  }

  // prerender marker
  if (!/name="prerender-status"/.test(html)) {
    html = html.replace('<head>', '<head>\n    <meta name="prerender-status" content="200" />');
  }

  return html;
}

function run() {
  console.log('🚀 Static SEO pre-rendering (no browser)...');
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ dist/public/index.html not found. Run vite build first.');
    process.exit(1);
  }
  const baseHtml = readFileSync(indexPath, 'utf-8');

  const routes = Object.keys(SEO_DATA);
  let count = 0;

  for (const route of routes) {
    const seo = SEO_DATA[route];
    const html = applySEO(baseHtml, seo, route);

    const outputPath =
      route === '/' ? join(DIST_DIR, 'index.html') : join(DIST_DIR, route, 'index.html');
    const outputDir = dirname(outputPath);
    if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

    writeFileSync(outputPath, html, 'utf-8');
    count++;
    console.log(`  ✅ ${route}`);
  }

  console.log(`\n📊 Done! ${count}/${routes.length} routes written with unique SEO tags.`);
}

run();
