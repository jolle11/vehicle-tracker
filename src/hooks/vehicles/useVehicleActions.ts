import { ICreateVehicle, IRegisterKms } from "atoms/vehicle";
import { useConnectDB } from "hooks/auth/useConnectDB";

export const useListVehicles = () => {
	const pb = useConnectDB();
	return async (userId: string) => {
		return (await pb)
			.collection("avg_kms_and_paid")
			.getList(1, 20, { filter: `user_id = "${userId}"` });
	};
};

export const useListKms = () => {
	const pb = useConnectDB();
	return async (vehicleId: string) => {
		return (await pb).collection("kms").getList(1, 500, {
			sort: "-created",
			filter: `vehicle_id = "${vehicleId}"`,
		});
	};
};

export const useCreateVehicle = () => {
	const pb = useConnectDB();
	return async (data: ICreateVehicle) => {
		return (await pb).collection("vehicles").create(data);
	};
};

export const useDeleteVehicle = () => {
	const pb = useConnectDB();
	return async (vehicleId: string) => {
		return (await pb).collection("vehicles").delete(vehicleId);
	};
};

export const useRegisterKms = () => {
	const pb = useConnectDB();
	return async (data: IRegisterKms) => {
		return (await pb).collection("kms").create(data);
	};
};
