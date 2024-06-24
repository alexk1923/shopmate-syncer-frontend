import { View, Text, Image, StyleSheet, Alert } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { theme } from "@/theme";

import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import AppFab from "../misc/AppFab";
import FoodTag from "../misc/FoodTag";
import { Item } from "@/constants/types/ItemTypes";
import { useDarkLightTheme } from "../ThemeContext";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { WishlistItem } from "@/constants/types/WishlistTypes";
import { useWishlist } from "@/app/hooks/useWishlist";
import _ from "lodash";
import { useAuthStore } from "@/app/store/useUserStore";
import { differenceInDays, startOfToday } from "date-fns";

export enum VIEW_MODE {
	DISCOVER,
	WISHLIST,
	SHOPPING_MODE,
	EXPIRY,
}

type GeneralItemCardProps = {
	item: WishlistItem;

	viewMode: VIEW_MODE;
	detailedItem?: Item;
};

const GeneralItemCard = ({
	item,
	viewMode,
	detailedItem,
}: GeneralItemCardProps) => {
	const { name, image, originalId, description } = item;
	const user = useAuthStore((state) => state.user);
	const { wishlistQuery, addToWishlistMutation, removeFromWishlistMutation } =
		useWishlist(user?.id!);

	const [wished, setWished] = useState<boolean>(
		viewMode === VIEW_MODE.WISHLIST
			? true
			: wishlistQuery.data?.some((x) => x.originalId === item.originalId)!
	);
	const [marked, setMarked] = useState<boolean>(false);
	const { currentTheme } = useDarkLightTheme();

	const getExpiryText = (firstDate: Date) => {
		const diffDays = differenceInDays(firstDate, startOfToday());
		const text =
			diffDays < 0
				? `Expired ${-1 * diffDays} days ago`
				: `Expires in ${diffDays} days`;
		return text;
	};

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
					if (viewMode === VIEW_MODE.WISHLIST) {
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

	const handleMarkItem = () => {
		setMarked((prev) => !prev);
	};

	return (
		<RestyleBox
			style={{
				flexDirection: "row",
				alignItems: "center",
				gap: theme.spacing.s,
				justifyContent: "space-between",
			}}
			width={"100%"}
			padding='s'
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
					color={marked ? "gray" : "text"}
					numberOfLines={1}
					textDecorationLine={marked ? "line-through" : "none"}
				>
					{name}
				</RestyleText>
				{(viewMode === VIEW_MODE.WISHLIST ||
					viewMode === VIEW_MODE.SHOPPING_MODE) && (
					<RestyleText
						variant='label'
						color={
							viewMode === VIEW_MODE.SHOPPING_MODE
								? marked
									? "gray"
									: "text"
								: "text"
						}
						numberOfLines={2}
					>
						{description}
					</RestyleText>
				)}

				{viewMode === VIEW_MODE.EXPIRY && detailedItem && (
					<>
						<RestyleText
							variant='label'
							numberOfLines={2}
							color={
								viewMode === VIEW_MODE.EXPIRY
									? marked
										? "gray"
										: "text"
									: "text"
							}
						>
							Added by{" "}
							<RestyleText
								color={
									detailedItem.boughtBy.id === user?.id
										? "primary"
										: marked
										? "gray"
										: "text"
								}
							>
								{detailedItem.boughtBy.firstName +
									" " +
									detailedItem.boughtBy.lastName}
							</RestyleText>
						</RestyleText>

						{detailedItem.food && (
							<RestyleText
								variant='label'
								color={marked ? "gray" : "text"}
								numberOfLines={2}
							>
								{getExpiryText(detailedItem.food.expiryDate)}
							</RestyleText>
						)}
					</>
				)}
			</RestyleBox>

			{viewMode === VIEW_MODE.WISHLIST || viewMode == VIEW_MODE.DISCOVER ? (
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
			) : (
				<AppFab
					size={48}
					onPress={handleMarkItem}
					iconName={"heart"}
					iconColor={marked ? "red" : currentTheme.colors.text}
					IconComponent={
						<FontAwesome6
							name={marked ? "circle-check" : "circle"}
							size={24}
							color={currentTheme.colors.primary}
						/>
					}
					backgroundColor={"transparent"}
				/>
			)}
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
