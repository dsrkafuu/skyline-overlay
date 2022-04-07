import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import htmlEnv from 'vite-plugin-html-env';
import { visualizer } from 'rollup-plugin-visualizer';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        typescript: true,
        svgProps: {
          className: 'g-icon',
        },
      },
      // https://github.com/pd4d10/vite-plugin-svgr/issues/17
      esbuildOptions: {
        loader: 'tsx',
      },
    }),
    react(),
    htmlEnv(process.env),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/scss/variables.scss';`,
      },
    },
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      plugins: [visualizer()],
    },
    target: ['chrome90', 'firefox90', 'safari14'],
  },
});
