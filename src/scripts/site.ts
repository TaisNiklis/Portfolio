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
  // A button may keep an icon: then only its [data-copy-label] text changes.
  const target = btn.querySelector<HTMLElement>('[data-copy-label]') ?? btn;
  btn.addEventListener('click', async () => {
    const label = target.textContent;
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      target.textContent = 'Copied';
    } catch {
      window.location.href = `mailto:${btn.dataset.copy}`;
    }
    setTimeout(() => (target.textContent = label), 1600);
  });
});

// CTA sticker pile: drops in once when it scrolls into view.
const pile = document.querySelector<HTMLElement>('.pile');
if (pile) {
  const pio = new IntersectionObserver((entries) => {
    if (entries.some((e) => e.isIntersecting)) { pile.classList.add('is-in'); pio.disconnect(); }
  }, { threshold: 0.25 });
  pio.observe(pile);
}

// Case study: the table of contents marks the section being read.
const tocLinks = [...document.querySelectorAll<HTMLAnchorElement>('[data-toc]')];
if (tocLinks.length) {
  const byId = new Map(tocLinks.map((a) => [a.dataset.toc!, a]));
  const sections = tocLinks.map((a) => document.getElementById(a.dataset.toc!)).filter(Boolean) as HTMLElement[];
  const mark = () => {
    let current = sections[0];
    for (const s of sections) if (s.getBoundingClientRect().top < window.innerHeight * 0.35) current = s;
    tocLinks.forEach((a) => a.classList.toggle('is-current', a.dataset.toc === current?.id));
    const link = current && byId.get(current.id);
    if (link) link.setAttribute('aria-current', 'location');
    tocLinks.forEach((a) => a !== link && a.removeAttribute('aria-current'));
  };
  let queued = false;
  window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(() => { queued = false; mark(); }); } }, { passive: true });
  mark();
}

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
