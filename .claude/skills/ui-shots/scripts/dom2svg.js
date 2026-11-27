// Browser-side serializer: turn a rendered DOM subtree into a layered, editable SVG.
// Rectangles, borders, radii, gradients, shadows, text (as <text>), inline SVG icons and connectors
// stay vector; <img> screenshots are embedded as <image>. Overflow clipping becomes clipPath and 2D
// transforms become group matrices (3D tilt is flattened to its 2D part, with a warning).
// Usage in a page: const { svg, warnings } = window.domToSvg(rootElement)
(function () {
  const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const n = v => Math.round(v * 100) / 100;

  function color(c) {
    if (!c) return null;
    const m = c.match(/rgba?\(([^)]+)\)/);
    if (!m) return c === 'transparent' ? null : { hex: c, a: 1 };
    const p = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat);
    const a = p.length > 3 ? p[3] : 1;
    if (a === 0) return null;
    return { hex: '#' + p.slice(0, 3).map(v => Math.round(v).toString(16).padStart(2, '0')).join(''), a };
  }
  const paint = (attr, c) => c ? ` ${attr}="${c.hex}"${c.a < 1 ? ` ${attr}-opacity="${n(c.a)}"` : ''}` : '';

  function splitTop(s) { // split by commas outside parentheses
    const out = []; let depth = 0, cur = '';
    for (const ch of s) {
      if (ch === '(') depth++; if (ch === ')') depth--;
      if (ch === ',' && depth === 0) { out.push(cur.trim()); cur = ''; } else cur += ch;
    }
    if (cur.trim()) out.push(cur.trim());
    return out;
  }
  function radius(cs, w, h) {
    const v = cs.borderTopLeftRadius.split(' ')[0];
    const r = v.endsWith('%') ? parseFloat(v) / 100 * Math.min(w, h) : parseFloat(v) || 0;
    return Math.min(r, w / 2, h / 2);
  }

  function domToSvg(root) {
    const warnings = new Set();
    const defs = [];
    let uid = 0;
    const id = p => p + (++uid);

    // 1. Measure everything without transforms (transforms don't affect layout), keep the matrices.
    const all = [root, ...root.querySelectorAll('*')];
    const saved = [];
    const tf = new Map();
    for (const el of all) {
      // Elements inside an inline <svg> are copied as markup; their own transforms must stay untouched.
      if (el instanceof SVGElement && !(el instanceof SVGSVGElement)) continue;
      if (el instanceof SVGSVGElement && el.parentElement && el.parentElement.closest('svg')) continue;
      const cs = getComputedStyle(el);
      if (cs.transform && cs.transform !== 'none') {
        tf.set(el, { t: cs.transform, o: cs.transformOrigin });
        if (/matrix3d/.test(cs.transform)) warnings.add('3D transforms flattened to 2D');
        saved.push([el, el.style.transform]);
      }
    }
    for (const [el] of saved) el.style.setProperty('transform', 'none', 'important');
    const R0 = root.getBoundingClientRect();
    const rect = el => { const r = el.getBoundingClientRect(); return { x: r.left - R0.left, y: r.top - R0.top, w: r.width, h: r.height }; };

    function matrixAttr(el, r) {
      const t = tf.get(el); if (!t) return '';
      const m = new DOMMatrix(t.t);
      const [ox, oy] = t.o.split(' ').map(parseFloat);
      const M = new DOMMatrix().translate(r.x + ox, r.y + oy).multiply(new DOMMatrix([m.a, m.b, m.c, m.d, m.e, m.f])).translate(-(r.x + ox), -(r.y + oy));
      return ` transform="matrix(${[M.a, M.b, M.c, M.d, M.e, M.f].map(n).join(' ')})"`;
    }

    function gradientFill(bg, r) {
      const m = bg.match(/^(repeating-)?(linear|radial)-gradient\((.*)\)$/);
      if (!m) return null;
      const parts = splitTop(m[3]);
      let first = parts[0], x1 = 0.5, y1 = 0, x2 = 0.5, y2 = 1, along = r.h;
      const isDir = /deg|^to /.test(first);
      if (m[2] === 'linear' && isDir) {
        parts.shift();
        let ang = 180;
        if (/deg/.test(first)) ang = parseFloat(first);
        else ang = { 'to top': 0, 'to right': 90, 'to bottom': 180, 'to left': 270 }[first] ?? 180;
        const a = ang * Math.PI / 180, dx = Math.sin(a), dy = -Math.cos(a);
        x1 = 0.5 - dx / 2; y1 = 0.5 - dy / 2; x2 = 0.5 + dx / 2; y2 = 0.5 + dy / 2;
        along = Math.abs(dx) * r.w + Math.abs(dy) * r.h;
      } else if (m[2] === 'radial' && !/rgb|#|transparent/.test(first)) parts.shift();
      const stops = parts.map((p, i) => {
        const cm = p.match(/(rgba?\([^)]+\)|#[0-9a-f]+|transparent)\s*(.*)/i);
        const c = color(cm ? cm[1] : p) || { hex: '#000000', a: 0 };
        let off = null;
        if (cm && cm[2]) { const v = cm[2].split(' ')[0]; off = v.endsWith('%') ? parseFloat(v) / 100 : parseFloat(v) / along; }
        return { c, off: off == null ? i / Math.max(1, parts.length - 1) : Math.max(0, Math.min(1, off)) };
      });
      const gid = id('g');
      const st = stops.map(s => `<stop offset="${n(s.off)}" stop-color="${s.c.hex}"${s.c.a < 1 ? ` stop-opacity="${n(s.c.a)}"` : ''}/>`).join('');
      if (m[2] === 'linear') defs.push(`<linearGradient id="${gid}" x1="${n(x1)}" y1="${n(y1)}" x2="${n(x2)}" y2="${n(y2)}">${st}</linearGradient>`);
      else { defs.push(`<radialGradient id="${gid}" cx="0.5" cy="0.5" r="0.6">${st}</radialGradient>`); warnings.add('radial gradients approximated'); }
      return `url(#${gid})`;
    }

    function shadowFilter(bs) {
      if (!bs || bs === 'none') return '';
      const list = splitTop(bs).filter(s => !/inset/.test(s));
      const drops = list.map(s => {
        const cm = s.match(/rgba?\([^)]+\)/); const c = color(cm ? cm[0] : 'rgba(0,0,0,.2)');
        const nums = s.replace(/rgba?\([^)]+\)/, '').trim().split(/\s+/).map(parseFloat);
        const [dx = 0, dy = 0, blur = 0] = nums;
        return c ? `<feDropShadow dx="${n(dx)}" dy="${n(dy)}" stdDeviation="${n(blur / 2)}" flood-color="${c.hex}" flood-opacity="${n(c.a)}"/>` : '';
      }).filter(Boolean);
      if (!drops.length) return '';
      const fid = id('s');
      defs.push(`<filter id="${fid}" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB">${drops.join('')}</filter>`);
      return ` filter="url(#${fid})"`;
    }

    function box(el, cs, r) {
      let out = '';
      const rx = radius(cs, r.w, r.h);
      const rr = rx ? ` rx="${n(rx)}"` : '';
      const fills = [];
      const bc = color(cs.backgroundColor); if (bc) fills.push(paint('fill', bc).trim());
      const bi = cs.backgroundImage;
      if (bi && bi !== 'none') {
        for (const layer of splitTop(bi).reverse()) {
          if (/gradient\(/.test(layer)) { const g = gradientFill(layer, r); if (g) fills.push(`fill="${g}"`); }
          else if (/^url\(/.test(layer)) {
            const src = layer.slice(4, -1).replace(/^["']|["']$/g, '');
            const size = cs.backgroundSize.split(' ').map(parseFloat);
            if (size.length && !isNaN(size[0]) && size[0] < r.w) {
              const pid = id('p'), pw = size[0], ph = size[1] || size[0];
              defs.push(`<pattern id="${pid}" patternUnits="userSpaceOnUse" x="${n(r.x)}" y="${n(r.y)}" width="${n(pw)}" height="${n(ph)}"><image href="${src}" width="${n(pw)}" height="${n(ph)}"/></pattern>`);
              fills.push(`fill="url(#${pid})"`);
            } else out += `<image href="${src}" x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}" preserveAspectRatio="xMidYMid slice"/>`;
          }
        }
      }
      const shadow = shadowFilter(cs.boxShadow);
      const bw = parseFloat(cs.borderTopWidth) || 0, bcol = cs.borderTopStyle !== 'none' && bw ? color(cs.borderTopColor) : null;
      const shape = (attrs, inset = 0) => `<rect x="${n(r.x + inset)}" y="${n(r.y + inset)}" width="${n(Math.max(0, r.w - 2 * inset))}" height="${n(Math.max(0, r.h - 2 * inset))}"${rx ? ` rx="${n(Math.max(0, rx - inset))}"` : ''} ${attrs}/>`;
      if (fills.length) fills.forEach((f, i) => { out = shape(f + (i === 0 ? shadow : '')) + out; });
      else if (shadow) out = shape('fill="#ffffff"' + shadow) + out;
      if (bcol) out += shape(`fill="none"${paint('stroke', bcol)} stroke-width="${n(bw)}"`, bw / 2);
      const ow = parseFloat(cs.outlineWidth) || 0, oc = cs.outlineStyle !== 'none' && ow ? color(cs.outlineColor) : null;
      if (oc) { const off = parseFloat(cs.outlineOffset) || 0; out += shape(`fill="none"${paint('stroke', oc)} stroke-width="${n(ow)}"`, -off - ow / 2); }
      return { out, rx: rr };
    }

    function text(node, cs) {
      const s = node.textContent; if (!s.trim()) return '';
      const rg = document.createRange();
      const lines = [];
      for (let i = 0; i < s.length; i++) {
        rg.setStart(node, i); rg.setEnd(node, i + 1);
        const rs = rg.getClientRects(); if (!rs.length) continue;
        const q = rs[0]; if (q.width === 0 && s[i] !== ' ') continue;
        const top = Math.round(q.top - R0.top);
        let L = lines.find(l => Math.abs(l.top - top) < 3);
        if (!L) { L = { top, x: q.left - R0.left, h: q.height, s: '' }; lines.push(L); }
        L.s += s[i];
      }
      const fam = cs.fontFamily.split(',')[0].replace(/["']/g, '').trim();
      const c = color(cs.color);
      const tt = cs.textTransform;
      const ls = parseFloat(cs.letterSpacing) || 0;
      return lines.map(L => {
        let t = L.s.replace(/\s+/g, ' ').replace(/\s$/, '');
        if (tt === 'uppercase') t = t.toUpperCase();
        const base = L.top + L.h * 0.8;
        return `<text x="${n(L.x)}" y="${n(base)}" font-family="${esc(fam)}" font-size="${n(parseFloat(cs.fontSize))}" font-weight="${cs.fontWeight}"${cs.fontStyle === 'italic' ? ' font-style="italic"' : ''}${ls ? ` letter-spacing="${n(ls)}"` : ''}${paint('fill', c)} xml:space="preserve">${esc(t)}</text>`;
      }).join('');
    }

    function inlineSvg(el, r) {
      const vb = el.viewBox && el.viewBox.baseVal && el.viewBox.baseVal.width ? el.viewBox.baseVal : { x: 0, y: 0, width: r.w, height: r.h };
      const sx = r.w / vb.width, sy = r.h / vb.height;
      const cur = getComputedStyle(el).color;
      const attrs = [...el.attributes].filter(a => !['width', 'height', 'viewBox', 'style', 'xmlns', 'class'].includes(a.name))
        .map(a => ` ${a.name}="${esc(a.value === 'currentColor' ? cur : a.value)}"`).join('');
      const inner = el.innerHTML.replace(/currentColor/g, cur);
      return `<g transform="translate(${n(r.x - vb.x * sx)} ${n(r.y - vb.y * sy)}) scale(${n(sx)} ${n(sy)})"${attrs}>${inner}</g>`;
    }

    function walk(el) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) === 0) return '';
      if (cs.maskImage && cs.maskImage !== 'none' || cs.webkitMaskImage && cs.webkitMaskImage !== 'none') warnings.add('CSS masks dropped');
      const r = rect(el);
      const op = parseFloat(cs.opacity) < 1 ? ` opacity="${n(parseFloat(cs.opacity))}"` : '';
      if (el instanceof SVGSVGElement) return `<g${matrixAttr(el, r)}${op}>${inlineSvg(el, r)}</g>`;
      if (el.tagName === 'IMG') {
        const fit = cs.objectFit, pos = cs.objectPosition.split(' ');
        const ax = pos[0] === '0%' || pos[0] === 'left' ? 'xMin' : pos[0] === '100%' ? 'xMax' : 'xMid';
        const ay = (pos[1] || '50%') === '0%' ? 'YMin' : pos[1] === '100%' ? 'YMax' : 'YMid';
        const par = fit === 'fill' ? 'none' : `${ax}${ay} ${fit === 'contain' ? 'meet' : 'slice'}`;
        // Figma drops embedded images larger than 4096 px on a side: downscale big ones.
        let href = el.currentSrc || el.src;
        const big = Math.max(el.naturalWidth, el.naturalHeight);
        if (big > 4000) {
          const k = 4000 / big, cv = document.createElement('canvas');
          cv.width = Math.round(el.naturalWidth * k); cv.height = Math.round(el.naturalHeight * k);
          cv.getContext('2d').drawImage(el, 0, 0, cv.width, cv.height);
          href = cv.toDataURL('image/png');
          warnings.add('images over 4000 px downscaled for Figma');
        }
        let out = `<image href="${href}" x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}" preserveAspectRatio="${par}"/>`;
        const rx = radius(cs, r.w, r.h);
        if (rx) { const cid = id('c'); defs.push(`<clipPath id="${cid}"><rect x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}" rx="${n(rx)}"/></clipPath>`); out = `<g clip-path="url(#${cid})">${out}</g>`; }
        return `<g${matrixAttr(el, r)}${op}>${out}</g>`;
      }
      const b = box(el, cs, r);
      let kids = '';
      for (const c of el.childNodes) {
        if (c.nodeType === 3) kids += text(c, cs);
        else if (c.nodeType === 1) kids += walk(c);
      }
      if (cs.overflow !== 'visible' && kids) {
        const cid = id('c');
        defs.push(`<clipPath id="${cid}"><rect x="${n(r.x)}" y="${n(r.y)}" width="${n(r.w)}" height="${n(r.h)}"${b.rx}/></clipPath>`);
        kids = `<g clip-path="url(#${cid})">${kids}</g>`;
      }
      const body = b.out + kids;
      if (!body) return '';
      const name = el.id || (typeof el.className === 'string' && el.className.split(' ')[0]) || '';
      return `<g${name ? ` id="${esc(name)}-${uid++}"` : ''}${matrixAttr(el, r)}${op}>${body}</g>`;
    }

    const content = walk(root);
    for (const [el, v] of saved) el.style.transform = v;
    const W = n(R0.width), H = n(R0.height);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs>${defs.join('')}</defs>${content}</svg>`;
    return { svg, warnings: [...warnings] };
  }
  window.domToSvg = domToSvg;
})();
