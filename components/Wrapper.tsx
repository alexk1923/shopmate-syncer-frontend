import { View, Text, StyleSheet, ViewStyle, StyleProp } from "react-native";
import React, { ReactNode } from "react";
import RestyleBox from "./RestyleBox";
import { theme } from "@/theme";

type WrapperProps = {
	children: ReactNode;
	style?: StyleProp<ViewStyle>;
};

const Wrapper = ({ children, style }: WrapperProps) => {
	return <RestyleBox style={[styles.c1, style]}>{children}</RestyleBox>;
};

const styles = StyleSheet.create({
	c1: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "flex-end",
		padding: theme.spacing.m,

		gap: theme.spacing.m,
		backgroundColor: "mainBackground",
	},
});

export default Wrapper;