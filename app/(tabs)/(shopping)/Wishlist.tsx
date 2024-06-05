import { View, Text } from "react-native";
import React from "react";
import Wrapper from "@/components/Wrapper";
import RestyleText from "@/components/RestyleText";
import Separator from "@/components/Separator";
import { useDarkLightTheme } from "@/components/ThemeContext";
import SquareCard from "@/components/SquareCard";

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
