import { Food } from "@/constants/types/FoodTypes";
import { getToken } from "../store/asyncStorage";
import axios from "axios";
import { API_URL } from "../api/config";
import {
	AddItemAsFoodType,
	AddItemType,
	ExternalItem,
	FoodItem,
	Item,
} from "@/constants/types/ItemTypes";

export const ItemService = {
	getItemsByHouse: async (
		houseId: number,
		sortBy?: string
	): Promise<Item[]> => {
		try {
			const token = await getToken();
			const url = sortBy
				? `${API_URL}/items/house/${houseId}?sortBy=${sortBy}`
				: `${API_URL}/items/house/${houseId}`;

			const response = await axios.get<Item[]>(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
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

	getFoodList: async (houseId: number): Promise<FoodItem[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<FoodItem[]>(
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

	getExternalApiItems: async (barcode: string): Promise<ExternalItem> => {
		try {
			const response = await axios.get<ExternalItem>(
				`https://world.openfoodfacts.net/api/v2/product/${barcode}`
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				console.log("external items result:");
				console.log(error.response.data);

				throw new Error(
					error.response.data.message || "Failed to get food list"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	addItem: async (newItem: AddItemType | AddItemAsFoodType): Promise<Item> => {
		try {
			const token = await getToken();
			const theBody = { ...newItem };

			console.log("the body:");
			console.log(theBody);

			const response = await axios.post<Item>(
				`${API_URL}/items`,
				{ ...newItem },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				console.log(error.response.data);

				throw new Error(
					error.response.data.message || "Failed to get food list"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	getAllItems: async (page: number): Promise<Item[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<Item[]>(
				`${API_URL}/items?page=${page}&pageSize=${5}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to get all items"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	getSimilarUsersItems: async (
		userId: number,
		page: number
	): Promise<Item[]> => {
		try {
			const token = await getToken();
			const response = await axios.get<Item[]>(
				`${API_URL}/recommendations/users/${userId}?page=${page}&pageSize=${5}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to get all items"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},
};
