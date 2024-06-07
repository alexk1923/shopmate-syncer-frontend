import { FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import RestyleBox from "../layout/RestyleBox";
import AppButton from "../misc/AppButton";
import {
	GestureHandlerRootView,
	TouchableOpacity,
} from "react-native-gesture-handler";
import { Image, StyleSheet } from "react-native";

const ImagePickerWidget = ({
	onPress,
	uploadedImageUri,
}: {
	onPress: () => void;
	uploadedImageUri: string | null;
}) => {
	return (
		<>
			{uploadedImageUri ? (
				<Image source={{ uri: uploadedImageUri }} style={styles.widget} />
			) : (
				<RestyleBox style={styles.widget}>
					<FontAwesome6 name='camera' size={60} color='#444444' />
				</RestyleBox>
			)}

			<AppButton variant='outline' title='Upload photo' onPress={onPress} />
		</>
	);
};

const styles = StyleSheet.create({
	widget: {
		aspectRatio: "1/1",
		width: "50%",
		backgroundColor: "gray",
		borderRadius: 90,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default ImagePickerWidget;
