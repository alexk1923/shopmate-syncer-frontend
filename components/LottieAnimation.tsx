import React, { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	Platform,
	StyleProp,
	StyleSheet,
	ViewStyle,
} from "react-native";

import LottieView from "lottie-react-native";

type LottieAnimationProps = {
	animationName: string;
	loop?: boolean;
	style?: StyleProp<ViewStyle>;
};

const LottieAnimation = ({
	animationName,
	style,
	loop = true,
}: LottieAnimationProps) => {
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
			style={[{ width: "100%", height: "70%" }, style]}
			autoPlay
			loop={loop}
		/>
	);
};

export default LottieAnimation;
