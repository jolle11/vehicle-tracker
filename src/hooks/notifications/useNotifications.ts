import { notifications } from "@mantine/notifications";
import type { ReactNode } from "react";

interface INotification {
	type: string;
	message: string;
	icon?: ReactNode;
	time?: number;
}

export const useNotifications = () => {
	return (notification: INotification) => {
		switch (notification.type) {
			case "success":
				return notifications.show({
					title: "Success",
					message: notification.message,
					color: "green",
					icon: notification.icon,
					autoClose: 2000,
				});
			case "error":
				return notifications.show({
					title: "Oops",
					message: notification.message,
					color: "red",
					icon: notification.icon,
					autoClose: 2000,
				});
		}
	};
};
