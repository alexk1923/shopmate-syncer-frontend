import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import AppButton from "@/components/AppButton";
import FlipCard from "@/components/FlipCard";
import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import { theme } from "@/theme";
import { useDarkLightTheme } from "@/components/ThemeContext";
import LottieAnimation from "@/components/LottieAnimation";
import { ANIMATIONS } from "@/constants/assets";
import Wrapper from "@/components/Wrapper";

const ScanQRCode = () => {
	const [scanned, setScanned] = useState(false);
	const [inviteCode, setInviteCode] = useState("");

	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [barcode, setBarcode] = useState("");

	const [cameraRef, setCameraRef] = useState(null);
	const { currentTheme } = useDarkLightTheme();
	const [photo, setPhoto] = useState(null);

	useEffect(() => {
		console.log(permission);
	}, []);

	useEffect(() => {
		if (photo) {
		}
	}, [photo]);

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	if (!permission.canAskAgain && permission.status === "denied") {
		console.log(permission);

		return (
			<View>
				<RestyleText variant='subheader' color='error'>
					Permission denied. Go to settings to allow camera
				</RestyleText>
			</View>
		);
	}

	if (!permission?.granted) {
		// Camera permissions are still loading.
		console.log(permission);
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
			<CameraView
				style={styles.camera}
				// @ts-ignore
				ref={(ref) => setCameraRef(ref)}
				facing={facing as CameraType}
				barcodeScannerSettings={{
					barcodeTypes: ["qr"],
				}}
				onBarcodeScanned={(scanningResult) => {
					console.log(scanningResult);
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
				>
					{barcode ? "Loading..." : "Scan QR"}
				</RestyleText>
			</CameraView>
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
