export const useConnectDB = async () => {
	const PocketBase = await import("pocketbase");
	const url = import.meta.env.POCKETHOST_URL;
	return new PocketBase.default(url);
};
