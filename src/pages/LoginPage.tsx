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

const LoginPage = () => {
    return (
        <Container size={420} my={40}>
            <Title ta="center">Welcome back!</Title>
            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <TextInput label="Email" placeholder="you@gmail.com" required />
                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    required
                    mt="md"
                />
                <Group justify="space-between" mt="lg">
                    <Checkbox label="Remember me" />
                    {/* <Anchor component="button" size="sm">
                        Forgot password?
                    </Anchor> */}
                </Group>
                <Button fullWidth mt="xl">
                    Login
                </Button>
                <Text c="dimmed" size="sm" ta="center" mt={5}>
                    Do not have an account yet?&nbsp;
                    <Anchor size="sm" component="button">
                        Register
                    </Anchor>
                </Text>
            </Paper>
        </Container>
    );
};

export default LoginPage;
