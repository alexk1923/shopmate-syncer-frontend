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
import ProductExpiryItem from "@/components/ProductExpiryItem";
import HorizontalCard from "@/components/HorizontalCard";

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
						size={32}
						color={theme.colors.primary}
					/>
				</RestyleBox>

				<RestyleBox gap='m' style={{ display: "flex" }}>
					<RestyleBox style={styles.scheduleContainer}>
						<RestyleText variant='body'>
							Next shopping:{" "}
							<RestyleText variant='body' color='primary' fontWeight='bold'>
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
					<HorizontalCard title='Expiring soon ⌛'>
						<ProductExpiryItem
							product={{
								name: "Iaurt cu piersici",
								expiryDate: new Date("2024-05-18"),
								quantity: 2,
								image: null,
								tags: ["dairy", "drinks"],
							}}
						/>
						<ProductExpiryItem
							product={{
								name: "Banane",
								expiryDate: new Date("2024-06-18"),
								quantity: 1,
								image:
									"https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400",
								tags: ["fruits_vegetables"],
							}}
						/>
					</HorizontalCard>
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

	foodExpiryContainer: {
		padding: theme.spacing.s,
		borderRadius: 15,
		justifyContent: "center",
	},
});
