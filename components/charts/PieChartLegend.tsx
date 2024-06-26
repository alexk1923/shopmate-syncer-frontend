import { View, Text, StyleSheet } from "react-native";
import React from "react";

import { theme } from "@/theme";
import { FoodTagKey } from "@/constants/types/ProductTypes";
import { useDarkLightTheme } from "../ThemeContext";
import RestyleText from "../layout/RestyleText";
import FoodTag from "../misc/FoodTag";

const renderDot = (color: string) => {
	return (
		<View
			style={{
				height: 10,
				width: 10,
				borderRadius: 5,
				backgroundColor: color,
			}}
		/>
	);
};

type PieChartLegendProps = {
	pieData: {
		value: number;
		color: string;
		name: string;
	}[];

	selectedItem: {
		value: number;
		color: string;
		name: string;
	};
};

const PieChartLegend = ({ pieData, selectedItem }: PieChartLegendProps) => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<View
			style={{
				justifyContent: "center",
				marginBottom: 10,
				alignItems: "center",
				flex: 1,
				gap: theme.spacing.s,
			}}
		>
			{pieData.map((p, i) => (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
						borderBottomColor: currentTheme.colors.text,
						borderBottomWidth: StyleSheet.hairlineWidth,
						paddingBottom: 4,
					}}
					key={i}
				>
					<View style={{ flexDirection: "row", flex: 1, gap: theme.spacing.m }}>
						<FoodTag name={(p.name.toLowerCase() as FoodTagKey) ?? ""} />
						<RestyleText
							style={{
								fontWeight:
									selectedItem && selectedItem.name === p.name
										? "bold"
										: "normal",
							}}
							color='text'
						>
							{p.name}
						</RestyleText>
					</View>
					{renderDot(p.color)}
				</View>
			))}
		</View>
	);
};

export default PieChartLegend;
