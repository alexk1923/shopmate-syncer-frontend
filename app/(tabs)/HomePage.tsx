import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import Wrapper from "@/components/Wrapper";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet, View } from "react-native";
import { theme } from "@/theme";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";
import CalendarComponent from "../CalendarComponent";
import PieChartComponent from "@/components/PieChartComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toggle from "react-native-toggle-element";

export default function HomePage(this: any) {
	const barData = [
		{ value: 250, label: "M" },
		{ value: 500, label: "T", frontColor: "#177AD5" },
		{ value: 745, label: "W", frontColor: "#177AD5" },
		{ value: 320, label: "T" },
		{ value: 600, label: "F", frontColor: "#177AD5" },
		{ value: 256, label: "S" },
		{ value: 300, label: "S" },
	];

	const [autoGenerate, setAutoGenerate] = useState(false);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<CalendarComponent />
			<Wrapper style={styles.wrapper}>
				<RestyleBox style={styles.c1}>
					<RestyleBox style={styles.userContainer} gap='s'>
						<Image
							source={require("@/assets/images/pexels_profile.jpg")}
							style={styles.profilePicture}
						/>
						<RestyleBox>
							<RestyleText>Hello,</RestyleText>
							<RestyleText variant='body' style={styles.userName}>
								Firstname Lastname 👋
							</RestyleText>
						</RestyleBox>
					</RestyleBox>
					<MaterialIcons
						name='notifications'
						size={24}
						color={theme.colors.primary}
					/>
				</RestyleBox>

				<RestyleBox gap='m' style={{ display: "flex" }}>
					<RestyleBox style={styles.scheduleContainer}>
						<RestyleText variant='body'>
							Next shopping:{" "}
							<RestyleText variant='body' color='primary'>
								2 days
							</RestyleText>
						</RestyleText>
						<AppButton
							title={"Schedule"}
							onPress={() => router.navigate("/shopping/calendar")}
							variant={"filled"}
							style={styles.scheduleButton}
						/>
					</RestyleBox>
				</RestyleBox>
				<RestyleBox gap='m'>
					<PieChartComponent />
					<RestyleBox
						backgroundColor='mainBackground'
						style={styles.autoGenerateContainer}
					>
						<RestyleBox style={styles.autoGenerateTextContainer}>
							<RestyleText color='primary' fontWeight='bold'>
								Auto-generate
							</RestyleText>
							<RestyleText>
								Choose to use a custom shopping list or let the app generate it
								from preferences
							</RestyleText>
						</RestyleBox>

						<RestyleBox>
							<Toggle
								value={autoGenerate}
								onPress={() => setAutoGenerate(!autoGenerate)}
								thumbButton={{
									width: 30,
									height: 30,
									radius: 30,
									activeBackgroundColor: theme.colors.darkPrimary,
									inActiveBackgroundColor: "#ababab",
								}}
								trackBar={{
									width: 50,
									height: 20,
									activeBackgroundColor: theme.colors.lightPrimary,
									inActiveBackgroundColor: "#cecece",
								}}
							/>
						</RestyleBox>
					</RestyleBox>
				</RestyleBox>
			</Wrapper>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "flex-start",
	},

	c1: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	userContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},

	profilePicture: {
		width: 40,
		height: 40,
		borderRadius: 45,
	},

	userName: {
		fontWeight: "bold",
	},

	scheduleContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	scheduleButton: {
		paddingVertical: theme.spacing.s,
		paddingHorizontal: theme.spacing.s,
	},

	autoGenerateContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		padding: theme.spacing.s,
		borderRadius: 15,
	},

	autoGenerateTextContainer: {
		display: "flex",
		flex: 1,
	},
});
