import { CameraView, useCameraPermissions } from "expo-camera";
import { useCallback, useMemo, useState } from "react";
import {
	ActivityIndicator,
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

import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { theme } from "@/theme";
import { CameraType } from "expo-camera/build/legacy/Camera.types";
import { useDarkLightTheme } from "@/components/ThemeContext";
import BottomSheet from "@gorhom/bottom-sheet";

import { useQuery } from "@tanstack/react-query";
import { ItemService } from "../services/itemService";
import { useAuthStore } from "../store/useUserStore";

import FlipCard from "@/components/cards/FlipCard";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import { ExternalItem, Item } from "@/constants/types/ItemTypes";
import { useItems } from "../hooks/useItems";
import LottieAnimation from "@/components/common/LottieAnimation";
import { ANIMATIONS } from "@/constants/assets";
import LoadingOverlay from "@/components/modals/LoadingOverlay";
import ProductCardEdit from "@/components/Products/ProductCardEdit";
import { router } from "expo-router";

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
	const user = useAuthStore((state) => state.user);
	const { itemQuery } = useItems();
	const [foundProduct, setFoundProduct] = useState<Item | null>(null);
	const [newProduct, setNewProduct] = useState(false);
	const [previousSearchFinished, setPreviousSearchFinished] = useState(false);
	const [reset, setReset] = useState(0);
	const [externalItem, setExternalItem] = useState<ExternalItem | null>(null);

	const handleResetScan = () => {
		setTutorial(true);
		setBarcode("");
		setPreviousSearchFinished(false);
		setNewProduct(false);
		setExternalItem(null);
		setFoundProduct(null);
		if (permission && permission.granted) {
			setTutorialStep(1);
			return;
		}

		setTutorialStep(0);

		// router.replace("/(tabs)/Home");
	};

	const externalItemsQuery = useQuery({
		queryKey: ["externalItems"],
		queryFn: async () => {
			const apiItems = await ItemService.getExternalApiItems(barcode);
			console.log("my api items:");
			console.log(apiItems.product.product_name);
			console.log(apiItems.product.image_url);
			return apiItems;

			// setExternalItems(apiItems);
		},
		enabled: barcode !== "" && previousSearchFinished === true && !foundProduct,
	});

	useEffect(() => {
		if (externalItemsQuery.data) {
			setExternalItem(externalItemsQuery.data);
		}
	}, [externalItemsQuery.data]);
	useEffect(() => {
		let found = false;
		console.log("New barcode is: " + barcode);
		if (itemQuery.data) {
			const previousProduct = itemQuery.data.find(
				(prevItem) => prevItem.barcode === barcode
			);
			console.log(`my previous product is: ${previousProduct}`);

			if (previousProduct) {
				setFoundProduct(previousProduct);
			}
			setPreviousSearchFinished(true);
		}
	}, [barcode]);

	// useEffect(() => {
	// 	if (previousSearchFinished === false) {
	// 		setPreviousSearchFinished(true);
	// 	}
	// }, [foundProduct]);

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

	if (!permission.granted) {
		// Camera permissions are not granted yet.
		return (
			<View style={styles.container}>
				<Text style={{ textAlign: "center" }}>
					We need your permission to show the camera
				</Text>

				<Button onPress={requestPermission} title='grant permission' />
			</View>
		);
	}
	if (tutorial) {
		return (
			<Wrapper style={{ justifyContent: "flex-end" }}>
				<RestyleBox justifyContent='center' gap='s'>
					<ControllingAnimationProgress
						// @ts-ignore
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
		);
	}

	if (barcode) {
		if (itemQuery.isLoading || externalItemsQuery.isLoading) {
			return (
				<LoadingOverlay
					isVisible={itemQuery.isLoading || externalItemsQuery.isLoading}
				/>
			);
		}

		if (!foundProduct && !externalItem && !newProduct) {
			return (
				<Wrapper style={{ justifyContent: "center" }}>
					<LottieAnimation
						animationName={ANIMATIONS.NOT_FOUND}
						style={{ height: "30%" }}
					/>
					<RestyleText variant='header' textAlign='center' color='primary'>
						Product not found
					</RestyleText>
					<RestyleBox
						flexDirection='row'
						alignItems='center'
						justifyContent='center'
						gap='m'
					>
						<AppButton
							title='Back'
							variant='outline'
							onPress={() => {
								setPhoto(null);
								setBarcode("");
								setReset((prev) => prev + 1);
							}}
						></AppButton>
						<AppButton
							title='Add'
							variant='filled'
							onPress={() => {
								setNewProduct(true);
							}}
						></AppButton>
					</RestyleBox>
					<RestyleText textAlign='center' color='text' variant='body'>
						Scanned barcode:{" "}
						<RestyleText color='primary' variant='bodyBold'>
							{barcode}
						</RestyleText>
					</RestyleText>
				</Wrapper>
			);
		}

		if (newProduct) {
			return (
				// <Text>add new product</Text>
				<ProductCardEdit
					editProduct={{
						name: "",
						image: null,
						isFood: false,
						barcode,
						store: { id: null, name: null, address: null },
					}}
					onSubmit={() => {}}
					onCancel={handleResetScan}
				/>
			);
		}

		if (foundProduct) {
			return (
				<FlipCard
					key={foundProduct?.id}
					frontComponent={<></>}
					backComponent={<></>}
					foundProduct={foundProduct}
					foundExternalItem={null}
					onCancel={handleResetScan}
				/>
			);
		} else if (previousSearchFinished) {
			return (
				<FlipCard
					frontComponent={<></>}
					backComponent={<></>}
					foundProduct={null}
					foundExternalItem={externalItem ?? null}
					onCancel={handleResetScan}
				/>
			);
		}
	}

	return (
		<>
			<RestyleBox
				height={"100%"}
				width={"100%"}
				backgroundColor='mainBackground'
				justifyContent='center'
				paddingBottom='xl'
				gap='m'
			>
				<CameraView
					style={styles.camera}
					// @ts-ignore
					ref={(ref) => setCameraRef(ref)}
					facing={facing as CameraType}
					barcodeScannerSettings={{
						barcodeTypes: ["ean13", "ean8"],
					}}
					onBarcodeScanned={async (scanningResult) => {
						if (barcode === "") {
							setBarcode(scanningResult.data);
						}
					}}
					enableTorch={enableTorch}
				>
					<RestyleBox alignSelf='center' backgroundColor='transparent'>
						<RestyleText
							variant='header'
							textAlign='center'
							style={{
								color: "white",
								zIndex: 1,

								textAlign: "center",
							}}
						>
							Scan product
						</RestyleText>
					</RestyleBox>

					<View style={styles.buttonContainer}>
						<Fab
							iconName='flash'
							onPress={() => setEnableTorch((prev) => !prev)}
						/>
						<Fab iconName={"camera-reverse"} onPress={toggleCameraFacing} />
					</View>
				</CameraView>
			</RestyleBox>
		</>
	);
}

const styles = StyleSheet.create({
	container: {},
	camera: {
		flex: 1,
		paddingTop: theme.spacing.m,
		width: "100%",
		justifyContent: "space-between",
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
