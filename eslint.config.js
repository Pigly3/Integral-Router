import pluginJs from '@eslint/js';
import globals from 'globals';
import tsPlugin from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin'
/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.ts'],
  },
  {
    languageOptions: { globals: globals.node },
  },
  {
    rules: {
      "func-style": ["error", "expression"],
      "no-restricted-syntax": ["off", "ForOfStatement"],
      "prefer-template": "error",
    },
  },
  //stylistic
  {
    plugins: {
      '@stylistic': stylistic
    },
    rules: {
      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/no-explicit-any": "off",
    }
  },
  // TypeScript Eslint
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@stylistic/indent": ["warn", 2]
    },
  },
  pluginJs.configs.recommended,
  ...tsPlugin.configs.recommended,
  ...stylistic.configs.customize
];