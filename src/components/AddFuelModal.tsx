import { Modal, Paper, NumberInput, Button, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Dispatch, SetStateAction } from "react";

interface IAddFuelModal {
	open: string;
	setOpen: Dispatch<SetStateAction<string>>;
	addFuelForm: ReturnType<typeof useForm>;
	handleAddFuel: (values: any) => void; // Asegúrate de definir correctamente el tipo de values aquí
	loading?: boolean;
}

const AddFuelModal = ({
	open,
	setOpen,
	addFuelForm,
	handleAddFuel,
	loading,
}: IAddFuelModal) => {
	return (
		<Modal
			opened={open === "add-fuel"}
			title="Add fuel register"
			centered
			onClose={() => {
				setOpen("");
				addFuelForm.reset();
			}}
		>
			<Paper px={20} pb={20} radius="md">
				<form onSubmit={handleAddFuel}>
					{/* TODO Change to autocomplete with option to send text input if nothing found */}
					<NumberInput
						label="KM"
						placeholder="000000"
						required
						allowNegative={false}
						{...addFuelForm.getInputProps("km")}
						mt={10}
					/>
					<NumberInput
						label="Paid"
						placeholder="56"
						required
						allowNegative={false}
						{...addFuelForm.getInputProps("paid")}
						mt={10}
					/>

					<NumberInput
						label="Price"
						placeholder="1.234"
						required
						allowNegative={false}
						mt={10}
						max={10}
						decimalScale={3}
						fixedDecimalScale
						decimalSeparator="."
						{...addFuelForm.getInputProps("price")}
					/>
					<Button fullWidth mt="lg" type="submit" disabled={loading ?? true}>
						{loading ? <Loader color="blue" size={"sm"} /> : "Add"}
					</Button>
				</form>
			</Paper>
		</Modal>
	);
};

export default AddFuelModal;
