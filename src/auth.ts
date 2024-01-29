interface IRegisterUser {
	username: string;
	email: string;
	emailVisibility: boolean;
	password: string;
	passwordConfirm: string;
	name: string;
	surname: string;
}

interface ILoginUser {
	email: string;
	password: string;
}

export const useRegisterUser = async (user: IRegisterUser) => {
	const PocketBase = await import("pocketbase");
	const url = import.meta.env.VITE_POCKETHOST_URL;
	const pb = new PocketBase.default(url);

	return await pb.collection("users").create(user);
};

export const useLoginUser = async (user: ILoginUser) => {
	const PocketBase = await import("pocketbase");
	const url = import.meta.env.POCKETHOST_URL;
	const pb = new PocketBase.default(url);

	return await pb.admins.authWithPassword(user.email, user.password);
};
