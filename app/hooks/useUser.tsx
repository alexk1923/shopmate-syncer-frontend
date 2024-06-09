import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/userService";
import { HouseService } from "../services/houseService";
import { useHouseStore } from "../store/useHouseStore";

export const useUser = (userId: number | null) => {
	const setHouse = useHouseStore((state) => state.setHouse);

	const userQuery = useQuery<User | null>({
		queryKey: ["user", userId],
		queryFn: async () => {
			console.log("user query made!");

			const user = await UserService.getUserById(userId as number);
			if (user.houseId) {
				const house = await HouseService.getHouseById(user.houseId);
				setHouse(house);
			}
			return user;
		},
		enabled: userId !== null,
		refetchInterval: 5000,
	});

	return { userQuery };
};
