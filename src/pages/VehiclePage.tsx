import { Badge, Box, Container, Flex, Title } from "@mantine/core";
import { useAtom } from "jotai";
import { vehicleAtom } from "../atoms/vehicle";
import BrandLogo from "../components/BrandLogo";
import { useEffect } from "react";

const VehiclePage = () => {
	const [vehicle, setVehicle] = useAtom(vehicleAtom);

	useEffect(() => {
		const selectedVehicle = JSON.parse(
			localStorage.getItem("selectedVehicle") as string,
		);

		if (!!vehicle && selectedVehicle !== undefined) {
			setVehicle(selectedVehicle);
		}
	}, []);

	return (
		<Container size={"lg"} my={"xl"}>
			<Flex justify="center" align={"center"} direction={"column"}>
				<Box>
					<BrandLogo brand={vehicle.brand} />
				</Box>
				<Badge variant="light" color="dark" radius={"sm"} size="xl" py={"lg"}>
					<Title>{vehicle.nameplate}</Title>
				</Badge>
			</Flex>
		</Container>
	);
};

export default VehiclePage;
