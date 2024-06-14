import { LoginResponse } from "@/constants/types/AuthTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

import axios from "axios";
import { useAuthStore } from "../store/useUserStore";
import { API_URL } from "../api/config";

export const login = async (username: string, password: string) => {
	try {
		const response = await axios.post<LoginResponse>(`${API_URL}/login`, {
			username,
			password,
		});

		await AsyncStorage.setItem("userToken", response.data.token);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log(error);

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
	email: string,
	username: string,
	password: string
) => {
	const response = await axios.post(`${API_URL}/register`, {
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

export const addNotificationsToken = async (
	userId: number,
	token: string,
	notificationToken: string
) => {
	try {
		const response = await axios.patch(
			`${API_URL}/notificationToken/${userId}`,
			{
				notificationToken,
			},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			// Handle known error (e.g., API returned an error response)
			console.error(error.message);
			throw new Error(
				error.response.data.message || "Failed to set the notification token"
			);
		} else {
			// Handle unexpected errors (e.g., network issues)
			throw new Error("An unexpected error occurred");
		}
	}
};
