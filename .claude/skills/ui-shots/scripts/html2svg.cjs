#!/usr/bin/env node
// Convert a self-contained HTML illustration or UI mock into a layered, editable SVG.
//   node html2svg.cjs --input page.html --out page.svg [--size 954x537] [--selector body] [--preview page.png]
// Text stays <text>, boxes stay <rect>, inline icons stay vector, <img> are embedded.
// Refuses to save when a layout rule fails (see auditLayout in dom2svg.js); --allow-crop only on request.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const args = {}; const a = process.argv.slice(2);
for (let i = 0; i < a.length; i++) if (a[i].startsWith('--')) { const k = a[i].slice(2); const v = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true; args[k] = v; }
if (!args.input || !args.out) { console.error('usage: html2svg.cjs --input page.html --out page.svg [--size WxH] [--selector body] [--preview out.png]'); process.exit(1); }
const [W, H] = String(args.size || '954x537').split('x').map(Number);

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: W, height: H } });
  await p.goto('file://' + path.resolve(args.input));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(200);
  await p.addScriptTag({ path: path.join(__dirname, 'dom2svg.js') });
  const issues = await p.evaluate(sel => window.auditLayout(document.querySelector(sel)), args.selector || 'body');
  if (issues.length && !args['allow-crop']) {
    await b.close();
    console.error('NOT SAVED ' + args.out + ': ' + issues.join('; ') + '.\n  Fix: start every image at the top-left of its frame, let it run off only the right/bottom canvas edge, keep inner padding smaller than outer spacing (mark frames with class="frame").');
    process.exit(1);
  }
  const res = await p.evaluate(sel => window.domToSvg(document.querySelector(sel)), args.selector || 'body');
  const out = String(args.out).replace(/\.(png|jpe?g|webp)$/i, '').replace(/\.svg$/i, '') + '.svg';
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  fs.writeFileSync(out, res.svg);
  if (args.preview) await p.screenshot({ path: args.preview, clip: { x: 0, y: 0, width: W, height: H } });
  await b.close();
  if (res.warnings.length) console.warn('warning: ' + res.warnings.join('; '));
  console.log(`saved ${out} (${W}x${H} SVG)`);
})().catch(e => { console.error(e.message || e); process.exit(1); });
