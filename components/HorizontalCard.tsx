import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";
import RestyleText from "./RestyleText";
import RestyleBox from "./RestyleBox";

type HorizontalCardProps = {
	title: string;
	children: React.ReactNode;
};

const HorizontalCard = (props: HorizontalCardProps) => {
	const { title, children } = props;

	return (
		<RestyleBox backgroundColor='mainBackground' style={styles.c1}>
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
	},
});

export default HorizontalCard;
