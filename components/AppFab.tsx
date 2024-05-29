import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import RestyleBox from "./RestyleBox";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FontAwesome6 } from "@expo/vector-icons";
import {
	BackgroundColorProps,
	ResponsiveValue,
	VariantProps,
} from "@shopify/restyle";
import { Theme } from "@/theme";

type AppFabProps = BackgroundColorProps<Theme> & {
	size: number;
	onPress: () => void;
	iconName: string;
	iconColor: string;
};

const AppFab = (props: AppFabProps) => {
	const { size, backgroundColor, onPress, iconName, iconColor } = props;

	return (
		<RestyleBox
			width={size}
			height={size}
			justifyContent='center'
			alignItems='center'
			borderRadius={90}
			backgroundColor={backgroundColor}
		>
			<GestureHandlerRootView
				style={{ justifyContent: "center", alignItems: "center" }}
			>
				<TouchableOpacity onPress={onPress}>
					<FontAwesome6 name={iconName} size={size * 0.5} color={iconColor} />
				</TouchableOpacity>
			</GestureHandlerRootView>
		</RestyleBox>
	);
};

export default AppFab;
