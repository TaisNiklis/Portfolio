// Site copy and lists in one place, so text edits never touch layout code.

export const person = {
  name: 'Taisiia Silkina',
  first: 'Taisiia',
  role: 'Product designer for B2B SaaS & AI',
  email: 'niklistais@gmail.com',
  location: 'Dnipro, Ukraine',
  links: {
    linkedin: 'https://www.linkedin.com/in/taisia-silkina',
    behance: 'https://www.behance.net/taisiasilkina',
    dribbble: 'https://dribbble.com/NiklisTais',
    cv: 'https://taisniklis.github.io/CV/',
    skills: 'https://github.com/TaisNiklis/portfolio/tree/main/.claude/skills/case-study-writer',
  },
};

// Intro video in the second hero card. Drop the file into /public (e.g. public/intro.mp4) and set the name here.
// Empty = the card shows the portrait instead.
export const introVideo = '';

// Hero tags: the work behind the cases. Scattered around the hero, they drift at different speeds on scroll.
// x/y are % of the hero box; speed is the parallax factor (higher = moves faster).
export const tags = [
  { text: 'Mapping 12 statuses', x: 3, y: 6, r: -8, speed: 0.35 },
  { text: 'Untangling roles', x: 8, y: 40, r: 6, speed: 0.15 },
  { text: 'Interviewing users', x: 1, y: 74, r: -4, speed: 0.5 },
  { text: 'UX audits', x: 22, y: 92, r: 4, speed: 0.25 },
  { text: 'Design tokens', x: 80, y: 4, r: -9, speed: 0.45 },
  { text: 'Writing Claude skills', x: 82, y: 38, r: 7, speed: 0.2 },
  { text: 'Shipping to dev', x: 86, y: 70, r: 5, speed: 0.4 },
  { text: 'AI onboarding', x: 66, y: 92, r: -6, speed: 0.3 },
] as const;

// Selected work. `slug` set = a live case page; otherwise the card says the case is in progress.
export const work = [
  {
    year: '2026',
    slug: 'connected-campaign-lifecycle-ai-platform',
    title: 'Scattered tools into one workflow',
    text: 'An AI advertising platform felt like separate tools. I rebuilt it around one Project entity, one guided flow and an AI assistant inside the work.',
    metrics: [
      { value: '12 × 8', label: 'statuses × roles in one model' },
      { value: '≈½', label: 'of the estimated time for the full design scope' },
    ],
    visual: 'entity',
  },
  {
    year: '2026',
    title: 'Design system: 35% faster development',
    text: 'Figma variables, tokens and auto layout shared by designers and developers across client products at ANODA.',
    metrics: [
      { value: '−35%', label: 'development time' },
      { value: '−15%', label: 'project budget' },
    ],
    visual: 'tokens',
  },
  {
    year: '2026',
    title: 'My AI pipeline of Claude skills',
    text: 'Own Claude skills draft user flows, journey maps and role and status matrices from interview notes. The decisions stay mine.',
    metrics: [
      { value: 'up to −40%', label: 'UX process and review time' },
      { value: '6', label: 'artefacts AI drafts: report, statuses, roles, IA, flows, prototypes' },
    ],
    visual: 'skills',
  },
  {
    year: '2022–25',
    title: 'Site redesign: +167% conversion',
    text: 'A new information architecture and page structure for Pinta Webware’s own website.',
    metrics: [{ value: '+167%', label: 'conversion' }],
    visual: 'conversion',
  },
] as const;

// How I work, brief to delivery: one short line per stage.
export const pipeline = [
  { stage: 'Brief', me: 'Requirements, goals and the expected result, written as AI-ready docs.' },
  { stage: 'Research', me: 'Market, competitors, users and analytics. AI packs it into a report.' },
  { stage: 'Model', me: 'Status map, roles and IA: AI drafts, the client signs off.' },
  { stage: 'Flows', me: 'User flows after sign-off; the design system starts in parallel.' },
  { stage: 'Design', me: 'UI tested on wireframes or clickable prototypes built with Claude.' },
  { stage: 'Hand off', me: 'Client demo, developer docs and a screen map.' },
  { stage: 'Deliver', me: 'Results measured with analytics; AI drafts the case study.' },
] as const;

// Shown under the pipeline: where the line between AI and me sits.
export const aiPrinciple = {
  title: 'AI never owns a decision.',
  text: 'AI misses constraints and the whole picture. Holding that picture is my job.',
};

export const pipelineStats = [
  { value: '−40%', label: 'UX process and review time' },
  { value: '6', label: 'artefacts AI drafts for me' },
  { value: '7', label: 'stages, brief to delivery' },
] as const;

// Playground items. Copy is a draft for Taisiia to confirm; covers come later.
export const playground = [
  { title: 'Anime quiz', text: 'My own mobile quiz app. 1,000+ downloads, no paid ads.', tone: 'blue', x: 24, y: 8, r: -6 },
  { title: 'Pet owners app', text: 'An app for people who look after pets.', tone: 'amber', x: 64, y: 9, r: 5 },
  { title: 'Alias', text: 'A word-guessing party game, designed for one phone passed around.', tone: 'ink', x: 23, y: 64, r: 4 },
  { title: 'Recovery app', text: 'Getting mobility back after surgery and injuries, one exercise at a time.', tone: 'soft', x: 65, y: 63, r: -5 },
  { title: 'Drawings', text: 'Sketches and illustrations, mostly by hand.', tone: 'amber', x: 44, y: 67, r: -3 },
  { title: 'Claude skills', text: 'The skills behind my design pipeline, open on GitHub.', tone: 'blue', x: 44, y: 5, r: 3, href: person.links.skills },
] as const;

export const experience = [
  { years: '2025–26', company: 'ANODA', role: 'Product Designer, covering for the Design Lead' },
  { years: '2022–25', company: 'Pinta Webware', role: 'Product Designer' },
  { years: '2023–24', company: 'Bleakers', role: 'UI/UX Designer, part-time' },
] as const;
