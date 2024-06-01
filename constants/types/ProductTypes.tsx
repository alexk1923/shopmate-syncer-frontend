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

export type Product = {
	id: number;
	name: string;
	expiryDate: Date;
	barcode: string;
	quantity: number;
	image: string | null;
	tags: FoodTagKey[];
	isFood: boolean;
};

export const fetchedFood = [
	{
		id: 1,
		key: 1,
		name: "Iaurt cu piersici",
		expiryDate: new Date("2024-05-18"),
		quantity: 2,
		image: null,
		isFood: false,
		barcode: "32323242",
		tags: ["dairy", "drinks"] as FoodTagKey[],
	},
	{
		id: 2,
		key: 2,
		isFood: true,
		name: "Album Lidl",
		expiryDate: new Date("2024-06-18"),
		quantity: 1,
		barcode: "5941486000434",
		image:
			"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiv5N6WpiVDW8aJDgueDzVByH-yiszFjx_AyyvCjHrGhx1oK05yEp1XpzhG8YlShMgcMMkraoeBUuRYIPZwB5D9tCwxT82FoFyFOOaKYFaSLFwepAaHlamtuHueS4TPgw1lRLVPQcgnd17EJ5AHF0MYSk6KU23Gq1n2F-G4lHZuLPOaOpLzDtm_gt-FlsQ/s839/2024%20Lidl%20Romania%20-%20Match%20Attax%20All-Stars%20-Album1aa.jpg",
		tags: ["fruits_vegetables", "other"] as FoodTagKey[],
	},
];

export type FoodTagKey = keyof typeof FOOD_TAG_INFO;
