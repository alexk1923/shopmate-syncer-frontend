import { ImageSourcePropType } from "react-native";
import { ICONS } from "./assets";

type FoodTagType = {
	[key: string]: {
		name: string;
		color: string;
		imgName: string;
		uri: ImageSourcePropType;
	};
};

export const FOOD_TAG_INFO: FoodTagType = {
	MEAT: {
		name: "Meat",
		color: "#da7a14",
		imgName: "Meat tag",
		uri: ICONS.MEAT,
	},
	DAIRY: {
		name: "Dairy",
		color: "#748cf7",
		imgName: "Dairy tag",
		uri: ICONS.DAIRY,
	},
	SNACKS: {
		name: "Snacks",
		color: "#ff2e12",
		imgName: "Snacks tag",
		uri: ICONS.SNACKS,
	},
	SWEETS: {
		name: "Sweets",
		color: "#eb347a",
		imgName: "Sweets tag",
		uri: ICONS.SWEETS,
	},
	FRUITS_VEGETABLES: {
		name: "Fruits & Veggetables",
		color: "#2feb3f",
		imgName: "Fruit tag",
		uri: ICONS.SWEETS,
	},
	GRAINS: {
		name: "Grains",
		color: "#e8c26b",
		imgName: "Grain tag",
		uri: ICONS.GRAINS,
	},
	DRINKS: {
		name: "Drinks",
		color: "#3359f2",
		imgName: "Drinks tag",
		uri: ICONS.DRINKS,
	},
	PROTEIN: {
		name: "Protein",
		color: "#deddd9",
		imgName: "Protein tag",
		uri: ICONS.PROTEIN,
	},
	OTHER: {
		name: "Other",
		color: "#7606cc",
		imgName: "Other food tag",
		uri: ICONS.OTHER,
	},
};
