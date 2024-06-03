import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import RestyleBox from "../RestyleBox";
import AppButton from "../AppButton";

const ImagePicker = ({ onPress }) => {
	return (
		<>
			<RestyleBox
				aspectRatio={"1/1"}
				width={"50%"}
				backgroundColor='gray'
				borderRadius={90}
				alignSelf='center'
				justifyContent='center'
				alignItems='center'
			>
				<FontAwesome6 name='camera' size={60} color='#444444' />
			</RestyleBox>
			<AppButton variant='outline' title='Upload photo' onPress={onPress} />
		</>
	);
};

export default ImagePicker;
