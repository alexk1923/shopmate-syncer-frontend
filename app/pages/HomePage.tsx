import React, { useCallback, useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { theme } from "@/theme";

import { router } from "expo-router";
import CalendarComponent from "@/components/widgets/CalendarComponent";

import { GestureHandlerRootView } from "react-native-gesture-handler";

import * as Font from "expo-font";

import { useDarkLightTheme } from "@/components/ThemeContext";
import { RowMap, SwipeListView } from "react-native-swipe-list-view";

import { Product } from "@/constants/types/ProductTypes";
import { useAuthStore } from "../store/useUserStore";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ItemService } from "../services/itemService";

import { getExpiryDays } from "../utils/getExpiryDays";
import { DateData } from "react-native-calendars";

import {
	ShoppingDayType,
	ShoppingSchedule,
} from "@/constants/types/ShoppingSchedule";
import { useShoppingSchedule } from "../hooks/useShoppingSchedule";

import { convertDateToLocaleISO } from "../utils/convertDateToLocaleISO";
import ProductExpiryItem from "@/components/Products/ProductExpiryItem";
import PieChartComponent from "@/components/charts/PieChartComponent";
import SwipeListMenu from "@/components/common/SwipeListMenu";
import AppButton from "@/components/misc/AppButton";
import AppModal from "@/components/modals/AppModal";
import ScheduleModal from "@/components/modals/ScheduleModal";

import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import Avatar from "@/components/misc/Avatar";
import { useItems } from "../hooks/useItems";
import { useHouse } from "../hooks/useHouse";
import { HouseService } from "../services/houseService";
import { useHouseStore } from "../store/useHouseStore";
Font.loadAsync(MaterialIcons.font);

export default function HomePage(this: any) {
	const { currentTheme } = useDarkLightTheme();
	const currentUser = useAuthStore((state) => state.user);

	const { shoppingScheduleQuery, shoppingScheduleMutation } =
		useShoppingSchedule();
	const [isScheduleShoppingOpen, setIsScheduleShoppingOpen] = useState(false);
	const [existingScheduleModalOpen, setExistingScheduleModalOpen] =
		useState(false);

	const [existingSchedule, setExistingSchedule] =
		useState<ShoppingSchedule | null>(null);

	if (currentUser === null) {
		console.log("Current user is null");
		router.navigate("/login");
		return <></>;
	}

	const setHouse = useHouseStore((state) => state.setHouse);
	const { houseQuery } = useHouse(currentUser.houseId);
	const queryClient = useQueryClient();

	queryClient.prefetchQuery({
		queryKey: ["user", currentUser.houseId],
		queryFn: async () => {
			if (currentUser.houseId) {
				const house = await HouseService.getHouseById(currentUser.houseId);
				setHouse(house);
				return house;
			}
		},
	});

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

	const { foodQuery } = useItems();

	const [expiryItems, setExpiryItems] = useState<(Product & { key: number })[]>(
		[]
	);

	const [shoppingSchedule, setShoppingSchedule] = useState<
		Omit<ShoppingDayType, "shoppingDate"> & { shoppingDate: Date | null }
	>({
		title: "",
		shoppingDate: null,
	});

	useEffect(() => {
		if (shoppingScheduleMutation.isSuccess) {
			setShoppingSchedule({ title: "", shoppingDate: null });
			setIsScheduleShoppingOpen(false);
		}
	}, [shoppingScheduleMutation.isSuccess]);

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

		console.warn("TODO: Implement deleting item from database");

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

	useEffect(() => {
		console.log("====================================");
		console.log(foodQuery.data);
		console.log("====================================");
	}, [foodQuery.data]);

	const checkExistingSchedule = () => {
		if (shoppingSchedule && shoppingSchedule.shoppingDate) {
			const existingSchedule = shoppingScheduleQuery.data?.find(
				(shoppingEvent) => {
					console.log(
						new Date(shoppingEvent.shoppingDate).toISOString() +
							"vs." +
							new Date(shoppingSchedule?.shoppingDate).toISOString()
					);

					return (
						shoppingSchedule.shoppingDate &&
						new Date(shoppingEvent.shoppingDate).toISOString() ===
							new Date(shoppingSchedule?.shoppingDate).toISOString()
					);
				}
			);

			return existingSchedule;
		}
		return false;
	};

	useEffect(() => {
		console.log("S-a apelat din useeffect bai frate");

		if (shoppingSchedule && shoppingSchedule.shoppingDate) {
			const schedule = checkExistingSchedule();

			console.log("shopping schedule query is:");
			console.log(schedule);

			if (schedule) {
				// Open existing schedule modal only if a modal is not already open
				if (!isScheduleShoppingOpen) {
					setExistingScheduleModalOpen(true);
				}
				setExistingSchedule(schedule);
			} else {
				setExistingSchedule(null);
				setIsScheduleShoppingOpen(true);
			}
		}
	}, [shoppingSchedule, shoppingSchedule.shoppingDate]);

	const handleDateSelect = (date: DateData) => {
		const selectedDate = convertDateToLocaleISO(new Date(date.dateString));

		setShoppingSchedule((prev) => {
			return { ...prev, shoppingDate: selectedDate };
		});
	};

	const handleSubmitNewShopping = () => {
		console.log("Before submitting, I have this shopping date");
		console.log(shoppingSchedule.shoppingDate);

		if (shoppingSchedule.shoppingDate) {
			shoppingScheduleMutation.mutate({
				title: shoppingSchedule.title,
				shoppingDate: shoppingSchedule.shoppingDate,
			});
		}
	};

	const sortShoppingScheduleByDate = useCallback(() => {
		if (shoppingScheduleQuery.data) {
			const sorted = shoppingScheduleQuery.data.sort((ss1, ss2) => {
				return (
					getExpiryDays(ss1.shoppingDate) - getExpiryDays(ss2.shoppingDate)
				);
			});

			const remainingDays = sorted.map(
				(schedule) => getExpiryDays(schedule.shoppingDate) - 1
			);

			if (remainingDays[0] === 0) {
				return "Today";
			}

			return remainingDays[0];
		}

		return "-";
	}, [shoppingScheduleQuery.data]);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ScheduleModal
				open={isScheduleShoppingOpen}
				setOpen={setIsScheduleShoppingOpen}
				shoppingSchedule={shoppingSchedule}
				setShoppingSchedule={setShoppingSchedule}
				handleSubmit={handleSubmitNewShopping}
				isPending={shoppingScheduleMutation.isPending}
				isError={shoppingScheduleMutation.isError}
				errorMessage={shoppingScheduleMutation.error?.message}
				existingSchedule={existingSchedule}
			/>

			<AppModal
				modalVisible={existingScheduleModalOpen}
				onModalClose={() => setExistingScheduleModalOpen(false)}
				title={"Shopping schedule"}
			>
				{existingSchedule && (
					<>
						<RestyleText>
							{`A shopping event was already scheduled on ${new Date(
								existingSchedule?.shoppingDate
							).toLocaleDateString()} by ${
								existingSchedule.createdBy.firstName
							} ${existingSchedule.createdBy.lastName}.`}
						</RestyleText>
						<AppButton
							title='View details'
							onPress={() => {
								setExistingScheduleModalOpen(false);
								// router.navigate("(tabs)/(shopping)/ShoppingPage");
								router.replace("(tabs)/(shopping)/ShoppingPage");
								setTimeout(() => {
									router.navigate("(tabs)/(shopping)/ScheduleHistory");
								}, 0);
							}}
							variant={"filled"}
						/>
					</>
				)}
			</AppModal>

			<CalendarComponent onDayLongPress={handleDateSelect} />
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
								{sortShoppingScheduleByDate()}
							</RestyleText>
						</RestyleText>
						<AppButton
							title={"Schedule"}
							onPress={() => setIsScheduleShoppingOpen(true)}
							variant={"filled"}
							style={styles.scheduleButton}
						/>
					</RestyleBox>
				</RestyleBox>

				<RestyleBox gap='m' flex={1}>
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

						<SwipeListView
							data={foodQuery.data?.sort(
								(a, b) =>
									getExpiryDays(a.food.expiryDate) -
									getExpiryDays(b.food.expiryDate)
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
					</RestyleBox>

					<PieChartComponent />
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
