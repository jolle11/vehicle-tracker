import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import { Container, Title, Flex, Loader } from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect } from "react";
import { useListVehicles } from "../hooks/vehicles/useVehicleActions";
import VehicleCard from "../components/VehicleCard";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();

	useEffect(() => {
		if (userAuthenticated) {
			listVehicles(user.id)
				.then((response) => {
					const formatResponse = response.items.map((item) => ({
						id: item.id,
						nameplate: item.nameplate,
						brand: item.brand,
						color: item.color,
					}));
					setUserVehicles(formatResponse);
				})
				.catch((error) => console.log(error));
		}
	}, [user]);

	return userAuthenticated ? (
		<Container size={"lg"} my={"xl"}>
			<Title>Hello {user.username}!</Title>
			<Flex gap={"sm"} my={"xl"} justify={"center"} wrap={"wrap"}>
				{userVehicles.length ? (
					userVehicles.map((vehicle) => <VehicleCard vehicle={vehicle} />)
				) : (
					<Loader color="blue" size={"xl"} mt={"xl"} />
				)}
			</Flex>
		</Container>
	) : (
		<Title>Take control of your car</Title>
	);
};

export default DashboardPage;
