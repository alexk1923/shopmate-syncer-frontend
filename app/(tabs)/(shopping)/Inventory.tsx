import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";
import { useQuery } from "@tanstack/react-query";
import { ItemService } from "@/app/services/itemService";
import { useAuthStore } from "@/app/store/useUserStore";

import { Product } from "@/constants/types/ProductTypes";

import { useDarkLightTheme } from "@/components/ThemeContext";

import { router } from "expo-router";

import { useFilterStore } from "@/app/store/useFilterStore";

import {
	EXPIRY_STATUS,
	Item,
	SORTING_ORDER,
	SORTING_TYPE,
} from "@/constants/types/ItemTypes";
import { FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

import ProductExpiryItem from "@/components/Products/ProductExpiryItem";
import SwipeListMenu from "@/components/common/SwipeListMenu";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Separator from "@/components/layout/Separator";
import Wrapper from "@/components/layout/Wrapper";
import AppFab from "@/components/misc/AppFab";
import { theme } from "@/theme";
import { differenceInDays, startOfToday } from "date-fns";

const Inventory = () => {
	const user = useAuthStore((state) => state.user);
	const filter = useFilterStore((state) => state.filter);
	const setFilter = useFilterStore((state) => state.setFilter);

	const itemQuery = useQuery({
		queryKey: ["items", user?.houseId],
		queryFn: async () => {
			if (!user || !user.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const itemList = await ItemService.getItemsByHouse(user.houseId);
			return itemList;
		},
	});

	const foodQuery = useQuery({
		queryKey: ["foods", user?.houseId],
		queryFn: async () => {
			if (!user || !user.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const foodList = await ItemService.getFoodList(user.houseId);
			return foodList;
		},
	});

	const filterByExpiryStatus = (item: Item) => {
		if (item.isFood === false || !item.food) {
			return true;
		}

		switch (filter.expiredStatus) {
			case EXPIRY_STATUS.ALL:
				return true;
			case EXPIRY_STATUS.NON_EXPIRED:
				const expiryDate1 = differenceInDays(
					item.food.expiryDate,
					startOfToday()
				);
				return expiryDate1 > 0;
			case EXPIRY_STATUS.EXPIRED:
				const expiryDate2 = differenceInDays(
					item.food.expiryDate,
					startOfToday()
				);
				return expiryDate2 < 0;
			default:
				return true;
		}
	};

	const sortByFn = (item1: Item, item2: Item) => {
		switch (filter.sortBy) {
			case SORTING_TYPE.EXPIRY_DATE:
				if (
					item1.isFood === false ||
					item2.isFood === false ||
					!item1.food ||
					!item2.food
				) {
					return 0;
				}
				return differenceInDays(item1.food.expiryDate, item2.food.expiryDate);
			case SORTING_TYPE.ALPHABETICALLY:
				return item1.name.localeCompare(item2.name);

			default:
				return 0;
		}
	};

	const closeRow = (
		rowMap: { [x: string]: { closeRow: () => void } },
		rowKey: string | number
	) => {
		if (rowMap[rowKey]) {
			rowMap[rowKey].closeRow();
		}
	};

	const deleteRow = (
		rowMap: RowMap<Product & { key: number }>,
		rowKey: string | number
	) => {
		closeRow(rowMap, rowKey);

		// const newData = [...expiryItems];
		// const updatedData = newData.filter((item) => item.id !== rowKey);

		// setExpiryItems(updatedData);
		console.log("Item with id: " + rowKey + " will be deleted");
	};

	const renderHiddenItem = (data: { item: { key: any } }, rowMap: any) => {
		return (
			<SwipeListMenu
				data={data}
				rowMap={rowMap}
				onDelete={() => deleteRow(rowMap, data.item.key)}
			/>
		);
	};

	useEffect(() => {
		console.log(foodQuery.data);
	}, [foodQuery.data]);

	useEffect(() => {
		console.log("Items are:");
		console.log(itemQuery.data);
	}, [itemQuery.data]);

	const { currentTheme } = useDarkLightTheme();

	return (
		<Wrapper>
			<RestyleText variant='header' color='primary'>
				Inventory
			</RestyleText>
			<RestyleBox
				flexDirection='row'
				gap='s'
				alignItems='center'
				justifyContent='space-between'
			>
				<RestyleBox flexDirection='row' alignItems='center' gap='s'>
					<RestyleText variant='label' color='gray'>
						Filter
					</RestyleText>
					<AppFab
						size={36}
						onPress={() => router.push("/Filter")}
						iconName={"filter"}
						iconColor={currentTheme.colors.oppositeText}
						backgroundColor={currentTheme.colors.primary}
					/>
				</RestyleBox>
				<TouchableOpacity
					onPress={() =>
						setFilter({
							...filter,
							sortingOrder:
								filter.sortingOrder === SORTING_ORDER.ASCENDING
									? SORTING_ORDER.DESCENDING
									: SORTING_ORDER.ASCENDING,
						})
					}
				>
					<FontAwesome5
						name={
							filter.sortingOrder === SORTING_ORDER.ASCENDING
								? "sort-amount-down-alt"
								: "sort-amount-up-alt"
						}
						size={24}
						color={currentTheme.colors.primary}
					/>
				</TouchableOpacity>
			</RestyleBox>

			<Separator color={currentTheme.colors.primary} />

			<SwipeListView
				data={
					filter.sortingOrder === SORTING_ORDER.ASCENDING
						? itemQuery.data?.filter(filterByExpiryStatus).sort(sortByFn)
						: itemQuery.data
								?.filter(filterByExpiryStatus)
								.sort(sortByFn)
								.reverse()
				}
				contentContainerStyle={{ gap: theme.spacing.s }}
				renderItem={(product) => (
					<ProductExpiryItem
						key={product.item.key}
						// @ts-ignore
						product={product.item}
					/>
				)}
				renderHiddenItem={renderHiddenItem}
				onRightAction={(row, rowMap) => {
					// @ts-ignore
					deleteRow(rowMap, row);
				}}
				onRightActionStatusChange={() => {
					// empty method to trigger activation
				}}
				// restDisplacementThreshold={1}
				restSpeedThreshold={100}
				rightOpenValue={-100}
				disableRightSwipe
				rightActivationValue={-150}
				rightActionValue={-400} // until where will the row extend (translate)
			/>
		</Wrapper>
	);
};

export default Inventory;
