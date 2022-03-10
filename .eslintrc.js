module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "next/babel",
    "next/core-web-vitals",
    "plugin:react/recommended",
    "airbnb",
    "plugin:json/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
};
