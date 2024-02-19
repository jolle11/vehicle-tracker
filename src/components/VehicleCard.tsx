import { Badge, Button, Card, Group, Title } from "@mantine/core";
import { GasTankDroplet, Wrench } from "iconoir-react";
import BrandLogo from "./BrandLogo";
import { IVehicle } from "../atoms/vehicle";

const VehicleCard = ({ vehicle }: { vehicle: IVehicle }) => {
	return (
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
					w={50}
				/>
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
	);
};

export default VehicleCard;
