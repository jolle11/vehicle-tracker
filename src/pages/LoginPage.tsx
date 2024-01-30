import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useLoginUser } from "../auth";
import { notifications } from "@mantine/notifications";
import { CheckCircleSolid, XmarkCircleSolid } from "iconoir-react";

const LoginPage = () => {
	const navigate = useNavigate();

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = form.onSubmit((values) =>
		useLoginUser(values)
			.then((response) => {
				notifications.show({
					title: "Success",
					message: `Welcome back ${response.record.username}`,
					color: "green",
					icon: <CheckCircleSolid />,
					autoClose: 2000,
				});
			})
			.catch((error) => {
				notifications.show({
					title: "Oops!",
					message: error.message,
					color: "red",
					icon: <XmarkCircleSolid />,
					autoClose: 2000,
				});
			}),
	);

	return (
		<Container size={420} my={40}>
			<Title ta="center">Welcome back!</Title>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={handleLogin}>
					<TextInput
						label="Email"
						placeholder="you@gmail.com"
						required
						{...form.getInputProps("email")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						mt="md"
						{...form.getInputProps("password")}
					/>
					{/* <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor>
                </Group> */}
					<Button fullWidth mt="xl" type="submit">
						Login
					</Button>
					<Text c="dimmed" size="sm" ta="center" mt={5}>
						Do not have an account yet?&nbsp;
						<Anchor
							size="sm"
							component="button"
							onClick={() => navigate("/register")}
						>
							Register
						</Anchor>
					</Text>
				</form>
			</Paper>
		</Container>
	);
};

export default LoginPage;
