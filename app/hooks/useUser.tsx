import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/userService";
import { HouseService } from "../services/houseService";
import { useHouseStore } from "../store/useHouseStore";
import { useAuthStore } from "../store/useUserStore";
import { router } from "expo-router";
import { UploadService } from "../services/imageService";

export const useUser = (userId: number | null) => {
	const house = useHouseStore((state) => state.house);
	const queryClient = useQueryClient();
	const setHouse = useHouseStore((state) => state.setHouse);
	const currentUser = useAuthStore((state) => state.user);
	const setUser = useAuthStore((state) => state.setUser);

	const userQuery = useQuery<User | null>({
		queryKey: ["user", userId],
		queryFn: async () => {
			console.log("user query made!");

			const user = await UserService.getUserById(userId as number);
			if (!currentUser?.profilePicture && user.profilePicture) {
				setUser(user);
			}

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

			setUser(user);
			return user;
		},
		enabled: userId !== null,
		refetchInterval: 30000,
	});

	const editUserMutation = useMutation({
		mutationKey: ["editUser"],
		mutationFn: async ({
			userId,
			firstName,
			lastName,
			profilePicture,
			goBack,
		}: {
			userId: number;
			firstName?: string | null;
			lastName?: string | null;
			profilePicture?: string | null;
			goBack: boolean;
		}) => {
			const uploadedPhoto = profilePicture
				? await UploadService.uploadImage(profilePicture)
				: null;

			const editUser = await UserService.updateUser({
				userId,
				firstName,
				lastName,
				profilePicture: uploadedPhoto?.secure_url,
			});
			return editUser;
		},
		onSuccess: (data, variables) => {
			console.log("The success from edit user");
			queryClient.invalidateQueries({ queryKey: ["user", userId] });
			if (variables.goBack) {
				router.back();
			}
		},
	});

	return { userQuery, editUserMutation };
};
