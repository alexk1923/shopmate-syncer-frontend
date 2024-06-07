import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HouseService } from "../services/houseService";
import { useHouseStore } from "../store/useHouseStore";

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
			const unk = await HouseService.addUserToHouse(userId, houseId);
			console.log("unk is:");

			console.log(unk);

			return unk;
		},
		onSuccess: (data, variables) => {
			console.log("mutatie succes");
			console.log(data);

			queryClient.invalidateQueries({ queryKey: ["house", variables.userId] });
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

	return { houseQuery, joinHouseMutation, getHouseQuery };
};
