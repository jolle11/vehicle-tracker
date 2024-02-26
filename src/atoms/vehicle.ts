import { atom } from "jotai";

export interface IVehicle {
	id: string;
	nameplate: string;
	brand: string;
	color: string;
	last_km: string | number | null;
	media_tank: string | number | null;
	media_paid: string | number | null;
}

export const vehicleAtom = atom({
	id: "",
	nameplate: "",
	brand: "",
	color: "",
	last_km: "",
	media_tank: "",
	media_paid: "",
});
