import { type Options } from 'prettier';

const options: Options = {
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'es5',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
};

export default options;
