import axios, { AxiosResponse } from "axios";
import Wishlist from "../(tabs)/(shopping)/WishlistPage";
import { API_URL } from "../api/config";
import { getToken } from "../store/asyncStorage";

export const serviceFn = async <T,>(
	url: string,
	action: "get" | "post" | "patch" | "delete" | "put",
	body?: {}
): Promise<T> => {
	try {
		const token = await getToken();
		let response: AxiosResponse<T>;

		switch (action) {
			case "get":
			case "delete":
				response = await axios[action]<T>(url, {
					headers: { Authorization: `Bearer ${token}` },
				});
				break;
			case "post":
			case "patch":
			case "put":
				response = await axios[action]<T>(url, body, {
					headers: { Authorization: `Bearer ${token}` },
				});
				break;
			default:
				throw new Error(`Unsupported action type: ${action}`);
		}

		return response.data;

		// const response = await axios.get<T>(
		// 	url,
		// 	{ ...body },
		// 	{
		// 		headers: { Authorization: `Bearer ${token}` },
		// 	}
		// );
		// return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			// Handle known error (e.g., API returned an error response)
			throw new Error(error.response.data.message || "Failed to get stores");
		} else {
			// Handle unexpected errors (e.g., network issues)
			throw new Error("An unexpected error occurred");
		}
	}
};
