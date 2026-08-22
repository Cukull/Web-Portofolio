// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

/**
 * Astro Configuration
 * Docs: https://astro.build/config
 *
 * Stack:
 *  - React  → komponen interaktif (islands)
 *  - Tailwind CSS v4 → via Vite plugin
 *  - TypeScript strict → via tsconfig.json
 */
export default defineConfig({
  // Integrations
  integrations: [
    react(), // React islands untuk komponen interaktif
    keystatic(), // Keystatic CMS Admin Panel
  ],

  // Vite plugins
  vite: {
    plugins: [
      tailwindcss(), // Tailwind CSS v4
    ],
  },

  // Astro Content Collections
  // src/content/ akan auto-detected

  // Output: static site dengan Keystatic SSR
  output: 'static',
  adapter: vercel(),
});