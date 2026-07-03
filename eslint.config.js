// eslint.config.js
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jsoncPlugin from 'eslint-plugin-jsonc';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default [
  // Глобальные игноры (работают для всех блоков)
  { ignores: ['dist/**', 'build/**', 'coverage/**', 'node_modules/**', '**/*.svg'] },

  // Базовые рекомендации JS + TS
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...jsoncPlugin.configs['recommended-with-json'],

  // Наши правила
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.ts', '.tsx'],
        },
      },
    },
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        projectService: true,
      },
    },
    rules: {
      // Гигиена
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'log', 'table', 'debug'] }],

      // TypeScript-приятности
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      'no-debugger': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': 'warn', // единый стиль импортов типов
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportExpression',
          message: 'Dynamic import() is forbidden. Use static imports.',
        },
        {
          selector: 'AwaitExpression > ImportExpression',
          message: 'await import() is forbidden. Use static imports.',
        },
        {
          selector: "CallExpression[callee.object.name='Reflect']",
          message: 'Reflect API is forbidden. Use explicit typed contracts.',
        },
      ],

      // Авточистка импорта/переменных (меньше мусора)
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],

      // Консистентный порядок импортов
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['**/*.js'],
    settings: {
      'import/resolver': {
        typescript: {
          project: './tsconfig.json',
          alwaysTryTypes: true,
        },
        node: {
          extensions: ['.js', '.ts', '.tsx'],
        },
      },
    },
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'log', 'table', 'debug'] }],
      'no-debugger': 'warn',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportExpression',
          message: 'Dynamic import() is forbidden. Use static imports.',
        },
        {
          selector: 'AwaitExpression > ImportExpression',
          message: 'await import() is forbidden. Use static imports.',
        },
      ],
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  {
    files: ['engine/**/*.ts'],
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ImportExpression',
          message: 'Dynamic import() is forbidden in engine code. Use static imports.',
        },
        {
          selector: 'AwaitExpression > ImportExpression',
          message: 'await import() is forbidden in engine code. Use static imports.',
        },
        {
          selector: "CallExpression[callee.object.name='Reflect']",
          message: 'Reflect API is forbidden in engine code. Use explicit typed contracts.',
        },
        {
          selector: 'TSAsExpression > TSAsExpression',
          message:
            'Double cast (e.g. as unknown as T) is forbidden in engine code. Use type guards or explicit contracts.',
        },
      ],
    },
  },
  {
    files: ['game/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@engine/index',
              message: 'Import from @engine root barrel instead of @engine/index.',
            },
          ],
          patterns: [
            {
              group: ['@engine/*/index'],
              message: 'Import from @engine/<subsystem> instead of @engine/<subsystem>/index.',
            },
            {
              group: ['@engine/*/*'],
              message:
                'Deep engine imports are internal. Use stable public barrels: @engine or @engine/<subsystem>.',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: "Literal[value^='json/configs/']",
          message:
            "Do not hardcode config file ids in game runtime files. Use schema descriptors (ConfigEntry/SettingsEntry).",
        },
        {
          selector: "TemplateElement[value.raw^='json/configs/']",
          message:
            "Do not hardcode config file ids in game runtime files. Use schema descriptors (ConfigEntry/SettingsEntry).",
        },
      ],
    },
  },
  {
    files: ['game/**/configs/schemas.ts', 'game/src/config/GameConfigDecoderRegistry.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },

  // Отключаем форматирующие правила в пользу Prettier
  prettier,
];
