const gqlSchemaJson = require('./src/gqlSchema.json')

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: ['react', 'import', 'graphql', 'filenames'],
  settings: {
    react: {
      version: '16.4',
    },
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
    'prettier/react',
  ],
  rules: {
    'react/prop-types': 0,
    'filenames/match-regex': ['error', '^[.a-zA-Z0-9]+$'],
    'filenames/match-exported': 'error',
    'graphql/template-strings': [
      'error',
      {
        env: 'apollo',
        schemaJson: gqlSchemaJson,
      },
    ],
    'graphql/required-fields': [
      'error',
      {
        env: 'apollo',
        schemaJson: gqlSchemaJson,
        requiredFields: ['id'],
      },
    ],
    'graphql/named-operations': [
      'error',
      {
        schemaJson: gqlSchemaJson,
      },
    ],
    'graphql/capitalized-type-name': [
      'error',
      {
        schemaJson: gqlSchemaJson,
      },
    ],
    'import/default': 'error',
    'import/extensions': ['error', 'never', { svg: 'always' }],
    'import/first': 'error',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/no-commonjs': 'error',
    'import/no-dynamic-require': 'error',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.test.js', '**/*.snapshot.js', 'setupTests.js'],
        optionalDependencies: false,
      },
    ],
    'import/no-named-as-default-member': 'error',
    'import/no-named-as-default': 'off',
    'import/no-named-default': 'error',
    'import/no-namespace': 'error',
    'import/no-unresolved': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/order': 'error',
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link', 'NavLink'],
        specialLink: ['to'],
      },
    ],
    'no-console': 'warn',
    'no-extra-bind': 'error',
    'no-implicit-globals': 'error',
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'prefer-promise-reject-errors': 'error',
    'react/jsx-key': 'error',
    'react/jsx-filename-extension': 'off',
    'react/no-array-index-key': 'off',
    'react/no-danger': 'off',
    'react/no-direct-mutation-state': 'error',
    'react/no-access-state-in-setstate': 'error',
  },
  parser: 'babel-eslint',
  root: true,
}
