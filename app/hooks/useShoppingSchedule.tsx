import {
	ShoppingDayType,
	ShoppingSchedule,
} from "@/constants/types/ShoppingSchedule";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingScheduleService } from "../services/shoppingScheduleService";
import { useAuthStore } from "../store/useUserStore";
import { Alert } from "react-native";

export const useShoppingSchedule = () => {
	const queryClient = useQueryClient();
	const currentUser = useAuthStore().user;

	const shoppingScheduleQuery = useQuery<ShoppingSchedule[]>({
		queryKey: ["shopping-schedule"],
		queryFn: async () => {
			if (currentUser && currentUser.houseId) {
				const shoppingScheduleList =
					await ShoppingScheduleService.getShoppingScheduleList(
						currentUser.houseId
					);

				return shoppingScheduleList;
			}
			return [];
		},
	});

	const addScheduleMutation = useMutation({
		mutationKey: ["shopping-schedule-add"],
		mutationFn: async ({ title, shoppingDate }: ShoppingDayType) => {
			if (shoppingDate && currentUser && currentUser.houseId) {
				const shoppingList = await ShoppingScheduleService.addShoppingSchedule(
					title,
					shoppingDate,
					currentUser.id,
					currentUser.houseId
				);

				return shoppingList;
			}

			Alert.alert(
				"Scheduling error",
				"Either shopping date or house is invalid"
			);
		},
		onSuccess: () => {
			console.log("Shopping Schedule mutation success!");
			queryClient.invalidateQueries({ queryKey: ["shopping-schedule"] });
		},
	});

	const deleteScheduleMutation = useMutation({
		mutationKey: ["shopping-schedule-delete"],
		mutationFn: async ({ scheduleId }: { scheduleId: number }) => {
			await ShoppingScheduleService.deleteShoppingSchedule(scheduleId);
		},
		onSuccess: () => {
			console.log("Shopping Schedule mutation success!");
			queryClient.invalidateQueries({ queryKey: ["shopping-schedule"] });
		},
	});

	return {
		shoppingScheduleQuery,
		shoppingScheduleMutation: addScheduleMutation,
		deleteScheduleMutation,
	};
};
