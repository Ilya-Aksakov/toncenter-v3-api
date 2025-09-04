import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";

export default [
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".memory-bank/**",
      "*.log",
      "*.lock",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{ts,js}"],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
      globals: {
        console: "readonly",
        process: "readonly",
        Buffer: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        global: "readonly",
        module: "readonly",
        require: "readonly",
        exports: "readonly",
        fetch: "readonly",
        URL: "readonly",
        Response: "readonly",
        Request: "readonly",
        Headers: "readonly",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "prefer-const": "error",
      "no-var": "error",
      "no-console": "off",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      "comma-dangle": ["error", "only-multiline"],
      "object-curly-spacing": ["error", "always"],
      "array-bracket-spacing": ["error", "never"],
      "space-before-blocks": "error",
      "keyword-spacing": "error",
      "space-infix-ops": "error",
      "eol-last": "error",
      "no-trailing-spaces": "error",
    },
  },
];
