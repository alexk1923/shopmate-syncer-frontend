import { Food } from "@/constants/types/FoodTypes";
import { getToken } from "../store/asyncStorage";
import axios from "axios";
import { API_URL } from "../api/config";
import {
	AddItemAsFoodType,
	AddItemType,
	ExternalItem,
	Item,
} from "@/constants/types/ItemTypes";
import { Store } from "@/constants/types/StoreTypes";

export const MarketService = {
	getAllMarkets: async (): Promise<Store[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<Store[]>(`${API_URL}/stores`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				console.log(error.response);

				throw new Error(
					error.response.data.message || "Failed to get store list"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	addMarket: async ({
		name,
		address,
	}: {
		name: string;
		address: string;
	}): Promise<Store> => {
		try {
			const token = await getToken();
			const response = await axios.post<Store>(
				`${API_URL}/stores`,
				{ name, address },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				console.log(error.response);

				throw new Error(error.response.data.message || "Failed to add store");
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},
};
