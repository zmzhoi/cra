module.exports = {
  extends: 'eslint:recommended',
  env: {
    commonjs: true,
    node: true,
    es6: true,
  },
  rules: {
    'no-unused-vars': 'warn',
  },
  ignorePatterns: ['dist'],
};
