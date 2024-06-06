import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import { FoodTagKey } from "@/constants/types/ProductTypes";

import * as React from "react";
import { useEffect } from "react";
import {
	View,
	Pressable,
	StyleSheet,
	useWindowDimensions,
	Text,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, {
	Extrapolate,
	interpolate,
	interpolateColor,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import type { ICarouselInstance } from "react-native-reanimated-carousel";
import Carousel from "react-native-reanimated-carousel";
import RestyleBox from "../layout/RestyleBox";

const PAGE_HEIGHT = 100;
// const DATA = ["alexk1923", "claudiububatu", "andreidragomirAAAAAAAAAAAAA"];

function ScrollPage(props: { data: any[] }) {
	const { data } = props;
	const { width: pageWidth, height } = useWindowDimensions();

	const r = React.useRef<ICarouselInstance>(null);

	const [loop, setLoop] = React.useState(false);

	return (
		<GestureHandlerRootView style={{ height: 50 }}>
			<RestyleBox>
				<Carousel
					key={`${loop}`}
					ref={r}
					style={{
						alignItems: "center",
						justifyContent: "center",
						borderBottomWidth: 1,
						borderBottomColor: "#0071fa",
						width: 200,
						height: 50,
						// margin: 100,
						overflow: "hidden",
						// flex: 1,
					}}
					width={pageWidth / data.length + 20}
					data={data}
					renderItem={({ item, animationValue }) => {
						return (
							// <Text>{item}</Text>
							<Item
								animationValue={animationValue}
								itemData={item}
								onPress={() =>
									r.current?.scrollTo({
										count: animationValue.value,
										animated: true,
									})
								}
							/>
						);
					}}
				/>
			</RestyleBox>
		</GestureHandlerRootView>
	);
}

export default ScrollPage;

interface Props {
	animationValue: Animated.SharedValue<number>;
	itemData: FoodTagKey;
	onPress?: () => void;
}

const Item: React.FC<Props> = (props) => {
	const { animationValue, itemData, onPress } = props;

	useEffect(() => {
		console.log(FOOD_TAG_INFO[itemData]);
	}, [itemData]);

	const translateY = useSharedValue(0);

	const containerStyle = useAnimatedStyle(() => {
		const opacity = interpolate(
			animationValue.value,
			[-1, 0, 1],
			[0.5, 1, 0.5],
			Extrapolate.CLAMP
		);

		return {
			opacity,
		};
	}, [animationValue]);

	const labelStyle = useAnimatedStyle(() => {
		const scale = interpolate(
			animationValue.value,
			[-1, 0, 1],
			[1, 1.25, 1],
			Extrapolate.CLAMP
		);

		const color = interpolateColor(
			animationValue.value,
			[-1, 0, 1],
			["#b6bbc0", "#0071fa", "#b6bbc0"]
		);

		return {
			transform: [{ scale }, { translateY: translateY.value }],
			color,
		};
	}, [animationValue, translateY]);

	const onPressIn = React.useCallback(() => {
		translateY.value = withTiming(4, { duration: 250 });
	}, [translateY]);

	const onPressOut = React.useCallback(() => {
		translateY.value = withTiming(0, { duration: 250 });
	}, [translateY]);

	return (
		<Pressable onPress={onPress} onPressIn={onPressIn} onPressOut={onPressOut}>
			<Animated.View
				style={[
					{
						height: "100%",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
					},
					containerStyle,
				]}
			>
				<Animated.Image
					source={FOOD_TAG_INFO[itemData].uri}
					style={styles.profilePic}
				/>

				<Animated.Text
					style={[labelStyle]}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{FOOD_TAG_INFO[itemData].name}
				</Animated.Text>
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	profilePic: {
		width: 25,
		height: 25,
		borderRadius: 25,
		// right: 20,
		position: "relative",
		borderWidth: 2,
		borderColor: "white",
		overflow: "visible",
	},
});
