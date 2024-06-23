import { View, Text, Button, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useDarkLightTheme } from "@/components/ThemeContext";
import { createText, createBox } from "@shopify/restyle";
import { Theme, theme } from "@/theme";

import { router, useNavigation } from "expo-router";

import { ANIMATIONS, IMAGES } from "@/constants/assets";

import { useAuthStore } from "@/app/store/useUserStore";
import { FontAwesome, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import SquareCard from "@/components/cards/SquareCard";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Separator from "@/components/layout/Separator";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";
import { useHouse } from "@/app/hooks/useHouse";
import { useHouseStore } from "@/app/store/useHouseStore";

const ShoppingPage = () => {
	const { darkMode, setDarkMode } = useDarkLightTheme();
	const Text = createText<Theme>();
	const Box = createBox<Theme>();

	const navigation = useNavigation();
	const { currentTheme } = useDarkLightTheme();

	return (
		<Wrapper style={{ justifyContent: "center" }}>
			<Box
				backgroundColor='mainBackground'
				flex={1}
				alignItems='center'
				justifyContent='center'
			>
				<RestyleText variant='header' color='primary'>
					Shopping menu
				</RestyleText>
				<Separator color={currentTheme.colors.primary} />

				<RestyleBox
					flexDirection='row'
					flexWrap='wrap'
					justifyContent='center'
					alignItems='center'
				>
					<SquareCard
						title={"Inventory"}
						animationName={ANIMATIONS.HISTORY}
						redirect={"/Inventory"}
						icon={undefined}
						image={IMAGES.INVENTORY}
					/>

					<SquareCard
						title={"Shopping mode"}
						animationName={ANIMATIONS.HISTORY}
						redirect={"/ShoppingMode"}
						icon={
							<FontAwesome6 name='basket-shopping' size={24} color='black' />
						}
						image={IMAGES.SHOPPING_MODE}
					/>

					<SquareCard
						title={"Wishlist"}
						animationName={ANIMATIONS.HISTORY}
						redirect={"/WishlistPage"}
						icon={<FontAwesome name='heart' size={24} color='black' />}
						image={IMAGES.WISHLIST}
					/>

					<SquareCard
						title={"Schedule History"}
						animationName={ANIMATIONS.HISTORY}
						redirect={"/ScheduleHistory"}
						icon={<FontAwesome5 name='history' size={24} color='black' />}
						image={IMAGES.HISTORY}
					/>
				</RestyleBox>
			</Box>
		</Wrapper>
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
});

export default ShoppingPage;
