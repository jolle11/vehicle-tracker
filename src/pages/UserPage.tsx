import { Container, Title, Text, Flex } from "@mantine/core";
import { userAtom } from "atoms/user";
import { useAtom } from "jotai";

const UserPage = () => {
	const [user] = useAtom(userAtom);

	// TODO: Ability to change username, name and surname

	return (
		<Container size={"lg"} my={"xl"}>
			<Flex justify="center" align={"center"} direction={"column"} gap={10}>
				<Title>
					{user.name} {user.surname}
				</Title>
				<Text>Alias: {user.username}</Text>
				<Text>Email: {user.email}</Text>
				<Text>
					Registered at:&nbsp;
					{new Date(user.created)
						.toISOString()
						.replace(/T/, " ")
						.replace(/\..+/, "")
						.replace(/-/g, "/")}
				</Text>
			</Flex>
		</Container>
	);
};

export default UserPage;
