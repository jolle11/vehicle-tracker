import { LineChart } from "@mantine/charts";
import { IKm } from "../atoms/km";
import CustomChartTooltip from "./CustomChartTooltip";

const KmLineChart = ({ kms }: { kms: IKm[] }) => {
	return (
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
	);
};

export default KmLineChart;
