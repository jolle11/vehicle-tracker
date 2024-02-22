import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import { Container, Title, Flex, Loader, Modal, Button } from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect } from "react";
import { useListVehicles } from "../hooks/vehicles/useVehicleActions";
import VehicleCard from "../components/VehicleCard";
import { useDisclosure } from "@mantine/hooks";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();

	const [opened, { open, close }] = useDisclosure(false);

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
						<VehicleCard vehicle={vehicle} openModal={open} />
					))
				) : (
					<Loader color="blue" size={"xl"} mt={"xl"} />
				)}
			</Flex>
			<Modal opened={opened} onClose={close} title="New register">
				- fuel or repair BUTTON <br />- km amount <br />- paid <br />- e/litre
				<br />- comment
			</Modal>
		</Container>
	) : (
		<Title>Take control of your car</Title>
	);
};

export default DashboardPage;
