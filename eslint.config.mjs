import js from "@eslint/js";
import * as tseslint from "typescript-eslint";
import next from "eslint-config-next";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  next(),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "no-unused-vars": "off",
      "no-unused-expressions": "off",
      "no-var": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
