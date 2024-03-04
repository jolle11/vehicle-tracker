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

export interface ICreateVehicle {
	user_id: string;
	nameplate: string;
	brand: string;
	color: string;
	current_kms: number;
}

export interface IRegisterKms {
	vehicle_id: string;
	km: number;
	price?: number;
	paid?: number;
}

export const vehicleAtom = atom<IVehicle>({
	id: "",
	nameplate: "",
	brand: "",
	color: "",
	last_km: "",
	media_tank: "",
	media_paid: "",
});
