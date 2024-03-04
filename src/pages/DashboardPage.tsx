import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "../atoms/user";
import {
	Container,
	Title,
	Flex,
	Loader,
	Modal,
	Button,
	Paper,
	TextInput,
	ColorInput,
	NumberInput,
} from "@mantine/core";
import { userAuthenticatedAtom } from "../atoms/auth";
import { useEffect, useState } from "react";
import {
	useCreateVehicle,
	useListVehicles,
	useRegisterKms,
} from "../hooks/vehicles/useVehicleActions";
import VehicleCard from "../components/VehicleCard";
import useNumberFormat from "../hooks/utils/useNumberFormat";
import NewVehicleCard from "../components/NewVehicleCard";
import { useForm } from "@mantine/form";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();
	const mediaFormat = useNumberFormat();
	const createVehicle = useCreateVehicle();
	const registerKm = useRegisterKms();

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState(false);

	const [open, setOpen] = useState("");

	const createForm = useForm({
		initialValues: {
			user_id: "",
			brand: "",
			nameplate: "",
			color: "",
			current_kms: 0,
		},
	});

	const handleNewVehicle = createForm.onSubmit((values) => {
		createVehicle(values).then((response) => {
			registerKm({ vehicle_id: response.id, km: values.current_kms });
			setLoading(true);
			setOpen("");
			setTimeout(() => {
				setList(!list);
			}, 1000);
			createForm.reset();
		});
	});

	useEffect(() => {
		if (userAuthenticated) {
			listVehicles(user.id)
				.then((response) => {
					console.log("In");
					const formatResponse = response.items.map((item) => ({
						id: item.id,
						nameplate: item.nameplate,
						brand: item.brand,
						color: item.color,
						last_km: item.last_km,
						media_tank: mediaFormat(item.media_tank) ?? 0,
						media_paid: mediaFormat(item.media_paid) ?? 0,
					}));
					setUserVehicles(formatResponse);
					setLoading(false);
					createForm.setFieldValue("user_id", user.id);
				})
				.catch((error) => console.log(error));
		}
	}, [user, list]);

	return userAuthenticated ? (
		<Container size={"lg"} my={"xl"}>
			<Flex my={"xl"} align={"center"} direction={"column"} wrap={"wrap"}>
				<Title>Hello {user.username}!</Title>
				<Flex gap={"md"} my={"xl"} justify={"center"} wrap={"wrap"}>
					{loading && <Loader size={"xl"} mt={"xl"} />}
					{!(loading || userVehicles.length) && (
						<NewVehicleCard openModal={setOpen} />
					)}
					{!loading && !!userVehicles.length && (
						<>
							{userVehicles.map((vehicle) => (
								<VehicleCard
									key={vehicle.id}
									vehicle={vehicle}
									openModal={setOpen}
								/>
							))}
							<NewVehicleCard openModal={setOpen} />
						</>
					)}
				</Flex>
			</Flex>
			{/* TODO Separate modals in different components */}
			<Modal
				opened={open === "add-fuel"}
				onClose={() => setOpen("")}
				title="Add fuel register"
			>
				- vehicle_id <br />- km <br />- paid <br />- price
			</Modal>
			<Modal
				opened={open === "add-new-car"}
				onClose={() => setOpen("")}
				title="Add new vehicle"
				centered
			>
				<Paper px={20} pb={20} radius="md">
					<form onSubmit={handleNewVehicle}>
						{/* TODO Change to autocomplete with option to send text input if nothing found */}
						<TextInput
							label="Brand"
							placeholder="Choose your brand"
							required
							{...createForm.getInputProps("brand")}
						/>
						<TextInput
							label="Nameplate"
							placeholder="0000ABC"
							required
							{...createForm.getInputProps("nameplate")}
							mt={10}
						/>
						<ColorInput
							label="Color"
							placeholder="Vehicle color"
							required
							{...createForm.getInputProps("color")}
							mt={10}
						/>
						<NumberInput
							label="Current Kms"
							placeholder="123456"
							required
							allowNegative={false}
							{...createForm.getInputProps("currentkms")}
							mt={10}
						/>
						<Button fullWidth mt="lg" type="submit" disabled={loading ?? true}>
							{loading ? <Loader color="blue" size={"sm"} /> : "Add"}
						</Button>
					</form>
				</Paper>
			</Modal>
		</Container>
	) : (
		<Container size={"lg"} my={"xl"}>
			<Flex my={"xl"} align={"center"} direction={"column"} wrap={"wrap"}>
				<Title>Take control of your vehicle/s</Title>
			</Flex>
		</Container>
	);
};

export default DashboardPage;
