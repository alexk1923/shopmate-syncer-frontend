import { Item } from "./ItemTypes";

export type House = {
	id: number;
	image: string;
	name: string;
	members: User[];
};
