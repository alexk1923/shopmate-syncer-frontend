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

import { theme } from "@/theme";
import { router, useNavigation } from "expo-router";

import PagerView from "@/components/PagerView/pagerview";
import { PagerViewOnPageScrollEventData } from "react-native-pager-view";

import AppTextInput from "@/components/Form/AppTextInput";
import { useForm } from "react-hook-form";
import { AccountSetupInput } from "@/constants/types/AuthTypes";

import { FontAwesome6 } from "@expo/vector-icons";
import { useAuthStore } from "../store/useUserStore";
import IntroScreen from "@/app/IntroScreen";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UserService } from "../services/userService";
import { string } from "prop-types";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import LoadingOverlay from "@/components/modals/LoadingOverlay";
import AccountSetup from "./AccountSetup";
import { useUser } from "../hooks/useUser";

export default function PaginationDotsExample() {
	const navigation = useNavigation();
	const user = useAuthStore((state) => state.user);

	const width = Dimensions.get("window").width;
	const ref = React.useRef<PagerView>(null);

	const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
	const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;

	const userId = useAuthStore((state) => state.userId);
	const setUser = useAuthStore((state) => state.setUser);
	const setFirstLaunch = useAuthStore((state) => state.setFirstLaunch);

	const { userQuery } = useUser(user?.id || null);

	useEffect(() => {
		if (userQuery.data) {
			setUser(userQuery.data);
		}
	}, [userQuery.data]);

	const screens = [
		{
			SvgComponent: IntroOneSvg({
				width: "100%",
				height: "50%",
				viewBox: "0 0 896 748",
			}),
			title: "Shop better",
			description:
				"Improve your shopping experience using automated shopping lists",
			key: 1,
		},
		{
			SvgComponent: IntroSecondSvg({
				width: "100%",
				height: "50%",
				viewBox: "0 0 891 745",
			}),
			title: "Collaborate",
			description: "Use the chat to contact your shopmate faster",
			key: 2,
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
			key: 3,
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
					<AppButton
						title='Join house'
						variant='outline'
						onPress={() => {
							setFirstLaunch();
							router.push("pages/HouseScanQR");
						}}
					/>
					<RestyleText
						variant='body'
						textAlign='center'
						color='primary'
						onPress={() => {
							setFirstLaunch();
							if (!user?.houseId) {
								console.log("nu am casa, nu am casa");
								router.push("pages/NoHomeJoined");
							} else {
								router.push("/(tabs)/Home");
							}
						}}
					>
						Skip
					</RestyleText>
				</RestyleBox>
			),

			key: 4,
		},
	];
	const [accountSetup, setAccountSetup] = useState(false);

	// Add an effect to prevent default back navigation
	useEffect(() => {
		navigation.addListener("beforeRemove", (e) => {
			e.preventDefault();
		});
	}, [navigation]);

	const queryClient = useQueryClient();
	const accountSetupMutation = useMutation({
		mutationFn: async ({ firstName, lastName }: UpdateUserType) => {
			if (userQuery.data) {
				const user = await UserService.updateUser({
					userId: userQuery.data.id,
					firstName,
					lastName,
				});
				return user;
			}
			return null;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
			setAccountSetup(false);
			ref.current?.setPage(1);
		},
		onError: (error) => {},
	});

	const inputRange = [0, screens.length + 1];
	const scrollX = Animated.add(
		scrollOffsetAnimatedValue,
		positionAnimatedValue
	).interpolate({
		inputRange,
		outputRange: [0, (screens.length + 1) * width],
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

	return (
		<SafeAreaView testID='safe-area-view' style={styles.flex}>
			<LoadingOverlay
				isVisible={userQuery.isLoading || accountSetupMutation.isPending}
			/>

			<>
				<PagerView
					initialPage={0}
					testID='pager-view'
					ref={ref}
					style={styles.PagerView}
					onPageScroll={onPageScroll}
					onPageSelected={(e) => {
						if (e.nativeEvent.position === 0) {
							// setAccountSetup(false);
						}
					}}
				>
					{screens.map((d) => (
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
							data={screens}
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
