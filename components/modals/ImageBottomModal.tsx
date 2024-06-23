import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import RestyleText from "../layout/RestyleText";
import AppBottomSheetModal from "./AppBottomSheetModal";
import RestyleBox from "../layout/RestyleBox";
import AppFab from "../misc/AppFab";
import { useDarkLightTheme } from "../ThemeContext";
import { useImagePicker } from "@/app/hooks/useImagePicker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

type ImageBottomModalProps = {
	setImage: (newImage: string) => void;
	setOpenActionModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageBottomModal = ({
	setOpenActionModal,
	setImage,
}: ImageBottomModalProps) => {
	const { currentTheme } = useDarkLightTheme();
	const { takePhoto, pickImage } = useImagePicker();
	const { width, height } = useWindowDimensions();

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

	return (
		<GestureHandlerRootView
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				backgroundColor: "transparent",
				height,
				width,
				flex: 1,
				margin: 0,
				zIndex: 1,
			}}
		>
			<BottomSheetModalProvider>
				<AppBottomSheetModal
					initialSnapPoint='40%'
					finalSnapPoint='40%'
					onClose={() => setOpenActionModal(false)}
					showDoneButton={false}
				>
					<RestyleText color='text' variant='subheader' textAlign='center'>
						Choose an action
					</RestyleText>

					<RestyleBox
						flexDirection='row'
						alignItems='center'
						gap='s'
						padding='s'
					>
						<RestyleBox alignItems='center'>
							<AppFab
								size={50}
								onPress={handleTakePhoto}
								iconName={"camera"}
								iconColor={"white"}
								backgroundColor={currentTheme.colors.primary}
							/>
							<RestyleText variant='body' color='text'>
								Take photo
							</RestyleText>
						</RestyleBox>
						<RestyleBox alignItems='center'>
							<AppFab
								size={50}
								onPress={handleUploadPhoto}
								iconName={"image"}
								iconColor={"white"}
								backgroundColor={currentTheme.colors.primary}
							/>
							<RestyleText variant='body' color='text'>
								Choose from gallery
							</RestyleText>
						</RestyleBox>
					</RestyleBox>
				</AppBottomSheetModal>
			</BottomSheetModalProvider>
		</GestureHandlerRootView>
	);
};

export default ImageBottomModal;
