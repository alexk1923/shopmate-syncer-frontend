import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { View, StyleSheet, BackHandler } from "react-native";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useDarkLightTheme } from "../ThemeContext";

import AppButton from "../misc/AppButton";
import { useKeyboardVisible } from "@/app/hooks/useKeyboardVisible";

const AppBottomSheetModal = ({
	initialSnapPoint = "70%",
	finalSnapPoint = "90%",
	children,
	onClose,
	showDoneButton = true,
}: {
	initialSnapPoint?: string;
	finalSnapPoint?: string;
	children: React.ReactNode;
	onClose: () => void;
	showDoneButton?: boolean;
}) => {
	const { currentTheme } = useDarkLightTheme();
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// variables
	const snapPoints = useMemo(() => [initialSnapPoint, finalSnapPoint], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleSheetChanges = useCallback((index: number) => {
		console.log(index);
		if (index === -1) {
			handleCloseModal();
		}
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

	const { isKeyboardVisible, setKeyboardVisible } = useKeyboardVisible();

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

					{showDoneButton && (
						<AppButton
							title={"Done"}
							onPress={handleCloseModal}
							variant={"filled"}
						/>
					)}
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
		// alignItems: "center",
		padding: 16,
	},
});

export default AppBottomSheetModal;
