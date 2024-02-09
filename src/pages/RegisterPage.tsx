import {
	Anchor,
	Button,
	Container,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/auth/useRegister";
import { notifications } from "@mantine/notifications";
import { CheckCircleSolid, XmarkCircleSolid } from "iconoir-react";

const RegisterPage = () => {
	const navigate = useNavigate();
	const form = useForm({
		initialValues: {
			username: "",
			email: "",
			emailVisibility: true,
			password: "",
			passwordConfirm: "",
			name: "",
			surname: "",
		},
	});

	const handleRegister = form.onSubmit((values) =>
		useRegister(values)
			.then((response) => {
				notifications.show({
					title: "Success",
					message: `Welcome ${response.record.username}`,
					color: "green",
					icon: <CheckCircleSolid />,
					autoClose: 2000,
				});
				navigate("/dashboard");
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
			<Title ta="center">Let's start tracking</Title>
			<Paper withBorder shadow="md" p={30} mt={30} radius="md">
				<form onSubmit={handleRegister}>
					<TextInput
						label="Alias"
						placeholder="Your alias"
						required
						{...form.getInputProps("username")}
					/>
					<TextInput
						label="Email"
						placeholder="you@gmail.com"
						required
						{...form.getInputProps("email")}
					/>
					<TextInput
						label="Name"
						placeholder="Your name"
						required
						mt="md"
						{...form.getInputProps("name")}
					/>
					<TextInput
						label="Surname"
						placeholder="Your surname"
						required
						{...form.getInputProps("surname")}
					/>
					<PasswordInput
						label="Password"
						placeholder="Your password"
						required
						mt="md"
						{...form.getInputProps("password")}
					/>
					<PasswordInput
						label="Password confirmation"
						placeholder="Confirm your password"
						required
						{...form.getInputProps("passwordConfirm")}
					/>
					<Button fullWidth mt="xl" type="submit">
						Register
					</Button>
					<Text c="dimmed" size="sm" ta="center" mt={5}>
						Already have an account yet?&nbsp;
						<Anchor
							size="sm"
							component="button"
							onClick={() => navigate("/login")}
						>
							Login
						</Anchor>
					</Text>
				</form>
			</Paper>
		</Container>
	);
};

export default RegisterPage;
