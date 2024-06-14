import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ItemService } from "../services/itemService";
import { useAuthStore } from "../store/useUserStore";
import { AddItemAsFoodType, AddItemType } from "@/constants/types/ItemTypes";
import { UploadService } from "../services/imageService";

export const useItems = () => {
	const queryClient = useQueryClient();
	const user = useAuthStore((state) => state.user);

	const itemQuery = useQuery({
		queryKey: ["items", user?.houseId],
		queryFn: async () => {
			console.log("executing item query fn...");
			if (!user || !user.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const itemList = await ItemService.getItemList(user.houseId);
			return itemList;
		},
	});

	const foodQuery = useQuery({
		queryKey: ["foods", user?.houseId],
		queryFn: async () => {
			if (!user || !user.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const foodList = await ItemService.getFoodList(user.houseId);
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

	return { itemQuery, foodQuery, addItemMutation };
};
