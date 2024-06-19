import { View, Text } from "react-native";
import React from "react";
import RestyleText from "../layout/RestyleText";
import Separator from "../layout/Separator";
import { useDarkLightTheme } from "../ThemeContext";

const ScreenTitle = ({ title }: { title: string }) => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<>
			<RestyleText variant='header' color='primary'>
				{title}
			</RestyleText>
			<Separator color={currentTheme.colors.primary} />
		</>
	);
};

export default ScreenTitle;
