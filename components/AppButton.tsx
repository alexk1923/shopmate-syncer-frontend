import { Theme, theme } from "@/theme";
import {
	StyleSheet,
	ViewStyle,
	Pressable,
	StyleProp,
	TouchableOpacity,
} from "react-native";
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
	style?: StyleProp<ViewStyle>;
};

const ButtonContainer = createRestyleComponent<ButtonProps, Theme>(
	[buttonVariant],
	Pressable
);

const AppButton = ({ onPress, title, variant, fullWidth, style }: Props) => {
	return (
		<ButtonContainer
			variant={variant}
			onPress={() => {
				console.log("Button pressed");
				onPress();
			}}
			style={{ ...styles.appButtonContainer, ...StyleSheet.flatten(style) }}
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
		borderRadius: 15,
		paddingVertical: theme.spacing.m,
		paddingHorizontal: theme.spacing.xl,
		alignSelf: "center",
	},
});

export default AppButton;
