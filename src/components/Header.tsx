import {
	ActionIcon,
	Box,
	Burger,
	Button,
	Center,
	Collapse,
	Container,
	Divider,
	Drawer,
	Group,
	ScrollArea,
	UnstyledButton,
	rem,
	useComputedColorScheme,
	useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Car, HalfMoon, SunLight } from "iconoir-react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthenticatedAtom } from "atoms/auth";
import { useAtom } from "jotai";
import useLogout from "hooks/auth/useLogout";

export function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	});

	const navigate = useNavigate();

	const logout = useLogout();

	const [userAuthenticated] = useAtom(userAuthenticatedAtom);

	return (
		<Box style={{ boxShadow: "0px 0px 5px gray" }}>
			<header>
				<Container size={"lg"}>
					<Group justify="space-between" h="100%" py={12}>
						<Group>
							<Button onClick={() => navigate("/dashboard")}>
								<Car />
							</Button>
						</Group>
						<Group visibleFrom="sm">
							<ActionIcon
								onClick={() =>
									setColorScheme(
										computedColorScheme === "light" ? "dark" : "light",
									)
								}
								variant="default"
								size="lg"
								radius="xl"
								aria-label="Toggle color scheme"
							>
								{computedColorScheme === "light" ? (
									<SunLight fontSize={14} />
								) : (
									<HalfMoon fontSize={14} />
								)}
							</ActionIcon>
							{userAuthenticated ? (
								// TODO Create function for logout with notification and deletion from local storage
								<Button color="red.9" variant="light" onClick={logout}>
									Logout
								</Button>
							) : (
								<>
									<Button variant="default" onClick={() => navigate("/login")}>
										Log in
									</Button>
									<Button onClick={() => navigate("/register")}>
										Register
									</Button>
								</>
							)}
						</Group>

						<Burger
							opened={drawerOpened}
							onClick={toggleDrawer}
							hiddenFrom="sm"
						/>
					</Group>
				</Container>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Menu"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />
					<Link to="/">Home</Link>
					<UnstyledButton onClick={toggleLinks}>
						<Center inline>
							<Box component="span" mr={5}>
								Features
							</Box>
						</Center>
					</UnstyledButton>
					<Collapse in={linksOpened}>
						<Link to="/">Learn</Link>
						<Link to="/">Academy</Link>
					</Collapse>

					<Divider my="sm" />

					<Group justify="center" grow pb="xl" px="md">
						{userAuthenticated ? (
							// TODO Create function for logout with notification and deletion from local storage
							<Button color="red.9" variant="light" onClick={logout}>
								Logout
							</Button>
						) : (
							<>
								<Button
									variant="default"
									onClick={() => {
										navigate("/login");
										closeDrawer();
									}}
								>
									Log in
								</Button>
								<Button
									onClick={() => {
										navigate("/register");
										closeDrawer();
									}}
								>
									Register
								</Button>
							</>
						)}{" "}
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
