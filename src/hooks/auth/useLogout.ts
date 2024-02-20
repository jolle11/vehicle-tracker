import { useAtom } from "jotai";
import { userAuthenticatedAtom } from "../../atoms/auth";
import { userAtom, userVehiclesAtom } from "../../atoms/user";

const useLogout = () => {
	const [, setUserAuthenticated] = useAtom(userAuthenticatedAtom);
	const [, setUser] = useAtom(userAtom);
	const [, setUserVehicles] = useAtom(userVehiclesAtom);

	return () => {
		setUserAuthenticated(false);
		setUser({ id: "", email: "", username: "" });
		setUserVehicles([]);
		localStorage.removeItem("pocketbase_auth");
	};
};

export default useLogout;
