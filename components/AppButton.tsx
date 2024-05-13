import { Theme, theme } from "@/theme";
import { StyleSheet, ViewStyle, Pressable } from "react-native";
import {
	VariantProps,
	createRestyleComponent,
	createVariant,
} from "@shopify/restyle";
import React from "react";
import RestyleText from "./RestyleText";

const buttonVariant = createVariant({ themeKey: "buttonVariants" });

type ButtonProps = VariantProps<Theme, "buttonVariants"> & {
	onPress: () => void;
	children: React.ReactNode;
	style?: ViewStyle;
};

type Props = {
	title: string;
	onPress: () => void;
	variant: "filled" | "outline";
	fullWidth?: boolean;
};

const ButtonContainer = createRestyleComponent<ButtonProps, Theme>(
	[buttonVariant],
	Pressable
);

const AppButton = ({ onPress, title, variant, fullWidth }: Props) => {
	return (
		<ButtonContainer
			variant={variant}
			onPress={onPress}
			style={
				fullWidth
					? { ...styles.appButtonContainer, width: "100%" }
					: styles.appButtonContainer
			}
		>
			<RestyleText
				color={variant === "filled" ? "lightText" : "primary"}
				textAlign='center'
				fontWeight='bold'
				textTransform='uppercase'
				variant='buttonSmall'
			>
				{title}
			</RestyleText>
		</ButtonContainer>
	);
};

const styles = StyleSheet.create({
	// ...
	appButtonContainer: {
		elevation: 8,
		borderRadius: 15,
		paddingVertical: theme.spacing.m,
		paddingHorizontal: theme.spacing.xl,
		alignSelf: "center",
	},
});

export default AppButton;
