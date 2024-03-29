import { Card, Button, Group } from "@mantine/core";
import type { Dispatch, SetStateAction } from "react";

const NewVehicleCard = ({
	openModal,
}: { openModal: Dispatch<SetStateAction<string>> }) => {
	return (
		<Card
			w={220}
			style={{
				display: "flex",
				justifyContent: "center",
				background: "transparent",
			}}
		>
			<Group>
				<Button
					my={"sm"}
					variant="outline"
					fullWidth
					onClick={(event) => {
						openModal("add-new-vehicle");
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
