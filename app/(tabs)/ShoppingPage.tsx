import { View, Text, Button, StyleSheet } from "react-native";
import React from "react";
import { useDarkLightTheme } from "@/components/ThemeContext";
import { createText, createBox } from "@shopify/restyle";
import { Theme } from "@/theme";

const ShoppingPage = () => {
	const { darkMode, setDarkMode } = useDarkLightTheme();
	const Text = createText<Theme>();
	const Box = createBox<Theme>();
	return (
		<Box
			backgroundColor='mainBackground'
			flex={1}
			alignItems='center'
			justifyContent='center'
		>
			<Text color='primary'>Second tab</Text>
			<Box style={styles.separator} />
			<Button
				onPress={() => setDarkMode(!darkMode)}
				title='Change dark mode'
			></Button>
			<Box marginTop='m' width={20} height={20} backgroundColor='primary'></Box>
			<Box
				marginTop='m'
				width={20}
				height={20}
				backgroundColor='secondary'
			></Box>
			<Box marginTop='m' width={20} height={20} backgroundColor='accent'></Box>

			<Text>Dark mode is {darkMode.toString()}</Text>
		</Box>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "mainBackground",
	},
	title: {
		color: "mainText",
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});

export default ShoppingPage;