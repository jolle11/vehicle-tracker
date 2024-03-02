import { atom } from "jotai";

export interface IKm {
	id: string;
	km: string;
	price: string;
	paid: string;
	created: string;
}

export const kmAtom = atom<IKm[]>([]);
