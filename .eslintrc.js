module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    'react-hooks',
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
    'import',
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    // ✅ Prettier disables conflicting ESLint rules
    'prettier/prettier': 'error',

    // ✅ Clean imports
    'unused-imports/no-unused-imports': 'error',

    // ✅ Better import sorting
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    // ✅ FSD path import enforcement
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            target: './src/entities',
            from: './src/features',
            message: 'Features cannot import from Entities directly. Use public API (index.ts).',
          },
          {
            target: './src/widgets',
            from: './src/pages',
            message: 'Pages can only use widgets’ public APIs.',
          },
          {
            target: './src/shared',
            from: './src/features',
            message: 'Features can use only shared/public APIs.',
          },
        ],
      },
    ],

    // ✅ React specific
    'react/react-in-jsx-scope': 'off', // not needed in modern React
    'react/prop-types': 'off', // using TypeScript
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
