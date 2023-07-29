module.exports = {
  env: {
    browser: true,
    node: true,
    commonjs: true,
  },
  extends: [
    "react-app",
    "naver",
    "eslint:recommended",
    "plugin:react/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
  },
};
