import { View, Text, useWindowDimensions, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Wrapper from "@/components/layout/Wrapper";
import { CartesianChart, Line, Pie, PolarChart } from "victory-native";
import { LinearGradient } from "expo-linear-gradient";
import RestyleText from "@/components/layout/RestyleText";
import { useFont } from "@shopify/react-native-skia";
import HorizontalCard from "@/components/cards/HorizontalCard";
import RestyleBox from "@/components/layout/RestyleBox";
import { useItems } from "../hooks/useItems";
import { useAuthStore } from "../store/useUserStore";
import { Item } from "@/constants/types/ItemTypes";
import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import PieChartComponent from "@/components/charts/PieChartComponent";
import { useDashboards } from "../utils/dashboard";
import { BarChart, LineChart } from "react-native-gifted-charts";
import { useDarkLightTheme } from "@/components/ThemeContext";
import { ScrollView } from "react-native-gesture-handler";
import ScreenTitle from "@/components/misc/ScreenTitle";
import { startOfToday } from "date-fns";

const DashboardPage = () => {
	const user = useAuthStore((state) => state.user);
	const { width, height } = useWindowDimensions();
	const { currentTheme } = useDarkLightTheme();

	const { itemQuery } = useItems(user?.id!);
	const { getGroupedItems, getUsersCountItems, getTotalProductsEvolution } =
		useDashboards();

	const itemsDistribution = getGroupedItems(user?.id!, itemQuery.data!);
	const usersCountItems = getUsersCountItems(itemQuery.data!);
	const totalProductsByDates = getTotalProductsEvolution(
		user?.id!,
		itemQuery.data!
	);

	// useEffect(() => {
	// 	if (itemQuery.data) {
	// 		setGroupedItems(getGroupedItems(user.id, itemQuery.data));
	// 	}
	// }, [itemQuery.data]);

	useEffect(() => {
		getTotalProductsEvolution(user?.id!, itemQuery.data!);
	}, [itemQuery.data]);

	return (
		<ScrollView
			style={[styles.c1]}
			contentContainerStyle={{
				justifyContent: "flex-start",
				padding: currentTheme.spacing.m,
				gap: currentTheme.spacing.m,
			}}
		>
			<ScreenTitle title={"Statistics"} />
			<PieChartComponent data={itemsDistribution} />

			<HorizontalCard title='Product stats'>
				<RestyleText variant='subheader'>Products count by user</RestyleText>
				<BarChart
					data={usersCountItems}
					spacing={currentTheme.spacing.xl}
					isAnimated
					yAxisColor={currentTheme.colors.text}
					xAxisColor={currentTheme.colors.text}
					xAxisLabelTextStyle={{ color: currentTheme.colors.text }}
					yAxisTextStyle={{ color: currentTheme.colors.text }}
					frontColor={currentTheme.colors.primary}
					barBorderRadius={5}
					barWidth={20}
					rulesType='solid'
					gradientColor={"#FFEEFE"}
					width={width * 0.5}
					renderTooltip={(item: any, index: number) => {
						return (
							<View
								style={{
									marginBottom: 20,

									backgroundColor: currentTheme.colors.lightPrimary,
									paddingHorizontal: 6,
									paddingVertical: 4,
									borderRadius: 4,
								}}
							>
								<RestyleText style={{ color: "white" }}>
									{item.value} products
								</RestyleText>
							</View>
						);
					}}
				/>
			</HorizontalCard>

			<HorizontalCard title={"Total products bought this month"}>
				<LineChart
					areaChart
					data={totalProductsByDates}
					isAnimated
					thickness={3}
					color={currentTheme.colors.text}
					startOpacity={1}
					width={width * 0.7}
					rulesType='solid'
					endOpacity={0.1}
					animationDuration={2000}
					backgroundColor='transparent'
					startFillColor={currentTheme.colors.lightPrimary}
					endFillColor={currentTheme.colors.primary}
					curved
					yAxisColor={currentTheme.colors.text}
					xAxisColor={currentTheme.colors.text}
					xAxisLabelTextStyle={{ color: currentTheme.colors.text }}
					yAxisTextStyle={{ color: currentTheme.colors.text }}
					showVerticalLines
					dataPointsColor={currentTheme.colors.oppositeText}
					noOfSections={4}
					focusEnabled
					showTextOnFocus
					showDataPointOnFocus
					delayBeforeUnFocus={1000}
					pointerConfig={{
						activatePointersOnLongPress: true,
						pointerStripColor: "red",
						pointerStripWidth: 3,
						strokeDashArray: [1, 4],
						pointerColor: "transparent",
						autoAdjustPointerLabelPosition: true,
						pointerLabelWidth: 100,

						// eslint-disable-next-line react/no-unstable-nested-components
						pointerLabelComponent: (
							item: [{ value: string; label: string }]
						) => {
							console.log(item);
							return (
								<RestyleBox backgroundColor='primary'>
									<RestyleText textAlign='center' style={{ color: "white" }}>
										{item[0]?.value} products
									</RestyleText>
								</RestyleBox>
							);
						},
					}}
					customDataPoint={() => (
						<View
							style={{
								width: 14,
								height: 14,
								backgroundColor: "white",
								borderWidth: 3,
								borderRadius: 7,
								borderColor: "#07BAD1",
							}}
						></View>
					)}
				/>
			</HorizontalCard>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	c1: {
		width: "100%",
		height: "100%",
		display: "flex",
		flex: 1,
	},
});

export default DashboardPage;
