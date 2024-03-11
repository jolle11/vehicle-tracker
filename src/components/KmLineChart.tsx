import { LineChart } from "@mantine/charts";
import { IKm } from "atoms/km";
import CustomChartTooltip from "./CustomChartTooltip";

const KmLineChart = ({
	kms,
	media_paid,
}: { kms: IKm[]; media_paid: string | number | null }) => {
	return (
		<LineChart
			h={200}
			data={[...kms].reverse()}
			dataKey="created"
			series={[{ name: "paid", label: "Paid", color: "yellow.9" }]}
			referenceLines={[
				{
					y: parseFloat(media_paid as string),
					label: `Media paid ${media_paid}€`,
					color: "indigo.6",
				},
			]}
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
	);
};

export default KmLineChart;
