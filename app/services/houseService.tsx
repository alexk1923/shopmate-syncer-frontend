import axios from "axios";
import { API_URL } from "../api/config";
import { getToken } from "../store/asyncStorage";
import { House } from "@/constants/types/HouseTypes";
import { UploadService } from "./imageService";

export const HouseService = {
	addUserToHouse: async (userId: number, houseId: number): Promise<User> => {
		try {
			const token = await getToken();
			const response = await axios.post<User>(
				`${API_URL}/houses/${houseId}/members`,
				{ userId },
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

	createHouse: async (
		name: string,
		defaultMembers: string[],
		image: string | null
	): Promise<House> => {
		try {
			const token = await getToken();
			console.info("Creating house...");

			let imageUrl = null;
			if (image) {
				imageUrl = (await UploadService.uploadImage(image)).secure_url;
			}

			const response = await axios.post<House>(
				`${API_URL}/houses`,
				{ name, defaultMembers, image: imageUrl },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to create house"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	getHouseById: async (id: number): Promise<House> => {
		try {
			const token = await getToken();

			const response = await axios.get<House>(
				`${API_URL}/houses/${id}`,

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

	updateHouse: async (
		houseId: number,
		name: string,
		image: string | null
	): Promise<House> => {
		try {
			const token = await getToken();
			console.info("Updating house...");
			let imageUrl = null;
			if (image) {
				console.info("Uploading house photo...");
				imageUrl = (await UploadService.uploadImage(image)).secure_url;
			}
			const response = await axios.patch<House>(
				`${API_URL}/houses/${houseId}`,
				{ name, image: imageUrl },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to update house"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},

	removeUserFromHouse: async (houseId: number, userId: number) => {
		try {
			const token = await getToken();
			console.info("Updating house...");

			const response = await axios.delete<House>(
				`${API_URL}/houses/${houseId}/members/${userId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			return response.data;
		} catch (error) {
			if (axios.isAxiosError(error) && error.response) {
				// Handle known error (e.g., API returned an error response)
				throw new Error(
					error.response.data.message || "Failed to update house"
				);
			} else {
				// Handle unexpected errors (e.g., network issues)
				throw new Error("An unexpected error occurred");
			}
		}
	},
};
