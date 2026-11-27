#!/usr/bin/env node
// Capture a screenshot of a web page (or one element of it) with Playwright.
//
// Usage:
//   node capture.cjs --url https://example.com --out shot.png
//        [--width 1440] [--height 900] [--full] [--selector "main"]
//        [--scale 2] [--wait 1500] [--hide ".cookie-banner, #intercom"]
//        [--dark] [--mobile]
//
// --full       capture the whole scrollable page instead of the viewport
// --selector   capture only this element
// --hide       CSS selectors to hide before capturing (cookie banners, chat widgets)
// --mobile     emulate a phone viewport (390x844, touch, mobile UA) unless width/height given
// --dark       prefers-color-scheme: dark

const { chromium } = require('playwright');

function parseArgs(argv) {
  const args = {};
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith('--')) args[key] = true;
    else { args[key] = next; i++; }
  }
  return args;
}

(async () => {
  const a = parseArgs(process.argv);
  if (!a.url || !a.out) {
    console.error('Usage: node capture.cjs --url <url> --out <file.png> [options]');
    process.exit(1);
  }
  const mobile = !!a.mobile;
  const width = parseInt(a.width || (mobile ? 390 : 1440), 10);
  const height = parseInt(a.height || (mobile ? 844 : 900), 10);
  const scale = parseFloat(a.scale || 2);

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: scale,
    isMobile: mobile,
    hasTouch: mobile,
    colorScheme: a.dark ? 'dark' : 'light',
    userAgent: mobile
      ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
      : undefined,
  });
  const page = await context.newPage();
  await page.goto(a.url, { waitUntil: 'networkidle', timeout: 60000 }).catch(async () => {
    // Some sites never go network-idle (analytics, websockets); fall back to load.
    await page.goto(a.url, { waitUntil: 'load', timeout: 60000 });
  });

  // Trigger lazy-loaded images by scrolling through the page once.
  if (a.full || a.selector) {
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
  }
  if (a.hide) {
    await page.addStyleTag({ content: `${a.hide} { display: none !important; }` });
  }
  await page.waitForTimeout(parseInt(a.wait || 800, 10));

  if (a.selector) {
    const el = page.locator(a.selector).first();
    await el.screenshot({ path: a.out, animations: 'disabled' });
  } else {
    await page.screenshot({ path: a.out, fullPage: !!a.full, animations: 'disabled' });
  }
  await browser.close();
  console.log(`saved ${a.out} (viewport ${width}x${height} @${scale}x${a.full ? ', full page' : ''})`);
})().catch(e => { console.error(e.message || e); process.exit(1); });
