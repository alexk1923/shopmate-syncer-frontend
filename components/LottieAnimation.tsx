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

import LottieView from "lottie-react-native";

type LottieAnimationProps = {
	animationName: string;
};

const LottieAnimation = ({ animationName }: LottieAnimationProps) => {
	const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animationProgress.current, {
			toValue: 1,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	return Platform.OS === "web" ? (
		<></>
	) : (
		<AnimatedLottieView
			source={animationName}
			progress={animationProgress.current}
			style={{ width: "100%", height: "50%" }}
			autoPlay
		/>
	);
};

export default LottieAnimation;
