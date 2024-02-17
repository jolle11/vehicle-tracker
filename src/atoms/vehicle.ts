import { atom } from "jotai";

export interface IVehicle {
	id: string;
	nameplate: string;
	brand: string;
	color: string;
}

export const vehicleAtom = atom({
	id: "",
	nameplate: "",
	brand: "",
	color: "",
});
