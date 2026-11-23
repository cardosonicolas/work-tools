// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Pre-bundle jsPDF (only loaded via dynamic import) so the dev server
    // doesn't discover it on first click and reload the page, wiping the form.
    optimizeDeps: { include: ['jspdf'] },
  }
});
