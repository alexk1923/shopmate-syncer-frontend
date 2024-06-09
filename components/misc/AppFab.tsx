import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import {
	BackgroundColorProps,
	ResponsiveValue,
	VariantProps,
} from "@shopify/restyle";
import { Theme } from "@/theme";
import RestyleBox from "../layout/RestyleBox";

type AppFabProps = {
	size: number;
	onPress: () => void;
	iconName: string;
	iconColor: string;
	backgroundColor: string;
};

const AppFab = (props: AppFabProps) => {
	const { size, backgroundColor, onPress, iconName, iconColor } = props;

	return (
		<TouchableOpacity onPress={onPress}>
			<RestyleBox
				width={size}
				height={size}
				justifyContent='center'
				alignItems='center'
				borderRadius={90}
				style={{ backgroundColor }}
			>
				<FontAwesome6 name={iconName} size={size * 0.5} color={iconColor} />
			</RestyleBox>
		</TouchableOpacity>
	);
};

export default AppFab;
