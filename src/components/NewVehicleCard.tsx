import { Card, Button, Group } from "@mantine/core";
import { Dispatch, SetStateAction } from "react";

const NewVehicleCard = ({
	openModal,
}: { openModal: Dispatch<SetStateAction<string>> }) => {
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
					onClick={(event) => {
						openModal("add-new-car");
						event.stopPropagation();
					}}
				>
					Add new vehicle
				</Button>
			</Group>
		</Card>
	);
};

export default NewVehicleCard;
