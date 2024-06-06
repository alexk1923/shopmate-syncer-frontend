import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { theme } from "@/theme";
import RestyleBox from "./RestyleBox";

const Separator = ({ color }: { color: string }) => {
	return (
		<RestyleBox style={[styles.separator, { borderBottomColor: color }]} />
	);
};

const styles = StyleSheet.create({
	separator: {
		marginVertical: theme.spacing.s,
		height: 1,
		width: "100%",

		borderBottomWidth: StyleSheet.hairlineWidth,
	},
});

export default Separator;
