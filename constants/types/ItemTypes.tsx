import { Food } from "./FoodTypes";

export type FilterParams = {
	filter: FilterType;
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

export enum EXPIRY_STATUS {
	ALL,
	EXPIRED,
	NON_EXPIRED,
}

export enum SORTING_TYPE {
	EXPIRY_DATE,
	ALPHABETICALLY,
}

export type FilterType = {
	isFood: boolean;
	expiredStatus: EXPIRY_STATUS;
	sortBy: SORTING_TYPE;
	sortingOrder: SORTING_ORDER;
};

export enum SORTING_ORDER {
	ASCENDING,
	DESCENDING,
}

export type Item = {
	name: string;
	quantity: number;
	image: string;
	isFood: boolean;
	houseId: number;
	storeId: number;
	barcode: string;
	boughtById: number;
	food: Food;
};
