import { Paper, Text } from "@mantine/core";
import useCapitalizeFirstLetter from "hooks/utils/useCapitalizeFirstLetter";

interface ChartTooltipProps {
	label: string;
	payload: Record<string, any>[] | undefined;
	currency?: string;
	measure?: string;
}

const CustomChartTooltip = ({
	label,
	payload,
	currency,
	measure,
}: ChartTooltipProps) => {
	const capitalize = useCapitalizeFirstLetter();

	if (!payload) {
		return null;
	}

	return (
		<Paper px="sm" py="sm" withBorder shadow="md">
			<Text fw={500} mb={5}>
				{label}
			</Text>
			{payload.map((item: any) => (
				<>
					<Text key={item.name} c={item.color} fz="sm">
						{capitalize(item.name)}: {item.value}
						{currency}
					</Text>
					<Text key={item.name} c="green.9" fz="sm">
						Refueled on: {item.payload.km} {measure}
					</Text>
				</>
			))}
		</Paper>
	);
};

export default CustomChartTooltip;
