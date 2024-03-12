import { Button, Container, Flex, Loader, Menu } from "@mantine/core";
import { useAtom } from "jotai";
import { vehicleAtom } from "atoms/vehicle";
import BrandLogo from "components/BrandLogo";
import { useEffect, useState } from "react";
import { useListKms } from "hooks/vehicles/useVehicleActions";
import { kmAtom } from "atoms/km";
import useDateFormat from "hooks/utils/useDateFormat";
import KmTable from "components/KmTable";
import KmLineChart from "components/KmLineChart";
import NameplateBadge from "components/NameplateBadge";
import { MenuScale, Trash } from "iconoir-react";

const VehiclePage = () => {
	const [vehicle, setVehicle] = useAtom(vehicleAtom);
	const [kms, setKms] = useAtom(kmAtom);

	const listKm = useListKms();
	const dateFormat = useDateFormat();

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const selectedVehicle = JSON.parse(
			localStorage.getItem("selectedVehicle") as string,
		);

		if (!!vehicle && selectedVehicle !== undefined) {
			setVehicle(selectedVehicle);
		}
	}, []);

	useEffect(() => {
		if (vehicle.id.length) {
			listKm(vehicle.id).then((response) => {
				const formatResponse = response.items.map((item) => ({
					id: item.id,
					km: item.km,
					price: item.price,
					paid: item.paid,
					created: dateFormat(item.created),
				}));
				setKms(formatResponse);
				setLoading(false);
			});
		}
	}, [vehicle]);

	return (
		<Container size={"lg"} my={"xl"}>
			<Flex justify="center" align={"center"} direction={"column"} gap={"lg"}>
				<Container size={"md"}>
					<BrandLogo brand={vehicle.brand} page={true} />
				</Container>
				<Flex align={"center"} gap={5}>
					<NameplateBadge nameplate={vehicle.nameplate} />\
					{/* TODO Separate menu in a different component */}
					<Menu position="bottom" shadow="md">
						<Menu.Target>
							<Button variant="transparent" p={5} color="gray">
								<MenuScale />
							</Button>
						</Menu.Target>
						<Menu.Dropdown>
							<Menu.Item color="red" leftSection={<Trash />}>
								Delete
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				</Flex>
			</Flex>
			<Container size={"sm"} my={"xl"}>
				{!loading ? (
					<KmLineChart kms={kms} media_paid={vehicle.media_paid} />
				) : (
					<Flex justify="center" align={"center"} direction={"column"}>
						<Loader size={"xl"} mt={"xl"} color={"yellow.9"} />
					</Flex>
				)}
			</Container>
			<Container size={"sm"} my={"xl"}>
				{!loading ? (
					<KmTable kms={kms} />
				) : (
					<Flex justify="center" align={"center"} direction={"column"}>
						<Loader size={"xl"} mt={"xl"} />
					</Flex>
				)}
			</Container>
		</Container>
	);
};

export default VehiclePage;
