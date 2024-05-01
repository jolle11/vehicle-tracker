import { Table } from "@mantine/core";
import type { IKm } from "atoms/km";

const KmTable = ({
	kms,
	currency,
	measure,
}: { kms: IKm[]; currency: string; measure: string }) => {
	return (
		<Table striped highlightOnHover>
			<Table.Thead>
				<Table.Tr>
					<Table.Th style={{ textAlign: "center" }}>{measure}</Table.Th>
					<Table.Th style={{ textAlign: "center" }}>Price</Table.Th>
					<Table.Th style={{ textAlign: "center" }}>Paid ({currency})</Table.Th>
					<Table.Th style={{ textAlign: "center" }}>Created</Table.Th>
				</Table.Tr>
			</Table.Thead>
			<Table.Tbody>
				{kms?.map((km) => (
					<Table.Tr key={km.id}>
						<Table.Td style={{ textAlign: "center" }}>{km.km}</Table.Td>
						<Table.Td style={{ textAlign: "center" }}>{km.price}</Table.Td>
						<Table.Td style={{ textAlign: "center" }}>{km.paid}</Table.Td>
						<Table.Td style={{ textAlign: "center" }}>{km.created}</Table.Td>
					</Table.Tr>
				))}
			</Table.Tbody>
		</Table>
	);
};

export default KmTable;
