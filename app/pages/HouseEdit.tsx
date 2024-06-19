import { View, Text } from "react-native";
import React, { useState } from "react";
import RestyleText from "@/components/layout/RestyleText";
import AppEditInput from "@/components/Form/AppEditInput";
import Wrapper from "@/components/layout/Wrapper";
import { useHouseStore } from "../store/useHouseStore";
import ImagePickerWidget from "@/components/widgets/ImagePickerWidget";
import AppButton from "@/components/misc/AppButton";

const HouseEdit = () => {
	const house = useHouseStore((state) => state.house);
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
			<AppButton
				title='Save changes'
				onPress={() => {
					console.info("@TODO Implement Editing house");
				}}
				variant='outline'
			/>
		</Wrapper>
	);
};

export default HouseEdit;
