import { View, Text } from "react-native";
import React from "react";
import RestyleText from "@/components/RestyleText";
import Separator from "@/components/Separator";
import { useDarkLightTheme } from "@/components/ThemeContext";
import Wrapper from "@/components/Wrapper";

const History = () => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<Wrapper>
			<RestyleText variant='header' color='primary'>
				History
			</RestyleText>
			<Separator color={currentTheme.colors.primary} />
		</Wrapper>
	);
};

export default History;
