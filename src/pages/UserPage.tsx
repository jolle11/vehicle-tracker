import { Container, Title, Text, Flex } from "@mantine/core";
import { userAtom } from "atoms/user";
import { useAtom } from "jotai";

const UserPage = () => {
	const [user, setUser] = useAtom(userAtom);
	console.log(user);

	return (
		<Container size={"lg"} my={"xl"}>
			<Flex justify="center" align={"center"} direction={"column"} gap={10}>
				<Title>
					{user.name} {user.surname}
				</Title>
				<Text>Alias: {user.username}</Text>
				<Text>Email: {user.email}</Text>
				<Text>Registered at: {user.created}</Text>
			</Flex>
		</Container>
	);
};

export default UserPage;
