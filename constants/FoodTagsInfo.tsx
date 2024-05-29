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
	meat: {
		name: "Meat",
		color: "#da7a14",
		imgName: "Meat tag",
		uri: require(`@/assets/images/foodIcons/meat.png`),
	},
	dairy: {
		name: "Dairy",
		color: "#748cf7",
		imgName: "Dairy tag",
		uri: require(`@/assets/images/foodIcons/dairy.png`),
	},
	snacks: {
		name: "Snacks",
		color: "#ff2e12",
		imgName: "Snacks tag",
		uri: require(`@/assets/images/foodIcons/snacks.png`),
	},
	sweets: {
		name: "Sweets",
		color: "#eb347a",
		imgName: "Sweets tag",
		uri: require(`@/assets/images/foodIcons/sweets.png`),
	},
	fruits_vegetables: {
		name: "Fruits & Veggetables",
		color: "#2feb3f",
		imgName: "Fruit tag",
		uri: require(`@/assets/images/foodIcons/fruits_vegetables.png`),
	},
	grains: {
		name: "Grains",
		color: "#e8c26b",
		imgName: "Grain tag",
		uri: require(`@/assets/images/foodIcons/grain.png`),
	},
	drinks: {
		name: "Drinks",
		color: "#3359f2",
		imgName: "Drinks tag",
		uri: require(`@/assets/images/foodIcons/drinks.png`),
	},
	protein: {
		name: "Protein",
		color: "#deddd9",
		imgName: "Protein tag",
		uri: require(`@/assets/images/foodIcons/protein.png`),
	},
	other: {
		name: "Other",
		color: "#7606cc",
		imgName: "Other food tag",
		uri: require(`@/assets/images/foodIcons/groceries.png`),
	},
};
