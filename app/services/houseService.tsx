import axios from "axios";
import { API_URL } from "../api/config";
import { getToken } from "../store/asyncStorage";
import { House } from "@/constants/types/HouseTypes";

export const HouseService = {
	createHouse: async (
		name: string,
		defaultMembers: string[]
	): Promise<House> => {
		try {
			console.log(name);
			console.log(defaultMembers);
			// return null;
			const token = await getToken();

			const response = await axios.post<House>(
				`${API_URL}/houses`,
				{ name, defaultMembers },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
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
};
