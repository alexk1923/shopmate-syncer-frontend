import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { ThemeProvider } from "@shopify/restyle";
import { darkTheme, theme } from "@/theme";
import {
	DarkLightThemeProvider,
	useDarkLightTheme,
} from "@/components/ThemeContext";
import { Image, Platform, StyleSheet, Text } from "react-native";

import { AppUser } from "@/constants/types";

import { RouteProp } from "@react-navigation/native";
import { useAuthStore } from "@/app/store/useUserStore";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(settings)/Settings",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

type ChatRouteType = {
	route: { params: Omit<AppUser, "messages"> };
};

// const optionsFunction = (route) => {
// 	console.log(route);

// 	return {
// 		headerShown: true,
// 		header: () => {
// 			return (
// 				<RestyleBox
// 					flexDirection='row'
// 					alignItems='center'
// 					backgroundColor='cardBackground'
// 					paddingVertical='s'
// 				>
// 					<Image
// 						source={{ uri: route.params.profileImage }}
// 						style={styles.profilePic}
// 					/>
// 					<RestyleText color='oppositeText' fontWeight='bold'>
// 						{route.params.firstName + " " + route.params.lastName}
// 					</RestyleText>
// 				</RestyleBox>
// 			);
// 		},
// 	};
// };

export default function SettingsLayoutNav() {
	const { currentTheme } = useDarkLightTheme();

	return (
		<ThemeProvider theme={currentTheme}>
			<Stack
				screenOptions={{
					contentStyle: {
						backgroundColor: currentTheme.colors.mainBackground,
					},
					statusBarColor: currentTheme.colors.mainBackground,
					headerTintColor: currentTheme.colors.primary,
					navigationBarColor: currentTheme.colors.mainBackground,
					headerStyle: {
						backgroundColor: currentTheme.colors.cardBackground,
					},
					headerShown: false,
				}}
			>
				<Stack.Screen
					name='Settings'
					options={{
						title: "Settings",

						animation: "fade",
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
