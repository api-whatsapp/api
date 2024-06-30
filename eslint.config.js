import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
	{ ignores: ["**/modules/index.js"] },
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
			indent: ["warn", "tab", { SwitchCase: 1 }],
			quotes: ["warn", "double"],
			"no-unused-vars": "warn",
		},
	},
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
];
