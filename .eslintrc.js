module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['jest'],
  rules: {
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
      },
    ],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'operator-linebreak': 'off',
    'no-underscore-dangle': ['error', { allowAfterThis: true }],
    'no-nested-ternary': 'off',
    'arrow-body-style': 'off',
    'comma-dangle': 'off',
  },
};
