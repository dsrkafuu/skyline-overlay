import config from '@dsrca/config/eslint/react.config.js';

export default [
  ...config,
  {
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**/*',
      'assets/**/*',
      'dist/**/*',
      'public/**/*',
      'scripts/**/*',
    ],
  },
];
