import axios from "axios";
import { API_URL } from "../api/config";
import { getToken } from "../store/asyncStorage";

export const UserService = {
	fetchUsers: async (): Promise<User[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<User[]>(`${API_URL}/users/`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(error.response.data.message || "Failed to fetch users");
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	getUserById: async (userId: number): Promise<User> => {
		try {
			const token = await getToken();

			console.log("the token is:");
			console.log(token);

			const response = await axios.get<User>(`${API_URL}/users/${userId}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to fetch user data"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	updateUser: async (updateArgs: {
		userId: number;
		firstName?: string | null;
		lastName?: string | null;
		birthday?: Date | null;
		profilePicture?: string;
	}): Promise<User> => {
		try {
			const token = await getToken();
			console.log("my user id is:" + updateArgs.userId);

			const response = await axios.patch<User>(
				`${API_URL}/users/${updateArgs.userId}`,
				{ ...updateArgs },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error);

				// Handle known error (e.g., API returned an error response)
				throw new Error(error.response.data.message || "Failed to update user");
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	uploadImage: async (image: string): Promise<any> => {
		try {
			const token = await getToken();

			const response = await axios.post<any>(
				`${API_URL}/upload`,
				{ image },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to upliad image"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},
};
