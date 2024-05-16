import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { FoodTagKey } from "@/constants/types";
import { theme } from "@/theme";
import FoodTag from "./FoodTag";
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
						borderBottomColor: "black",
						borderBottomWidth: StyleSheet.hairlineWidth,
						paddingBottom: 4,
					}}
					key={i}
				>
					<View style={{ flexDirection: "row", flex: 1, gap: theme.spacing.m }}>
						<FoodTag name={(p.name.toLowerCase() as FoodTagKey) ?? ""} />
						<Text
							style={{
								color: theme.colors.primary,
								fontWeight:
									selectedItem && selectedItem.name === p.name
										? "bold"
										: "normal",
							}}
						>
							{p.name}
						</Text>
					</View>
					{renderDot(p.color)}
				</View>
			))}
		</View>
	);
};

export default PieChartLegend;
