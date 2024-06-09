import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
	runOnUI,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

import { useDarkLightTheme } from "../ThemeContext";
import AppBottomSheetModal from "../modals/AppBottomSheetModal";
import { Product } from "@/constants/types/ProductTypes";
import ProductCardEdit from "../Products/ProductCardEdit";
import ProductCard from "../Products/ProductCard";
import { ExternalItem, Item } from "@/constants/types/ItemTypes";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";

const FlipCard = (props: {
	foundExternalItem: ExternalItem | null;
	foundProduct: Item | null;
	frontComponent: React.ReactNode;
	backComponent: React.ReactNode;
	onCancel: () => void;
}) => {
	const {
		frontComponent,
		backComponent,
		foundProduct,
		foundExternalItem,
		onCancel,
	} = props;
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

	useEffect(() => {
		console.log("my external item is:");
		console.log(foundExternalItem?.product.stores);

		console.log(foundExternalItem?.product.store_tags);
	}, [foundExternalItem]);

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
				{!foundProduct && !foundExternalItem && (
					<Text>nu am gasit nici nicni</Text>
				)}

				{foundProduct && (
					<ProductCard
						foundProduct={{
							name: foundProduct.name,
							image: foundProduct.image,
							barcode: foundProduct.barcode,
						}}
						onConfirm={onAnimate}
					/>
				)}
				{foundExternalItem && (
					<ProductCard
						foundProduct={{
							name:
								foundExternalItem.product.generic_name ||
								foundExternalItem.product.product_name,
							image: foundExternalItem.product.image_url,
							barcode: foundExternalItem.code,
						}}
						onConfirm={onAnimate}
					/>
				)}
			</Animated.View>

			<Animated.View
				style={[
					backStyle,
					styles.card,
					{ padding: currentTheme.spacing.m },
					isFlipped && { zIndex: 1 },
				]}
			>
				{foundProduct && (
					<ProductCardEdit
						editProduct={foundProduct}
						onSubmit={onAnimate}
						onCancel={onCancel}
					/>
				)}
				{foundExternalItem && (
					<ProductCardEdit
						editProduct={{
							name: foundExternalItem.product.generic_name,
							image: foundExternalItem.product.image_url,
							barcode: foundExternalItem.code,
							storeName: foundExternalItem.product.stores,
						}}
						onSubmit={onAnimate}
						onCancel={onCancel}
					/>
				)}
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
