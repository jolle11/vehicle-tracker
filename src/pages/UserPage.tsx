import { Container } from "@mantine/core";
import { userAtom } from "atoms/user";
import { useAtom } from "jotai";

const UserPage = () => {
	const [user, setUser] = useAtom(userAtom);
	console.log(user);

	return (
		<Container size={"lg"} my={"xl"}>
			UserPage
		</Container>
	);
};

export default UserPage;
