import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { store } from "./store";
import { Provider } from "react-redux";

const root = document.getElementById("root");

if (!root) {
	throw new Error("No root element found");
}
ReactDOM.createRoot(root).render(
	<Provider store={store}>
		<React.StrictMode>
			<App />
		</React.StrictMode>
	</Provider>,
);
