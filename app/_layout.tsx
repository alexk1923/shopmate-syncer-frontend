import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack, router, useNavigation } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { ThemeProvider } from "@shopify/restyle";
import {
	DarkLightThemeProvider,
	useDarkLightTheme,
} from "@/components/ThemeContext";
import { Platform } from "react-native";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import { SafeAreaView } from "react-native-safe-area-context";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "/",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [loaded, error] = useFonts({
		SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
		...FontAwesome.font,
	});

	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<DarkLightThemeProvider>
			<RootLayoutNav />
		</DarkLightThemeProvider>
	);
}

function RootLayoutNav() {
	const { currentTheme } = useDarkLightTheme();

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider theme={currentTheme}>
				<Stack
					screenOptions={{
						contentStyle: {
							backgroundColor: currentTheme.colors.mainBackground,
						},
						statusBarColor: currentTheme.colors.mainBackground,
						headerTintColor: currentTheme.colors.primary,
						headerStyle: {
							backgroundColor: currentTheme.colors.mainBackground,
						},
						navigationBarColor: currentTheme.colors.mainBackground,
					}}
				>
					<Stack.Screen
						name='index'
						options={{
							headerShown: false,
							animation: "ios",
						}}
					/>
					<Stack.Screen
						name='introduction'
						options={{
							headerShown: false,
							animation: "ios",
							headerBackButtonMenuEnabled: false,
						}}
					/>
					<Stack.Screen
						name='(tabs)'
						options={{
							headerShown: false,
							animation: Platform.OS === "ios" ? "ios" : "ios",
							headerBackButtonMenuEnabled: false,
						}}
					/>

					<Stack.Screen
						name='Login'
						options={{
							headerShown: false,
							animation: Platform.OS === "ios" ? "ios" : "slide_from_right",
						}}
					/>
					<Stack.Screen
						name='Register'
						options={{
							headerShown: false,
							animation: Platform.OS === "ios" ? "ios" : "slide_from_right",
						}}
					/>

					<Stack.Screen
						name='pages/NoHomeJoined'
						options={{
							title: "Profile",
							headerShown: false,
							animation: Platform.OS === "ios" ? "ios" : "slide_from_right",
						}}
					/>

					<Stack.Screen
						name='pages/HouseScanQR'
						options={{
							title: "Join House",
							animation: Platform.OS === "ios" ? "ios" : "slide_from_right",
						}}
					/>

					<Stack.Screen
						name='pages/HouseCreate'
						options={{
							title: "Create House",
							animation: Platform.OS === "ios" ? "ios" : "slide_from_right",
						}}
					/>

					<Stack.Screen
						name='pages/LanguageSelect'
						options={{
							title: "Language",
							animation: Platform.OS === "ios" ? "ios" : "ios",
						}}
					/>

					<Stack.Screen
						name='pages/HouseInvite'
						options={{
							title: "House Invitation",
							animation: Platform.OS === "ios" ? "ios" : "ios",
						}}
					/>

					<Stack.Screen
						name='pages/HouseEdit'
						options={{
							title: "Edit house",
							animation: Platform.OS === "ios" ? "ios" : "ios",
						}}
					/>

					<Stack.Screen
						name='pages/ProfileEdit'
						options={{
							title: "Edit profile",
							animation: Platform.OS === "ios" ? "ios" : "ios",
						}}
					/>

					<Stack.Screen name='modal' options={{ presentation: "modal" }} />
				</Stack>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
