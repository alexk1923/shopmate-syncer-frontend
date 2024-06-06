import WelcomeMessage from "@/components/Profile/WelcomeMessage";

import { useDarkLightTheme } from "@/components/ThemeContext";

import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	Image,
	Platform,
	StyleSheet,
	View,
} from "react-native";
import { useAuthStore } from "../store/useUserStore";
import LottieView from "lottie-react-native";

import { router, useNavigation } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";

const NoHomeScreen = () => {
	const { currentTheme } = useDarkLightTheme();
	const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
	const user = useAuthStore().user;

	const navigation = useNavigation();

	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animationProgress.current, {
			toValue: 1,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	useEffect(() => {
		console.log("Current routes:", navigation.getState().routes);
	}, []);

	return (
		user && (
			<Wrapper>
				<WelcomeMessage
					firstName={user.firstName}
					lastName={user.lastName}
					profilePicture={user.profilePicture}
					username={user.username}
				/>

				{Platform.OS === "ios" ? (
					<></>
				) : (
					<AnimatedLottieView
						source={require("@/assets/animations/no_house.json")}
						progress={animationProgress.current}
						style={{ width: "100%", height: "50%" }}
						// autoPlay
					/>
				)}

				<RestyleText variant='subheader' color='primary' textAlign='center'>
					No house joined yet.
				</RestyleText>

				<AppButton
					title={"Join"}
					onPress={() => {
						router.navigate("pages/HouseScanQR");
					}}
					variant={"outline"}
				/>
				<AppButton
					title={"Create"}
					onPress={() => {
						router.push("/pages/HouseCreate");
					}}
					variant={"filled"}
				/>
			</Wrapper>
		)
	);
};

export default NoHomeScreen;
