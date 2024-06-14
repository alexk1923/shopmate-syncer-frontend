import axios from "axios";
import { API_URL } from "../api/config";
import { getToken } from "../store/asyncStorage";

export const UploadService = {
	uploadImage: async (image: string): Promise<{ secure_url: string }> => {
		try {
			const token = await getToken();

			const response = await axios.post<{ secure_url: string }>(
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
