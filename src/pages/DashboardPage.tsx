import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import {
	Container,
	Title,
	Badge,
	Button,
	Card,
	Group,
	Flex,
	Loader,
} from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect } from "react";
import { useListVehicles } from "../hooks/vehicles/useVehicleActions";
import BrandLogo from "../components/BrandLogo";
import { GasTankDroplet, Wrench } from "iconoir-react";

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
					userVehicles.map((vehicle) => (
						<Card
							key={vehicle.id}
							shadow="sm"
							padding="lg"
							radius="md"
							withBorder
							w={220}
						>
							<Group justify="center">
								<BrandLogo brand={vehicle.brand} />
							</Group>
							<Group justify="space-between" mb="sm" mt="md" h={30}>
								<Title size={20}>{vehicle.nameplate}</Title>
								<Badge
									color={`#${vehicle.color}`}
									style={{ boxShadow: "0px 2px 5px gray" }}
								>
									&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
								</Badge>
							</Group>
							<Group justify="center">
								<Button color="blue" my="sm" variant="light">
									{/* TODO Add modal to add new fuel register to the car */}
									<GasTankDroplet />
								</Button>
								<Button color="blue" my="sm" variant="light">
									{/* TODO Add modal to add new repair register to the car */}
									<Wrench />
								</Button>
							</Group>
						</Card>
					))
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
