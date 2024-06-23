import { View, Text } from "react-native";
import React, { useState } from "react";
import RestyleText from "@/components/layout/RestyleText";
import AppEditInput from "@/components/Form/AppEditInput";
import Wrapper from "@/components/layout/Wrapper";
import { useHouseStore } from "../store/useHouseStore";
import ImagePickerWidget from "@/components/widgets/ImagePickerWidget";
import AppButton from "@/components/misc/AppButton";
import { useHouse } from "../hooks/useHouse";
import { useAuthStore } from "../store/useUserStore";
import LoadingOverlay from "@/components/modals/LoadingOverlay";

const HouseEdit = () => {
	const user = useAuthStore((state) => state.user);
	const house = useHouseStore((state) => state.house);
	const { updateHouseMutation, removeUserFromHouse } = useHouse(
		house?.id ?? null
	);
	const [image, setImage] = useState(house?.image ?? null);
	const [name, setName] = useState(house?.name ?? "");

	return (
		<Wrapper>
			<ImagePickerWidget uploadedImageUri={image} setImage={setImage} />
			<AppEditInput
				label={"House name"}
				placeholder={"e.g. My House"}
				value={name}
				onChangeText={setName}
			/>
			<LoadingOverlay
				isVisible={
					updateHouseMutation.isPending || removeUserFromHouse.isPending
				}
			/>

			<AppButton
				title='Save'
				onPress={() => {
					updateHouseMutation.mutate({ houseId: house?.id!, name, image });
				}}
				variant='outline'
			/>

			<AppButton
				title='Leave house'
				onPress={() => {
					removeUserFromHouse.mutate({
						houseId: house?.id!,
						userId: user?.id!,
					});
				}}
				variant='error'
			/>
		</Wrapper>
	);
};

export default HouseEdit;
