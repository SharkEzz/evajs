module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.cjs'],
  env: {
    es2021: true,
    node: true,
  },
  plugins: ['import-x'],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:import-x/recommended',
    'plugin:import-x/typescript',
    'plugin:@typescript-eslint/strict-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:promise/recommended',
    'plugin:n/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: true,
  },
  rules: {
    'import-x/named': 0,
    'import-x/namespace': 0,
    'import-x/default': 0,
    'import-x/no-named-as-default-member': 0,
    'import-x/no-unresolved': 0,
    'import-x/extensions': 0,
  },
};
