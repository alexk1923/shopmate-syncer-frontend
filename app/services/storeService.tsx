import axios from "axios";
import { getToken } from "../store/asyncStorage";
import { Store } from "@/constants/types/StoreTypes";
import { API_URL } from "../api/config";

export const StoreService = {
	getStores: async (): Promise<Store[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<Store[]>(`${API_URL}/stores`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(error.response.data.message || "Failed to get stores");
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},
};
