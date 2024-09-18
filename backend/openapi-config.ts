import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
	schemaFile: "./swagger.json",
	apiFile: "../frontend/src/store/api/baseApi.ts",
	apiImport: "baseApi",
	argSuffix: "Args",
	hooks: true,
	responseSuffix: "Response",
	outputFiles: {
		"../frontend/src/store/api/gen/app.gen.ts": {
			filterEndpoints: [/appController/],
		},
		"../frontend/src/store/api/gen/auth.gen.ts": {
			filterEndpoints: [/authController/],
		},
		"../frontend/src/store/api/gen/users.gen.ts": {
			filterEndpoints: [/usersController/],
		},
	},
};

export default config;
