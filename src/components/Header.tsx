import {
	ActionIcon,
	Box,
	Burger,
	Button,
	Center,
	Collapse,
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
import { useNavigate } from "react-router-dom";

export function Header() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

	const { setColorScheme } = useMantineColorScheme();
	const computedColorScheme = useComputedColorScheme("light", {
		getInitialValueInEffect: true,
	});

	const navigate = useNavigate();

	return (
		<Box style={{ boxShadow: "0px 0px 5px black" }}>
			<header>
				<Group justify="space-between" h="100%" p={12}>
					<Group>
						{/* TODO if user is authenticated, go to dashboard, otherwise go to landing page or home */}
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

						<Button variant="default" onClick={() => navigate("/login")}>
							Log in
						</Button>
						<Button onClick={() => navigate("/register")}>Register</Button>
					</Group>

					<Burger
						opened={drawerOpened}
						onClick={toggleDrawer}
						hiddenFrom="sm"
					/>
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Navigation"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />
					<a href="#">Home</a>
					<UnstyledButton onClick={toggleLinks}>
						<Center inline>
							<Box component="span" mr={5}>
								Features
							</Box>
						</Center>
					</UnstyledButton>
					<Collapse in={linksOpened}></Collapse>
					<a href="#">Learn</a>
					<a href="#">Academy</a>

					<Divider my="sm" />

					<Group justify="center" grow pb="xl" px="md">
						<Button variant="default">Log in</Button>
						<Button>Sign up</Button>
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
