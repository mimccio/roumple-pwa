module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react', 'react-refresh', 'jsx-a11y'],
  settings: {
    react: { version: 'detect' },
  },
  rules: {
    'no-console': ['warn', { allow: ['warn'] }],
    // React
    'react/react-in-jsx-scope': 'off',
    // React Refresh
    'react-refresh/only-export-components': 'warn',
    // jsx-a11y
    'jsx-a11y/alt-text': 'off', // TODO? add alt text ? (handle loading)
    'jsx-a11y/no-autofocus': 'off', // TODO? handle autofocus
  },
}
