import { API_URL } from "../api/config";
import { WishlistItem } from "@/constants/types/WishlistTypes";
import { serviceFn } from "./generalService";

export const WishlistService = {
	getWishlist: async (userId: number): Promise<WishlistItem[]> => {
		const getResult = await serviceFn<WishlistItem[]>(
			`${API_URL}/wishlists/${userId}`,
			"get"
		);
		return getResult;
	},

	addItemToWishlist: async (
		userId: number,
		wishlistItem: Omit<WishlistItem, "id">
	): Promise<WishlistItem> => {
		return await serviceFn<WishlistItem>(
			`${API_URL}/wishlists/${userId}`,
			"post",
			{
				...wishlistItem,
			}
		);
	},

	removeItemFromWishlist: async (
		userId: number,
		itemId: number
	): Promise<void> => {
		console.log("deleting from wishlist item with id = " + itemId);
		return await serviceFn<void>(
			`${API_URL}/wishlists/${userId}/items/${itemId}`,
			"delete"
		);
	},
};
