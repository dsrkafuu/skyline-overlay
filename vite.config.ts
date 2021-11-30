import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.BASE_URL || './',
  plugins: [reactRefresh()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/scss/variables.scss';`,
      },
    },
  },
  build: {
    emptyOutDir: true,
    sourcemap: true,
  },
});
