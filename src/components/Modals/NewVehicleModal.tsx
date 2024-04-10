import {
	Modal,
	Paper,
	TextInput,
	ColorInput,
	NumberInput,
	Button,
	Loader,
	Autocomplete,
} from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import type { SetStateAction, Dispatch } from "react";
import { renderAutocompleteOption } from "components/RenderBrandsAutocomplete";
import brands from "assets/brands.json";

interface INewVehicleModal {
	open: string;
	setOpen: Dispatch<SetStateAction<string>>;
	createVehicleForm: UseFormReturnType<{
		user_id: string;
		brand: string;
		nameplate: string;
		color: string;
		current_kms: number;
	}>;
	handleNewVehicle: (values: any) => void;
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
			opened={open === "add-new-vehicle"}
			title="Add new vehicle"
			centered
			onClose={() => {
				setOpen("");
				createVehicleForm.reset();
			}}
		>
			<Paper px={20} pb={20} radius="md">
				<form onSubmit={handleNewVehicle}>
					<Autocomplete
						label="Brand"
						placeholder="Choose or write your brand"
						data-autofocus
						data={brands}
						renderOption={renderAutocompleteOption}
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
