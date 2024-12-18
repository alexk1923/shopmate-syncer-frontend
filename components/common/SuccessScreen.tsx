import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { ANIMATIONS } from "@/constants/assets";
import RestyleText from "../layout/RestyleText";
import Wrapper from "../layout/Wrapper";
import LottieAnimation from "./LottieAnimation";

const SuccessScreen = ({ text }: { text: string }) => {
	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 1000,
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
