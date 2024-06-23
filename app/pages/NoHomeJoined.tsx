import WelcomeMessage from "@/components/Profile/WelcomeMessage";

import { useDarkLightTheme } from "@/components/ThemeContext";

import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import {
	Animated,
	Easing,
	FlatList,
	Image,
	Platform,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useAuthStore } from "../store/useUserStore";
import LottieView from "lottie-react-native";

import { router, useNavigation } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import RestyleBox from "@/components/layout/RestyleBox";
import SettingsItem, { SettingsType } from "@/components/common/SettingsItem";
import LottieAnimation from "@/components/common/LottieAnimation";
import { ANIMATIONS } from "@/constants/assets";
import { useHouseStore } from "../store/useHouseStore";

const NoHouseScreen = () => {
	const { currentTheme, darkMode, setDarkMode } = useDarkLightTheme();
	const removeUser = useAuthStore((state) => state.removeUser);
	const removeHouse = useHouseStore((state) => state.removeHouse);

	const settingsData: SettingsType[] = [
		{
			id: 1,
			title: "Language",
			icon: "globe",
			showOption: true,
			onPress: () => router.navigate("pages/LanguageSelect"),
		},
		{
			id: 2,
			title: "Edit profile",
			icon: "user-large",
			onPress: () => router.navigate("pages/ProfileEdit"),
		},

		{
			id: 5,
			title: "Dark mode",
			icon: "moon",
			toggle: true,
			value: darkMode,
			onPress: () => setDarkMode(!darkMode),
		},

		{
			id: 6,
			title: "Logout",
			icon: "arrow-right-from-bracket",
			onPress: () => {
				removeUser();
				removeHouse();
				router.replace("/");
			},
		},
	];

	const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);
	const user = useAuthStore().user;

	const animationProgress = useRef(new Animated.Value(0));

	useEffect(() => {
		Animated.timing(animationProgress.current, {
			toValue: 1,
			duration: 2000,
			easing: Easing.linear,
			useNativeDriver: false,
		}).start();
	}, []);

	const renderItem = ({ item }: { item: SettingsType }) => (
		<SettingsItem item={item} />
	);

	return (
		user && (
			<Wrapper>
				<WelcomeMessage
					firstName={user.firstName}
					lastName={user.lastName}
					profilePicture={user.profilePicture}
					username={user.username}
				/>

				<RestyleBox gap='s'>
					<RestyleText variant='label'>Quick settings</RestyleText>
					<FlatList
						data={settingsData}
						renderItem={({ item }: { item: SettingsType }) =>
							item.toggle ? (
								renderItem({ item })
							) : (
								<TouchableOpacity
									onPress={item.onPress}
									style={{ width: "100%" }}
								>
									{renderItem({ item })}
								</TouchableOpacity>
							)
						}
						keyExtractor={(item) => String(item.id)}
						style={{ flexGrow: 0 }}
					/>
				</RestyleBox>

				<RestyleBox flex={1}>
					<LottieAnimation animationName={ANIMATIONS.NO_HOUSE} />
					<RestyleText variant='subheader' color='primary' textAlign='center'>
						No house joined yet.
					</RestyleText>
					<RestyleBox flexDirection='row' gap='m' justifyContent='center'>
						<AppButton
							title={"Join"}
							onPress={() => {
								router.navigate("pages/HouseScanQR");
							}}
							variant={"outline"}
						/>
						<AppButton
							title={"Create"}
							onPress={() => {
								router.push("/pages/HouseCreate");
							}}
							variant={"filled"}
						/>
					</RestyleBox>
				</RestyleBox>
			</Wrapper>
		)
	);
};

export default NoHouseScreen;
