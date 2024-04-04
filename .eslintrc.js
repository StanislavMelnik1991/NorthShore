module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "@typescript-eslint/eslint-plugin", "react"],
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
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
  },
};
