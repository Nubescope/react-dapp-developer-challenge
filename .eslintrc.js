module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'next/core-web-vitals'],
  plugins: ['prettier', 'import', 'simple-import-sort', 'chakra-ui'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',

    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'import/no-unresolved': ['error'],
    'import/no-named-as-default': ['error'],
    'import/order': 'off',

    'prettier/prettier': [
      'error',
      {
        parser: 'typescript',
      },
    ],

    'chakra-ui/props-order': 'error',
    'chakra-ui/props-shorthand': 'error',
    'chakra-ui/require-specific-component': 'error',

    'no-console': 'warn',
    'no-use-before-define': 'warn',
    'spaced-comment': 'warn',
    'no-unused-expressions': ['error'],
    'no-unused-vars': 'error',
    'no-use-before-define': 'off',

    'jsx-quotes': ['error', 'prefer-double'],
    'react/jsx-no-literals': ['off', { noStrings: true }],
    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
  },
}
