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
import { Platform, Text } from "react-native";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "index",
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
		<ThemeProvider theme={currentTheme}>
			<Stack
				screenOptions={{
					contentStyle: { backgroundColor: currentTheme.colors.mainBackground },
					statusBarColor: currentTheme.colors.mainBackground,
					headerTintColor: currentTheme.colors.mainBackground,
					navigationBarColor: currentTheme.colors.mainBackground,
				}}
			>
				<Stack.Screen
					name='index'
					options={{
						headerShown: false,
						animation: "fade",
					}}
				/>
				<Stack.Screen
					name='(tabs)'
					options={{
						headerShown: false,
						animation: Platform.OS === "ios" ? "ios" : "fade_from_bottom",
					}}
				/>

				<Stack.Screen name='modal' options={{ presentation: "modal" }} />
			</Stack>
		</ThemeProvider>
	);
}
