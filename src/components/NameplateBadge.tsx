import { Badge, Title } from "@mantine/core";

interface INameplate {
	nameplate: string;
}

const NameplateBadge = ({ nameplate }: INameplate) => {
	return (
		<Badge
			variant="light"
			color="dark"
			radius={"sm"}
			size="xl"
			py={"lg"}
			style={{ borderColor: "gray" }}
		>
			<Title>{nameplate}</Title>
		</Badge>
	);
};

export default NameplateBadge;
