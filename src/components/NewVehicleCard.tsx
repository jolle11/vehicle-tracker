import { Card, Button, Group } from "@mantine/core";

const NewVehicleCard = () => {
	return (
		<Card
			w={220}
			onClick={(event) => {
				console.log(event);
			}}
			style={{
				display: "flex",
				justifyContent: "center",
			}}
		>
			<Group>
				<Button
					my={"sm"}
					variant="outline"
					fullWidth
					// onClick={(event) => {
					// 	openModal();
					// 	event.stopPropagation();
					// }}
				>
					Add new vehicle
				</Button>
			</Group>
		</Card>
	);
};

export default NewVehicleCard;
