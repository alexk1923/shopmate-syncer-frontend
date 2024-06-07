import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/userService";

export const useUser = (userId: number | null) => {
	const userQuery = useQuery<User | null>({
		queryKey: ["user", userId],
		queryFn: async () => {
			const user = await UserService.getUserById(userId as number);
			return user;
		},
		enabled: userId !== null,
	});

	return { userQuery };
};
