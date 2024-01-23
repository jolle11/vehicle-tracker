import {
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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Car } from "iconoir-react";

export function Header() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
        useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

    return (
        <Box style={{ boxShadow: "0px 0px 10px black" }}>
            <header>
                <Group justify="space-between" h="100%" p={12}>
                    <Group>
                        <Button>
                            <Car />
                        </Button>
                    </Group>
                    <Group visibleFrom="sm">
                        <Button variant="default">Log in</Button>
                        <Button>Sign up</Button>
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
