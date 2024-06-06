import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet } from "react-native";

import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import { useDarkLightTheme } from "../ThemeContext";
import Avatar from "../misc/Avatar";

type WelcomeMessageProps = {
	firstName: string;
	lastName: string;
	profilePicture: string;
	username: string;
};

const WelcomeMessage = ({
	firstName,
	lastName,
	profilePicture,
	username,
}: WelcomeMessageProps) => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<RestyleBox style={styles.c1}>
			<RestyleBox style={styles.userContainer} gap='s'>
				<Avatar
					uri={profilePicture}
					firstName={firstName}
					lastName={lastName}
				/>
				<RestyleBox>
					<RestyleText color='text'>Hello,</RestyleText>
					<RestyleText variant='body' style={styles.username} color='text'>
						{`${firstName} ${lastName} 👋`}
					</RestyleText>
				</RestyleBox>
			</RestyleBox>
			<MaterialIcons
				name='notifications'
				size={32}
				color={currentTheme.colors.primary}
			/>
		</RestyleBox>
	);
};

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

	username: {
		fontWeight: "bold",
	},
});

export default WelcomeMessage;
