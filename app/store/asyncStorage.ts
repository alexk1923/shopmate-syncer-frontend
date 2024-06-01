// utils/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
const TOKEN_KEY = "userToken";

export const getToken = async () => {
	try {
		const token = await AsyncStorage.getItem(TOKEN_KEY);
		console.log("AOLO");
		console.log(token);

		return token;
	} catch (error) {
		console.error("Failed to get token:", error);
		return null;
	}
};

export const setToken = async (token: string) => {
	try {
		await AsyncStorage.setItem(TOKEN_KEY, token);
	} catch (error) {
		console.error("Failed to set token:", error);
	}
};

export const removeToken = async () => {
	try {
		await AsyncStorage.removeItem(TOKEN_KEY);
	} catch (error) {
		console.error("Failed to remove token:", error);
	}
};
