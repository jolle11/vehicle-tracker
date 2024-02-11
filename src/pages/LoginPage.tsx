import {
	Anchor,
	Button,
	Checkbox,
	Container,
	Group,
	Loader,
	Paper,
	PasswordInput,
	Text,
	TextInput,
	Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/auth/useLogin";
import { Check, Xmark } from "iconoir-react";
import { tokenAtom, userAuthenticatedAtom } from "../atoms/auth";
import { useAtom } from "jotai";
import { useNotifications } from "../hooks/notifications/useNotifications";
import { useState } from "react";
import { userAtom } from "../atoms/user";

const LoginPage = () => {
	const navigate = useNavigate();
	const notification = useNotifications();
	const login = useLogin();

	const [, setToken] = useAtom(tokenAtom);
	const [, setUserAuthenticated] = useAtom(userAuthenticatedAtom);
	const [, setUser] = useAtom(userAtom);

	const [loading, setLoading] = useState(false);

	const form = useForm({
		initialValues: {
			email: "",
			password: "",
		},
	});

	const handleLogin = form.onSubmit((values) => {
		setLoading(true);
		login(values)
			.then((response) => {
				setToken(response.token);
				setUserAuthenticated(true);
				setUser({
					id: response.record.id,
					username: response.record.username,
					email: response.record.email,
				});
				notification({
					type: "success",
					message: `Welcome back ${response.record.username}`,
					icon: <Check />,
				});
				navigate("/dashboard");
				setLoading(false);
			})
			.catch((error) => {
				notification({
					type: "error",
					message: error.message,
					icon: <Xmark />,
				});
				setLoading(false);
			});
	});

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
					<Button fullWidth mt="xl" type="submit" disabled={loading ?? true}>
						{loading ? <Loader color="blue" size={"sm"} /> : "Login"}
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
