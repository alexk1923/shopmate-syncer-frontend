import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

import { ThemeProvider, backgroundColor } from "@shopify/restyle";

import {
	DarkLightThemeProvider,
	useDarkLightTheme,
} from "@/components/ThemeContext";
import { Platform, StyleSheet } from "react-native";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "ShoppingPage",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function ShoppingLayoutNav() {
	const { currentTheme } = useDarkLightTheme();

	return (
		<ThemeProvider theme={currentTheme}>
			<Stack
				screenOptions={{
					contentStyle: { backgroundColor: currentTheme.colors.mainBackground },
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
					name='ShoppingPage'
					options={{
						title: "Shopping Page",
						animation: "fade",
					}}
				/>
				<Stack.Screen
					name='Inventory'
					options={{
						title: "Inventory",
						headerShown: true,
						animation: "fade",
					}}
				/>
				<Stack.Screen
					name='ShoppingMode'
					options={{
						title: "ShoppingMode",
						headerShown: true,
						animation: Platform.OS === "ios" ? "ios" : "fade_from_bottom",
						headerBackTitleVisible: true,
					}}
				/>
				<Stack.Screen
					name='WishlistPage'
					options={{
						title: "Wishlist",
						headerShown: true,
						animation: Platform.OS === "ios" ? "ios" : "fade_from_bottom",
						headerBackTitleVisible: true,
					}}
				/>

				<Stack.Screen
					name='ScheduleHistory'
					options={{
						title: "ScheduleHistory",
						headerShown: true,
						animation: Platform.OS === "ios" ? "ios" : "fade_from_bottom",
						headerBackTitleVisible: true,
						headerBackButtonMenuEnabled: true,
					}}
				/>

				<Stack.Screen
					name='Filter'
					options={{
						title: "Filter",
						headerShown: true,
						animation: Platform.OS === "ios" ? "ios" : "fade_from_bottom",
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
