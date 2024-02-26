import { Badge, Button, Card, Group, Title, Text } from "@mantine/core";
import { GasTankDroplet, Slash, Wrench } from "iconoir-react";
import BrandLogo from "./BrandLogo";
import { IVehicle, vehicleAtom } from "../atoms/vehicle";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";

const VehicleCard = ({
	vehicle,
	openModal,
}: { vehicle: IVehicle; openModal: () => void }) => {
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
			style={{ cursor: "pointer" }}
		>
			<Group justify="center">
				<BrandLogo brand={vehicle.brand} />
			</Group>
			<Group justify="space-between" mb="sm" mt="md" h={30}>
				<Title size={20}>{vehicle.nameplate}</Title>
				<Badge
					color={`#${vehicle.color}`}
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
					color="blue"
					my="sm"
					variant="solid"
					fullWidth
					onClick={(event) => {
						openModal();
						event.stopPropagation();
					}}
				>
					<GasTankDroplet />
					<Slash /> <Wrench />
				</Button>
			</Group>
		</Card>
	);
};

export default VehicleCard;
