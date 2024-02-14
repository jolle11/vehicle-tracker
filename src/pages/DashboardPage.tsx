import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import { Title } from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect } from "react";
import { useListVehicles } from "../hooks/vehicles/useListVehicles";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);

	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();

	useEffect(() => {
		if (userAuthenticated) {
			listVehicles(user.id).then((response) => setUserVehicles(response.items));
		}
	}, []);

	return userAuthenticated ? (
		<Title>Hello {user.username}!</Title>
	) : (
		<Title>Take control of your car expenses with vehicle tracker</Title>
	);
};

export default DashboardPage;
