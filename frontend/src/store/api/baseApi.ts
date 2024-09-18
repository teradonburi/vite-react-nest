import {
	createApi,
	defaultSerializeQueryArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import fetch from "isomorphic-fetch";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl:
			process.env.NODE_ENV === "production"
				? window.location.origin
				: "http://localhost:3000",
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as { access_token: string };
			const access_token: string = state?.access_token;

			if (access_token) {
				headers.set("Authorization", `Bearer ${access_token}`);
			}

			return headers;
		},
		validateStatus(response) {
			if (response.status >= 200 && response.status <= 299) return true;
			return false;
		},
		fetchFn: fetch,
	}),

	serializeQueryArgs: ({ queryArgs, endpointDefinition, endpointName }) => {
		return defaultSerializeQueryArgs({
			queryArgs,
			endpointDefinition,
			endpointName: `${endpointName}`,
		});
	},
	endpoints: () => ({}),
});
