/**
 * Full SSR Pre-rendering Script
 * 
 * Uses Vite to build the app in SSR mode, then renders each route to full HTML.
 * This ensures crawlers see the complete page content without JavaScript.
 * 
 * Steps:
 * 1. Build the client bundle (already done by `vite build`)
 * 2. Build the SSR bundle (entry-server.tsx → dist/server/entry-server.js)
 * 3. For each route in seo-data.json, render to string and inject into the HTML shell
 * 4. Apply SEO meta tags (title, description, canonical, hreflang, schema)
 * 
 * Run after `vite build`: node scripts/prerender-ssr.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { build } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const DIST_DIR = join(PROJECT_ROOT, 'dist', 'public');
const SSR_OUT = join(PROJECT_ROOT, 'dist', 'server');
const SEO_DATA = JSON.parse(readFileSync(join(__dirname, 'seo-data.json'), 'utf-8'));

const SITE = 'https://redwan.sa';

function esc(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

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
  const isNoindex = seo.noindex === true;
  const canonical = isNoindex ? '' : (seo.canonical || (route === '/' ? `${SITE}/` : `${SITE}${route}`));
  const ogUrl = seo.ogUrl || canonical;
  const ogType = seo.ogType || 'website';

  // <title>
  html = replaceTag(html, /<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);

  // meta description
  html = replaceTag(html, /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(description)}" />`);

  // meta keywords removed - not used by modern search engines
  html = html.replace(/<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/g, '');

  // robots
  if (isNoindex) {
    html = replaceTag(html, /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/, `<meta name="robots" content="noindex, nofollow" />`);
    html = html.replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,'');
  } else {
    html = replaceTag(html, /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${esc(canonical)}" />`);
  }

  // Open Graph
  html = replaceTag(html, /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/, `<meta property="og:type" content="${esc(ogType)}" />`);
  html = replaceTag(html, /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${esc(ogUrl)}" />`);
  html = replaceTag(html, /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${esc(title)}" />`);
  html = replaceTag(html, /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${esc(ogDesc)}" />`);
  html = replaceTag(html, /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${esc(ogTitle)}" />`);
  html = replaceTag(html, /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${esc(ogDesc)}" />`);

  if (seo.ogImage) {
    html = replaceTag(html, /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/, `<meta property="og:image" content="${esc(seo.ogImage)}" />`);
    html = replaceTag(html, /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/, `<meta name="twitter:image" content="${esc(seo.ogImage)}" />`);
  }

  // FAQPage JSON-LD
  if (Array.isArray(seo.faq) && seo.faq.length > 0) {
    const faqLd = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: seo.faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    };
    const faqScript = `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>`;
    if (!/"@type":\s*"FAQPage"/.test(html)) {
      html = html.replace('</head>', `    ${faqScript}\n  </head>`);
    }
  }

  // hreflang
  const isEnglish = route.startsWith('/en');
  const isUrdu = route.startsWith('/ur');
  const basePath = isEnglish ? (route === '/en' ? '/' : route.replace(/^\/en/, '')) : isUrdu ? (route === '/ur' ? '/' : route.replace(/^\/ur/, '')) : route;
  const arPath = basePath;
  const enPath = basePath === '/' ? '/en' : `/en${basePath}`;
  const arUrl = arPath === '/' ? `${SITE}/` : `${SITE}${arPath}`;
  const enUrl = `${SITE}${enPath}`;
  const hreflangLinks = [
    `<link rel="alternate" hreflang="ar" href="${esc(arUrl)}" />`,
    `<link rel="alternate" hreflang="en" href="${esc(enUrl)}" />`,
    `<link rel="alternate" hreflang="x-default" href="${esc(arUrl)}" />`,
  ];
  // Add Urdu hreflang if this is a page with Urdu version
  if (isUrdu || basePath === '/premium-residency') {
    const urUrl = `${SITE}/ur${basePath === '/' ? '' : basePath}`;
    hreflangLinks.push(`<link rel="alternate" hreflang="ur" href="${esc(urUrl)}" />`);
  }
  html = html.replace('</head>', `    ${hreflangLinks.join('\n    ')}\n  </head>`);

  // lang/dir for English pages
  if (isEnglish) {
    html = html.replace(/lang="ar"/, 'lang="en"');
    html = html.replace(/dir="rtl"/, 'dir="ltr"');
  }
  // lang for Urdu pages (keep dir=rtl)
  if (isUrdu) {
    html = html.replace(/lang="ar"/, 'lang="ur"');
  }

  // prerender marker
  if (!/name="prerender-status"/.test(html)) {
    html = html.replace('<head>', '<head>\n    <meta name="prerender-status" content="200" />');
  }

  return html;
}

async function run() {
  console.log('🚀 Full SSR Pre-rendering...');
  console.log('📦 Step 1: Building SSR bundle...');

  // Build the SSR bundle
  await build({
    root: join(PROJECT_ROOT, 'client'),
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@/': join(PROJECT_ROOT, 'client', 'src') + '/',
        '@shared/': join(PROJECT_ROOT, 'shared') + '/',
        '@assets/': join(PROJECT_ROOT, 'attached_assets') + '/',
      },
    },
    build: {
      ssr: join(PROJECT_ROOT, 'client', 'src', 'entry-server.tsx'),
      outDir: SSR_OUT,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm',
        },
      },
    },
    logLevel: 'warn',
  });

  console.log('✅ SSR bundle built');
  console.log('🎨 Step 2: Rendering pages...');

  // Polyfill WebSocket for Node.js < 22 (required by Supabase Realtime)
  if (!globalThis.WebSocket) {
    try {
      const { default: WebSocket } = await import('ws');
      globalThis.WebSocket = WebSocket;
    } catch (e) {
      // ws not available, try to continue anyway
    }
  }

  // Import the SSR module
  const { render } = await import(join(SSR_OUT, 'entry-server.js'));

  // Read the HTML shell
  const indexPath = join(DIST_DIR, 'index.html');
  if (!existsSync(indexPath)) {
    console.error('❌ dist/public/index.html not found. Run vite build first.');
    process.exit(1);
  }
  const baseHtml = readFileSync(indexPath, 'utf-8');

  const routes = Object.keys(SEO_DATA);
  let count = 0;
  let errors = 0;

  for (const route of routes) {
    try {
      const seo = SEO_DATA[route];
      
      // Render the React app for this route
      const { html: appHtml } = render(route);
      
      // Inject the rendered HTML into the shell
      let html = baseHtml.replace(
        '<div id="root"></div>',
        `<div id="root">${appHtml}</div>`
      );

      // Apply SEO meta tags
      html = applySEO(html, seo, route);

      // Write the output file
      const outputPath = route === '/' ? join(DIST_DIR, 'index.html') : join(DIST_DIR, route, 'index.html');
      const outputDir = dirname(outputPath);
      if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

      writeFileSync(outputPath, html, 'utf-8');
      count++;
      
      // Show content size to verify it's not empty
      const contentSize = appHtml.length;
      console.log(`  ✅ ${route} (${(contentSize / 1024).toFixed(1)}KB content)`);
    } catch (err) {
      errors++;
      console.error(`  ❌ ${route}: ${err.message}`);
    }
  }

  console.log(`\n📊 Done! ${count}/${routes.length} routes rendered. ${errors} errors.`);

  // Copy 404/index.html to 404.html at root
  const notFoundSource = join(DIST_DIR, '404', 'index.html');
  const notFoundDest = join(DIST_DIR, '404.html');
  if (existsSync(notFoundSource)) {
    copyFileSync(notFoundSource, notFoundDest);
    console.log('  📄 404.html copied as fallback');
  }
}

run().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
