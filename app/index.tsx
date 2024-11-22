import { useDarkLightTheme } from "@/components/ThemeContext";

import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, Image, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "./store/useUserStore";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
	}),
});

const App = () => {
	const { darkMode, setDarkMode } = useDarkLightTheme();

	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	const preferedThemeDark = useAuthStore((state) => state.preferedThemeDark);

	const user = useAuthStore((state) => state.user);
	const setNotificationSubscription = useAuthStore(
		(state) => state.setNotificationSubscription
	);
	const appStateChangeRef = useRef(false);
	const [initialising, setInitialising] = useState(true);

	useEffect(() => {
		if (preferedThemeDark) {
			setDarkMode(true);
		}
	}, []);

	useEffect(() => {
		const subscription = Notifications.addNotificationReceivedListener(
			(notification) => {
				console.log("Received notification: ", notification);
			}
		);

		setNotificationSubscription(subscription);

		return () => {
			subscription.remove();
		};
	}, []);

	// Register the app resume event listener
	useEffect(() => {
		const appResumeListener = AppState.addEventListener("change", (state) => {
			console.log("state is" + state);

			// if (state === "active") {
			// 	if (!user) {
			// 		return;
			// 	}
			// 	if (!user?.firstName || !user?.lastName) {
			// 		router.navigate("introduction/Introduction");
			// 	} else if (!user.houseId) {
			// 		router.navigate("pages/NoHomeJoined");
			// 	} else {
			// 		router.navigate("(tabs)/Home");
			// 	}
			// }
		});

		return () => {
			appResumeListener.remove();
		};
	}, []);

	useEffect(() => {
		console.log("Initialising auth");

		initializeAuth();
		setInitialising(false);
	}, [appStateChangeRef.current]);

	return (
		<Wrapper style={{ justifyContent: "flex-end" }}>
			<RestyleBox style={styles.c2} gap='m' margin='xl' marginBottom='s'>
				<Image
					style={styles.logo}
					source={
						darkMode
							? require("@/assets/images/logo-white.png")
							: require("@/assets/images/shopmate-logo-primary.png")
					}
				/>

				{initialising ? (
					<RestyleText variant='bodyBold' color='text'>
						Initialising app...
					</RestyleText>
				) : (
					<>
						<AppButton
							title='LOGIN'
							onPress={() => {
								router.push("/Login");
							}}
							variant={"filled"}
							fullWidth
						></AppButton>
						<AppButton
							title='REGISTER'
							variant={"outline"}
							onPress={() => {
								router.push("/Register");
							}}
							fullWidth
						></AppButton>
					</>
				)}

				<RestyleText variant='buttonMedium' color='text' textAlign='center'>
					Shopmate Syncer
				</RestyleText>
			</RestyleBox>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	c1: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	c2: {
		display: "flex",
	},

	logo: {
		width: "100%",
		height: 200,
		alignSelf: "center",
		objectFit: "contain",
	},

	btn: {
		backgroundColor: "transparent",
	},
});
export default App;
