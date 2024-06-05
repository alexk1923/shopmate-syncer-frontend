import { Food } from "@/constants/types/FoodTypes";
import { getToken } from "../store/asyncStorage";
import axios from "axios";
import { API_URL } from "../api/config";
import { Item } from "@/constants/types/ItemTypes";

export const ItemService = {
	getItemList: async (houseId: number): Promise<Item[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<Item[]>(
				`${API_URL}/items?houseId=${houseId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to get food list"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	getFoodList: async (houseId: number): Promise<Food[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<Food[]>(
				`${API_URL}/food?houseId=${houseId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to get food list"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},
};
