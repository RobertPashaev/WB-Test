module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'next/core-web-vitals',
    'plugin:react/recommended',
    'airbnb',
    'plugin:prettier/recommended', // обязательно последним идет что бы затереть пред идущие конфиги
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports', 'react-hooks'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    'import/extensions': ['error', 'always', { ts: 'never', tsx: 'never' }], // отключает расширения в импортах
    'react/jsx-no-comment-textnodes': 'off',
    'import/prefer-default-export': 'off', // требует экспорт по дефолту
    'import/no-extraneous-dependencies': 'off', // хочет что бы все используемые пакеты были из dependencies (не дает использовать reselect т.к он часть redux-toolkit)
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }], // по умолчанию jsx лежит в .js или .jsx
    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ], //  что бы задать один тип объявления функциональных компонентов
    'react/destructuring-assignment': 'off', // принуждает делать деструктуризацию в компонентах, выглядит полезной.
    'no-unused-vars': 'off', // обязательно отключить что бы работало правило '@typescript-eslint/no-unused-vars'(версия под typescript)
    'react/jsx-sort-props': 'error', // сортировка пропсов
    'react/no-unused-prop-types': 'error', // неспользуемые пропсы
    'react/require-default-props': 'off', // требует дефолтные пропсы для компонентов react. выглядит полезной но как использовать с typescript не понятно.
    'react/react-in-jsx-scope': 'off',
    'no-restricted-exports': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'class-methods-use-this': 'off', // если внутри метода класса нет this заставляет метод переделать в static
    'no-shadow': 'off', // обязательно отключить что бы работало правило '@typescript-eslint/no-shadow'(версия под typescript)
    '@typescript-eslint/no-shadow': 'error', // полезная штука, следит за тем что бы не было повторного объявления переменной в одной области видимости
    'unused-imports/no-unused-imports': 'warn', // неиспользуемые импорты
    'react/no-unstable-nested-components': 'off',
    'react/prop-types': 'off',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent'],
          ['sibling', 'index'],
        ],
        'newlines-between': 'never',
      },
    ],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
};
