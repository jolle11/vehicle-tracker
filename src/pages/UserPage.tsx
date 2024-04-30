import { Container, Title, Text, Flex, Button } from "@mantine/core";
import { userAtom } from "atoms/user";
import { UpdateUsernameModal } from "components/Modals/UpdateUsernameModal";
import { useAtom } from "jotai";
import { useState } from "react";

const UserPage = () => {
	const [user, setUser] = useAtom(userAtom);
	const [open, setOpen] = useState("");
	const [loading, setLoading] = useState(false);

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
				<Button onClick={() => setOpen("update-username")}>
					Change username
				</Button>
			</Flex>
			<UpdateUsernameModal
				open={open}
				setOpen={setOpen}
				loading={loading}
				setLoading={setLoading}
			/>
		</Container>
	);
};

export default UserPage;
