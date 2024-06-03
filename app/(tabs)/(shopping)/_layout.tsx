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
import { User } from "react-native-gifted-chat";
import { AppUser } from "@/constants/types";
import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import { RouteProp } from "@react-navigation/native";
import { useAuthStore } from "@/app/store/useUserStore";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "(shopping)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function ChatLayoutNav() {
	const { currentTheme } = useDarkLightTheme();

	return (
		<ThemeProvider theme={currentTheme}>
			<Stack
				screenOptions={{
					contentStyle: { backgroundColor: currentTheme.colors.mainBackground },
					statusBarColor: currentTheme.colors.mainBackground,
					headerTintColor: currentTheme.colors.primary,
					navigationBarColor: currentTheme.colors.mainBackground,
					// headerShown: true,
				}}
			>
				<Stack.Screen
					name='ShoppingPage'
					options={{
						title: "Shopping Page",
						headerShown: true,
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
					name='Wishlist'
					options={{
						title: "Wishlist",
						headerShown: true,
						animation: Platform.OS === "ios" ? "ios" : "fade_from_bottom",
						headerBackTitleVisible: true,
					}}
				/>

				<Stack.Screen
					name='History'
					options={{
						title: "History",
						headerShown: true,
						animation: Platform.OS === "ios" ? "ios" : "fade_from_bottom",
						headerBackTitleVisible: true,
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}

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
