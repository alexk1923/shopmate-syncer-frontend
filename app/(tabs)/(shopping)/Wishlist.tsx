import { View, Text } from "react-native";
import React from "react";

import { useDarkLightTheme } from "@/components/ThemeContext";
import RestyleText from "@/components/layout/RestyleText";
import Separator from "@/components/layout/Separator";
import Wrapper from "@/components/layout/Wrapper";

const Wishlist = () => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<Wrapper>
			<RestyleText variant='header' color='primary'>
				Wishlist
			</RestyleText>
			<Separator color={currentTheme.colors.primary} />
		</Wrapper>
	);
};

export default Wishlist;
