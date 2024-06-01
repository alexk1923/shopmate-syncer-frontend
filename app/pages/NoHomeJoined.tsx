import WelcomeMessage from "@/components/Profile/WelcomeMessage";
import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import { useDarkLightTheme } from "@/components/ThemeContext";
import Wrapper from "@/components/Wrapper";
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
import AppButton from "@/components/AppButton";

const NoHomeScreen = () => {
	const { currentTheme } = useDarkLightTheme();
	const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
	const user = useAuthStore().user;

	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animationProgress.current, {
			toValue: 1,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	return (
		user && (
			<Wrapper style={{ justifyContent: "flex-start" }}>
				<WelcomeMessage
					firstName={user.firstName}
					lastName={user.lastName}
					profilePicture={user.profilePicture}
					username={user.username}
				/>

				{Platform.OS === "web" ? (
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
				<AppButton title={"Join"} onPress={() => {}} variant={"filled"} />
			</Wrapper>
		)
	);
};

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "flex-start",
	},

	c1: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	userContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},

	profilePicture: {
		width: 40,
		height: 40,
		borderRadius: 45,
	},

	userName: {
		fontWeight: "bold",
	},
});

export default NoHomeScreen;