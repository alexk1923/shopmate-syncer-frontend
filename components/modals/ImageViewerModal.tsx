import { View, Modal, StyleSheet, Image, Pressable } from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type ImageViewerModalProps = {
	modalVisible: boolean;
	onModalClose: () => void;
	image: string;
};

const ImageViewerModal = ({
	modalVisible,
	onModalClose,
	image,
}: ImageViewerModalProps) => {
	return (
		<Modal
			animationType='fade'
			transparent
			onRequestClose={onModalClose}
			visible={modalVisible}
			onDismiss={onModalClose}
		>
			<Pressable onPress={onModalClose}>
				<View style={styles.flexContainer}>
					<Pressable onPress={() => {}}>
						<Image source={{ uri: image }} style={styles.profilePic} />
					</Pressable>
				</View>
			</Pressable>
		</Modal>
	);
};

const styles = StyleSheet.create({
	flexContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.4)",
		height: "100%",
		width: "100%",
		zIndex: 1,
	},
	profilePic: {
		width: "80%",
		aspectRatio: 1,
		borderRadius: 500,
		margin: 15,
		borderWidth: 2,

		overflow: "visible",
		objectFit: "contain",
	},
});

export default ImageViewerModal;
