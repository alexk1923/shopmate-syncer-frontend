import { Image, StyleSheet } from "react-native";

import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/theme";
import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import Popover, {
	PopoverMode,
	PopoverPlacement,
} from "react-native-popover-view";
import { FoodTagKey } from "@/constants/types/ProductTypes";
import RestyleBox from "../layout/RestyleBox";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Easing } from "react-native-reanimated";
import RestyleText from "../layout/RestyleText";

const FoodTag = (props: { name: FoodTagKey; size?: number }) => {
	const size = props.size ?? 24;

	return (
		FOOD_TAG_INFO[props.name] && (
			<Popover
				from={
					<TouchableOpacity>
						<RestyleBox
							style={[styles.foodImage, { width: size, height: size }]}
						>
							<Image
								source={FOOD_TAG_INFO[props.name].uri}
								style={{
									width: Math.floor(size * 0.75),
									height: Math.floor(size * 0.75),
								}}
							/>
						</RestyleBox>
					</TouchableOpacity>
				}
				backgroundStyle={{ backgroundColor: "transparent" }}
			>
				<RestyleBox backgroundColor='cardBackground' padding='s'>
					<RestyleText color='primary'>
						{FOOD_TAG_INFO[props.name].name}
					</RestyleText>
				</RestyleBox>
			</Popover>
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
