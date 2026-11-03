import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://taisniklis.github.io',
  base: '/Portfolio',
  integrations: [mdx()],
  vite: { plugins: [tailwindcss()] },
});
