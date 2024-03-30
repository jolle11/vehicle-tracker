import { useConnectDB } from "./useConnectDB";

interface ILoginUser {
	email: string;
	password: string;
}

export const useGoogleLogin = () => {
	const pb = useConnectDB();
	return async () => {
		return (await pb)
			.collection("users")
			.authWithOAuth2({ provider: "google" });
	};
};
