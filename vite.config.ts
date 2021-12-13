import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from '@svgr/rollup';
import htmlEnv from 'vite-plugin-html-env';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.VITE_BASE_URL || './',
  plugins: [
    svgr({
      icon: true,
      typescript: true,
      svgProps: { className: 'g-icon' },
    }),
    react(),
    htmlEnv(process.env),
    visualizer(),
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
    rollupOptions: {
      output: {
        manualChunks(id) {
          // do not split css
          if (
            /\.css$/i.test(id) ||
            /\.s[ac]ss$/i.test(id) ||
            /\.less$/i.test(id)
          ) {
            return;
          }
          // sentry chunk
          if (/node_modules[/\\]@sentry/i.test(id)) {
            return 'sentry';
          }
          // vendor deps chunk
          else if (/node_modules/i.test(id)) {
            return 'vendor';
          }
          // automatic dynamic import spliting should work as is
        },
      },
    },
  },
});
