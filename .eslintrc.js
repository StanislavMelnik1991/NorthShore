module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "@typescript-eslint/eslint-plugin", "react", "react-hooks", 'i18next'],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "plugin:@conarti/feature-sliced/recommended",
    "prettier",
  ],
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    es2021: true,
  },
  ignorePatterns: [".eslintrc.js"],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    "react-hooks/exhaustive-deps": ["error"],
    'i18next/no-literal-string': [
      'error',
      {
          markupOnly: true,
          ignoreAttribute: [
              'as',
              'role',
              'data-testid',
              'to',
              'target',
              'justify',
              'align',
              'border',
              'direction',
              'gap',
              'feature',
              'color',
              'variant',
              'size',
              'wrap',
          ],
      },
  ],
  },
};
