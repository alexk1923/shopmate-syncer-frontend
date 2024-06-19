import { View, Text } from "react-native";
import React, { useState } from "react";
import AppEditInput from "@/components/Form/AppEditInput";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import ImagePickerWidget from "@/components/widgets/ImagePickerWidget";
import { useHouseStore } from "../store/useHouseStore";
import { useAuthStore } from "../store/useUserStore";

const ProfileEdit = () => {
	const user = useAuthStore((state) => state.user);
	const [image, setImage] = useState(user?.profilePicture ?? null);
	const [firstName, setFirstName] = useState(user?.firstName ?? "");
	const [lastName, setLastName] = useState(user?.lastName ?? "");
	const [username, setUsername] = useState(user?.username ?? "");

	return (
		<Wrapper>
			<ImagePickerWidget uploadedImageUri={image} setImage={setImage} />
			<AppEditInput
				label={"Username"}
				placeholder={"Your desired username"}
				value={username}
				onChangeText={setUsername}
			/>
			<AppEditInput
				label={"First Name"}
				placeholder={"Enter your first name"}
				value={firstName}
				onChangeText={setFirstName}
			/>
			<AppEditInput
				label={"Last Name"}
				placeholder={"Enter your last name"}
				value={lastName}
				onChangeText={setLastName}
			/>
			<AppButton
				title='Save changes'
				onPress={() => {
					console.info("@TODO Implement Editing profile");
				}}
				variant='outline'
			/>
		</Wrapper>
	);
};

export default ProfileEdit;
