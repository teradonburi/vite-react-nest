import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
	id: string;
	access_token: string;
}

const storageKey = "auth";
const getUser = () => {
	const str = localStorage.getItem(storageKey);
	try {
		if (str) return JSON.parse(str);
	} catch (e) {}
	return { id: null, access_token: null };
};
const setUser = (user: AuthState) => {
	localStorage.setItem(storageKey, JSON.stringify(user));
};
const removeUser = () => {
	localStorage.removeItem(storageKey);
};

const authSlice = createSlice({
	name: "auth",
	initialState: getUser(),
	reducers: {
		// set access token to redux store
		login: (state: AuthState, action: PayloadAction<AuthState>) => {
			state.id = action.payload.id;
			state.access_token = action.payload.access_token;
			setUser(action.payload);
		},
		logout: (state: AuthState) => {
			state.id = null;
			state.access_token = null;
			removeUser();
			window.location.href = "/login";
		},
	},
});

export const LOGOUT_EVENT = "logout";
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
