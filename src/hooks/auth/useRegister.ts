import { useConnectDB } from "./useConnectDB";

interface IRegisterUser {
	username: string;
	email: string;
	emailVisibility: boolean;
	password: string;
	passwordConfirm: string;
	name: string;
	surname: string;
}

export const useRegister = async (user: IRegisterUser) => {
	const pb = await useConnectDB();

	return await pb.collection("users").create(user);
};
