import js from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'object-curly-newline': [
        'error',
        {
          ObjectExpression: { multiline: true, minProperties: 2 },
          ObjectPattern: { multiline: true, minProperties: 2 },
          ImportDeclaration: { multiline: true, minProperties: 4 },
          ExportDeclaration: { multiline: true, minProperties: 4 },
        },
      ],
      'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    },
  },
];
