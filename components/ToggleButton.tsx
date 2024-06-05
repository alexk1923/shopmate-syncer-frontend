import { View, Text } from "react-native";
import React from "react";
import Toggle from "react-native-toggle-element/lib/toggle";
import { useDarkLightTheme } from "./ThemeContext";

type ToggleButtonProps = {
	value: boolean;
	onPress: () => void;
};

const ToggleButton = ({ value, onPress }: ToggleButtonProps) => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<Toggle
			value={value}
			onPress={onPress}
			thumbButton={{
				width: 30,
				height: 30,
				radius: 30,
				activeBackgroundColor: currentTheme.colors.primary,
				inActiveBackgroundColor: "#ababab",
			}}
			trackBar={{
				width: 50,
				height: 20,
				activeBackgroundColor: currentTheme.colors.lightPrimary,
				inActiveBackgroundColor: "#cecece",
			}}
		/>
	);
};

export default ToggleButton;
