import { LoginResponse } from "@/constants/types/AuthTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { useAuthStore } from "../store/useUserStore";
import { API_URL } from "../api/config";
import { getUserById } from "./userService";

export const login = async (username: string, password: string) => {
	try {
		const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
			username,
			password,
		});

		console.log("The response is:");
		console.log(response.data);
		await AsyncStorage.setItem("userToken", response.data.token);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error.response);

			if (!error.response) {
				throw new Error("Network error");
			}
			throw error.response.data;
		} else {
			throw new Error("An unexpected error occurred");
		}
	}
};

export const register = async (
	firstName: string,
	lastName: string,
	email: string,
	username: string,
	password: string
) => {
	const response = await axios.post(`${API_URL}/register`, {
		firstName,
		lastName,
		username,
		email,
		password,
	});
	return response.data;
};

export const verifyToken = async (token: string) => {
	const response = await axios.get(`${API_URL}/verifyToken`, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return response.data;
};
