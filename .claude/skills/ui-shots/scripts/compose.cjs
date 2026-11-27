#!/usr/bin/env node
// Compose presentation shots: put screenshots into device frames on a background with a
// shadow, and render a PNG of an exact size. Rendering is plain HTML/CSS in headless Chromium.
//
// Single shot:
//   node compose.cjs --input shot.png --out out.png --size 1600x1200 --preset soft-browser
//        [--input second.png ...] [--device iphone] [--background "#EEF"] [--scale 2] ...
//
// Batch (one browser for many shots):
//   node compose.cjs --batch jobs.json        # jobs.json = [ {input:[...], out, size, preset, ...}, ... ]
//
// Option precedence: built-in defaults < preset file < job/CLI options.
// Every option is documented in DEFAULTS below and in references/options.md.

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const SKILL_DIR = path.resolve(__dirname, '..');

const DEFAULTS = {
  size: '1600x1200',      // output size in px at scale 1
  scale: 1,               // pixel multiplier for the PNG (2 = retina)
  layout: 'row',          // row | grid | masonry | overlap
  device: 'browser',      // none | card | glass | browser | browser-dark | iphone | ipad | ipad-landscape | macbook
  fit: 'contain',         // row layout: contain | crop | bleed
  redact: null,           // blur regions for NDA: [{x,y,w,h}] px or fractions, measured after clip
  clip: null,             // crop the source first: {x,y,w,h} in px, or fractions if <= 1, e.g. {"h": 0.4}
  crop: 'top',            // top | center | bottom | 0..1 (which part of a too-tall screenshot shows); a list = one per screenshot
  padding: 0.08,          // fraction of the canvas' shorter side (or px if > 1)
  gap: 0.04,              // space between devices, same units as padding
  stagger: 0,             // row: vertical offset of every other device, fraction of canvas height
  fan: 0,                 // row: rotate devices like a fan; number = max degrees at the ends, or a list per device
  align: 'center',        // row: top | center | bottom
  columns: null,          // grid/masonry: number of columns
  colOffset: null,        // grid/masonry: per-column vertical shift in cell heights, e.g. [0, 0.15, 0.3]
  cellWidth: null,        // masonry: cell width as a fraction of canvas width (default 0.3)
  cellAspect: null,       // grid/masonry: w/h of a cell for flexible devices (default: first screenshot)
  repeat: true,           // masonry: repeat screenshots to fill the frame (false = each screen once)
  perColumn: null,        // masonry with repeat:false: screens per column, e.g. [1, 2] = hero left, two right
  flow: 'columns',        // grid/masonry: columns (shifted up/down) or rows (shifted sideways, brick wall)
  overlap: null,          // overlap layout: {dx, dy, fade} — shift of each next page (fractions of W/H), fade of back pages 0..1
  zoom: 1,                // close-up: scale the whole composition
  focus: null,            // close-up: [fx, fy] point of the composition (0..1) to zoom into
  anchor: null,           // close-up: where that point lands on the canvas, [x, y] 0..1 (default centre)
  rotate: null,           // whole group rotation in degrees (masonry default -18)
  background: '#F2F2F0',  // CSS background, or auto | auto-light | auto-soft | auto-muted | auto-accent | auto-dark | auto-aurora
  accent: null,           // brand colour (hex) to base auto-* colours on; null = detect from the screenshots
  bgImage: null,          // path to a background image (covers the canvas)
  pattern: null,          // background pattern: hex | dots | grid, or {type, size, opacity, color}
  grain: 0,               // 0..0.15 film-grain overlay on the background
  shadow: 'medium',       // none | soft | medium | deep | float | glow | any CSS box-shadow
  shadowColor: '#0B0B14', // shadow tint, or auto (taken from the screenshot's accent colour)
  depth: 0,               // slab thickness of card/glass/browser: px, or fraction of device width if <= 1
  depthColor: null,       // colour of the slab edge (default light grey / near-black)
  stack: 0,               // 1-3 "stacked cards" peeking out above a card/glass/browser
  radius: null,           // corner radius: px, or fraction of device width if <= 1 (null = device default)
  border: null,           // CSS border for card/browser, e.g. "1px solid rgba(0,0,0,.08)"
  frameColor: null,       // phone/tablet body: CSS colour, or metal silver | titanium | graphite | rose | gold | midnight
  url: null,              // text in the browser address bar (null = no address bar)
  island: true,           // draw the iPhone dynamic island
  tilt: null,             // { rx, ry, rz } degrees, 3D tilt of the whole group
  widths: null,           // row: relative widths per device, e.g. [0.72, 0.28] for desktop + mobile
  labels: null,           // row: tag above each device, e.g. ["Desktop", "Mobile"] or ["Before", "After"]
  callout: null,          // zoom on a detail: {x,y,w,h (px or fractions of the screenshot), scale, dx, dy, screen} or a list
  logo: null,             // brand mark in a corner: {src: path, position: bottom-left, height: 0.035}
  maxDeviceWidth: null,   // row: cap one device's width (fraction of canvas width if <= 1)
  darkBg: null,           // force dark-background styling of glass/stack (null = detect)
  positions: null,        // layout "free": [{x, y, w}] top-left and width of each input, fractions of the canvas
  annotations: null,      // cards with dashed connectors: [{title, text, icon, x, y, w, to: [fx, fy], screen}]
  annotationColor: null,  // connector + icon colour (default: the accent)
  focusBlur: null,        // keep {x, y, w, h} of a screenshot sharp and blur the rest: {x,y,w,h, blur, screen}
  allowCrop: false,       // false = refuse to save a shot where any screen is cut (runs off the canvas,
                          // is cut inside its frame, or is clipped). Set true (--allow-crop) ONLY when
                          // the user explicitly asked for a crop, close-up or wall.
};

function parseCli(argv) {
  const out = { input: [] };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (!a.startsWith('--')) continue;
    const key = a.slice(2);
    const next = argv[i + 1];
    let val = true;
    if (next !== undefined && !next.startsWith('--')) { val = next; i++; }
    if (key === 'input') { out.input.push(...String(val).split(',').map(s => s.trim()).filter(Boolean)); continue; }
    if (typeof val === 'string') {
      if (/^-?\d+(\.\d+)?$/.test(val)) val = parseFloat(val);
      else if (val === 'true' || val === 'false') val = val === 'true';
      else if (/^[{[]/.test(val)) { try { val = JSON.parse(val); } catch (_) {} }
    }
    out[key] = val;
  }
  if (!out.input.length) delete out.input;
  return out;
}

function loadPreset(name) {
  if (!name) return {};
  const candidates = [name, path.join(SKILL_DIR, 'presets', name), path.join(SKILL_DIR, 'presets', `${name}.json`)];
  for (const c of candidates) {
    if (fs.existsSync(c) && fs.statSync(c).isFile()) {
      const p = JSON.parse(fs.readFileSync(c, 'utf8'));
      delete p.$description; delete p.$example;
      return p;
    }
  }
  throw new Error(`Preset not found: ${name} (looked in ${path.join(SKILL_DIR, 'presets')})`);
}

function dataUrl(file) {
  const ext = path.extname(file).slice(1).toLowerCase();
  const mime = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', gif: 'image/gif', svg: 'image/svg+xml' }[ext] || 'image/png';
  return `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`;
}

function resolveJob(job) {
  const preset = loadPreset(job.preset);
  const cfg = { ...DEFAULTS, ...preset, ...job };
  if (job['allow-crop'] != null) cfg.allowCrop = job['allow-crop'];
  const inputs = [].concat(cfg.input || []);
  if (!inputs.length) throw new Error('No --input given');
  if (!cfg.out) throw new Error('No --out given');
  for (const f of inputs) if (!fs.existsSync(f)) throw new Error(`Input not found: ${f}`);
  const m = String(cfg.size).match(/^(\d+)\s*[x×]\s*(\d+)$/i);
  if (!m) throw new Error(`Bad --size "${cfg.size}", expected WxH like 1600x1200`);
  cfg.width = parseInt(m[1], 10);
  cfg.height = parseInt(m[2], 10);
  cfg.images = inputs.map(dataUrl);
  cfg.bgImageData = cfg.bgImage ? dataUrl(cfg.bgImage) : null;
  if (cfg.logo && typeof cfg.logo === 'string') cfg.logo = { src: cfg.logo };
  cfg.logoData = cfg.logo && cfg.logo.src ? dataUrl(cfg.logo.src) : null;
  return cfg;
}

// ---------------------------------------------------------------------------------------------
// The page: everything below runs inside Chromium.
// ---------------------------------------------------------------------------------------------
const PAGE = fs.readFileSync(path.join(__dirname, 'page.html'), 'utf8');

async function renderAll(jobs) {
  const browser = await chromium.launch();
  let failed = 0;
  try {
    for (const job of jobs) {
      const cfg = resolveJob(job);
      const page = await browser.newPage({ viewport: { width: cfg.width, height: cfg.height }, deviceScaleFactor: cfg.scale });
      await page.setContent(PAGE);
      const info = await page.evaluate(c => window.render(c), cfg);
      // Layout rules (crop only at the canvas edge, top-left never cut, inner padding < outer).
      await page.addScriptTag({ path: path.join(__dirname, 'dom2svg.js') });
      info.crops = await page.evaluate(() => window.auditLayout(document.getElementById('canvas'), { frames: '.dev' }));
      if (cfg.clip) info.crops.push('clip crops the source screenshots');
      if (info.crops && info.crops.length) {
        if (!cfg.allowCrop) {
          // Screens must be shown whole. Don't write a cropped file that could slip into a case.
          await page.close();
          failed++;
          console.error(`NOT SAVED ${cfg.out}: ${info.crops.join('; ')}.\n  Fix: keep every image's top-left inside the canvas and its frame; let images run off only the right/bottom canvas edge; inner padding smaller than outer; no clip/zoom/cover;` +
            ` lift a detail with "callout" instead. Pass --allow-crop only if the user asked for a crop or close-up.`);
          continue;
        }
        console.warn(`warning (${cfg.out}): cropped on purpose (allowCrop): ${info.crops.join('; ')}`);
      }
      // Output is always SVG: frames, backgrounds, shadows, labels and annotations stay vector and
      // editable (Figma imports them as layers); screenshots are embedded as images.
      const out = cfg.out.replace(/\.(png|jpe?g|webp)$/i, '') .replace(/\.svg$/i, '') + '.svg';
      if (!/\.svg$/i.test(cfg.out)) console.warn(`note: output is SVG only, writing ${out}`);
      fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
      const res = await page.evaluate(() => window.domToSvg(document.getElementById('canvas')));
      fs.writeFileSync(out, res.svg);
      if (cfg.preview) await page.locator('#canvas').screenshot({ path: cfg.preview === true ? out.replace(/\.svg$/, '.preview.png') : cfg.preview });
      await page.close();
      if (info.warning) console.warn(`warning (${out}): ${info.warning}`);
      if (res.warnings.length) console.warn(`warning (${out}): ${res.warnings.join('; ')}`);
      console.log(`saved ${out} (${cfg.width}x${cfg.height} SVG, layout=${cfg.layout}, device=${cfg.device}, preset=${job.preset || '-'}, bg=${info.background}, accent=${info.accent})`);
    }
  } finally {
    await browser.close();
  }
  if (failed) { console.error(`${failed} shot(s) not saved because screens were cut off.`); process.exitCode = 1; }
}

(async () => {
  const cli = parseCli(process.argv);
  let jobs;
  if (cli.batch) {
    const list = JSON.parse(fs.readFileSync(cli.batch, 'utf8'));
    const { batch, ...shared } = cli;
    jobs = list.map(j => ({ ...shared, ...j }));
  } else if (cli.config) {
    const { config, ...rest } = cli;
    jobs = [{ ...JSON.parse(fs.readFileSync(config, 'utf8')), ...rest }];
  } else {
    jobs = [cli];
  }
  await renderAll(jobs);
})().catch(e => { console.error(e.message || e); process.exit(1); });
