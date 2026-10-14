// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://realcarmileage.com',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) =>
        !/\/(about-us|privacy|terms|contact-us)\/$/.test(page),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
