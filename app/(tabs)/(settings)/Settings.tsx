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

type SettingsType = {
	id: number;
	title: string;
	icon: string;
	url?: string;
	toggle?: boolean;
	showOption?: boolean;
	value?: boolean;
	onPress?: () => void;
};

const Settings = () => {
	const user = useAuthStore((state) => state.user);
	const { currentTheme, darkMode, setDarkMode } = useDarkLightTheme();
	const removeUser = useAuthStore((state) => state.removeUser);
	const removeHouse = useHouseStore((state) => state.removeHouse);

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
			onPress: () => setDarkMode(!darkMode),
		},
	];
	const renderItem = ({ item }: { item: SettingsType }) => (
		<RestyleBox
			backgroundColor='cardBackground'
			padding='s'
			borderRadius={5}
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
		>
			<RestyleBox flexDirection='row' alignItems='center' gap='s'>
				<RestyleBox
					width={32}
					height={32}
					justifyContent='center'
					alignItems='center'
					borderRadius={90}
					style={{
						backgroundColor: currentTheme.colors.mainBackground,
					}}
				>
					<FontAwesome6
						name={item.icon}
						size={16}
						color={currentTheme.colors.primary}
					/>
				</RestyleBox>
				<RestyleText color='primary' variant='bodyBold'>
					{item.title}
				</RestyleText>
			</RestyleBox>

			{item.toggle && Object.hasOwn(item, "value") && item.onPress && (
				<ToggleButton value={item.value ?? false} onPress={item.onPress} />
			)}

			{item.showOption ? (
				<RestyleBox flexDirection='row' alignItems='center'>
					<RestyleText variant='label'>English</RestyleText>
					<FontAwesome6
						name='chevron-right'
						size={24}
						color={currentTheme.colors.gray}
					/>
				</RestyleBox>
			) : (
				!item.toggle && (
					<FontAwesome6
						name='chevron-right'
						size={24}
						color={currentTheme.colors.gray}
					/>
				)
			)}
		</RestyleBox>
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
					<RestyleBox flexDirection='row'>
						<RestyleText color='text' variant='subheader'>
							{user?.firstName}
						</RestyleText>
						<RestyleText color='text' variant='subheader'>
							{user?.lastName}
						</RestyleText>
					</RestyleBox>
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
					removeUser();
					removeHouse();
					router.replace("/");
				}}
				variant={"filled"}
			/>
		</Wrapper>
	);
};

export default Settings;
