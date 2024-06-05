import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
	Image,
	ScrollView,
	StyleSheet,
	useWindowDimensions,
} from "react-native";
import { theme } from "@/theme";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";
import CalendarComponent from "@/components/CalendarComponent";
import PieChartComponent from "@/components/PieChartComponent";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Font from "expo-font";
import ProductExpiryItem from "@/components/ProductExpiryItem";

import { useDarkLightTheme } from "@/components/ThemeContext";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";

import SwipeListMenu from "@/components/SwipeListMenu";
import {
	Product,
	fetchedFood,
	FoodTagKey,
} from "@/constants/types/ProductTypes";
import { useAuthStore } from "../store/useUserStore";
import Avatar from "@/components/Avatar";
import { useQuery } from "@tanstack/react-query";
import { ItemService } from "../services/itemService";
import { backgroundColor } from "@shopify/restyle";
import { getExpiryDays } from "../utils/getExpiryDays";
Font.loadAsync(MaterialIcons.font);

export default function HomePage(this: any) {
	const { currentTheme } = useDarkLightTheme();
	const currentUser = useAuthStore((state) => state.user);

	if (currentUser === null) {
		console.log("Current user is null");
		router.navigate("/login");
		return <></>;
	}

	const { data, isLoading, error } = useQuery({
		queryKey: ["foods", currentUser?.houseId],
		queryFn: async () => {
			if (!currentUser || !currentUser.houseId) {
				throw new Error("User or houseId is not defined");
			}
			const foodList = await ItemService.getFoodList(currentUser.houseId);
			return foodList;
		},
	});

	const [expiryItems, setExpiryItems] =
		useState<(Product & { key: number })[]>(fetchedFood);

	useEffect(() => {
		const fetchedItems = [
			{
				id: 1,
				key: 1,
				name: "Iaurt cu piersici",
				expiryDate: new Date("2024-05-18"),
				quantity: 2,
				image: null,
				tags: ["dairy", "drinks"] as FoodTagKey[],
			},
			{
				id: 2,
				key: 2,
				name: "Banane",
				expiryDate: new Date("2024-06-18"),
				quantity: 1,
				image:
					"https://images.immediate.co.uk/production/volatile/sites/30/2017/01/Bunch-of-bananas-67e91d5.jpg?quality=90&resize=440,400",
				tags: ["fruits_vegetables"] as FoodTagKey[],
			},
		];
	}, []);

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

		const newData = [...expiryItems];
		const updatedData = newData.filter((item) => item.id !== rowKey);

		setExpiryItems(updatedData);
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

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<CalendarComponent />
			<Wrapper style={styles.wrapper}>
				<RestyleBox style={styles.c1}>
					<RestyleBox style={styles.userContainer} gap='s'>
						<Avatar
							uri={currentUser.profilePicture}
							firstName={currentUser.firstName}
							lastName={currentUser.lastName}
						/>
						<RestyleBox>
							<RestyleText color='text'>Hello,</RestyleText>
							<RestyleText variant='body' style={styles.userName} color='text'>
								{currentUser?.firstName} {currentUser?.lastName} 👋
							</RestyleText>
						</RestyleBox>
					</RestyleBox>
					<MaterialIcons
						name='notifications'
						size={32}
						color={currentTheme.colors.primary}
					/>
				</RestyleBox>

				<RestyleBox gap='m' style={{ display: "flex" }}>
					<RestyleBox style={styles.scheduleContainer}>
						<RestyleText variant='body' color='text'>
							Next shopping:{" "}
							<RestyleText variant='body' color='primary' fontWeight='bold'>
								2 days
							</RestyleText>
						</RestyleText>
						<AppButton
							title={"Schedule"}
							onPress={() => router.navigate("/shopping/calendar")}
							variant={"filled"}
							style={styles.scheduleButton}
						/>
					</RestyleBox>
				</RestyleBox>

				<RestyleBox gap='m' flex={1}>
					<PieChartComponent />

					<RestyleBox
						style={styles.expiryContainer}
						backgroundColor='cardBackground'
					>
						<RestyleText
							color='primary'
							fontWeight='bold'
							paddingHorizontal='m'
						>
							Expiring soon ⌛
						</RestyleText>
						<ScrollView>
							<SwipeListView
								data={data?.sort(
									(a, b) =>
										getExpiryDays(a.expiryDate) - getExpiryDays(b.expiryDate)
								)}
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
								scrollEnabled={true}
								style={{ flex: 1, overflow: "hidden" }}
							/>
						</ScrollView>
					</RestyleBox>
				</RestyleBox>
			</Wrapper>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "flex-start",
	},

	c1: {
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},

	userContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
	},

	profilePicture: {
		width: 40,
		height: 40,
		borderRadius: 45,
	},

	userName: {
		fontWeight: "bold",
	},

	scheduleContainer: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	scheduleButton: {
		paddingVertical: theme.spacing.s,
		paddingHorizontal: theme.spacing.s,
	},

	foodExpiryContainer: {
		padding: theme.spacing.s,
		borderRadius: 15,
		justifyContent: "center",
	},
	rowFront: {
		alignItems: "center",
		backgroundColor: "#CCC",
		borderBottomColor: "black",
		borderBottomWidth: 1,
		justifyContent: "center",
		height: 50,
	},

	backRightBtn: {
		alignItems: "center",
		bottom: 0,
		justifyContent: "center",
		position: "absolute",
		top: 0,
		width: 75,
	},
	backRightBtnRight: {
		backgroundColor: "red",
		right: 0,
	},
	expiryContainer: {
		paddingVertical: theme.spacing.m,
		borderRadius: 15,
		gap: theme.spacing.s,
		elevation: 5,
		flex: 1,
		// height: 200,
	},
});
