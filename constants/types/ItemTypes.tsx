import { Food } from "./FoodTypes";
import { Store } from "./StoreTypes";

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
	id: number;
	name: string;
	quantity: number;
	image: string;
	isFood: boolean;
	houseId: number;
	storeId: number;
	barcode: string;
	boughtBy: User;
	boughtById: number;
	food: Food | null;
	store: Store;
};

export type FoodItem = Omit<Item, "food" | "isFood"> & {
	isFood: true;
	food: Food;
};

enum NutrientLevelType {
	LOW,
	MODERATE,
	HIGH,
}

export type AddItemType = {
	name: string;
	image: string | null;
	isFood: boolean;
	quantity: number;
	houseId: number;
	store: {
		id: number | null;
		name: string;
		address: string;
	};
	boughtById: number;
	barcode: string;
};

export type AddItemAsFoodType = AddItemType & {
	tags: string[];
	expiryDate: Date;
};

export type ExternalItem = {
	code: string; // barcode
	product: {
		_keywords: string[];
		abbreviated_product_name: string;
		added_countries_tags: string[];
		brands: string;
		brands_imported: string;
		brands_tags: string[];
		generic_name: string;
		product_name: string;
		product_name_en: string;
		food_groups: string;
		food_groups_tags: string[];
		nutrient_levels: {
			fat: NutrientLevelType;

			salt: NutrientLevelType;

			"saturated-fat": NutrientLevelType;
			sugars: NutrientLevelType;
		};
		categories: string;
		categories_hierarchy: string[];
		checkers_tags: string[];
		countries: string;
		labels: string;
		labels_tags: string[];
		manufacturing_places: string;
		manufacturing_places_tags: {}[];
		image_front_small_url: string;
		image_front_thumb_url: string;
		image_front_url: string;
		image_nutrition_small_url: string;
		image_nutrition_thumb_url: string;
		image_nutrition_url: string;
		image_small_url: string;
		image_thumb_url: string;
		image_url: string;
		misc_tags: string[];
		stores: string;
		store_tags: string;
	};
};
