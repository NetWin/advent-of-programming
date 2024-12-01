const js = require('@eslint/js');
const typescriptEslintParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const tsEslint = require('typescript-eslint');
const stylistic = require('@stylistic/eslint-plugin');

module.exports = tsEslint.config(
  {
    files: ['**/*.ts'],
    extends: [js.configs.recommended, ...tsEslint.configs.recommended, ...tsEslint.configs.stylistic, prettierConfig],
    plugins: { '@stylistic': stylistic },
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname
      }
    },
    rules: {
      /** #################################################
       *
       * General rules
       *
       * ############################################### */

      // https://eslint.style/rules/js/semi
      // Enforce semicolons at the end of statements
      '@stylistic/semi': 'error',
      // https://eslint.style/rules/js/comma-dangle
      // Prevent trailing commas in object literals
      '@stylistic/comma-dangle': 'error',
      // https://eslint.org/docs/latest/rules/no-nested-ternary
      // Disallow nested ternary expressions
      'no-nested-ternary': 'error',
      // https://eslint.org/docs/latest/rules/prefer-template
      // Enforce template literals instead of string concatenation
      'prefer-template': 'warn',
      // https://eslint.org/docs/latest/rules/object-shorthand
      // Prefer object shorthand syntax `{a,b,c} instead of {a:a, b:b, c:c}`
      'object-shorthand': ['warn', 'properties'],
      // https://eslint.org/docs/latest/rules/no-extra-boolean-cast
      // Warn when using unnecessary double negation
      'no-extra-boolean-cast': 'warn',
      // https://eslint.org/docs/latest/rules/no-prototype-builtins
      // Disallow the use of `Object.prototype` builtins like `hasOwnProperty` directly
      'no-prototype-builtins': 'warn',
      // https://eslint.org/docs/latest/rules/no-case-declarations
      // Allow declarations (`const foo = 1`) in case clauses
      'no-case-declarations': 'off',

      /** #################################################
       *
       * TypeScript specific rules
       *
       * ############################################### */

      // https://typescript-eslint.io/rules/no-explicit-any
      // Disallow usage of the `any` type
      '@typescript-eslint/no-explicit-any': 'warn',
      // https://typescript-eslint.io/rules/prefer-optional-chain
      // Prefer `a?.b?.c` over `a && a.b && a.b.c`
      '@typescript-eslint/prefer-optional-chain': 'error',
      // https://typescript-eslint.io/rules/consistent-type-definitions
      // Disables the rule that enforces consistent usage of either "type" or "interface" for type definitions
      '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      // https://typescript-eslint.io/rules/explicit-function-return-type
      // Require explicit return types on functions and class methods
      '@typescript-eslint/explicit-function-return-type': ['error', { allowExpressions: true }],
      // https://typescript-eslint.io/rules/explicit-member-accessibility
      // Require explicit accessibility modifiers on class properties and methods
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'no-public' } }
      ],
      // https://typescript-eslint.io/rules/no-empty-object-type
      // Disallow the `{}` type in object type annotations
      '@typescript-eslint/no-empty-object-type': 'error',
      // https://typescript-eslint.io/rules/consistent-indexed-object-style
      // Disables the rule that enforces consistent usage of either index signature or record types
      '@typescript-eslint/consistent-indexed-object-style': 'off',
      // https://typescript-eslint.io/rules/no-inferrable-types
      // Allow explicit types where they can be easily inferred
      '@typescript-eslint/no-inferrable-types': 'off',
      // https://typescript-eslint.io/rules/no-misused-promises
      // Checks that promises are awaited when checking for truthiness
      '@typescript-eslint/no-misused-promises': 'error',
      // https://typescript-eslint.io/rules/no-floating-promises
      // Disallow floating (unused / unawaited) promises
      '@typescript-eslint/no-floating-promises': 'error',
      // https://typescript-eslint.io/rules/no-unused-vars
      // Disallow unused variables
      '@typescript-eslint/no-unused-vars': [
        'error',
        { vars: 'local', argsIgnorePattern: '^_', varsIgnorePattern: '^_' }
      ],
      // https://typescript-eslint.io/rules/array-type
      // Enforce the use of the array type (i.e. prever `Array<T>` over `T[]`)
      '@typescript-eslint/array-type': ['error', { default: 'generic' }]
    }
  },
  {
    files: ['**/advent-of-typescript/**/*.ts'],
    rules: {
      // The tests in Advent of TypeScript do not export anything which means this rule would be triggered everywhere.
      // https://typescript-eslint.io/rules/no-unused-vars
      // Disallow unused variables
      '@typescript-eslint/no-unused-vars': 'off',

      // I use namespaces in the tests to group related tests together.
      // https://typescript-eslint.io/rules/no-namespace/
      // Disallow TypeScript namespaces.
      '@typescript-eslint/no-namespace': 'off',

      // The tests for Advent of TypeScript do use `@ts-expect-error` which is banned by default.
      // https://typescript-eslint.io/rules/ban-ts-comment/
      // Disallow @ts-<directive> comments or require descriptions after directives.
      '@typescript-eslint/ban-ts-comment': 'off',

      // The tests sometimes use the "Function" type to test the behavior of functions.
      // https://typescript-eslint.io/rules/no-unsafe-function-type/
      // Disallow using the unsafe built-in Function type.
      '@typescript-eslint/no-unsafe-function-type': 'off'
    }
  }
);
