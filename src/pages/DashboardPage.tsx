import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import { Container, Title, Flex, Loader, Modal } from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect } from "react";
import { useListVehicles } from "../hooks/vehicles/useVehicleActions";
import VehicleCard from "../components/VehicleCard";
import { useDisclosure } from "@mantine/hooks";
import useNumberFormat from "../hooks/utils/useNumberFormat";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();
	const formatMedia = useNumberFormat();

	const [opened, { open, close }] = useDisclosure(false);

	useEffect(() => {
		if (userAuthenticated) {
			listVehicles(user.id)
				.then((response) => {
					console.log(response);

					const formatResponse = response.items.map((item) => ({
						id: item.id,
						nameplate: item.nameplate,
						brand: item.brand,
						color: item.color,
						last_km: item.last_km,
						media_tank: formatMedia(item.media_tank) ?? 0,
						media_paid: formatMedia(item.media_paid) ?? 0,
					}));
					setUserVehicles(formatResponse);
				})
				.catch((error) => console.log(error));
		}
	}, [user]);

	return userAuthenticated ? (
		<Container size={"lg"} my={"xl"}>
			<Flex my={"xl"} align={"center"} direction={"column"} wrap={"wrap"}>
				<Title>Hello {user.username}!</Title>
				<Flex gap={"md"} my={"xl"} justify={"center"} wrap={"wrap"}>
					{userVehicles.length ? (
						userVehicles.map((vehicle) => (
							<VehicleCard
								key={vehicle.id}
								vehicle={vehicle}
								openModal={open}
							/>
						))
					) : (
						<Loader size={"xl"} mt={"xl"} />
					)}
				</Flex>
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
