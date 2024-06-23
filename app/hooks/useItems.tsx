import {
	useInfiniteQuery,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { ItemService } from "../services/itemService";
import { useAuthStore } from "../store/useUserStore";
import { AddItemAsFoodType, AddItemType } from "@/constants/types/ItemTypes";
import { UploadService } from "../services/imageService";

export const useItems = (userId: number | null) => {
	const queryClient = useQueryClient();
	const user = useAuthStore((state) => state.user);

	const itemQuery = useQuery({
		queryKey: ["items", user?.houseId],
		queryFn: async () => {
			console.log("executing item query fn...");
			if (!user || !user.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const itemList = await ItemService.getItemsByHouse(user.houseId);
			return itemList;
		},
	});

	const foodQuery = useQuery({
		queryKey: ["foods", user?.houseId],
		queryFn: async () => {
			if (!user || !user.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const foodList = await ItemService.getItemsByHouse(
				user.houseId,
				"expiryDate"
			);

			console.log("====================================");
			console.log("the food list for user with houseId:");
			console.log(foodList);

			console.log("====================================");
			return foodList;
		},
	});

	const addItemMutation = useMutation({
		mutationKey: ["addItem"],
		mutationFn: async (newItem: AddItemType | AddItemAsFoodType) => {
			const uploadedPhoto = newItem.image
				? await UploadService.uploadImage(newItem.image)
				: null;
			console.log("photo uploaded at this url" + uploadedPhoto?.secure_url);

			const item = await ItemService.addItem({
				...newItem,
				image: uploadedPhoto?.secure_url ?? null,
			});
			return item;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["items"] });
		},
	});

	const infiniteScrollItems = useInfiniteQuery({
		queryKey: ["items", "infinite", userId],
		initialPageParam: 1,
		getNextPageParam: (lastPage, allPages) => allPages.length + 1,
		queryFn: async ({ pageParam = 1 }) => {
			if (!userId) {
				return [];
			}
			const items = await ItemService.getSimilarUsersItems(userId, pageParam);
			return items;
		},
	});

	const recommendationQuery = useQuery({
		queryKey: ["recommendations", user?.houseId],
		queryFn: async () => {
			if (!user || !user.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const recommendationItems = await ItemService.getSimilarUsersItems(
				user.houseId,
				1
			);
			return recommendationItems;
		},
	});

	return {
		itemQuery,
		foodQuery,
		addItemMutation,
		infiniteScrollItems,
		recommendationQuery,
	};
};
