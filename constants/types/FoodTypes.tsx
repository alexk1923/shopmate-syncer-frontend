import { FoodCategory } from "./FoodCategoryTypes";
import { Item } from "./ItemTypes";

export type Food = {
	id: number;
	itemId: number;
	expiryDate: Date;
	tags: FoodCategory[];
	item: Item;
};
