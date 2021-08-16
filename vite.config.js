import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from '@svgr/rollup';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.BASE_URL || './',
  plugins: [
    reactRefresh(),
    // https://react-svgr.com/docs/options/
    svgr({
      icon: true,
      svgProps: { className: 'icon' },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/scss/variables.scss';`,
      },
    },
  },
  build: {
    emptyOutDir: true,
    target: ['chrome80', 'firefox80', 'safari13', 'edge80'],
    sourcemap: true,
  },
});
