import { Image, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

import { theme } from "@/theme";

import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";

import { useEffect, useRef, useState } from "react";
import React from "react";
import RestyleBox from "../layout/RestyleBox";
import HorizontalCard from "../cards/HorizontalCard";
import PieChartLegend from "./PieChartLegend";
import { useDarkLightTheme } from "../ThemeContext";

const PieChartComponent = () => {
	const [selectedItem, setSelectedItem] = useState<(typeof pieData)[0]>(
		{} as (typeof pieData)[0]
	);

	const pieData = [
		{
			value: 60,
			color: FOOD_TAG_INFO.DAIRY.color,
			// gradientCenterColor: "#006DFF",
			name: FOOD_TAG_INFO.DAIRY.name,
			text: "60%",
			// focused: true,
		},
		{
			value: 15,
			color: FOOD_TAG_INFO.MEAT.color,
			// gradientCenterColor: "#094d48",
			name: FOOD_TAG_INFO.MEAT.name,
			text: "15%",
		},
		{
			value: 20,
			color: FOOD_TAG_INFO.SNACKS.color,
			// gradientCenterColor: "#8F80F3",
			name: FOOD_TAG_INFO.SNACKS.name,
			text: "20%",
		},
		{
			value: 5,
			color: FOOD_TAG_INFO.SWEETS.color,
			// gradientCenterColor: "#FF7F97",
			name: FOOD_TAG_INFO.SWEETS.name,
			text: "5%",
		},
	];

	const MemoizedPieChart = React.memo(PieChart);

	const { currentTheme } = useDarkLightTheme();

	return (
		<HorizontalCard title='Last 30 days'>
			<RestyleBox flexDirection='row' gap='m' justifyContent='center'>
				<MemoizedPieChart
					data={pieData}
					// donut
					textColor={currentTheme.colors.oppositeText}
					textSize={16}
					focusOnPress
					showValuesAsLabels
					textBackgroundRadius={26}
					fontWeight='bold'
					strokeWidth={2}
					strokeColor={currentTheme.colors.primary}
					onPress={(item: (typeof pieData)[0], index: number) => {
						item = item;
					}}
					showText
					radius={60}
					sectionAutoFocus
				/>

				<PieChartLegend pieData={pieData} selectedItem={selectedItem} />
			</RestyleBox>
		</HorizontalCard>
	);
};

export default PieChartComponent;
