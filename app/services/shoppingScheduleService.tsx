import { View, Text } from "react-native";
import React from "react";
import { getToken } from "../store/asyncStorage";
import { Store } from "@/constants/types/StoreTypes";
import axios from "axios";
import { API_URL } from "../api/config";
import {
	ShoppingSchedule,
	ShoppingScheduleAdd,
} from "@/constants/types/ShoppingSchedule";

export const ShoppingScheduleService = {
	getShoppingScheduleList: async (
		houseId: number
	): Promise<ShoppingSchedule[]> => {
		try {
			const token = await getToken();

			const response = await axios.get<ShoppingSchedule[]>(
				`${API_URL}/shopping-schedule?houseId=${houseId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)

				throw new Error(
					error.response.data.message || "Failed to get shopping list"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	addShoppingSchedule: async (
		title: string,
		shoppingDate: Date,
		createdById: number,
		houseId: number
	): Promise<ShoppingSchedule> => {
		try {
			const token = await getToken();

			const response = await axios.post<ShoppingSchedule>(
				`${API_URL}/shopping-schedule`,
				{
					title,
					shoppingDate,
					createdById,
					houseId,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)

				throw new Error(
					error.response.data.message || "Failed to add new shopping schedule"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	deleteShoppingSchedule: async (id: number) => {
		try {
			const token = await getToken();

			const response = await axios.delete<void>(
				`${API_URL}/shopping-schedule/${id}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)

				throw new Error(
					error.response.data.message || "Failed to delete shopping schedule"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},
};
