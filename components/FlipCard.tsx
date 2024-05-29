import ProductCard from "@/components/ProductCard";
import { Product } from "@/constants/types";
import React, { FC, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	runOnUI,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import ProductCardEdit from "./ProductCardEdit";
import { useDarkLightTheme } from "./ThemeContext";
import AppBottomSheetModal from "./AppBottomSheetModal";

const FlipCard = (props: {
	foundProduct: Product;
	frontComponent: React.ReactNode;
	backComponent: React.ReactNode;
}) => {
	const { frontComponent, backComponent, foundProduct } = props;
	const [isFlipped, setIsFlipped] = useState(false);
	const { currentTheme } = useDarkLightTheme();

	const rotationF = useSharedValue(0);
	const rotationB = useSharedValue(180);
	const frontStyle = useAnimatedStyle(() => {
		return {
			transform: [{ perspective: 1000 }, { rotateY: `${rotationF.value}deg` }],
		};
	});
	const backStyle = useAnimatedStyle(() => {
		return {
			transform: [{ perspective: 1000 }, { rotateY: `${rotationB.value}deg` }],
		};
	});
	const onAnimate = () => {
		if (rotationF.value === 180) {
			rotationF.value = withTiming(0, { duration: 1000 });
			rotationB.value = withTiming(180, { duration: 1000 });
			setIsFlipped(false);
			return;
		}
		rotationF.value = withTiming(180, { duration: 1000 });
		rotationB.value = withTiming(360, { duration: 1000 });
		setIsFlipped(true);
	};

	const onSubmit = () => {
		console.log("clicked");
	};

	return (
		<>
			<Animated.View
				style={[
					frontStyle,
					styles.card,
					{ padding: currentTheme.spacing.m },
					!isFlipped && { zIndex: 1 },
				]}
			>
				<ProductCard foundProduct={foundProduct} onConfirm={onAnimate} />
			</Animated.View>

			<Animated.View
				style={[
					backStyle,
					styles.card,
					{ padding: currentTheme.spacing.m },
					isFlipped && { zIndex: 1 },
				]}
			>
				<ProductCardEdit foundProduct={foundProduct} onSubmit={onAnimate} />
			</Animated.View>
		</>
	);
};

const styles = StyleSheet.create({
	card: {
		position: "absolute",
		width: "100%",
		height: "100%",

		backfaceVisibility: "hidden",
	},
	pressBtn: {
		width: 100,
		height: 50,
		backgroundColor: "#f1f1f1",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#ccc",
	},
});

export default FlipCard;
