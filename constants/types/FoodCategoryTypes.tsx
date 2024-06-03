import { Food } from "./FoodTypes";

export type FoodCategory = {
	id: number;

	name: string;

	foods: Food[];
};
