import { IMessage } from "react-native-gifted-chat";

export type AppUser = {
	id: number;
	username: string;
	firstName: string;
	lastName: string;
	profileImage: string | null;
	messages: IMessage[];
};
