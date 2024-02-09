import { useConnectDB } from "./useConnectDB";

interface ILoginUser {
	email: string;
	password: string;
}

export const useLogin = async (user: ILoginUser) => {
	const pb = await useConnectDB();
	return pb.collection("users").authWithPassword(user.email, user.password);
};
