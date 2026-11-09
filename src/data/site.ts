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
    facts: ['UX lead', 'AI · AdTech', 'Web', '2026'],
    highlights: [
      'Audit and 9 interviews: 5 users, then 4 department leads',
      'New IA around one Project, with Projects and Tools as two modes',
      'Status model for 12 statuses and 8 roles',
      'Shipped to developers in batches; the client kept working with us',
    ],
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
    facts: ['Product designer', 'Beauty · Healthcare', 'Web platform'],
    highlights: [
      'UX audit of the provider web platform',
      'Redesign of services, specialists, branches and profiles',
      'One consistent visual system across the platform',
    ],
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
    facts: ['Product designer', 'Real estate · Referrals'],
    highlights: [
      'One lead flow from contributor to manager to agent',
      'Roles and permissions for 3 user types',
      'Lead tracking and rewards that contributors can follow',
    ],
    text: 'Service connects property informants with real estate agents seeking opportunities. Contributors submit leads, track progress, and earn rewards on sales. The design structured a transparent process linking contributors, managers, and agents, respecting their roles and permissions.',
    metrics: [{ value: '3 roles', label: 'One connected ecosystem' }],
    visual: 'roles',
  },
  {
    href: person.links.behance,
    title: 'Complex HR Management Platform',
    facts: ['Product designer', 'HR · Talent operations'],
    highlights: [
      'From a prototype to a structured product',
      'Timesheets, payments and document flows',
      'A reusable design system for the team',
    ],
    text: 'Remote Leverage manages distributed talent operations, supporting timesheets, payments, and document handling. I improved a prototype into a structured product, aligning business needs with user workflows, design, and a reusable system.',
    metrics: [{ value: '+167%', label: 'conversion' }],
    visual: 'conversion',
  },
] as const;


// Playground items. Copy is a draft for Taisiia to confirm; covers come later.
export const playground = [
  { title: 'Anime quiz', image: 'anime-quiz', text: 'My own mobile quiz app. 1,000+ downloads, no paid ads.', tone: 'blue', x: 2.4, y: 13.2, r: -3 },
  { title: 'Pet owners app', image: 'pet-owners', text: 'An app for people who look after pets.', tone: 'none', x: 36.8, y: 7.6, r: 2.5 },
  { title: 'Alias', image: 'alias', text: 'A word-guessing party game, designed for one phone passed around.', tone: 'none', x: 71.3, y: 15.4, r: 2 },
  { title: 'Claude skills', image: 'claude-skills', text: 'The skills behind my design pipeline, open on GitHub.', tone: 'none', x: 2.4, y: 51.5, r: -2.5, href: person.links.skills },
  { title: 'Drawings', image: 'drawings', text: 'Sketches and illustrations, mostly by hand.', tone: 'none', x: 36.6, y: 63.6, r: -1.5 },
  { title: 'SAM, a recovery app', image: 'recovery', text: 'Getting mobility back after surgery and injuries, one exercise at a time.', tone: 'none', x: 70.1, y: 53.9, r: 1.5 },
] as const;

export const experience = [
  { years: '2025–26', company: 'ANODA', role: 'Product Designer, covering for the Design Lead' },
  { years: '2022–25', company: 'Pinta Webware', role: 'Product Designer' },
  { years: '2023–24', company: 'Bleakers', role: 'UI/UX Designer, part-time' },
] as const;

// Kind words. Replace every `placeholder: true` item with a real quote (LinkedIn recommendation, Slack kudos,
// client email) and delete the flag. Placeholder quotes are shown in italics.
// kind: 'message' = a chat or LinkedIn-style card, 'note' = a sticky note. x/y place it on the desktop board.
export const testimonials = [
  { kind: 'message', tone: 'blue', name: 'Colleague name', meta: 'Role, Company · Slack', quote: 'Paste a real kudos message here: what Taisiia did, for whom, and what changed. 30–60 words work best.', x: 0, y: 22, w: 500, r: -2.5, placeholder: true },
  { kind: 'note', tone: 'amber', name: 'Colleague name', meta: 'Role, Company', quote: 'Paste the strongest line from a recommendation here.', x: 7.9, y: 274, w: 290, r: -4, placeholder: true },
  { kind: 'message', tone: 'ink', name: 'Client name', meta: 'Role, Company · Email', quote: 'Paste client feedback here: how the work helped their team or product.', x: 25, y: 542, w: 440, r: 2.5, placeholder: true },
  { kind: 'message', tone: 'amber', name: 'Lead or manager', meta: 'Role, Company · LinkedIn', quote: 'Paste a LinkedIn recommendation from a lead or manager here.', x: 58.6, y: 9, w: 460, r: 2, placeholder: true },
  { kind: 'message', tone: 'blue', name: 'Developer name', meta: 'Role, Company · Slack', quote: 'Paste a note from a developer about working together on handoff.', x: 67, y: 234, w: 430, r: -2, placeholder: true },
  { kind: 'note', tone: 'paper', name: 'Colleague name', meta: 'Role, Company', quote: 'Paste a short line about how it feels to work together.', x: 65, y: 402, w: 280, r: 4, placeholder: true },
] as const;
