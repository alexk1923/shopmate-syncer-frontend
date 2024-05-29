import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button, BackHandler } from "react-native";
import {
	BottomSheetModal,
	BottomSheetView,
	BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useDarkLightTheme } from "./ThemeContext";
import { backgroundColor } from "@shopify/restyle";
import AppButton from "./AppButton";

const AppBottomSheetModal = ({
	children,
	onClose,
}: {
	children: React.ReactNode;
	onClose: () => void;
}) => {
	const { currentTheme } = useDarkLightTheme();
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => ["50%"], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	const handleCloseModal = () => {
		// bottomSheetModalRef.current?.close();
		bottomSheetModalRef.current?.dismiss();
		onClose();
	};

	useEffect(() => {
		const backAction = () => {
			handleCloseModal;
			backHandler.remove();
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		handlePresentModalPress();
	}, []);
	// renders
	return (
		<View style={styles.container}>
			<BottomSheetModal
				ref={bottomSheetModalRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
			>
				<BottomSheetView
					style={[
						styles.contentContainer,
						{ backgroundColor: currentTheme.colors.mainBackground },
					]}
				>
					{children}
					<AppButton
						title={"Done"}
						onPress={handleCloseModal}
						variant={"filled"}
					/>
				</BottomSheetView>
			</BottomSheetModal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,

		padding: 24,
		justifyContent: "center",
		backgroundColor: "transparent",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

export default AppBottomSheetModal;
