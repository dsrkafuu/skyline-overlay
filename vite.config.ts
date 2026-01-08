import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';

/**
 * https://vitejs.dev/config/
 */
export default defineConfig({
  base: process.env.VITE_BASE_URL || '/',
  resolve: {
    alias: {
      '@/': '/src/',
    },
  },
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        svgProps: {
          className: 'g-icon',
        },
      },
    }),
    react(),
    analyzer({
      enabled: process.env.ENABLE_ANALYZER === '1',
    }),
    VitePWA({
      // devOptions: {
      //   enabled: true,
      // },
      manifest: {
        name: 'Skyline Overlay',
        short_name: 'Skyline',
        description: 'A modern customizable horizon FFXIV miniparse overlay.',
        icons: [{ src: 'favicon.svg', sizes: 'any' }],
        theme_color: '#ffffff',
      },
      workbox: {
        runtimeCaching: [
          // google fonts css
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'googleapis-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 86400 }, // only one css loaded
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // google fonts webfonts
          {
            urlPattern: /^https?:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'gstatic-fonts-cache',
              expiration: { maxEntries: 500, maxAgeSeconds: 31556952 }, // google's css has (14+10+349) files
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          // misans webfonts
          {
            urlPattern: /^https?:\/\/.*\/fonts\/misans-.*.woff2.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'misans-fonts-cache',
              expiration: { maxEntries: 2, maxAgeSeconds: 31556952 }, // misans only has 1 files
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
  css: {
    devSourcemap: true,
  },
  build: {
    sourcemap: true,
    emptyOutDir: true,
    target: ['chrome111', 'edge111', 'firefox114', 'safari16.4'],
  },
});
