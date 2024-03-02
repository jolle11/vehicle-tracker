import { Badge, Container, Flex, Loader, Table, Title } from "@mantine/core";
import { LineChart } from "@mantine/charts";
import { useAtom } from "jotai";
import { vehicleAtom } from "../atoms/vehicle";
import BrandLogo from "../components/BrandLogo";
import { useEffect, useState } from "react";
import { useListKms } from "../hooks/vehicles/useVehicleActions";
import { kmAtom } from "../atoms/km";
import useDateFormat from "../hooks/utils/useDateFormat";
import CustomChartTooltip from "../components/CustomChartTooltip";

const VehiclePage = () => {
	const [vehicle, setVehicle] = useAtom(vehicleAtom);
	const [kms, setKms] = useAtom(kmAtom);

	const listKm = useListKms();
	const dateFormat = useDateFormat();

	const [loading, setLoading] = useState(true);

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
				<Container size={"sm"}>
					<BrandLogo brand={vehicle.brand} page={true} />
				</Container>
				<Badge
					variant="light"
					color="dark"
					radius={"sm"}
					size="xl"
					py={"lg"}
					style={{ borderColor: "gray" }}
				>
					<Title>{vehicle.nameplate}</Title>
				</Badge>
			</Flex>
			<Container size={"sm"} my={"xl"}>
				{!loading ? (
					// TODO Separate chart in another component
					<LineChart
						h={200}
						data={[...kms].reverse()}
						dataKey="created"
						series={[{ name: "paid", label: "Paid", color: "yellow.9" }]}
						tooltipProps={{
							content: ({ label, payload }) => (
								<CustomChartTooltip label={label} payload={payload} />
							),
						}}
						activeDotProps={{ r: 8, strokeWidth: 2, fill: "#fff" }}
						strokeWidth={1.5}
						unit="€"
						curveType="bump"
					/>
				) : (
					<Flex justify="center" align={"center"} direction={"column"}>
						<Loader size={"xl"} mt={"xl"} color={"yellow.9"} />
					</Flex>
				)}
			</Container>
			<Container size={"sm"} my={"xl"}>
				{!loading ? (
					//TODO Separate table in another component
					<Table striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th style={{ textAlign: "center" }}>KM</Table.Th>
								<Table.Th style={{ textAlign: "center" }}>Price</Table.Th>
								<Table.Th style={{ textAlign: "center" }}>Paid</Table.Th>
								<Table.Th style={{ textAlign: "center" }}>Created</Table.Th>
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>
							{kms?.map((km) => (
								<Table.Tr key={km.id}>
									<Table.Td style={{ textAlign: "center" }}>{km.km}</Table.Td>
									<Table.Td style={{ textAlign: "center" }}>
										{km.price}
									</Table.Td>
									<Table.Td style={{ textAlign: "center" }}>
										{km.paid}€
									</Table.Td>
									<Table.Td style={{ textAlign: "center" }}>
										{km.created}
									</Table.Td>
								</Table.Tr>
							))}
						</Table.Tbody>
					</Table>
				) : (
					<Flex justify="center" align={"center"} direction={"column"}>
						<Loader size={"xl"} mt={"xl"} />
					</Flex>
				)}
			</Container>
		</Container>
	);
};

export default VehiclePage;
