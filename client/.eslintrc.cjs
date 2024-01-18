// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks"],
  rules: {
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "no-use-before-define": 0,
    "react/display-name": 0,
    "react/react-in-jsx-scope": 0,
    "dot-notation": 1,
    "no-console": [1, { allow: ["error"] }],
    "no-useless-return": 1,
    "no-else-return": 1,
    "react/jsx-key": 1,
    "react-hooks/rules-of-hooks": 2,
    "no-unreachable": 2,
    "react/destructuring-assignment": [
      "warn",
      "always",
      { ignoreClassFields: true },
    ],
  },
};
