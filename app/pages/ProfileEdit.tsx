import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import AppEditInput from "@/components/Form/AppEditInput";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import ImagePickerWidget from "@/components/widgets/ImagePickerWidget";
import { useHouseStore } from "../store/useHouseStore";
import { useAuthStore } from "../store/useUserStore";
import { useUser } from "../hooks/useUser";
import RestyleText from "@/components/layout/RestyleText";
import LoadingOverlay from "@/components/modals/LoadingOverlay";

const ProfileEdit = () => {
	const user = useAuthStore((state) => state.user);
	const { editUserMutation } = useUser(user?.id!);

	const [image, setImage] = useState(user?.profilePicture ?? null);
	const [firstName, setFirstName] = useState(user?.firstName ?? "");
	const [lastName, setLastName] = useState(user?.lastName ?? "");
	const [username, setUsername] = useState(user?.username ?? "");

	const [errors, setErrors] = useState({
		username: "",
		firstName: "",
		lastName: "",
	});

	const handleEditProfile = () => {
		if (username.length === 0) {
			setErrors((prev) => {
				return { ...prev, username: "Username cannot be empty" };
			});
		}
		if (firstName.length === 0) {
			setErrors((prev) => {
				return { ...prev, firstName: "First Name cannot be empty" };
			});
		}
		if (lastName.length === 0) {
			setErrors((prev) => {
				return { ...prev, lastName: "Last Name cannot be empty" };
			});
		}

		let editFields = Object.assign(
			{},
			username && { username },
			firstName && { firstName },
			lastName && { lastName },
			image && image !== user?.profilePicture && { profilePicture: image }
		);

		editUserMutation.mutate({ goBack: true, userId: user?.id!, ...editFields });
	};

	return (
		<Wrapper>
			<LoadingOverlay isVisible={editUserMutation.isPending} />
			{editUserMutation.isError && (
				<RestyleText color='error'>
					{editUserMutation.error.message}
				</RestyleText>
			)}
			<ImagePickerWidget uploadedImageUri={image} setImage={setImage} />
			<AppEditInput
				label={"Username"}
				placeholder={"Your desired username"}
				value={username}
				onChangeText={setUsername}
			/>
			{errors.username.length > 0 && (
				<RestyleText color='error' fontWeight='bold'>
					{errors.username}
				</RestyleText>
			)}
			<AppEditInput
				label={"First Name"}
				placeholder={"Enter your first name"}
				value={firstName}
				onChangeText={setFirstName}
			/>
			{errors.firstName.length > 0 && (
				<RestyleText color='error' fontWeight='bold'>
					{errors.firstName}
				</RestyleText>
			)}
			<AppEditInput
				label={"Last Name"}
				placeholder={"Enter your last name"}
				value={lastName}
				onChangeText={setLastName}
			/>
			{errors.lastName.length > 0 && (
				<RestyleText color='error' fontWeight='bold'>
					{errors.lastName}
				</RestyleText>
			)}

			<AppButton title='Save' onPress={handleEditProfile} variant='outline' />
		</Wrapper>
	);
};

export default ProfileEdit;
