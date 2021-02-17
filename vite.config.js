import path from 'path';
import reactRefresh from '@vitejs/plugin-react-refresh';
import svgr from '@svgr/rollup';

/**
 * https://vitejs.dev/config/
 * @type { import('vite').UserConfig }
 */
export default {
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
    target: ['chrome80', 'firefox80', 'safari13', 'edge80'],
  },
};
