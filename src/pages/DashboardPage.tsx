import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import { Container, Title, Text } from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect } from "react";
import { useListVehicles } from "../hooks/vehicles/useVehicleActions";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);

	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();

	useEffect(() => {
		if (userAuthenticated) {
			listVehicles(user.id).then((response) => setUserVehicles(response.items));
		}
	}, [user]);

	return userAuthenticated ? (
		<Container size={"lg"} my={40}>
			<Title>Hello {user.username}!</Title>
			{userVehicles.map((vehicle, index) => (
				<Text>{vehicle.brand}</Text>
			))}
		</Container>
	) : (
		<Title>Take control of your car expenses with vehicle tracker</Title>
	);
};

export default DashboardPage;
