import AppButton from "@/components/AppButton";
import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import { useDarkLightTheme } from "@/components/ThemeContext";
import Wrapper from "@/components/Wrapper";

import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { AppState, Image, StyleSheet, Text, View } from "react-native";
import { useAuthStore } from "./store/useUserStore";
const Index = () => {
	const { darkMode } = useDarkLightTheme();
	const initializeAuth = useAuthStore((state) => state.initializeAuth);
	const navigation = useNavigation();
	const appStateChangeRef = useRef(false);

	// Register the app resume event listener
	useEffect(() => {
		const appResumeListener = AppState.addEventListener("change", (state) => {
			console.log("state is" + state);

			if (state === "active") {
				router.navigate("/(tabs)/Home");
			}
		});

		return () => {
			appResumeListener.remove();
		};
	}, []);

	useEffect(() => {
		initializeAuth();
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

				<AppButton
					title='LOGIN'
					onPress={() => {
						router.navigate("/Login");
					}}
					variant={"filled"}
					fullWidth
				></AppButton>
				<AppButton
					title='REGISTER'
					variant={"outline"}
					onPress={() => {
						router.navigate("/Register");
					}}
					fullWidth
				></AppButton>

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
export default Index;
