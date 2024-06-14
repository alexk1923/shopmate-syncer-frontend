import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/userService";
import { HouseService } from "../services/houseService";
import { useHouseStore } from "../store/useHouseStore";
import { useAuthStore } from "../store/useUserStore";

export const useUser = (userId: number | null) => {
	const house = useHouseStore((state) => state.house);

	const setHouse = useHouseStore((state) => state.setHouse);
	const currentUser = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);

	const userQuery = useQuery<User | null>({
		queryKey: ["user", userId],
		queryFn: async () => {
			console.log("user query made!");

			const user = await UserService.getUserById(userId as number);
			if (user.houseId && !house) {
				const updatedHouse = await HouseService.getHouseById(user.houseId);
				setHouse(updatedHouse);
			}

			if (!currentUser?.firstName && user.firstName) {
				if (currentUser) {
					setUser({
						...currentUser,
						id: currentUser?.id ?? user.id,
						firstName: user.firstName,
					});
				}
			}

			if (!currentUser?.lastName && user.lastName) {
				if (currentUser) {
					setUser({
						...currentUser,
						id: currentUser?.id ?? user.id,
						lastName: user.lastName,
					});
				}
			}

			if (!currentUser?.houseId && user.houseId) {
				if (currentUser) {
					setUser({
						...currentUser,
						id: currentUser?.id ?? user.id,
						houseId: user.houseId,
					});
				}
			}
			return user;
		},
		enabled: userId !== null,
		refetchInterval: 30000,
	});

	return { userQuery };
};
