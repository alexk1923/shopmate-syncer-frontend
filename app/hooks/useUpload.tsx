import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../store/useUserStore";

import { UserService } from "../services/userService";
import { ItemService } from "../services/itemService";
import { UploadService } from "../services/imageService";

export const useUpload = () => {
	const queryClient = useQueryClient();
	const currentUser = useAuthStore((state) => state.user);

	const uploadMutation = useMutation({
		mutationKey: ["upload_image"],
		mutationFn: async ({
			image,
			successCallback,
		}: {
			image: string;
			successCallback: (uploadDetails: any) => void;
		}) => {
			const result = await UploadService.uploadImage(image);

			return result;
		},
		onSuccess: (data, variables, context) => {
			variables.successCallback(data);
		},
	});

	const useInfoSetupMutation = useMutation({
		mutationKey: ["user_setup"],
		mutationFn: async ({
			image,
			firstName,
			lastName,
		}: {
			image?: string | null;
			firstName: string;
			lastName: string;
		}) => {
			if (image) {
				const result = await UploadService.uploadImage(image);
				return result;
			}

			return null;
		},
		onSuccess: async (uploadDetails, variables) => {
			if (currentUser) {
				let updateFields = {
					userId: currentUser?.id,
					firstName: variables.firstName,
					lastName: variables.lastName,
				};
				if (uploadDetails) {
					updateFields = {
						...updateFields,
						// @ts-ignore
						profilePicture: uploadDetails.secure_url,
					};
				}
				const updateUser = await UserService.updateUser({
					...updateFields,
				});
				queryClient.invalidateQueries({ queryKey: ["user", currentUser?.id] });
				return updateUser;
			}
		},
	});

	return {
		uploadMutation,
		useInfoSetupMutation,
	};
};
