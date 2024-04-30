import { useConnectDB } from "./useConnectDB";

interface IUser {
	id: string;
	alias: string;
}

export const useSetAlias = () => {
	const pb = useConnectDB();

	return async (user: IUser) => {
		return (await pb)
			.collection("users")
			.update(user.id, { username: user.alias });
	};
};
