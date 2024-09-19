import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./api/baseApi";
import authReducer, { logout, LOGOUT_EVENT } from "./api/auth";

const reducer = combineReducers({
	auth: authReducer,
	// Add the generated reducer as a specific top-level slice
	[baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
	reducer,
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

window.addEventListener(LOGOUT_EVENT, () => {
	store.dispatch(logout());
});

export type RootState = ReturnType<typeof store.getState>;
