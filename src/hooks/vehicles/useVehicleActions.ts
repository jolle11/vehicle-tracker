import { useConnectDB } from "../auth/useConnectDB";

export const useListVehicles = () => {
	const pb = useConnectDB();
	return async (id: string) => {
		return (await pb)
			.collection("avg_kms_and_paid")
			.getList(1, 20, { filter: `user_id = "${id}"` });
	};
};
