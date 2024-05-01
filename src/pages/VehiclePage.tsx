import { Container, Flex, Loader } from "@mantine/core";
import { useAtom } from "jotai";
import { vehicleAtom } from "atoms/vehicle";
import BrandLogo from "components/BrandLogo";
import { useEffect, useState } from "react";
import { useDeleteVehicle, useListKms } from "hooks/vehicles/useVehicleActions";
import { kmAtom } from "atoms/km";
import useDateFormat from "hooks/utils/useDateFormat";
import KmTable from "components/KmTable";
import KmLineChart from "components/KmLineChart";
import NameplateBadge from "components/NameplateBadge";
import { Check } from "iconoir-react";
import { useNotifications } from "hooks/notifications/useNotifications";
import { userVehiclesAtom } from "atoms/user";
import DeleteVehicleModal from "components/Modals/DeleteVehicleModal";
import { useNavigate } from "react-router-dom";
import VehiclePageMenu from "components/Menus/VehiclePageMenu";
import { useSetCurrency } from "hooks/utils/useSetCurrency";
import { useSetMeasure } from "hooks/utils/useSetMeasure";

const VehiclePage = () => {
	const [vehicle, setVehicle] = useAtom(vehicleAtom);
	const [kms, setKms] = useAtom(kmAtom);
	const [userVehicles, setUserVehicles] = useAtom(userVehiclesAtom);
	const [userCurrency, setUserCurrency] = useState("");
	const [userMeasure, setUserMeasure] = useState("");

	const setCurrency = useSetCurrency();
	const setMeasure = useSetMeasure();
	const listKm = useListKms();
	const dateFormat = useDateFormat();
	const deleteVehicle = useDeleteVehicle();
	const notification = useNotifications();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState("");

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
				navigate("/");
			})
			.catch((error) => console.log(error));
	};

	useEffect(() => {
		if (!localStorage.getItem("currency")) {
			setCurrency.then((currency) => {
				localStorage.setItem("measure", currency);
				setUserCurrency(currency);
			});
		} else {
			setUserCurrency(localStorage.getItem("currency") as string);
		}
		if (!localStorage.getItem("measure")) {
			setMeasure.then((measure) => {
				localStorage.setItem("measure", measure);
				setUserMeasure(measure);
			});
		} else {
			setUserMeasure(localStorage.getItem("measure") as string);
		}
	}, []);

	useEffect(() => {
		const selectedVehicle = JSON.parse(
			localStorage.getItem("selectedVehicle") as string,
		);

		if (!!vehicle && selectedVehicle !== undefined) {
			setVehicle(selectedVehicle);
		}
	}, []);

	useEffect(() => {
		if (vehicle.id.length) {
			listKm(vehicle.id).then((response) => {
				const formatResponse = response.items.map((item) => ({
					id: item.id,
					km: item.km,
					price: item.price,
					paid: item.paid,
					created: dateFormat(item.created),
				}));
				setKms(formatResponse);
				setLoading(false);
			});
		}
	}, [vehicle]);

	return (
		<Container size={"lg"} my={"xl"}>
			<Flex justify="center" align={"center"} direction={"column"} gap={"lg"}>
				<Container size={"md"}>
					<BrandLogo brand={vehicle.brand} page={true} />
				</Container>
				<Flex align={"center"} gap={5}>
					<NameplateBadge nameplate={vehicle.nameplate} />
					<VehiclePageMenu setOpen={setOpen} />
				</Flex>
			</Flex>
			<Container size={"sm"} my={"xl"}>
				{loading ? (
					<Flex justify="center" align={"center"} direction={"column"}>
						<Loader size={"xl"} mt={"xl"} color={"yellow.9"} />
					</Flex>
				) : (
					<KmLineChart
						kms={kms}
						media_paid={vehicle.media_paid}
						currency={userCurrency}
						measure={userMeasure}
					/>
				)}
			</Container>
			<Container size={"sm"} my={"xl"}>
				{loading ? (
					<Flex justify="center" align={"center"} direction={"column"}>
						<Loader size={"xl"} mt={"xl"} />
					</Flex>
				) : (
					<KmTable kms={kms} currency={userCurrency} measure={userMeasure} />
				)}
			</Container>
			<DeleteVehicleModal
				open={open}
				setOpen={setOpen}
				handleDeleteVehicle={handleDeleteVehicle}
				loading={loading}
			/>
		</Container>
	);
};

export default VehiclePage;
