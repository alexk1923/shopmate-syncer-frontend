import { View, Text, Image, StyleSheet, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { theme } from "@/theme";

import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import AppFab from "../misc/AppFab";
import FoodTag from "../misc/FoodTag";
import { Item } from "@/constants/types/ItemTypes";
import { useDarkLightTheme } from "../ThemeContext";
import { FontAwesome } from "@expo/vector-icons";
import { WishlistItem } from "@/constants/types/WishlistTypes";
import { useWishlist } from "@/app/hooks/useWishlist";
import _ from "lodash";
import { useAuthStore } from "@/app/store/useUserStore";

type GeneralItemCardProps = {
	item: WishlistItem;
	onPress: (wished: boolean, item: WishlistItem) => void;
	wishlistView: boolean;
};

const GeneralItemCard = ({
	item,
	onPress,
	wishlistView,
}: GeneralItemCardProps) => {
	const { name, image, originalId, description } = item;
	const user = useAuthStore((state) => state.user);
	const { wishlistQuery, addToWishlistMutation, removeFromWishlistMutation } =
		useWishlist(user?.id!);

	const [wished, setWished] = useState<boolean>(
		wishlistView
			? true
			: wishlistQuery.data?.some((x) => x.originalId === item.originalId)!
	);
	const { currentTheme } = useDarkLightTheme();

	const handleSelectWish = () => {
		if (wished) {
			console.log("alerting");
			Alert.alert(
				`Remove item`,
				`Are you sure you want to delete ${item.name} from your wishlist?`,
				[
					{ text: "Cancel", onPress: () => null, style: "cancel" },
					{
						text: "YES",
						onPress: () => {
							setWished((prev) => !prev);
							handleWishlistToggle(wished, {
								originalId: item.originalId,
								id: item.id,
								name: item.name,
								description: item.description,
								image: item.image,
							});
						},
					},
				]
			);
			return;
		}

		setWished((prev) => !prev);
		handleWishlistToggle(wished, {
			originalId: item.originalId,
			id: item.id,
			name: item.name,
			description: item.description,
			image: item.image,
		});

		return;
	};

	// Debounced function to add or remove item from wishlist
	const debouncedMutate = useCallback(
		_.debounce(
			(itemId: number, action: "add" | "remove", item?: WishlistItem) => {
				if (action === "add") {
					addToWishlistMutation.mutate({
						userId: user?.id!,
						wishlistItem: item!,
					});
				} else {
					if (wishlistView) {
						removeFromWishlistMutation.mutate({
							userId: user?.id!,
							itemId: item?.id!,
						});
						return;
					}

					const existingWishlistItem = wishlistQuery.data?.find(
						(wishlistItem) => wishlistItem.originalId === item?.id
					);
					console.log("the existing wishlist item is:");
					console.log(existingWishlistItem);

					if (existingWishlistItem) {
						removeFromWishlistMutation.mutate({
							userId: user?.id!,
							itemId: existingWishlistItem?.id,
						});
					}
				}
			},
			500
		), // debounce time
		[wishlistQuery.data]
	);

	const handleWishlistToggle = (wished: boolean, item: WishlistItem) => {
		if (wished) {
			debouncedMutate(item.id, "remove", item);
		} else {
			debouncedMutate(item.id, "add", item);
		}
	};

	return (
		<RestyleBox
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
			}}
			padding='s'
		>
			<RestyleBox
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: theme.spacing.s,
				}}
				width={"100%"}
			>
				<RestyleBox flex={1} aspectRatio={1}>
					<Image
						source={
							image
								? { uri: image }
								: require("@/assets/images/unknown-food-image.webp")
						}
						style={styles.foodImage}
						resizeMode='cover'
					/>
				</RestyleBox>
				<RestyleBox flex={3} style={{ alignSelf: "center" }}>
					<RestyleText
						variant='bodyBold'
						fontWeight='bold'
						color='text'
						numberOfLines={1}
					>
						{name}
					</RestyleText>
					{wishlistView && (
						<RestyleText variant='label' color='text' numberOfLines={2}>
							{description}
						</RestyleText>
					)}
				</RestyleBox>

				<AppFab
					size={48}
					onPress={handleSelectWish}
					iconName={"heart"}
					iconColor={wished ? "red" : currentTheme.colors.text}
					IconComponent={
						<FontAwesome
							name={wished ? "heart" : "heart-o"}
							size={24}
							color={wished ? "red" : currentTheme.colors.text}
						/>
					}
					backgroundColor={"transparent"}
				/>
			</RestyleBox>
		</RestyleBox>
	);
};
const styles = StyleSheet.create({
	foodImage: {
		width: "100%",
		height: "100%",
	},
});

export default GeneralItemCard;
