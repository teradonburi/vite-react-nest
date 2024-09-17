import {
	createApi,
	defaultSerializeQueryArgs,
	fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import fetch from "isomorphic-fetch";
// import { GlobalState } from 'main/modules/globalState'

export const baseApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl:
			process.env.NODE_ENV === "production"
				? window.location.origin
				: "http://localhost:3000",
		prepareHeaders: (headers /*,{ getState }*/) => {
			// const state = getState() as GlobalState
			// const token: string | null = state?.auth?.user?.token

			// if (token) {
			//   headers.set('Authorization', `Bearer ${token}`)
			// }

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
