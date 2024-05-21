import { FOOD_TAG_INFO } from "./FoodTagsInfo";

export type Product = {
	id: number;
	name: string;
	expiryDate: Date;
	quantity: number;
	image: string | null;
	tags: FoodTagKey[];
};

export type FoodTagKey = keyof typeof FOOD_TAG_INFO;
