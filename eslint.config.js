import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{ files: ["**/*.{js,mjs,cjs,ts}"] },
	{
		languageOptions: { globals: globals.node },
		rules: {
			"no-console": [
				"error",
				{
					allow: ["warn", "error"],
				},
			],

			semi: [2, "always"],
			indent: ["error", "tab"],
			quotes: ["error", "double"],
			"no-unused-vars": "warn",
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
