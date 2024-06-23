import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HouseService } from "../services/houseService";
import { useHouseStore } from "../store/useHouseStore";
import { number } from "prop-types";

export const useHouse = (houseId: number | null) => {
	const queryClient = useQueryClient();
	const setHouse = useHouseStore((state) => state.setHouse);

	const houseQuery = useQuery({
		queryKey: ["house", houseId],
		queryFn: async () => {
			if (houseId) {
				const house = await HouseService.getHouseById(houseId);
				setHouse(house);
				return house;
			}
		},
		enabled: houseId !== null,
	});

	const joinHouseMutation = useMutation({
		mutationKey: ["houseJoin"],
		mutationFn: async ({
			userId,
			houseId,
		}: {
			userId: number;
			houseId: number;
		}) => {
			const house = await HouseService.addUserToHouse(userId, houseId);
			return house;
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
		},
	});

	const getHouseQuery = useQuery({
		queryKey: ["house", houseId],
		queryFn: async () => {
			if (houseId) {
				const house = await HouseService.getHouseById(houseId);
				setHouse(house);
				return house;
			}
		},
		enabled: houseId !== null,
	});

	const updateHouseMutation = useMutation({
		mutationKey: ["houseUpdate"],
		mutationFn: async ({
			houseId,
			name,
			image,
		}: {
			houseId: number;
			name: string;
			image: string | null;
		}) => {
			const house = await HouseService.updateHouse(houseId, name, image);
			return house;
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["house", variables.houseId] });
		},
	});

	const removeUserFromHouse = useMutation({
		mutationKey: ["houseLeave"],
		mutationFn: async ({
			houseId,
			userId,
		}: {
			houseId: number;
			userId: number;
		}) => {
			const result = await HouseService.removeUserFromHouse(userId, houseId);
			return result;
		},
		onSuccess: (data, variables) => {
			queryClient.invalidateQueries({ queryKey: ["user", variables.userId] });
		},
	});

	return {
		houseQuery,
		joinHouseMutation,
		getHouseQuery,
		updateHouseMutation,
		removeUserFromHouse,
	};
};
