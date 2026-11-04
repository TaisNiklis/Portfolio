const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Section entrances: each [data-reveal] rises once as it enters.
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  },
  { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
);
document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));

// Copy email
document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const label = btn.textContent;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      btn.textContent = 'Copied';
    } catch {
      window.location.href = `mailto:${btn.dataset.copy}`;
    }
    setTimeout(() => (btn.textContent = label), 1600);
  });
});

// Work cards stack: as the next card slides over, the one beneath shrinks and dims a little.
const stack = [...document.querySelectorAll<HTMLElement>('[data-stack]')];
if (stack.length > 1 && !reduce) {
  let queued = false;
  const update = () => {
    queued = false;
    stack.forEach((card, i) => {
      const next = stack[i + 1];
      if (!next) return;
      const c = card.getBoundingClientRect(), n = next.getBoundingClientRect();
      const p = Math.min(Math.max((c.bottom - n.top) / c.height, 0), 1);
      card.style.setProperty('--s', (1 - p * 0.06).toFixed(3));
      card.style.setProperty('--b', (1 - p * 0.12).toFixed(3));
    });
  };
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

// Playground: the canvas opens centred on its title; with a mouse it can be dragged to look around.
const canvas = document.querySelector<HTMLElement>('[data-canvas]');
if (canvas) {
  let touched = false;
  const centre = () => {
    if (touched) return;
    canvas.scrollLeft = (canvas.scrollWidth - canvas.clientWidth) / 2;
    canvas.scrollTop = (canvas.scrollHeight - canvas.clientHeight) / 2;
  };
  centre();
  new ResizeObserver(centre).observe(canvas);
  canvas.addEventListener('wheel', () => (touched = true), { passive: true });
  canvas.addEventListener('touchstart', () => (touched = true), { passive: true });

  if (window.matchMedia('(pointer: fine)').matches) {
    let down = false, sx = 0, sy = 0, sl = 0, st = 0, moved = false;
    canvas.addEventListener('pointerdown', (e) => {
      if ((e.target as HTMLElement).closest('a, button')) return;
      touched = true; down = true; moved = false;
      sx = e.clientX; sy = e.clientY; sl = canvas.scrollLeft; st = canvas.scrollTop;
      canvas.classList.add('is-dragging');
    });
    window.addEventListener('pointermove', (e) => {
      if (!down) return;
      if (Math.abs(e.clientX - sx) + Math.abs(e.clientY - sy) > 4) moved = true;
      canvas.scrollLeft = sl - (e.clientX - sx);
      canvas.scrollTop = st - (e.clientY - sy);
    });
    window.addEventListener('pointerup', () => {
      down = false;
      canvas.classList.remove('is-dragging');
    });
    canvas.addEventListener('click', (e) => { if (moved) e.preventDefault(); }, true);
  }
}

// One moving picture: the portrait drifts slowly with the scroll.
const drift = document.querySelector<HTMLElement>('[data-drift]');
if (drift && !reduce) {
  const onScroll = () => {
    const r = drift.getBoundingClientRect();
    const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
    drift.style.setProperty('--drift', `${(p * -6).toFixed(2)}%`);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
