const { getESLintConfig } = require('@dsrca/config');

module.exports = getESLintConfig('next', {
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
  },
});
