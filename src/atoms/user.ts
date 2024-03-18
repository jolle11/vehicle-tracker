import { atom } from "jotai";
import type { IVehicle } from "./vehicle";

export const userAtom = atom({
	id: "",
	username: "",
	email: "",
	name: "",
	surname: "",
	created: "",
});

export const userVehiclesAtom = atom<IVehicle[]>([]);
