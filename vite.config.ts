import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import htmlEnv from 'vite-plugin-html-env';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.VITE_BASE_URL || './',
  plugins: [
    svgr({
      icon: true,
      typescript: true,
      svgProps: { className: 'icon' },
    }),
    react(),
    htmlEnv(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/scss/variables.scss';`,
      },
    },
  },
  build: {
    emptyOutDir: true,
  },
});
