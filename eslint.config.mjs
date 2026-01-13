import config from '@dsrca/config/eslint/react.config.js';

export default [
  ...config,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**/*',
      'assets/**/*',
      'dist/**/*',
      'dev-dist/**',
      'public/**/*',
      'scripts/**/*',
    ],
  },
];
