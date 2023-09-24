module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'object-curly-newline': 'off',
    'no-trailing-spaces': 'warn',
    'object-shorthand': 'warn',
  },
};
