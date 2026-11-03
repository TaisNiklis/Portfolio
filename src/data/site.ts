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

// Hero tags: the work behind the cases. Draggable.
export const tags = [
  { text: 'Mapping 12 statuses', tone: 'blue', x: 4, y: 14, r: -8 },
  { text: 'Untangling roles', tone: 'amber', x: 16, y: 56, r: 6 },
  { text: 'Interviewing users', tone: 'ink', x: 36, y: 8, r: -4 },
  { text: 'Writing Claude skills', tone: 'soft', x: 52, y: 50, r: 7 },
  { text: 'Design tokens', tone: 'amber', x: 66, y: 12, r: -9 },
  { text: 'Shipping to dev', tone: 'blue', x: 72, y: 62, r: 5 },
  { text: 'UX audits', tone: 'soft', x: 0, y: 60, r: 4 },
  { text: 'AI onboarding', tone: 'ink', x: 84, y: 30, r: -6 },
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
      { value: '4', label: 'artefacts my skills draft: flows, CJM, roles, statuses' },
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

export const aiSteps = [
  {
    verb: 'Listen',
    text: 'I run the user interviews and stakeholder sessions. A skill turns my notes into a first customer journey map.',
    human: 'What to ask, and which pain matters most.',
  },
  {
    verb: 'Map',
    text: 'My skills draft the role matrix and the status map, so I start from a structure instead of a blank page.',
    human: 'The entity model and the status rules.',
  },
  {
    verb: 'Shape',
    text: 'A skill drafts the user flows; I design the IA and UI in Figma, with Figma AI for quick variants.',
    human: 'Navigation and every trade-off.',
  },
  {
    verb: 'Hand off',
    text: 'Annotated screen maps and edge cases for developers. case-study-writer turns the finished project into a case study.',
    human: 'What ships first and what waits.',
  },
] as const;

// Playground items. Copy is a draft for Taisiia to confirm; covers come later.
export const playground = [
  { title: 'Anime quiz', text: 'My own mobile quiz app. 1,000+ downloads, no paid ads.', tone: 'blue', x: 18, y: 17, r: -6 },
  { title: 'Pet owners app', text: 'An app for people who look after pets.', tone: 'amber', x: 65, y: 18, r: 5 },
  { title: 'Alias', text: 'A word-guessing party game, designed for one phone passed around.', tone: 'ink', x: 19, y: 56, r: 4 },
  { title: 'Recovery app', text: 'Getting mobility back after surgery and injuries, one exercise at a time.', tone: 'soft', x: 65, y: 56, r: -5 },
  { title: 'Drawings', text: 'Sketches and illustrations, mostly by hand.', tone: 'amber', x: 43, y: 58, r: -3 },
  { title: 'Claude skills', text: 'The skills behind my design pipeline, open on GitHub.', tone: 'blue', x: 43, y: 15, r: 3, href: person.links.skills },
] as const;

export const experience = [
  { years: '2025–26', company: 'ANODA', role: 'Product Designer, covering for the Design Lead' },
  { years: '2022–25', company: 'Pinta Webware', role: 'UI/UX Designer' },
  { years: '2023–24', company: 'Bleakers', role: 'UI/UX Designer, part-time' },
] as const;
