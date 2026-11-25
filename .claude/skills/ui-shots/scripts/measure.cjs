#!/usr/bin/env node
// Measure the rendered size of image slots on a page, e.g. the <img>/<figure> slots of a
// case-study page template, so a shot can be rendered at exactly that size.
//
// Usage:
//   node measure.cjs --url https://site.com/cases/foo [--selector "article img, figure"]
//        [--width 1440]
//
// Prints one JSON line per matching element: { index, selector, width, height, ratio, src }
// Sizes are CSS pixels at the given viewport width. Render at --scale 2 for retina.

const { chromium } = require('playwright');

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i];
  if (k.startsWith('--')) { args[k.slice(2)] = process.argv[i + 1]; i++; }
}
if (!args.url) {
  console.error('Usage: node measure.cjs --url <url> [--selector <css>] [--width 1440]');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: parseInt(args.width || 1440, 10), height: 900 } });
  await page.goto(args.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
  const selector = args.selector || 'main img, article img, figure';
  const rows = await page.$$eval(selector, els => els.map((el, index) => {
    const r = el.getBoundingClientRect();
    return {
      index,
      tag: el.tagName.toLowerCase(),
      width: Math.round(r.width),
      height: Math.round(r.height),
      ratio: r.height ? +(r.width / r.height).toFixed(3) : null,
      src: el.currentSrc || el.getAttribute('src') || null,
    };
  }));
  rows.filter(r => r.width > 0).forEach(r => console.log(JSON.stringify(r)));
  await browser.close();
})().catch(e => { console.error(e.message || e); process.exit(1); });
