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
  rules: {
    // "max-lines-per-function": ['error', { max: 40, skipComments: true, skipBlankLines: true }],
    "import/no-unresolved": "off",
    "no-unused-vars": "off",
    "no-plusplus": "off",
    "react/jsx-filename-extension": "off",
    "consistent-return": "off",
    "eqeqeq": "off",
    "react/prop-types": "off",
    "react/button-has-type": "off",
    "no-nested-ternary": "off",
    "no-use-before-define": "off",
    "no-param-reassign": "off",
    "no-await-in-loop": "off",
    "array-callback-return": "off",
    "no-shadow": "off",
    "no-unused-expressions": "off",
    "no-unsafe-optional-chaining": "off",
    'no-undef': 'off',
    'react/require-default-props': 'off',
    'no-restricted-globals': 'off',
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "ts": "never",
        "tsx": "never",
        "js": "never",
        "jsx": "never",
      }
    ]
  },
  plugins: ["react", "react-hooks", "import", "jsx-a11y", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      node: { extensions: [".js", ".jsx", ".ts", ".tsx"] },
    },
  },
};
