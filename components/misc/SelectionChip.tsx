import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";

import { FontAwesome } from "@expo/vector-icons";
import { useDarkLightTheme } from "../ThemeContext";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import { backgroundColor } from "@shopify/restyle";

type ChipProps = {
	text: string;
	isSelected: boolean;
	onSelect: () => void;
};

const SelectionChip = ({ text, isSelected, onSelect }: ChipProps) => {
	const { currentTheme } = useDarkLightTheme();
	return (
		<TouchableOpacity onPress={onSelect}>
			<RestyleBox flexDirection='row' flexWrap='wrap'>
				<RestyleBox
					style={[
						styles.chip,
						isSelected
							? { backgroundColor: currentTheme.colors.primary }
							: { backgroundColor: currentTheme.colors.chip },
					]}
				>
					<RestyleText color={isSelected ? "mainBackground" : "text"}>
						{text}
					</RestyleText>
				</RestyleBox>
			</RestyleBox>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	chip: {
		flexDirection: "row",
		alignItems: "center",

		borderRadius: 15,
		padding: 10,
	},
});

export default SelectionChip;
