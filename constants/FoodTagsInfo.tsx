import { ImageSourcePropType } from "react-native";

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
		uri: require(`@/assets/images/foodIcons/meat.png`),
	},
	DAIRY: {
		name: "Dairy",
		color: "#748cf7",
		imgName: "Dairy tag",
		uri: require(`@/assets/images/foodIcons/dairy.png`),
	},
	SNACKS: {
		name: "Snacks",
		color: "#ff2e12",
		imgName: "Snacks tag",
		uri: require(`@/assets/images/foodIcons/snacks.png`),
	},
	SWEETS: {
		name: "Sweets",
		color: "#eb347a",
		imgName: "Sweets tag",
		uri: require(`@/assets/images/foodIcons/sweets.png`),
	},
	FRUITS_VEGETABLES: {
		name: "Fruits & Veggetables",
		color: "#2feb3f",
		imgName: "Fruit tag",
		uri: require(`@/assets/images/foodIcons/fruits_vegetables.png`),
	},
	GRAINS: {
		name: "Grains",
		color: "#e8c26b",
		imgName: "Grain tag",
		uri: require(`@/assets/images/foodIcons/grain.png`),
	},
	DRINKS: {
		name: "Drinks",
		color: "#3359f2",
		imgName: "Drinks tag",
		uri: require(`@/assets/images/foodIcons/drinks.png`),
	},
	PROTEIN: {
		name: "Protein",
		color: "#deddd9",
		imgName: "Protein tag",
		uri: require(`@/assets/images/foodIcons/protein.png`),
	},
	OTHER: {
		name: "Other",
		color: "#7606cc",
		imgName: "Other food tag",
		uri: require(`@/assets/images/foodIcons/groceries.png`),
	},
};
