import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default [
  // Ignore build and dependencies
  { ignores: ["node_modules/", "dist/"] },

  // Provide Node.js global variables (e.g., console, process)
  {
    languageOptions: {
      globals: globals.node,
    },
  },

  // Core ESLint recommended rules for JavaScript
  js.configs.recommended,

  // TypeScript files (without type-checking to avoid project errors)
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser,
      parserOptions: {
        sourceType: "module",
      },
    },
    plugins: { "@typescript-eslint": plugin },
    rules: {
      ...plugin.configs.recommended.rules,
    },
  },

  // Prettier to disable conflicting rules
  prettier,
];
