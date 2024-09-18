import { Routes, Route } from "react-router-dom";
import TopPage from "./pages/TopPage";
import NotFoundPage from "./pages/NotFoundPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import Layout from "./templates/Layout";

function App() {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<Layout>
						<TopPage />
					</Layout>
				}
			/>
			<Route
				path="/signup"
				element={
					<Layout>
						<SignupPage />
					</Layout>
				}
			/>
			<Route
				path="/login"
				element={
					<Layout>
						<LoginPage />
					</Layout>
				}
			/>
			<Route
				path="/user"
				element={
					<Layout>
						<UserPage />
					</Layout>
				}
			/>
			<Route path="/*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
