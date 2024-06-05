import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions,
	Image,
	ImageURISource,
} from "react-native";
import React from "react";
import { theme } from "@/theme";
import RestyleText from "./RestyleText";
import RestyleBox from "./RestyleBox";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { useDarkLightTheme } from "./ThemeContext";
import { IMAGES } from "@/constants/assets";

type HorizontalCardProps = {
	title: string;
	// children: React.ReactNode;

	animationName: string;
	redirect: string;
	icon: React.ReactNode;
	image: ImageURISource;
};

const HorizontalCard = (props: HorizontalCardProps) => {
	const { title, animationName, redirect, icon, image } = props;
	const { currentTheme } = useDarkLightTheme();

	return (
		<TouchableOpacity
			style={[
				styles.box,
				{ backgroundColor: currentTheme.colors.cardBackground },
			]}
			onPress={() => router.navigate(redirect)}
		>
			{/* {icon} */}
			{/* <LottieView source={animationName} autoPlay style={styles.animation} /> */}
			<Image
				source={image}
				style={{
					width: "50%",
					height: "50%",
				}}
			/>
			<RestyleText color='primary' variant='bodyBold' marginTop='m'>
				{title}
			</RestyleText>
		</TouchableOpacity>
	);
};

const { width } = Dimensions.get("window");
const boxSize = width / 2 - 50;

const styles = StyleSheet.create({
	// container: {
	// 	flex: 1,
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// 	flexDirection: "row",
	// 	flexWrap: "wrap",
	// 	margin: 20,
	// },
	box: {
		width: boxSize,
		height: boxSize,
		borderRadius: 20,

		justifyContent: "center",
		alignItems: "center",
		margin: theme.spacing.m,
		shadowColor: "#1d0b0b",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.8,
		shadowRadius: 2,
		elevation: 5,
	},
	animation: {
		width: 100,
		height: 100,
	},
});
export default HorizontalCard;
