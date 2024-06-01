import axios from "axios";
import { API_URL } from "../api/config";
import { getToken } from "../store/asyncStorage";

export const getUserById = async (userId: number): Promise<User> => {
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
};