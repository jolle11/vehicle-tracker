import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect } from "react";
import { useGetUser } from "./hooks/auth/useGetUser";

function App() {
	const setUser = useGetUser();

	useEffect(() => {
		setUser();
	}, []);

	return (
		<div className="app">
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<DashboardPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route
						path="/:vehicleBrand/:vehicleNameplate"
						element={<RegisterPage />}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
