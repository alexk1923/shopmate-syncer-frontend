import { Image, StyleSheet } from "react-native";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/theme";
import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import RestyleBox from "./RestyleBox";
import { FoodTagKey } from "@/constants/types";

const FoodTag = (props: { name: FoodTagKey; size?: number }) => {
	const [imagePath, setImagePath] = useState<string>("");
	const size = props.size ?? 24;

	useEffect(() => {
		// Dynamically import the image based on the name
		const importImage = async () => {
			try {
				const image = `@/assets/images/foodIcons/${props.name}.png`;
				setImagePath(image);
			} catch (error) {
				console.error("Failed to load image:", error);
				setImagePath("");
			}
		};

		importImage();
	}, []);
	return (
		FOOD_TAG_INFO[props.name] && (
			<RestyleBox style={[styles.foodImage, { width: size, height: size }]}>
				<Image
					source={FOOD_TAG_INFO[props.name].uri}
					style={{
						width: Math.floor(size * 0.75),
						height: Math.floor(size * 0.75),
					}}
				/>
			</RestyleBox>
		)
	);
};

export default FoodTag;

const styles = StyleSheet.create({
	foodImage: {
		borderRadius: 90,
		borderColor: theme.colors.primary,
		borderWidth: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});
