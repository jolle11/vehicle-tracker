import { useConnectDB } from "./useConnectDB";

interface ILoginUser {
	email: string;
	password: string;
}

export const useLogin = () => {
	const pb = useConnectDB();
	return async (user: ILoginUser) => {
		return (await pb)
			.collection("users")
			.authWithPassword(user.email, user.password);
	};
};
