import { atom } from "jotai";
import { IVehicle } from "./vehicle";

export const userAtom = atom({
	id: "",
	username: "",
	email: "",
});

export const userVehiclesAtom = atom<IVehicle[]>([]);
