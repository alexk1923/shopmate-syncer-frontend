import { IMessage } from "react-native-gifted-chat";
import { FOOD_TAG_INFO } from "./FoodTagsInfo";

export type Product = {
	id: number;
	name: string;
	expiryDate: Date;
	quantity: number;
	image: string | null;
	tags: FoodTagKey[];
};

export type AppUser = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	profileImage: string | null;
	messages: IMessage[];
};

export type FoodTagKey = keyof typeof FOOD_TAG_INFO;
