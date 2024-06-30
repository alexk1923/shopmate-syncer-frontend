import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import RestyleBox from "../layout/RestyleBox";
import { useDarkLightTheme } from "../ThemeContext";

type AvatarProps = {
	uri: string | null;
	firstName?: string;
	lastName?: string;
	status?: "online" | "away";
	onClick: () => void;
};

const Avatar = (props: AvatarProps) => {
	const { uri, firstName, lastName, status, onClick } = props;
	const [dotColor, setDotColor] = useState<"green" | "gray">("gray");
	const { currentTheme } = useDarkLightTheme();

	useEffect(() => {
		if (status === "online") {
			setDotColor("green");
		} else if (status === "away") {
			setDotColor("gray");
		}
	}, [status]);
	return (
		<Pressable onPress={onClick}>
			<RestyleBox alignItems='center'>
				{uri ? (
					<Image
						source={{ uri }}
						style={[
							styles.profilePic,
							{ borderColor: currentTheme.colors.primary },
						]}
					/>
				) : (
					<RestyleBox
						backgroundColor='primary'
						height={50}
						aspectRatio={1}
						borderRadius={25}
						justifyContent='center'
						alignItems='center'
						style={[
							styles.profilePic,
							{ borderColor: currentTheme.colors.primary },
						]}
					>
						<Text style={{ color: "white" }}>
							{firstName && lastName ? firstName[0] + lastName[0] : "User"}
						</Text>
					</RestyleBox>
				)}
				{status && (
					<RestyleBox
						style={{
							width: 15,
							height: 15,
							backgroundColor: dotColor,
							borderRadius: 25,
							top: "-10%",
							borderWidth: 1,
							borderColor: "white",
						}}
					></RestyleBox>
				)}
			</RestyleBox>
		</Pressable>
	);
};

export default Avatar;

const styles = StyleSheet.create({
	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 25,
		position: "relative",
		borderWidth: 2,

		overflow: "visible",
		objectFit: "contain",
	},
});
