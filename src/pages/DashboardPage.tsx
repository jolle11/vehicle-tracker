import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "atoms/user";
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
import { userAuthenticatedAtom } from "atoms/auth";
import { useEffect, useState } from "react";
import {
	useCreateVehicle,
	useListVehicles,
	useRegisterKms,
} from "hooks/vehicles/useVehicleActions";
import VehicleCard from "components/VehicleCard";
import useNumberFormat from "hooks/utils/useNumberFormat";
import NewVehicleCard from "components/NewVehicleCard";
import { useForm } from "@mantine/form";
import { vehicleAtom } from "atoms/vehicle";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [vehicle] = useAtom(vehicleAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();
	const mediaFormat = useNumberFormat();
	const createVehicle = useCreateVehicle();
	const registerKm = useRegisterKms();

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState(false);

	const [open, setOpen] = useState("");

	const createVehicleForm = useForm({
		initialValues: {
			user_id: "",
			brand: "",
			nameplate: "",
			color: "",
			current_kms: 0,
		},
	});

	const addFuelForm = useForm({
		initialValues: {
			vehicle_id: vehicle.id,
			km: 0,
			paid: 0,
			price: 0,
		},
	});

	const handleNewVehicle = createVehicleForm.onSubmit((values) => {
		values.user_id = user.id;
		setLoading(true);
		setOpen("");
		createVehicle(values)
			.then((response) => {
				registerKm({ vehicle_id: response.id, km: values.current_kms });
				setTimeout(() => {
					setList(!list);
				}, 1000);
				createVehicleForm.reset();
			})
			.catch((error) => console.log(error));
	});

	const handleAddFuel = addFuelForm.onSubmit((values) => {
		values.vehicle_id = vehicle.id;
		setLoading(true);
		setOpen("");
		registerKm(values)
			.then(() => {
				setTimeout(() => {
					setList(!list);
				}, 1000);
				addFuelForm.reset();
			})
			.catch((error) => console.log(error));
	});

	useEffect(() => {
		if (userAuthenticated) {
			listVehicles(user.id)
				.then((response) => {
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
							placeholder="123456"
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
							{...addFuelForm.getInputProps("price")}
							mt={10}
						/>
						<Button fullWidth mt="lg" type="submit" disabled={loading ?? true}>
							{loading ? <Loader color="blue" size={"sm"} /> : "Add"}
						</Button>
					</form>
				</Paper>
			</Modal>
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
