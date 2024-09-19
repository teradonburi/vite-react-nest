import {
	createApi,
	defaultSerializeQueryArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import fetch from "isomorphic-fetch";
import { RootState } from "../index";
import { LOGOUT_EVENT } from "./auth";

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl:
			process.env.NODE_ENV === "production"
				? window.location.origin
				: "http://localhost:3000",
		prepareHeaders: (headers, { getState }) => {
			const state = getState() as RootState;
			const access_token: string = state?.auth.access_token;

			if (access_token) {
				headers.set("Authorization", `Bearer ${access_token}`);
			}

			return headers;
		},
		validateStatus(response) {
			if (response.status >= 200 && response.status <= 299) return true;
			if (response.status === 401) {
				window.dispatchEvent(new CustomEvent(LOGOUT_EVENT));
				return false;
			}
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
