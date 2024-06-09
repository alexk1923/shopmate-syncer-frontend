import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import AppTextInput from "@/components/Form/AppTextInput";
import * as ImagePicker from "expo-image-picker";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import { AccountSetupInput } from "@/constants/types/AuthTypes";
import { Control, FieldErrors, useForm } from "react-hook-form";
import ImagePickerWidget from "@/components/widgets/ImagePickerWidget";
import Avatar from "@/components/misc/Avatar";
import { router } from "expo-router";
import { useAuthStore } from "../store/useUserStore";
import { useUser } from "../hooks/useUser";
import { useUpload } from "../hooks/useUpload";
import { useIsFocused } from "@react-navigation/native";

const AccountSetup = () => {
	const isFocused = useIsFocused();
	const [image, setImage] = useState<string | null>(null);
	const { useInfoSetupMutation } = useUpload();
	function onSubmit(formData: AccountSetupInput) {
		console.log(formData);
		useInfoSetupMutation.mutate({
			image: image,
			firstName: formData.firstName,
			lastName: formData.lastName,
		});
	}
	const {
		control,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm<AccountSetupInput>();
	const handleFormSubmit = handleSubmit(onSubmit);

	const userId = useAuthStore((state) => state.userId);
	const { userQuery } = useUser(userId);

	useEffect(() => {
		if (!isFocused) {
			return;
		}

		if (userQuery.data && userQuery.data.firstName && userQuery.data.lastName) {
			router.navigate("/(tabs)/(shopping)/ShoppingPage");
		}
	}, [userQuery.data]);

	const inputs = [
		{
			id: 1,
			placeholder: "First Name",
			inputKey: "firstName",
			rules: { required: "First Name is required" },
			iconName: "user-pen",
		},
		{
			id: 2,
			placeholder: "Last Name",
			inputKey: "lastName",
			rules: { required: "Last Name is required" },
			iconName: "user-pen",
		},
	];

	return (
		<Wrapper>
			<RestyleText variant='header' color='primary'>
				Setup your account
			</RestyleText>

			<ImagePickerWidget setImage={setImage} uploadedImageUri={image ?? null} />

			<RestyleBox>
				{inputs.map((input) => {
					return (
						<AppTextInput
							// @ts-ignore
							control={control}
							errors={errors}
							placeholder={input.placeholder}
							inputKey={input.inputKey}
							rules={input.rules}
							iconName={input.iconName}
							key={input.id}
						/>
					);
				})}
			</RestyleBox>
			{useInfoSetupMutation.isPending && <ActivityIndicator />}
			{useInfoSetupMutation.isError && (
				<RestyleText color='error'>
					{useInfoSetupMutation.error.message}
				</RestyleText>
			)}
			<AppButton variant='filled' title='Done' onPress={handleFormSubmit} />
		</Wrapper>
	);
};

export default AccountSetup;
