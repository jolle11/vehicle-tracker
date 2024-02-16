import { atom } from "jotai";
import { vehicleAtom } from "./vehicle";

export const userAtom = atom({
	id: "",
	username: "",
	email: "",
});

export const userVehiclesAtom = atom([vehicleAtom]);
