import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["node_modules/**", "build/**", "coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2024,
        ...(globals.vitest ?? {}),
      },
    },
    rules: {
      "@typescript-eslint/explicit-module-boundary-types": "off",
    },
  },
);