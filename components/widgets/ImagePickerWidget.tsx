import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import RestyleBox from "../layout/RestyleBox";
import AppButton from "../misc/AppButton";

import {
	Button,
	Image,
	ImageStyle,
	Pressable,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
	useWindowDimensions,
} from "react-native";
import { useDarkLightTheme } from "../ThemeContext";
import { useImagePicker } from "@/app/hooks/useImagePicker";
import AppBottomSheetModal from "../modals/AppBottomSheetModal";
import RestyleText from "../layout/RestyleText";
import AppFab from "../misc/AppFab";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ImageBottomModal from "../modals/ImageBottomModal";

const ImagePickerWidget = ({
	setImage,
	uploadedImageUri,
	containerStyle,
	imageStyle,
}: {
	setImage: (newImageBase64: string) => void;
	containerStyle?: StyleProp<ViewStyle>;
	uploadedImageUri: string | null;
	imageStyle?: StyleProp<ImageStyle>;
}) => {
	const { currentTheme } = useDarkLightTheme();
	const [openActionModal, setOpenActionModal] = useState(false);

	const { takePhoto, pickImage } = useImagePicker();

	const handleUploadPhoto = async () => {
		const newImage = await pickImage();

		if (newImage) {
			setImage(newImage);
			setOpenActionModal(false);
		}
	};

	const handleTakePhoto = async () => {
		const newImage = await takePhoto();

		if (newImage) {
			setImage(newImage);
			setOpenActionModal(false);
		}
	};

	const { width, height } = useWindowDimensions();

	return (
		<RestyleBox style={containerStyle} marginTop='m' height={height * 0.25}>
			{uploadedImageUri ? (
				<>
					<Image
						source={{ uri: uploadedImageUri }}
						style={[
							styles.widget,
							{ borderColor: currentTheme.colors.primary },
							imageStyle,
						]}
					/>
					<TouchableOpacity
						style={{
							width: 50,
							height: 50,
							justifyContent: "center",
							alignItems: "center",
							top: "-20%",
							left: "60%",
							borderRadius: 30,
						}}
						onPress={() => setOpenActionModal(true)}
					>
						<RestyleBox
							style={{
								width: 50,
								height: 50,
								backgroundColor: "gray",
								borderRadius: 90,
								borderWidth: 1,
								borderColor: "white",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<FontAwesome6 name='camera' size={25} color='#444444' />
						</RestyleBox>
					</TouchableOpacity>
				</>
			) : (
				<TouchableOpacity onPress={() => setOpenActionModal(true)}>
					<RestyleBox style={styles.widget}>
						<FontAwesome6 name='camera' size={60} color='#444444' />
					</RestyleBox>
				</TouchableOpacity>
			)}

			{openActionModal && (
				<ImageBottomModal
					setImage={setImage}
					setOpenActionModal={setOpenActionModal}
				/>
			)}
		</RestyleBox>
	);
};

const styles = StyleSheet.create({
	widget: {
		aspectRatio: "1/1",
		width: "50%",
		backgroundColor: "gray",
		objectFit: "scale-down",
		borderRadius: 90,
		paddingBottom: 4,
		borderWidth: 2,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		position: "relative",
	},
});

export default ImagePickerWidget;
