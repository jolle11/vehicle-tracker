import { atom } from "jotai";

export const userAtom = atom({
	id: "",
	username: "",
	email: "",
});

export const userVehiclesAtom = atom([{}]);
