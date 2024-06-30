import { Theme, theme } from "@/theme";
import {
	StyleSheet,
	ViewStyle,
	Pressable,
	StyleProp,
	TouchableOpacity,
	ActivityIndicator,
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
	variant: "filled" | "outline" | "error";
	fullWidth?: boolean;
	loading?: boolean;
	style?: StyleProp<ViewStyle>;
};

const ButtonContainer = createRestyleComponent<ButtonProps, Theme>(
	[buttonVariant],
	LinearGradient
);

const AppButton = ({
	onPress,
	title,
	variant,
	fullWidth,
	loading = false,
	style,
}: Props) => {
	const { currentTheme } = useDarkLightTheme();
	const getTextColor = () => {
		switch (variant) {
			case "filled":
				return "lightText";
			case "outline":
				return "primary";
			case "error":
				return "error";
			default:
				return "primary";
		}
	};

	const getBgColor = () => {
		switch (variant) {
			case "filled":
				return [
					currentTheme.colors.lightPrimary,
					currentTheme.colors.primary,
					currentTheme.colors.darkPrimary,
				];
			case "outline":
				return ["transparent", "transparent"];
			case "error":
				return ["transparent", "transparent"];
			default:
				return [
					currentTheme.colors.lightPrimary,
					currentTheme.colors.primary,
					currentTheme.colors.darkPrimary,
				];
		}
	};

	return (
		<TouchableOpacity onPress={onPress} disabled={loading}>
			<LinearGradient
				colors={getBgColor()}
				style={[
					styles.appButtonContainer,
					variant === "outline" && {
						borderWidth: 1,
						borderColor: currentTheme.colors.primary,
					},
					variant === "error" && {
						borderWidth: 1,
						borderColor: currentTheme.colors.error,
					},

					StyleSheet.flatten(style),
				]}
			>
				{/* <ButtonContainer
				variant={variant}
				style={{ ...styles.appButtonContainer, ...StyleSheet.flatten(style) }}
				onPress={onPress}
			> */}

				{loading ? (
					<ActivityIndicator />
				) : (
					<RestyleText
						color={getTextColor()}
						textAlign='center'
						fontWeight='bold'
						textTransform='uppercase'
						variant='buttonSmall'
					>
						{title}
					</RestyleText>
				)}

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
