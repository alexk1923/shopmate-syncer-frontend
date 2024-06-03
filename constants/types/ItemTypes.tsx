import { Food } from "./FoodTypes";

export type Item = {
	name: string;
	quantity: number;
	isFood: boolean;
	houseId: number;
	storeId: number;
	barcode: string;
	boughtById: number;
	food: Food;
};
