import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.BASE_URL || './',
  plugins: [
    svgr({
      icon: true,
      typescript: true,
      svgProps: { className: 'icon' },
    }),
    react(),
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
