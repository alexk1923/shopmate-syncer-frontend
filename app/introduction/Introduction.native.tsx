import * as React from "react";
import { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	SafeAreaView,
	Animated,
	Dimensions,
	Platform,
	Alert,
	BackHandler,
} from "react-native";

import { SlidingDot } from "react-native-animated-pagination-dots";

import IntroOneSvg from "@/assets/images/IntroOneSvg";
import IntroSecondSvg from "@/assets/images/IntroSecondSvg";
import IntroThirdSvg from "@/assets/images/IntroThirdSvg";
import IntroFourthSvg from "@/assets/images/IntroFourthSvg";
import AppButton from "@/components/AppButton";
import RestyleText from "@/components/RestyleText";
import RestyleBox from "@/components/RestyleBox";
import { theme } from "@/theme";
import { router, useNavigation } from "expo-router";

import PagerView from "@/components/PagerView/pagerview";
import { PagerViewOnPageScrollEventData } from "react-native-pager-view";

import AppTextInput from "@/components/Form/AppTextInput";
import { useForm } from "react-hook-form";
import { AccountSetupInput } from "@/constants/types/AuthTypes";
import Wrapper from "@/components/Wrapper";
import { FontAwesome6 } from "@expo/vector-icons";
import { useAuthStore } from "../store/useUserStore";
import IntroScreen from "@/app/IntroScreen";
import ImagePicker from "@/components/Profile/ImagePicker";

export default function PaginationDotsExample() {
	const navigation = useNavigation();
	const user = useAuthStore((state) => state.user);

	// Add an effect to prevent default back navigation
	useEffect(() => {
		navigation.addListener("beforeRemove", (e) => {
			e.preventDefault();
		});
	}, [navigation]);

	const width = Dimensions.get("window").width;
	const ref = React.useRef<PagerView>(null);

	const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
	const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
	const data = [
		{
			SvgComponent: IntroOneSvg({
				width: "100%",
				height: "50%",
				viewBox: "0 0 896 748",
			}),
			title: "Shop better",
			description:
				"Improve your shopping experience using automated shopping lists",
			key: 2,
		},
		{
			SvgComponent: IntroSecondSvg({
				width: "100%",
				height: "50%",
				viewBox: "0 0 891 745",
			}),
			title: "Collaborate",
			description: "Use the chat to contact your shopmate faster",
			key: 3,
		},
		{
			SvgComponent: IntroThirdSvg({
				width: "100%",
				height: "50%",
				viewBox: "0 0 831 739",
			}),
			title: "Track of products",
			description:
				"Scan products to keep track of inventory and food expiry dates",
			key: 4,
		},

		{
			SvgComponent: IntroFourthSvg({
				width: "100%",
				height: "50%",
				viewBox: "0 0 850 719",
			}),
			title: "Start Syncing",
			description:
				"Create or join an existing house to get synced with your mate",
			ExtraComponent: () => (
				<RestyleBox
					style={{
						display: "flex",
						justifyContent: "center",
						gap: theme.spacing.m,
					}}
				>
					<AppButton title='Join house' variant='outline' onPress={() => {}} />
					<RestyleText
						variant='body'
						textAlign='center'
						color='primary'
						onPress={() => {
							router.push("(tabs)/Home");
						}}
					>
						Skip
					</RestyleText>
				</RestyleBox>
			),

			key: 5,
		},
	];
	const [accountSetup, setAccountSetup] = useState(false);

	useEffect(() => {
		console.log(positionAnimatedValue);
		console.log(scrollOffsetAnimatedValue);
	}, [positionAnimatedValue, scrollOffsetAnimatedValue]);

	function onSubmit(data: AccountSetupInput) {
		console.log(data);
		setAccountSetup(true);
		ref.current?.setPage(1);
	}
	const {
		control,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm<AccountSetupInput>();
	const handleFormSubmit = handleSubmit(onSubmit);

	const inputRange = [0, data.length + 1];
	const scrollX = Animated.add(
		scrollOffsetAnimatedValue,
		positionAnimatedValue
	).interpolate({
		inputRange,
		outputRange: [0, (data.length + 1) * width],
	});

	const onPageScroll = React.useMemo(
		() => {
			return Animated.event<PagerViewOnPageScrollEventData>(
				[
					{
						nativeEvent: {
							offset: scrollOffsetAnimatedValue,
							position: positionAnimatedValue,
						},
					},
				],
				{
					useNativeDriver: false,
				}
			);
		},

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const inputs = [
		{
			id: 1,
			placeholder: "First Name",
			inputKey: "firstName",
			rules: { required: "First Name is required" },
			iconName: "user-pen",
		},
		{
			id: 2,
			placeholder: "Last Name",
			inputKey: "lastName",
			rules: { required: "Last Name is required" },
			iconName: "user-pen",
		},
	];

	const uploadImage = () => {};

	return (
		<SafeAreaView testID='safe-area-view' style={styles.flex}>
			{user?.firstName && user?.lastName ? (
				<>
					<PagerView
						initialPage={0}
						testID='pager-view'
						ref={ref}
						style={styles.PagerView}
						onPageScroll={onPageScroll}
						onPageSelected={(e) => {
							if (e.nativeEvent.position === 0) {
								setAccountSetup(false);
							}
						}}
					>
						{data.map((d) => (
							<IntroScreen
								title={d.title}
								key={d.key}
								SvgComponent={d.SvgComponent}
								description={d.description}
								ExtraComponent={
									d.ExtraComponent === undefined ? <></> : d.ExtraComponent()
								}
							/>
						))}
					</PagerView>
					<View style={styles.dotsContainer}>
						<View style={styles.dotContainer}>
							<SlidingDot
								testID={"sliding-dot"}
								marginHorizontal={3}
								data={data}
								dotStyle={{ backgroundColor: theme.colors.secondary }}
								slidingIndicatorStyle={{
									backgroundColor: theme.colors.primary,
								}}
								//@ts-ignore
								scrollX={scrollX}
								dotSize={12}
							/>
						</View>
					</View>
				</>
			) : (
				<View key={1}>
					<Wrapper style={{ justifyContent: "flex-start" }}>
						<RestyleText variant='header' color='primary'>
							Setup your account
						</RestyleText>

						<ImagePicker onPress={() => {}} />

						<RestyleBox>
							{inputs.map((input) => {
								return (
									<AppTextInput
										// @ts-ignore
										control={control}
										errors={errors}
										placeholder={input.placeholder}
										inputKey={input.inputKey}
										rules={input.rules}
										iconName={input.iconName}
									/>
								);
							})}
						</RestyleBox>
						<AppButton
							variant='filled'
							title='Done'
							onPress={() => {
								handleFormSubmit();
							}}
						/>
					</Wrapper>
				</View>
			)}
		</SafeAreaView>
	);
}
const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	child: { width, justifyContent: "center" },
	flex: {
		width: "100%",
		height: "100%",
	},
	PagerView: {
		flex: 1,
	},
	container: {
		flexDirection: "row",
		backgroundColor: "#63a4ff",
	},
	progressContainer: { flex: 0.1, backgroundColor: "#63a4ff" },
	center: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		padding: 20,
	},
	text: {
		fontSize: 30,
	},
	separator: {
		paddingVertical: 16,
		paddingHorizontal: 10,
	},
	touchableTitle: {
		textAlign: "center",
		color: "#000",
	},
	touchableTitleActive: {
		color: "#fff",
	},
	dotsContainer: {
		justifyContent: "space-evenly",
	},
	dotContainer: {
		justifyContent: "center",
		alignSelf: "center",
	},
	contentSlider: {
		flex: 1,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	dots: {
		flex: 1,
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 310,
		flexDirection: "row",
		justifyContent: "center",
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		margin: 5,
	},
});
