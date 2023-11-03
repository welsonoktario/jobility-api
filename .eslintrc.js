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
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js'],
        moduleDirectory: ['node_modules', 'src'],
        moduleFileExtensions: ['js'],
      },
    },
  },
  rules: {
    'object-curly-newline': 'off',
    'no-trailing-spaces': 'warn',
    'object-shorthand': 'warn',
    'linebreak-style': 'off',
    'consistent-return': 'off',
  },
};
