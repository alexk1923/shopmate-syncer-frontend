import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";

type HorizontalCardProps = {
	title: string;
	children: React.ReactNode;
};

const HorizontalCard = (props: HorizontalCardProps) => {
	const { title, children } = props;

	return (
		<RestyleBox style={styles.c1} backgroundColor='cardBackground'>
			<RestyleText color='primary' fontWeight='bold'>
				{title}
			</RestyleText>
			{children}
		</RestyleBox>
	);
};

const styles = StyleSheet.create({
	c1: {
		padding: theme.spacing.m,
		borderRadius: 15,
		gap: theme.spacing.s,
		elevation: 5,
	},
});

export default HorizontalCard;
