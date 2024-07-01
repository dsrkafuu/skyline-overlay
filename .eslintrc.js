const { getESLintConfig } = require('@dsrca/config');

module.exports = getESLintConfig('react', {
  rules: {
    '@typescript-eslint/ban-ts-comment': 'off',
  },
});
