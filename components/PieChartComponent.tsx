import { Image, Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import RestyleBox from "./RestyleBox";
import { theme } from "@/theme";
import FoodTag from "./FoodTag";
import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import RestyleText from "./RestyleText";
import HorizontalCard from "./HorizontalCard";
import { FoodTagKey } from "@/constants/types";
import { useEffect, useRef, useState } from "react";
import React from "react";
import PieChartLegend from "./PieChartLegend";
import { useDarkLightTheme } from "./ThemeContext";

const PieChartComponent = () => {
	const [selectedItem, setSelectedItem] = useState<(typeof pieData)[0]>(
		{} as (typeof pieData)[0]
	);

	const pieData = [
		{
			value: 60,
			color: FOOD_TAG_INFO.dairy.color,
			// gradientCenterColor: "#006DFF",
			name: FOOD_TAG_INFO.dairy.name,
			text: "60%",
			// focused: true,
		},
		{
			value: 15,
			color: FOOD_TAG_INFO.meat.color,
			// gradientCenterColor: "#094d48",
			name: FOOD_TAG_INFO.meat.name,
			text: "15%",
		},
		{
			value: 20,
			color: FOOD_TAG_INFO.snacks.color,
			// gradientCenterColor: "#8F80F3",
			name: FOOD_TAG_INFO.snacks.name,
			text: "20%",
		},
		{
			value: 5,
			color: FOOD_TAG_INFO.sweets.color,
			// gradientCenterColor: "#FF7F97",
			name: FOOD_TAG_INFO.sweets.name,
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
						console.log(item);
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
