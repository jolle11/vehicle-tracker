import { Button, Menu } from "@mantine/core";
import { MenuScale, Trash } from "iconoir-react";
import type { Dispatch, SetStateAction } from "react";

interface IVehiclePageMenu {
	setOpen: Dispatch<SetStateAction<string>>;
}

const VehiclePageMenu = ({ setOpen }: IVehiclePageMenu) => {
	return (
		<Menu position="bottom" shadow="md">
			<Menu.Target>
				<Button variant="transparent" p={5} color="gray">
					<MenuScale />
				</Button>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item
					color="red"
					leftSection={<Trash />}
					onClick={() => setOpen("delete-vehicle")}
				>
					Delete
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
};

export default VehiclePageMenu;
