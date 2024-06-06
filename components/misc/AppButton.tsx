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

import { LinearGradient } from "expo-linear-gradient";
import { useDarkLightTheme } from "../ThemeContext";
import RestyleText from "../layout/RestyleText";

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
	LinearGradient
);

const AppButton = ({ onPress, title, variant, fullWidth, style }: Props) => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<TouchableOpacity onPress={onPress}>
			<LinearGradient
				colors={
					variant === "filled"
						? [
								currentTheme.colors.lightPrimary,
								currentTheme.colors.primary,
								currentTheme.colors.darkPrimary,
						  ]
						: ["transparent", "transparent"]
				}
				style={[
					styles.appButtonContainer,
					variant === "outline" && {
						borderWidth: 1,
						borderColor: currentTheme.colors.primary,
					},

					StyleSheet.flatten(style),
				]}
			>
				{/* <ButtonContainer
				variant={variant}
				style={{ ...styles.appButtonContainer, ...StyleSheet.flatten(style) }}
				onPress={onPress}
			> */}
				<RestyleText
					color={variant === "filled" ? "lightText" : "primary"}
					textAlign='center'
					fontWeight='bold'
					textTransform='uppercase'
					variant='buttonSmall'
				>
					{title}
				</RestyleText>
				{/* </ButtonContainer> */}
			</LinearGradient>
		</TouchableOpacity>
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

	outlineContainer: {
		borderWidth: 1,
	},
});

export default AppButton;
