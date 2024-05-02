import { Theme, theme } from "@/theme";
import { TouchableOpacity, StyleSheet, View, ViewStyle } from "react-native";
import {
	BackgroundColorProps,
	ColorProps,
	VariantProps,
	backgroundColor,
	color,
	composeRestyleFunctions,
	createBox,
	createRestyleComponent,
	createText,
	createVariant,
	spacing,
	useRestyle,
} from "@shopify/restyle";
import React, { useEffect } from "react";
import { Link, useNavigation } from "expo-router";

type RestyleProps = BackgroundColorProps<Theme> & ColorProps<Theme>;

const restyleFunctions = composeRestyleFunctions<Theme, RestyleProps>([
	color,
	backgroundColor,
]);

const Box = createBox<Theme>();
const buttonVariant = createVariant({ themeKey: "buttonVariants" });

type ButtonProps = VariantProps<Theme, "buttonVariants"> & {
	onPress: () => void;
	variant: "filled" | "outline";
	children: React.ReactNode;
	style?: ViewStyle;
};

type Props = {
	title: string;
	onPress: () => void;
	variant: "filled" | "outline";
};

const ButtonContainer = createRestyleComponent<ButtonProps, Theme>(
	[buttonVariant],
	TouchableOpacity
);

const AppButton = ({ onPress, title, variant }: Props) => {
	const Text = createText<Theme>();

	return (
		<ButtonContainer
			variant={variant}
			onPress={onPress}
			style={styles.appButtonContainer}
		>
			<Text
				style={[styles.appButtonText]}
				color={variant === "filled" ? "mainText" : "primary"}
			>
				{title}
			</Text>
		</ButtonContainer>
	);
};

const styles = StyleSheet.create({
	// ...
	appButtonContainer: {
		elevation: 8,
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	appButtonText: {
		fontSize: 18,
		fontWeight: "bold",
		alignSelf: "center",
		textTransform: "uppercase",
	},
});

export default AppButton;
