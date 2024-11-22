import RestyleBox from "@/components/layout/RestyleBox";
import AppButton from "@/components/misc/AppButton";
import { router, useNavigation } from "expo-router";
import React from "react";
import { FlatList, TouchableOpacity } from "react-native";

import Wrapper from "@/components/layout/Wrapper";

import Avatar from "@/components/misc/Avatar";
import { useAuthStore } from "@/app/store/useUserStore";

import RestyleText from "@/components/layout/RestyleText";

import { FontAwesome6 } from "@expo/vector-icons";

import { useDarkLightTheme } from "@/components/ThemeContext";
import ToggleButton from "@/components/misc/ToggleButton";
import { useHouseStore } from "@/app/store/useHouseStore";
import SettingsItem, { SettingsType } from "@/components/common/SettingsItem";
import { removeNotificationSubscription } from "expo-notifications";
import { NotificationService } from "@/app/services/notificationService";
// import switchTheme from "react-native-theme-switch-animation";
const Settings = () => {
	const user = useAuthStore((state) => state.user);
	const { currentTheme, darkMode, setDarkMode } = useDarkLightTheme();
	const removeUser = useAuthStore((state) => state.removeUser);
	const removeHouse = useHouseStore((state) => state.removeHouse);
	const setPreferredThemeDark = useAuthStore(
		(state) => state.setPreferredThemeDark
	);
	const subscription = useAuthStore((state) => state.notificationSubscription);
	const setNotificationToken = useAuthStore(
		(state) => state.setNotificationToken
	);

	const settingsData: SettingsType[] = [
		{
			id: 1,
			title: "Language",
			icon: "globe",
			showOption: true,
			url: "pages/LanguageSelect",
		},
		{
			id: 2,
			title: "Edit profile",
			icon: "user-large",
			url: "pages/ProfileEdit",
		},
		{
			id: 3,
			title: "Edit house",
			icon: "house",
			url: "pages/HouseEdit",
		},
		{ id: 4, title: "House Invite", icon: "qrcode", url: "pages/HouseInvite" },

		{
			id: 5,
			title: "Dark mode",
			icon: "moon",
			toggle: true,
			value: darkMode,
			onPress: () => {
				setDarkMode(!darkMode); // your switch theme function
				setPreferredThemeDark(!darkMode);
			},
		},
	];

	const renderItem = ({ item }: { item: SettingsType }) => (
		<SettingsItem item={item} />
	);
	return (
		<Wrapper>
			<RestyleBox flexDirection='row' alignItems='center' gap='s'>
				<Avatar
					uri={user?.profilePicture ?? null}
					firstName={user?.firstName}
					lastName={user?.lastName}
				/>

				<RestyleBox justifyContent='flex-start'>
					<RestyleText color='text' variant='subheader'>
						{user?.firstName} {user?.lastName}
					</RestyleText>

					<RestyleText variant='label'>@{user?.username}</RestyleText>
				</RestyleBox>
			</RestyleBox>
			<RestyleText variant='label'>Settings</RestyleText>

			<FlatList
				data={settingsData}
				renderItem={({ item }: { item: SettingsType }) =>
					item.toggle ? (
						renderItem({ item })
					) : (
						<TouchableOpacity
							onPress={() => item.url && router.navigate(item.url)}
							style={{ width: "100%" }}
						>
							{renderItem({ item })}
						</TouchableOpacity>
					)
				}
				contentContainerStyle={{ gap: 8 }}
				keyExtractor={(item) => String(item.id)}
				style={{ flexGrow: 0 }}
			/>

			<AppButton
				title={"Logout"}
				onPress={() => {
					if (user?.id) {
						NotificationService.removeNotificationToken(user?.id);
					}
					removeUser();
					removeHouse();
					setNotificationToken(null);

					if (subscription) {
						removeNotificationSubscription(subscription);
					}
					router.replace("/");
				}}
				variant={"filled"}
			/>
		</Wrapper>
	);
};

export default Settings;
