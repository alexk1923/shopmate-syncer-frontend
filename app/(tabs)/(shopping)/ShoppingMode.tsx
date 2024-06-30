import { StyleSheet } from "react-native";
import React, { useState } from "react";

import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";

import { useItems } from "@/app/hooks/useItems";
import { useAuthStore } from "@/app/store/useUserStore";
import { useWishlist } from "@/app/hooks/useWishlist";

import RestyleBox from "@/components/layout/RestyleBox";
import { FlatList } from "react-native-gesture-handler";
import { useDarkLightTheme } from "@/components/ThemeContext";
import { FontAwesome6 } from "@expo/vector-icons";

import { TouchableOpacity } from "@gorhom/bottom-sheet";
import GeneralItemCard, { VIEW_MODE } from "@/components/cards/GeneralItemCard";

enum RECOMMENDER_MENU {
	RECOMMENDATIONS = "RECOMMENDATIONS",
	EXPIRY = "EXPIRY",
	WISHLIST = "WISHLIST",
}

const ShoppingMode = () => {
	const [shoppingMode, setShoppingMode] = useState(false);
	const user = useAuthStore((state) => state.user);

	const { currentTheme } = useDarkLightTheme();
	const { recommendationQuery, houseItems } = useItems(user?.id!);
	const { wishlistQuery } = useWishlist(user?.id!);
	const [selectedMenu, setSelectedMenu] = useState(
		RECOMMENDER_MENU.RECOMMENDATIONS
	);

	const handleGoShopping = () => {
		setShoppingMode(true);
	};

	const handleDisableShopping = () => {
		setShoppingMode(false);
	};

	type MenuType = {
		menu: RECOMMENDER_MENU;
		title: string;
		message: string;
		icon: string;
	};

	const selectionMenusData = [
		{
			menu: RECOMMENDER_MENU.RECOMMENDATIONS,
			title: "Recommended",
			message: "You may like",
			icon: "lightbulb",
		},
		{
			menu: RECOMMENDER_MENU.EXPIRY,
			title: "Expiring soon",
			message: "You may like",
			icon: "clock",
		},
		{
			menu: RECOMMENDER_MENU.WISHLIST,
			title: "Wishlist",
			message: "You may like",
			icon: "heart",
		},
	];

	const renderItem = ({ item }: { item: MenuType }) => {
		return (
			<RestyleBox flex={1} borderRadius={15}>
				<TouchableOpacity
					onPress={() => setSelectedMenu(item.menu)}
					style={{ width: "100%" }}
				>
					<RestyleBox
						alignItems='center'
						backgroundColor={
							selectedMenu === item.menu ? "primary" : "cardBackground"
						}
						paddingVertical='s'
					>
						<FontAwesome6
							name={item.icon}
							size={24}
							color={
								selectedMenu === item.menu
									? currentTheme.colors.oppositeText
									: currentTheme.colors.primary
							}
						/>
						<RestyleText
							variant='label'
							color={selectedMenu === item.menu ? "oppositeText" : "primary"}
						>
							{item.title}
						</RestyleText>
					</RestyleBox>
				</TouchableOpacity>
			</RestyleBox>
		);
	};

	return (
		<>
			<Wrapper>
				<RestyleText variant='header' color='primary'>
					Shopping Mode
				</RestyleText>

				{shoppingMode ? (
					<>
						{/* <AutoGenerate /> */}

						<FlatList
							data={selectionMenusData}
							renderItem={renderItem}
							numColumns={3}
							style={{ flexGrow: 0 }}
						/>

						{selectedMenu === RECOMMENDER_MENU.RECOMMENDATIONS && (
							<RestyleBox flex={1}>
								<RestyleText variant='label'>You may like</RestyleText>
								{recommendationQuery.data && (
									<FlatList
										data={recommendationQuery.data}
										renderItem={({ item }) => (
											<GeneralItemCard
												item={{ ...item, description: "", originalId: null }}
												viewMode={VIEW_MODE.SHOPPING_MODE}
											/>
										)}
									/>
								)}
							</RestyleBox>
						)}

						{selectedMenu === RECOMMENDER_MENU.EXPIRY && (
							<RestyleBox flex={1}>
								<RestyleText variant='label'>Soon expiry items</RestyleText>
								{houseItems.data && (
									<FlatList
										data={houseItems.data}
										renderItem={({ item }) => (
											<GeneralItemCard
												item={{ ...item, description: "", originalId: null }}
												viewMode={VIEW_MODE.EXPIRY}
												detailedItem={item}
											/>
										)}
									/>
								)}
							</RestyleBox>
						)}

						{selectedMenu === RECOMMENDER_MENU.WISHLIST && (
							<RestyleBox flex={1}>
								<RestyleText variant='label'>Wishlist</RestyleText>
								{wishlistQuery.data && (
									<FlatList
										data={wishlistQuery.data}
										renderItem={({ item }) => (
											<GeneralItemCard
												item={item}
												viewMode={VIEW_MODE.SHOPPING_MODE}
											/>
										)}
									/>
								)}
							</RestyleBox>
						)}

						<AppButton
							variant='outline'
							title='Disable Shopping Mode'
							onPress={handleDisableShopping}
						/>
					</>
				) : (
					<>
						<RestyleText variant='body' color='text'>
							Activate this mode if you are in a store and want to efficiently
							choose your products based on recommendation and auto-generated
							lists. Your wishlist would be considered too !
						</RestyleText>

						<RestyleText color='text'>
							Shopping mode is currently {shoppingMode ? "enabled" : "disabled"}
						</RestyleText>

						<AppButton
							onPress={handleGoShopping}
							title='GO SHOPPING'
							variant='filled'
						/>
					</>
				)}
			</Wrapper>
		</>
	);
};

const styles = StyleSheet.create({
	gradient: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export default ShoppingMode;
