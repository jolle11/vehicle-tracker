import {
	Modal,
	Paper,
	TextInput,
	ColorInput,
	NumberInput,
	Button,
	Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { SetStateAction, Dispatch } from "react";

interface INewVehicleModal {
	open: string;
	setOpen: Dispatch<SetStateAction<string>>;
	createVehicleForm: ReturnType<typeof useForm>;
	handleNewVehicle: (values: any) => void; // Asegúrate de definir correctamente el tipo de values aquí
	loading?: boolean;
}

const NewVehicleModal = ({
	open,
	setOpen,
	createVehicleForm,
	handleNewVehicle,
	loading,
}: INewVehicleModal) => {
	return (
		<Modal
			opened={open === "add-new-car"}
			title="Add new vehicle"
			centered
			onClose={() => {
				setOpen("");
				createVehicleForm.reset();
			}}
		>
			<Paper px={20} pb={20} radius="md">
				<form onSubmit={handleNewVehicle}>
					{/* TODO Change to autocomplete with option to send text input if nothing found */}
					<TextInput
						label="Brand"
						placeholder="Choose your brand"
						required
						{...createVehicleForm.getInputProps("brand")}
					/>
					<TextInput
						label="Nameplate"
						placeholder="0000ABC"
						required
						{...createVehicleForm.getInputProps("nameplate")}
						mt={10}
					/>
					<ColorInput
						label="Color"
						placeholder="Vehicle color"
						required
						{...createVehicleForm.getInputProps("color")}
						mt={10}
					/>
					<NumberInput
						label="Current Kms"
						placeholder="123456"
						required
						allowNegative={false}
						{...createVehicleForm.getInputProps("currentkms")}
						mt={10}
					/>
					<Button fullWidth mt="lg" type="submit" disabled={loading ?? true}>
						{loading ? <Loader color="blue" size={"sm"} /> : "Add"}
					</Button>
				</form>
			</Paper>
		</Modal>
	);
};

export default NewVehicleModal;
