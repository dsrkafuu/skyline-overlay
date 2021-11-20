import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.BASE_URL || './',
  plugins: [reactRefresh()],
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
    sourcemap: true,
  },
});
