import { useConnectDB } from "../auth/useConnectDB";

export const useListVehicles = () => {
	const pb = useConnectDB();
	return async (id: string) => {
		return (await pb)
			.collection("vehicles")
			.getList(1, 20, { filter: `user_id = "${id}"` });
	};
};
