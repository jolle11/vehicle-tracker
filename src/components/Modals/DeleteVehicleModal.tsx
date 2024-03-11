import { Modal, Paper, Button, Loader, Text } from "@mantine/core";
import type { SetStateAction, Dispatch } from "react";

interface IDeleteVehicleModal {
	open: string;
	setOpen: Dispatch<SetStateAction<string>>;
	handleDeleteVehicle: (values: any) => void;
	loading?: boolean;
}

const DeleteVehicleModal = ({
	open,
	setOpen,
	handleDeleteVehicle,
	loading,
}: IDeleteVehicleModal) => {
	return (
		<Modal
			opened={open === "delete-vehicle"}
			title="Delete vehicle"
			centered
			onClose={() => {
				setOpen("");
			}}
		>
			<Paper px={20} pb={20} radius="md">
				<Text>Are you sure you want to delete this car?</Text>
				<Button
					fullWidth
					variant="outline"
					color="red.9"
					mt="lg"
					disabled={loading ?? true}
					onClick={handleDeleteVehicle}
				>
					{loading ? <Loader color="blue" size={"sm"} /> : "Trash it!"}
				</Button>
			</Paper>
		</Modal>
	);
};

export default DeleteVehicleModal;
