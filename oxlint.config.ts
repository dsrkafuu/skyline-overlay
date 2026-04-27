import { defineConfig } from 'oxlint';

export default defineConfig({
  // https://oxc.rs/docs/guide/usage/linter/plugins.html#supported-plugins
  plugins: ['oxc', 'node', 'eslint', 'typescript', 'import', 'promise', 'react', 'react-perf'],
  rules: {
    'no-unused-expressions': 'off',
  },
  ignorePatterns: ['dist/**', 'dev-dist/**'],
});
