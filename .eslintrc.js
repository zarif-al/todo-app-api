module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb-typescript/base',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/prefer-default-export': 'off',
    'import/no-relative-parent-imports': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
    'no-console': 'error',
    '@typescript-eslint/indent': 'off',
    'object-curly-newline': 'off',
    indent: 'off',
  },
  overrides: [
    {
      files: ['./**/*.test.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'no-magic-numbers': 'off',
        'import/no-import-module-exports': 'off',
      },
    },
  ],
};
