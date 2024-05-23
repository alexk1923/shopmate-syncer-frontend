import AppButton from "@/components/AppButton";
import RestyleBox from "@/components/RestyleBox";
import * as React from "react";
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

const PAGE_HEIGHT = 100;
const DATA = ["alexk1923", "claudiububatu", "andreidragomirAAAAAAAAAAAAA"];

function Scan() {
	const { width: pageWidth, height } = useWindowDimensions();

	const r = React.useRef<ICarouselInstance>(null);

	const [loop, setLoop] = React.useState(false);

	return (
		<GestureHandlerRootView>
			<RestyleBox flex={1}>
				<RestyleBox backgroundColor='cardBackground'>
					<Carousel
						key={`${loop}`}
						ref={r}
						style={{
							height: PAGE_HEIGHT,
							alignItems: "center",
							justifyContent: "center",
							borderBottomWidth: 1,
							borderBottomColor: "#0071fa",
							width: pageWidth,
							overflow: "hidden",
						}}
						width={pageWidth / DATA.length + 20}
						modeConfig={{ stackInterval: 2 }}
						height={PAGE_HEIGHT}
						data={DATA}
						renderItem={({ item, animationValue }) => {
							return (
								// <Text>{item}</Text>
								<Item
									animationValue={animationValue}
									label={item}
									onPress={() =>
										r.current?.scrollTo({
											count: animationValue.value,
											animated: true,
										})
									}
									photoNumber={Math.floor(Math.random() * 100)}
								/>
							);
						}}
					/>
				</RestyleBox>
			</RestyleBox>
		</GestureHandlerRootView>
	);
}

export default Scan;

interface Props {
	animationValue: Animated.SharedValue<number>;
	label: string;
	photoNumber: number;
	onPress?: () => void;
}

const Item: React.FC<Props> = (props) => {
	const { animationValue, label, photoNumber, onPress } = props;

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
					source={{
						uri: `https://randomuser.me/api/portraits/men/${photoNumber}.jpg`,
					}}
					style={styles.profilePic}
				/>

				<Animated.Text
					style={[
						{
							fontSize: 18,
							color: "#26292E",
							textAlign: "left",
						},
						labelStyle,
					]}
					numberOfLines={1}
					ellipsizeMode='tail'
				>
					{label}
				</Animated.Text>
			</Animated.View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 25,
		// right: 20,
		position: "relative",
		borderWidth: 2,
		borderColor: "white",
		overflow: "visible",
	},
});
