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

// Selected work. `slug` = a case page on this site; `href` = the case published elsewhere (Behance).
export const work = [
  {
    slug: 'connected-campaign-lifecycle-ai-platform',
    title: 'AI-powered B2B advertising platform',
    text: 'An AI ad platform covered the campaign cycle, but users saw separate tools. Reports were split, and the AI assistant was unnoticed. As UX lead, I audited users and rebuilt the product around one Project, a guided flow, and an AI assistant. We shipped in batches before a presentation, and the client continued with us.',
    metrics: [
      { value: '2× faster', label: 'of the estimated time for the full design scope' },
      { value: '12 × 8', label: 'statuses × roles in one status model' },
    ],
    visual: 'entity',
  },
  {
    href: person.links.behance,
    title: 'Redesigning a service platform for beauty and healthcare',
    text: 'Service connects customers with beauty and healthcare providers through a mobile app and a web platform. The provider platform supports professionals and businesses in managing services, specialists, branches, and profiles. I audited and redesigned the provider web platform to improve visual consistency and user experience.',
    metrics: [
      { value: '−35%', label: 'development time' },
      { value: '−15%', label: 'project budget' },
    ],
    visual: 'tokens',
  },
  {
    href: person.links.behance,
    title: 'Real Estate Referral Platform',
    text: 'Service connects property informants with real estate agents seeking opportunities. Contributors submit leads, track progress, and earn rewards on sales. The design structured a transparent process linking contributors, managers, and agents, respecting their roles and permissions.',
    metrics: [{ value: '3 roles', label: 'One connected ecosystem' }],
    visual: 'roles',
  },
  {
    href: person.links.behance,
    title: 'Complex HR Management Platform',
    text: 'Remote Leverage manages distributed talent operations, supporting timesheets, payments, and document handling. I improved a prototype into a structured product, aligning business needs with user workflows, design, and a reusable system.',
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
