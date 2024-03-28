/* eslint-env node */
module.exports = {
  extends: ['plugin:react/recommended', 'plugin:react/jsx-runtime', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
