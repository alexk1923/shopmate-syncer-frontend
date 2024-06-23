import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { WishlistService } from "../services/wishlistService";
import { WishlistItem } from "@/constants/types/WishlistTypes";
import { UploadService } from "../services/imageService";

export const useWishlist = (userId: number) => {
	const queryClient = useQueryClient();

	const wishlistQuery = useQuery({
		queryKey: ["wishlist"],
		queryFn: async () => {
			const response = await WishlistService.getWishlist(userId);
			return response;
		},
	});

	const addToWishlistMutation = useMutation({
		mutationKey: ["addToWishlist"],
		mutationFn: async ({
			userId,
			wishlistItem,
		}: {
			userId: number;
			wishlistItem: Omit<WishlistItem, "id">;
		}) => {
			console.log("the add to wishlist");

			if (!wishlistItem.originalId) {
				const uploadedPhoto = wishlistItem.image
					? await UploadService.uploadImage(wishlistItem.image)
					: null;
				console.log("photo uploaded at this url" + uploadedPhoto?.secure_url);

				const response = await WishlistService.addItemToWishlist(userId, {
					...wishlistItem,
					image: uploadedPhoto?.secure_url,
				});
				return response;
			}

			const response = await WishlistService.addItemToWishlist(
				userId,
				wishlistItem
			);
			console.log("response is");
			console.log(response);

			return response;
		},
		onSuccess: () => {
			console.log("Invalidating wishlist...");

			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
	});

	const removeFromWishlistMutation = useMutation({
		mutationKey: ["removeFromWishlist"],
		mutationFn: async ({
			userId,
			itemId,
		}: {
			userId: number;
			itemId: number;
		}) => {
			const response = await WishlistService.removeItemFromWishlist(
				userId,
				itemId
			);
			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["wishlist"] });
		},
	});
	return { wishlistQuery, addToWishlistMutation, removeFromWishlistMutation };
};
