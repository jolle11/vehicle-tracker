import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import { Container, Title, Flex, Loader, Modal } from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect, useState } from "react";
import { useListVehicles } from "../hooks/vehicles/useVehicleActions";
import VehicleCard from "../components/VehicleCard";
import { useDisclosure } from "@mantine/hooks";
import useNumberFormat from "../hooks/utils/useNumberFormat";
import NewVehicleCard from "../components/NewVehicleCard";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();
	const mediaFormat = useNumberFormat();

	const [loading, setLoading] = useState(true);

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
						last_km: item.last_km,
						media_tank: mediaFormat(item.media_tank) ?? 0,
						media_paid: mediaFormat(item.media_paid) ?? 0,
					}));
					setUserVehicles(formatResponse);
					setLoading(false);
				})
				.catch((error) => console.log(error));
		}
	}, [user]);

	return userAuthenticated ? (
		<Container size={"lg"} my={"xl"}>
			<Flex my={"xl"} align={"center"} direction={"column"} wrap={"wrap"}>
				<Title>Hello {user.username}!</Title>
				<Flex gap={"md"} my={"xl"} justify={"center"} wrap={"wrap"}>
					{/* TODO Think switch to open different modals */}
					{loading && <Loader size={"xl"} mt={"xl"} />}
					{!(loading || userVehicles.length) && <NewVehicleCard />}
					{!loading && !!userVehicles.length && (
						<>
							{userVehicles.map((vehicle) => (
								<VehicleCard
									key={vehicle.id}
									vehicle={vehicle}
									openModal={open}
								/>
							))}
							<NewVehicleCard />
						</>
					)}
				</Flex>
			</Flex>
			<Modal opened={opened} onClose={close} title="New register">
				- fuel or repair BUTTON <br />- km amount <br />- paid <br />- e/litre
				<br />- comment
			</Modal>
		</Container>
	) : (
		<Title>Take control of your vehicle/s</Title>
	);
};

export default DashboardPage;
