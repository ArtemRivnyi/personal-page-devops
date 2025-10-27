import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser
      },
      parserOptions: {
        ecmaVersion: 12
      }
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-console": "warn"
    }
  }
];