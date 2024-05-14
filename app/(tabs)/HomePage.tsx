import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import Wrapper from "@/components/Wrapper";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Image, StyleSheet } from "react-native";
import { theme } from "@/theme";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";
import {
	Agenda,
	Calendar,
	CalendarProvider,
	ExpandableCalendar,
} from "react-native-calendars";
import CalendarComponent from "../CalendarComponent";

export default function HomePage(this: any) {
	return (
		<>
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
					<RestyleText>sdasdasdas</RestyleText>
				</RestyleBox>
			</Wrapper>
		</>
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
});
