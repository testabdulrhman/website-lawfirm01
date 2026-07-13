/**
 * Pre-rendering script for SEO optimization
 * Generates static HTML for all routes using puppeteer-core + system Chromium
 * Run after `pnpm build`: node scripts/prerender.mjs
 */

import puppeteer from 'puppeteer-core';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist', 'public');
const PORT = 4173;

// All static routes to pre-render
const ROUTES = [
  '/',
  '/about',
  '/team',
  '/services',
  '/services/civil-commercial',
  '/services/labor',
  '/services/criminal',
  '/services/real-estate',
  '/services/bankruptcy',
  '/services/consultation',
  '/services/arbitration',
  '/services/documentation',
  '/services/personal-status',
  '/bankruptcy',
  '/bankruptcy/claims',
  '/bankruptcy/track',
  '/bankruptcy/ASHYAD-STEEL',
  '/bankruptcy/tajalriayaa',
  '/bankruptcy/Planting-for-Contracting',
  '/bankruptcy/Hassan-Misfer-Al-Zahrani',
  '/bankruptcy/Al-Anjaz-Hotel-Village',
  '/bankruptcy/Arcon-Gulf-Contracting',
  '/blog',
  '/blog/تعليق-المطالبات-في-نظام-الإفلاس-السعودي',
  '/blog/التسوية-الوقائية-في-نظام-الإفلاس-السعودي',
  '/blog/الدليل-الإرشادي-لنظام-الإفلاس-ولائحته-التنفيذية',
  '/contact',
  '/careers',
  '/privacy',
  '/terms',
  '/faq',
  '/cases-guide',
  '/sitemap',
];

// Simple static file server for the built files
function createStaticServer() {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
  };

  return createServer((req, res) => {
    let filePath = join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
    
    // If file doesn't exist, serve index.html (SPA fallback)
    if (!existsSync(filePath)) {
      filePath = join(DIST_DIR, 'index.html');
    }

    try {
      const content = readFileSync(filePath);
      const ext = '.' + filePath.split('.').pop();
      const contentType = mimeTypes[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    } catch (e) {
      // Fallback to index.html for SPA routing
      const content = readFileSync(join(DIST_DIR, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
}

async function prerender() {
  console.log('🚀 Starting pre-rendering...');
  console.log(`📁 Output directory: ${DIST_DIR}`);
  console.log(`📄 Routes to render: ${ROUTES.length}`);

  // Start static server
  const server = createStaticServer();
  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`🌐 Static server running on http://localhost:${PORT}`);

  // Launch browser
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/chromium',
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-web-security',
    ],
  });

  let successCount = 0;
  let errorCount = 0;

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    let html = null;
    let lastErr = null;
    // Try up to 2 times to avoid transient timeouts
    for (let attempt = 1; attempt <= 2 && html === null; attempt++) {
      let page;
      try {
        page = await browser.newPage();
        await page.setViewport({ width: 1280, height: 800 });
        await page.goto(url, {
          waitUntil: 'networkidle0',
          timeout: 60000,
        });
        await page.waitForSelector('#root', { timeout: 15000 });
        await new Promise(r => setTimeout(r, 1200));
        html = await page.content();
        await page.close();
      } catch (e) {
        lastErr = e;
        if (page) { try { await page.close(); } catch {} }
        if (attempt < 2) {
          console.warn(`  ⚠️  ${route}: المحاولة ${attempt} فشلت (${e.message})، إعادة المحاولة...`);
          await new Promise(r => setTimeout(r, 1000));
        }
      }
    }
    if (html === null) {
      errorCount++;
      console.error(`  ❌ ${route}: ${lastErr ? lastErr.message : 'فشل غير معروف'}`);
      continue;
    }
    try {

      // Clean up: remove scripts that shouldn't be in pre-rendered version
      // but keep the main app script for hydration
      
      // Remove duplicate title tags (keep the page-specific one from React/useSEO)
      const titleMatches = html.match(/<title[^>]*>.*?<\/title>/g);
      if (titleMatches && titleMatches.length > 1) {
        // Keep the LAST title (injected by React/useSEO) and remove the earlier static ones
        for (let i = 0; i < titleMatches.length - 1; i++) {
          html = html.replace(titleMatches[i], '');
        }
      }

      // Remove duplicate meta descriptions (keep the page-specific one)
      const descMatches = html.match(/<meta name="description"[^>]*>/g);
      if (descMatches && descMatches.length > 1) {
        for (let i = 1; i < descMatches.length; i++) {
          html = html.replace(descMatches[i], '');
        }
      }

      // Remove duplicate og:title
      const ogTitleMatches = html.match(/<meta property="og:title"[^>]*>/g);
      if (ogTitleMatches && ogTitleMatches.length > 1) {
        for (let i = 1; i < ogTitleMatches.length; i++) {
          html = html.replace(ogTitleMatches[i], '');
        }
      }

      // Remove duplicate og:description
      const ogDescMatches = html.match(/<meta property="og:description"[^>]*>/g);
      if (ogDescMatches && ogDescMatches.length > 1) {
        for (let i = 1; i < ogDescMatches.length; i++) {
          html = html.replace(ogDescMatches[i], '');
        }
      }

      // Remove duplicate twitter:title
      const twTitleMatches = html.match(/<meta name="twitter:title"[^>]*>/g);
      if (twTitleMatches && twTitleMatches.length > 1) {
        for (let i = 1; i < twTitleMatches.length; i++) {
          html = html.replace(twTitleMatches[i], '');
        }
      }

      // Remove duplicate og:url (keep the LAST one injected by React/useSEO)
      const ogUrlMatches = html.match(/<meta property="og:url"[^>]*>/g);
      if (ogUrlMatches && ogUrlMatches.length > 1) {
        for (let i = 0; i < ogUrlMatches.length - 1; i++) {
          html = html.replace(ogUrlMatches[i], '');
        }
      }

      // Remove duplicate canonical link (keep the LAST one injected by React/useSEO)
      const canonicalMatches = html.match(/<link[^>]*rel="canonical"[^>]*>/g);
      if (canonicalMatches && canonicalMatches.length > 1) {
        for (let i = 0; i < canonicalMatches.length - 1; i++) {
          html = html.replace(canonicalMatches[i], '');
        }
      }

      // Add prerender meta tag
      html = html.replace('<head>', '<head>\n    <meta name="prerender-status" content="200" />');

      // Determine output path
      const outputPath = route === '/' 
        ? join(DIST_DIR, 'index.html')
        : join(DIST_DIR, route, 'index.html');

      // Create directory if needed
      const outputDir = dirname(outputPath);
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      // Write the pre-rendered HTML
      writeFileSync(outputPath, html, 'utf-8');
      successCount++;
      console.log(`  ✅ ${route}`);
    } catch (error) {
      errorCount++;
      console.error(`  ❌ ${route}: ${error.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(`\n📊 Pre-rendering complete!`);
  console.log(`  ✅ Success: ${successCount}/${ROUTES.length}`);
  if (errorCount > 0) {
    console.log(`  ❌ Errors: ${errorCount}/${ROUTES.length}`);
  }
}

prerender().catch((error) => {
  console.error('Pre-rendering failed:', error);
  process.exit(1);
});
