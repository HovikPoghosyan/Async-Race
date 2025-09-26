module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "prettier"
  ],
  plugins: ["react", "react-hooks", "import", "jsx-a11y", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      node: { extensions: [".js", ".jsx"] },
    },
  },
};
