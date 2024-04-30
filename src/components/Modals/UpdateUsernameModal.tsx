// modal to update the username using the useSetAlias hook
import { useState } from "react";
import { Modal, Paper, Button, Loader, TextInput } from "@mantine/core";
import type { SetStateAction, Dispatch } from "react";
import { useSetAlias } from "hooks/auth/useSetAlias";
import { useAtom } from "jotai";
import { userAtom } from "atoms/user";

interface IUpdateUsernameModal {
	open: string;
	setOpen: Dispatch<SetStateAction<string>>;
	setLoading: Dispatch<SetStateAction<boolean>>;
	loading?: boolean;
}

export const UpdateUsernameModal = ({
	open,
	setOpen,
	loading,
	setLoading,
}: IUpdateUsernameModal) => {
	const [user, setUser] = useAtom(userAtom);
	const [username, setUsername] = useState(user.username);
	const setAlias = useSetAlias();

	const handleUpdateUsername = async () => {
		setLoading(true);
		await setAlias({ id: user.id, alias: username });
		setUser({ ...user, username });
		setOpen("");
	};

	return (
		<Modal
			opened={open === "update-username"}
			title="Update username"
			centered
			onClose={() => {
				setOpen("");
			}}
		>
			<Paper px={20} pb={20} radius="md">
				<TextInput
					label="New username"
					placeholder="John Doe"
					required
					data-autofocus
					value={username}
					onChange={(event) => setUsername(event.currentTarget.value)}
				/>
				<Button
					fullWidth
					variant="outline"
					color="blue"
					mt="lg"
					disabled={loading ?? true}
					onClick={handleUpdateUsername}
				>
					{loading ? <Loader color="blue" size={"sm"} /> : "Update"}
				</Button>
			</Paper>
		</Modal>
	);
};
