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

export const useRegister = () => {
	const pb = useConnectDB();
	return async (user: IRegisterUser) => {
		return (await pb).collection("users").create(user);
	};
};
