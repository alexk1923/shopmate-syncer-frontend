import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useMemo, useState } from "react";
import {
	Button,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import LottieView from "lottie-react-native";
import RestyleBox from "@/components/RestyleBox";
import Wrapper from "@/components/Wrapper";
import AppButton from "@/components/AppButton";
import RestyleText from "@/components/RestyleText";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { useDarkLightTheme } from "@/components/ThemeContext";
import BottomSheet, {
	BottomSheetSectionList,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
	GestureHandlerRootView,
	TextInput,
} from "react-native-gesture-handler";
import FoodTag from "@/components/FoodTag";
import { Product, fetchedFood } from "@/constants/types";
import ProductCard from "@/components/ProductCard";
import DashboardPage from "./DashboardPage";
import FlipCard from "@/components/FlipCard";

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const AnimationFileMap = {
	barcode_scanner: require("@/assets/animations/barcode_scanner.json"),
	camera_permission: require("@/assets/animations/camera_permission.json"),
};

function ControllingAnimationProgress(props: {
	animationFile: "barcode_scanner" | "camera_permission";
}) {
	4;
	const { animationFile } = props;
	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animationProgress.current, {
			toValue: 1,
			duration: 5000,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	return (
		<AnimatedLottieView
			source={AnimationFileMap[animationFile]}
			progress={animationProgress.current}
			style={{ width: "100%", height: "50%" }}
			autoPlay
		/>
	);
}

const Fab = (props: { iconName: any; onPress: () => void }) => {
	const { iconName, onPress } = props;
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<RestyleBox style={styles.fab}>
				<Ionicons name={iconName} size={24} color='white' />
			</RestyleBox>
		</TouchableOpacity>
	);
};

export default function Scan() {
	const [facing, setFacing] = useState("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [barcode, setBarcode] = useState("");
	const [tutorial, setTutorial] = useState(true);
	const [enableTorch, setEnableTorch] = useState(false);
	const [tutorialStep, setTutorialStep] = useState(0);
	const [cameraRef, setCameraRef] = useState(null);
	const { currentTheme } = useDarkLightTheme();
	const [photo, setPhoto] = useState(null);
	// ref
	const bottomSheetRef = useRef<BottomSheet>(null);
	const [foundProduct, setFoundProduct] = useState<Product | null>(null);

	useEffect(() => {
		if (photo) {
			for (let item of fetchedFood) {
				console.log(item.barcode + "vs" + barcode);

				if (item.barcode === barcode) {
					console.log("yes");
					5941486000434;
					591486000434;
					setFoundProduct(item);
					break;
				}
			}
		}
	}, [photo]);

	// callbacks
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);
	const takePicture = async () => {
		if (cameraRef) {
			const photo = await cameraRef.takePictureAsync();
			setPhoto(photo.uri); // Save the photo URI to display later
		}
	};

	useEffect(() => {
		if (permission && permission.granted) {
			setTutorialStep(1);
		}
	}, [permission]);

	const tutorialInfo = [
		{
			str: "Grant permission to your camera",
			buttonStr: "Grant access",
			animation: "camera_permission",
		},
		{
			str: "Place the barcode in front of the camera and add it into the database",
			buttonStr: "Next",
			animation: "barcode_scanner",
		},
	];

	function toggleCameraFacing() {
		setFacing((current) => (current === "back" ? "front" : "back"));
	}

	if (!permission) {
		// Camera permissions are still loading.
		return <View />;
	}

	// if (!permission.granted) {
	// 	// Camera permissions are not granted yet.
	// 	return (
	// 		<View style={styles.container}>
	// 			<Text style={{ textAlign: "center" }}>
	// 				We need your permission to show the camera
	// 			</Text>

	// 			<Button onPress={requestPermission} title='grant permission' />
	// 		</View>
	// 	);
	// }

	return (
		<>
			{tutorial ? (
				<Wrapper style={{ justifyContent: "flex-end" }}>
					<RestyleBox justifyContent='center' gap='s'>
						<ControllingAnimationProgress
							animationFile={tutorialInfo[tutorialStep].animation}
						/>
						<RestyleText variant='subheader' color='text'>
							{tutorialInfo.at(tutorialStep)?.str}
						</RestyleText>
						<AppButton
							title={tutorialInfo.at(tutorialStep)?.buttonStr || "next"}
							onPress={() => {
								if (tutorialStep === 0) {
									requestPermission();
								} else {
									setTutorial(false);
									setTutorialStep((prev) => prev + 1);
								}
							}}
							variant={"filled"}
						/>
					</RestyleBox>
				</Wrapper>
			) : (
				<RestyleBox
					height={"100%"}
					width={"100%"}
					backgroundColor='mainBackground'
					justifyContent='center'
					paddingBottom='xl'
				>
					<RestyleBox width='100%'>
						<RestyleText variant='header' textAlign='center' color='text'>
							Scan product
						</RestyleText>
					</RestyleBox>

					{photo === null ? (
						<CameraView
							style={styles.camera}
							ref={(ref) => setCameraRef(ref)}
							facing={facing as CameraType}
							barcodeScannerSettings={{
								barcodeTypes: ["ean13", "ean8"],
							}}
							onBarcodeScanned={(scanningResult) => {
								console.log(scanningResult);

								setBarcode(scanningResult.data);
								takePicture();
							}}
							enableTorch={enableTorch}
						>
							<View style={styles.buttonContainer}>
								<Fab
									iconName='flash'
									onPress={() => setEnableTorch((prev) => !prev)}
								/>
								<Fab iconName={"camera-reverse"} onPress={toggleCameraFacing} />
							</View>
						</CameraView>
					) : foundProduct ? (
						<FlipCard
							frontComponent={<></>}
							backComponent={
								<RestyleBox backgroundColor='primary'>
									<RestyleText>We did it</RestyleText>
								</RestyleBox>
							}
							foundProduct={foundProduct}
						/>
					) : (
						<Text>Product not found</Text>
					)}

					{photo === null && (
						<RestyleBox backgroundColor='mainBackground'>
							<RestyleText
								variant='subheader'
								fontWeight='bold'
								textAlign='center'
								color='text'
							>
								Scanned code:
							</RestyleText>
							<RestyleText textAlign='center' color='primary' fontWeight='bold'>
								{barcode}
							</RestyleText>

							<View
								style={{
									flexDirection: "row",
									gap: theme.spacing.m,
									justifyContent: "center",
								}}
							>
								<AppButton title='OK' onPress={takePicture} variant='filled' />
								<AppButton
									title='Retry'
									onPress={() => setPhoto(null)}
									variant='outline'
								/>
							</View>
						</RestyleBox>
					)}
				</RestyleBox>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	container: {},
	camera: {
		flex: 1,
		// height: 400,
		width: "100%",
		justifyContent: "flex-end",
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
