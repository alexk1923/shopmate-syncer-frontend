import { ImageSourcePropType } from "react-native";
import { FoodCategory } from "./FoodCategoryTypes";
import { FOOD_TAG_INFO } from "../FoodTagsInfo";

export type Product = {
	id: number;
	name: string;
	expiryDate: Date;
	barcode: string;
	quantity: number;
	image: string | null;
	tags: FoodCategory[];
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
