import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { ThemeProvider } from "@shopify/restyle";
import { useDarkLightTheme } from "@/components/ThemeContext";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "introduction",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function IntroductionLayoutNav() {
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
				}}
			>
				<Stack.Screen
					name='AccountSetup'
					options={{
						title: "Account Setup",
						headerShown: true,
						animation: "fade",
					}}
				/>
				<Stack.Screen
					name='Introduction'
					options={{
						title: "Introduction",
						headerShown: true,
						animation: "fade",
					}}
				/>
			</Stack>
		</ThemeProvider>
	);
}
