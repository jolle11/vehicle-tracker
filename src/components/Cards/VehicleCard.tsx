import { Badge, Button, Card, Group, Title, Text } from "@mantine/core";
import { GasTankDroplet, Trash } from "iconoir-react";
import BrandLogo from "components/BrandLogo";
import type { IVehicle } from "atoms/vehicle";
import { vehicleAtom } from "atoms/vehicle";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import type { Dispatch, SetStateAction } from "react";

const VehicleCard = ({
	vehicle,
	openModal,
}: { vehicle: IVehicle; openModal: Dispatch<SetStateAction<string>> }) => {
	const navigate = useNavigate();
	const [, setVehicle] = useAtom(vehicleAtom);

	return (
		<Card
			key={vehicle.id}
			shadow="sm"
			padding="lg"
			radius="md"
			withBorder
			w={220}
			style={{ cursor: "pointer" }}
			onClick={(event) => {
				const shouldNavigate = !(event.target as HTMLElement).closest("button");
				if (shouldNavigate) {
					localStorage.setItem("selectedVehicle", JSON.stringify(vehicle));
					setVehicle(vehicle);
					navigate(
						`/${vehicle.brand
							.toLowerCase()
							.replace(" ", "-")}/${vehicle.nameplate.toLowerCase()}`,
					);
				}
			}}
		>
			<Group justify="center">
				<BrandLogo brand={vehicle.brand} />
			</Group>
			<Group justify="space-between" mb="sm" mt="md" h={30}>
				<Title size={20}>{vehicle.nameplate.toUpperCase()}</Title>
				<Badge
					color={vehicle.color}
					style={{ boxShadow: "0px 2px 5px gray" }}
					w={50}
				/>
			</Group>
			<Group justify="center" mb="sm" mt="md">
				<Text>Last register: {vehicle.last_km}</Text>
				<Text>Media tank: {vehicle.media_tank}</Text>
				<Text>Media paid: {vehicle.media_paid}</Text>
			</Group>
			<Group justify="center">
				<Button
					my="sm"
					variant="solid"
					onClick={(event) => {
						setVehicle(vehicle);
						openModal("add-fuel");
						event.stopPropagation();
					}}
				>
					Add &nbsp;
					<GasTankDroplet />
				</Button>
				<Button
					my="sm"
					variant="light"
					color="red.5"
					onClick={(event) => {
						setVehicle(vehicle);
						openModal("delete-vehicle");
						event.stopPropagation();
					}}
				>
					<Trash />
				</Button>
			</Group>
		</Card>
	);
};

export default VehicleCard;
