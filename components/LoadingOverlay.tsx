import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";

const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
	return (
		<Modal
			transparent={true}
			animationType='none'
			visible={isVisible}
			onRequestClose={() => {}}
		>
			<View style={styles.modalBackground}>
				<ActivityIndicator animating={isVisible} size='large' color='#ffffff' />
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	modalBackground: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	activityIndicatorWrapper: {
		backgroundColor: "#00000040",
		height: 100,
		width: 100,
		borderRadius: 90,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default LoadingOverlay;
