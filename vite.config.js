import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import htmlEnv from 'vite-plugin-html-env';
import { VitePWA as pwa } from 'vite-plugin-pwa';
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
    pwa({
      includeAssets: [
        'fonts/*.woff2',
        'apple-touch-icon.png',
        'favicon.ico',
        'favicon.svg',
      ],
      manifest: {
        name: 'Skyline Overlay',
        short_name: 'Skyline',
        description: 'A modern customizable horizon FFXIV miniparse overlay.',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
        ],
      },
    }),
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
