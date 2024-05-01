import { LineChart } from "@mantine/charts";
import type { IKm } from "atoms/km";
import CustomChartTooltip from "./CustomChartTooltip";

const KmLineChart = ({
	kms,
	media_paid,
	currency,
	measure,
}: {
	kms: IKm[];
	media_paid: string | number | null;
	currency: string;
	measure: string;
}) => {
	const media_line = Number.parseFloat(media_paid as string);
	return (
		<LineChart
			h={200}
			data={[...kms].reverse()}
			dataKey="created"
			series={[{ name: "paid", label: "Paid", color: "yellow.9" }]}
			referenceLines={[
				{
					y: media_line,
					label: `Media paid ${media_paid}${currency}`,
					color: "indigo.6",
				},
			]}
			tooltipProps={{
				content: ({ label, payload }) => (
					<CustomChartTooltip
						label={label}
						payload={payload}
						currency={currency}
						measure={measure}
					/>
				),
			}}
			activeDotProps={{ r: 7, strokeWidth: 2, fill: "#fff" }}
			strokeWidth={1.5}
			unit={currency}
			curveType="bump"
			xAxisProps={{ padding: { left: 10, right: 10 } }}
		/>
	);
};

export default KmLineChart;
