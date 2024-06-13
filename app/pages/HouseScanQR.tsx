import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";

import { theme } from "@/theme";
import { useDarkLightTheme } from "@/components/ThemeContext";
import LottieAnimation from "@/components/common/LottieAnimation";
import { ANIMATIONS } from "@/constants/assets";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import LoadingOverlay from "@/components/modals/LoadingOverlay";
import { useHouse } from "../hooks/useHouse";
import { useAuthStore } from "../store/useUserStore";
import { router } from "expo-router";

const ScanQRCode = () => {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [barcode, setBarcode] = useState("");

	const [cameraRef, setCameraRef] = useState(null);
	const { currentTheme } = useDarkLightTheme();
	const [photo, setPhoto] = useState(null);
	const [barcodeLoading, setBarcodeLoading] = useState(false);

	const { joinHouseMutation } = useHouse(null);
	const user = useAuthStore((state) => state.user);

	if (!user?.id) {
		router.navigate("/Login");
		return;
	}

	useEffect(() => {
		if (joinHouseMutation.data) {
			console.log("navigare catre home");
			router.navigate("(tabs)/Home");
		}
	}, [joinHouseMutation.data]);

	useEffect(() => {}, [barcode]);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.canAskAgain && permission.status === "denied") {
		return (
			<View>
				<RestyleText variant='subheader' color='error'>
					Permission denied. Go to settings to allow camera
				</RestyleText>
			</View>
		);
	}

	if (!permission?.granted) {
		// requestPermission();
		return (
			<Wrapper style={{ justifyContent: "center" }}>
				<LottieAnimation animationName={ANIMATIONS.CAMERA_PERMISSION} />
				<RestyleText variant='subheader' color='primary'>
					Grant permission to your camera to scan QR
				</RestyleText>
				<AppButton title='OK' variant='filled' onPress={requestPermission} />
			</Wrapper>
		);
	}

	return (
		<RestyleBox
			height={"100%"}
			width={"100%"}
			backgroundColor='mainBackground'
			justifyContent='center'
			paddingBottom='xl'
		>
			<LoadingOverlay isVisible={joinHouseMutation.isPending} />

			{!barcode && (
				<CameraView
					style={styles.camera}
					// @ts-ignore
					ref={(ref) => setCameraRef(ref)}
					facing={facing as CameraType}
					barcodeScannerSettings={{
						barcodeTypes: ["qr"],
					}}
					onBarcodeScanned={(scanningResult) => {
						setBarcodeLoading(true);
						joinHouseMutation.mutate({
							userId: user?.id,
							houseId: Number(scanningResult.data),
						});
						setBarcode(scanningResult.data);
					}}
				>
					<LottieAnimation
						animationName={ANIMATIONS.QR_SCANNER}
						style={{ width: "100%" }}
					/>

					<RestyleText
						variant='header'
						textAlign='center'
						style={{ color: "white" }}
					></RestyleText>
				</CameraView>
			)}
		</RestyleBox>
	);
};

const styles = StyleSheet.create({
	container: {},
	camera: {
		// flex: 1,
		// height: 400,
		height: "75%",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		// padding: theme.spacing.m,
	},
	buttonContainer: {
		flexDirection: "row",
		// backgroundColor: "green",
		justifyContent: "space-between",
		padding: theme.spacing.l,
	},
	button: {},

	fab: {
		backgroundColor: "transparent",
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 90,
		borderWidth: 2,
		borderColor: "white",
	},
	photo: {
		width: "100%",
		height: "80%",
	},
	bottomSheetContainer: {
		flex: 1,
		padding: 24,
		backgroundColor: "grey",
	},
	contentContainer: {
		flex: 1,
		alignItems: "center",
	},
});

export default ScanQRCode;
