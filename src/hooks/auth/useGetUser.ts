import { useAtom } from "jotai";
import { userAtom } from "../../atoms/user";
import { userAuthenticatedAtom } from "../../atoms/auth";

export const useGetUser = () => {
	const [, setUser] = useAtom(userAtom);
	const [userAuthenticated, setUserAuthenticated] = useAtom(
		userAuthenticatedAtom,
	);
	return () => {
		if (!userAuthenticated) {
			const localUser = JSON.parse(
				localStorage.getItem("pocketbase_auth"),
			)?.model;
			setUser({
				id: localUser?.id,
				username: localUser?.username,
				email: localUser?.email,
			});
			setUserAuthenticated(true);
		}
	};
};
