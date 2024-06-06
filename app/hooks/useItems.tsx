import { useQuery } from "@tanstack/react-query";
import { ItemService } from "../services/itemService";
import { useAuthStore } from "../store/useUserStore";

export const useItems = () => {
	const user = useAuthStore((state) => state.user);

	const itemQuery = useQuery({
		queryKey: ["items", user?.houseId],
		queryFn: async () => {
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

	return { itemQuery, foodQuery };
};
