import React, { useEffect } from "react";

import { Link, Tabs, router } from "expo-router";

import {
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { darkTheme, theme } from "@/theme";
import { ThemeProvider, backgroundColor } from "@shopify/restyle";
import { useDarkLightTheme } from "@/components/ThemeContext";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

import * as Font from "expo-font";

import RestyleBox from "@/components/layout/RestyleBox";

// Initialise fonts
Font.loadAsync(MaterialIcons.font);
Font.loadAsync(FontAwesome6.font);
Font.loadAsync(MaterialCommunityIcons.font);

// export const unstable_settings = {
// 	// Ensure any route can link back to `/`
// 	initialRouteName: "Home",
// };
export default function TabLayout() {
	const { currentTheme } = useDarkLightTheme();

	return (
		<ThemeProvider theme={currentTheme}>
			<GestureHandlerRootView>
				<BottomSheetModalProvider>
					<Tabs
						screenOptions={{
							tabBarActiveTintColor: currentTheme.colors.primary,
							headerStyle: {
								backgroundColor: currentTheme.colors.cardBackground,
							},
							headerTintColor: currentTheme.colors.primary,
							tabBarShowLabel: false,
							headerShown: false,
							// Disable the static render of the header on web
							// to prevent a hydration error in React Navigation v6.
							// headerShown: useClientOnlyValue(false, true),
							tabBarStyle: {
								backgroundColor: currentTheme.colors.cardBackground,
								borderRadius: 30,
								marginHorizontal: theme.spacing.l,
								marginVertical: theme.spacing.s,
								borderTopWidth: 0,
							},
						}}
					>
						<Tabs.Screen
							name='Home'
							options={{
								title: "Home",
								tabBarIcon: ({ color }) => (
									<FontAwesome6 name='house' size={24} color={color} />
								),
							}}
						/>
						<Tabs.Screen
							name='(shopping)'
							options={{
								title: "Shopping",
								tabBarIcon: ({ color }) => (
									<FontAwesome6 name='cart-shopping' size={24} color={color} />
								),
							}}
							// listeners={() => ({
							// 	tabPress: (e) => {
							// 		e.preventDefault();
							// 		router.navigate("/(shopping)/ShoppingPage"); /// your screen without Tab bar
							// 	},
							// })}
						/>
						<Tabs.Screen
							name='Scan'
							options={{
								title: "Scan",
								tabBarIcon: ({ color }) => (
									<RestyleBox
										style={{
											top: -20,
											backgroundColor: currentTheme.colors.primary,
											width: 80,
											height: 80,
											justifyContent: "center",
											alignItems: "center",
											borderRadius: 90,
										}}
									>
										<MaterialCommunityIcons
											name='barcode-scan'
											size={35}
											color='white'
										/>
									</RestyleBox>
								),
							}}
						/>

						<Tabs.Screen
							name='DashboardPage'
							options={{
								title: "Dashboard",
								tabBarIcon: ({ color }) => (
									<FontAwesome6 name='chart-column' size={24} color={color} />
								),
							}}
						/>
						<Tabs.Screen
							name='(settings)'
							options={{
								title: "Settings",
								headerShown: false,
								tabBarIcon: ({ color }) => (
									<FontAwesome6 name='gear' size={24} color={color} />
								),
							}}
						/>
					</Tabs>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</ThemeProvider>
	);
}
