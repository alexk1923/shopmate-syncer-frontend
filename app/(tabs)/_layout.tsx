import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import {
	FontAwesome6,
	MaterialCommunityIcons,
	MaterialIcons,
} from "@expo/vector-icons";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { darkTheme, theme } from "@/theme";
import { ThemeProvider, backgroundColor } from "@shopify/restyle";
import { useDarkLightTheme } from "@/components/ThemeContext";
import RestyleBox from "@/components/RestyleBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>["name"];
	color: string;
}) {
	return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

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
							// Disable the static render of the header on web
							// to prevent a hydration error in React Navigation v6.
							headerShown: useClientOnlyValue(false, true),
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
							name='HomePage'
							options={{
								title: "Home",
								tabBarIcon: ({ color }) => (
									<FontAwesome6 name='house' size={24} color={color} />
								),
							}}
						/>
						<Tabs.Screen
							name='ShoppingPage'
							options={{
								title: "Shopping",
								tabBarIcon: ({ color }) => (
									<FontAwesome6 name='cart-shopping' size={24} color={color} />
								),
							}}
						/>
						<Tabs.Screen
							name='Scan'
							options={{
								title: "Scan",
								headerShown: false,
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
							name='(chat)'
							options={{
								title: "Chat",
								headerShown: false,
								tabBarIcon: ({ color }) => (
									<MaterialIcons name='chat-bubble' size={24} color={color} />
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
					</Tabs>
				</BottomSheetModalProvider>
			</GestureHandlerRootView>
		</ThemeProvider>
	);
}
