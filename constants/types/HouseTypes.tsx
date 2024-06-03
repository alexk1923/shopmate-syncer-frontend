import { Item } from "./ItemTypes";

export type House = {
	name: string;
	members: User[];
	items: Item;
};
