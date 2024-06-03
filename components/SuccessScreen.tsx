import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { ANIMATIONS } from "@/constants/assets";
import LottieAnimation from "./LottieAnimation";
import RestyleText from "./RestyleText";
import Wrapper from "./Wrapper";

const SuccessScreen = ({ text }: { text: string }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000, // 2 seconds
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return (
		<Wrapper style={{ justifyContent: "center", alignItems: "center" }}>
			<LottieAnimation animationName={ANIMATIONS.SUCCESS} loop={false} />
			<Animated.Text style={{ opacity: fadeAnim }}>
				<RestyleText variant='header' color='primary' textAlign='center'>
					{text}
				</RestyleText>
			</Animated.Text>
		</Wrapper>
	);
};

export default SuccessScreen;
