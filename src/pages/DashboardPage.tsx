import { useAtom } from "jotai";
import { userAtom, userVehiclesAtom } from "atoms/user";
import { Container, Title, Flex, Loader } from "@mantine/core";
import { userAuthenticatedAtom } from "atoms/auth";
import { useEffect, useState } from "react";
import {
	useCreateVehicle,
	useDeleteVehicle,
	useListVehicles,
	useRegisterKms,
} from "hooks/vehicles/useVehicleActions";
import VehicleCard from "components/Cards/VehicleCard";
import useNumberFormat from "hooks/utils/useNumberFormat";
import NewVehicleCard from "components/Cards/NewVehicleCard";
import { useForm } from "@mantine/form";
import { vehicleAtom } from "atoms/vehicle";
import NewVehicleModal from "components/Modals/NewVehicleModal";
import AddFuelModal from "components/Modals/AddFuelModal";
import DeleteVehicleModal from "components/Modals/DeleteVehicleModal";
import { useNotifications } from "hooks/notifications/useNotifications";
import { Check } from "iconoir-react";

const DashboardPage = () => {
	const [user] = useAtom(userAtom);
	const [vehicle] = useAtom(vehicleAtom);
	const [userAuthenticated] = useAtom(userAuthenticatedAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);

	const listVehicles = useListVehicles();
	const mediaFormat = useNumberFormat();
	const createVehicle = useCreateVehicle();
	const registerKm = useRegisterKms();
	const deleteVehicle = useDeleteVehicle();
	const notification = useNotifications();

	const [loading, setLoading] = useState(true);
	const [list, setList] = useState(false);

	const [open, setOpen] = useState("");

	const createVehicleForm = useForm({
		initialValues: {
			user_id: "",
			brand: "",
			nameplate: "",
			color: "",
			current_kms: "",
		},
	});

	const addFuelForm = useForm({
		initialValues: {
			vehicle_id: vehicle.id,
			km: "",
			paid: "",
			price: "",
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

	const handleDeleteVehicle = () => {
		setLoading(true);
		setOpen("");
		deleteVehicle(vehicle.id)
			.then(() => {
				notification({
					type: "success",
					message: "Vehicle deleted successfully!",
					icon: <Check />,
				});
				setUserVehicles(userVehicles.filter((item) => item.id !== vehicle.id));
				setLoading(false);
			})
			.catch((error) => console.log(error));
	};

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
			<AddFuelModal
				open={open}
				setOpen={setOpen}
				addFuelForm={addFuelForm}
				handleAddFuel={handleAddFuel}
				loading={loading}
			/>
			<NewVehicleModal
				open={open}
				setOpen={setOpen}
				createVehicleForm={createVehicleForm}
				handleNewVehicle={handleNewVehicle}
				loading={loading}
			/>
			<DeleteVehicleModal
				open={open}
				setOpen={setOpen}
				handleDeleteVehicle={handleDeleteVehicle}
				loading={loading}
			/>
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
