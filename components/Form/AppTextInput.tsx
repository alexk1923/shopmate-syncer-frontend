import { FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import {
	Control,
	Controller,
	FieldErrors,
	Noop,
	RegisterOptions,
} from "react-hook-form";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import RestyleText from "../RestyleText";
import { useDarkLightTheme } from "../ThemeContext";
import { theme } from "@/theme";

type AppTextInputProps = {
	control: Control<FormData, any>;
	errors: FieldErrors<FormData>;
	placeholder: string;
	inputKey: string;
	rules: RegisterOptions<FormData, any>;
	iconName: string;
	isPassword?: boolean;
};

const AppTextInput = ({
	control,
	errors,
	placeholder,
	inputKey,
	rules,
	iconName,
	isPassword,
}: AppTextInputProps) => {
	const { currentTheme } = useDarkLightTheme();
	const [showPassword, setShowPassword] = useState(false);
	const [focused, setFocused] = useState(false);

	return (
		<View>
			<View
				style={[
					styles.searchSection,
					{ backgroundColor: currentTheme.colors.mainBackground },
					// @ts-ignore
					errors[inputKey as keyof FieldErrors<FormDataType>]
						? {
								borderColor: currentTheme.colors.error,
						  }
						: focused && { borderColor: currentTheme.colors.primary },
				]}
			>
				<Controller
					control={control}
					render={({ field: { onChange, value, onBlur } }) => (
						<>
							<FontAwesome6
								name={iconName}
								size={24}
								color={
									focused && !errors[inputKey as keyof FieldErrors<FormData>]
										? currentTheme.colors.primary
										: currentTheme.colors.gray
								}
								style={styles.searchIcon}
							/>

							<TextInput
								placeholder={placeholder}
								style={[styles.input, { color: currentTheme.colors.text }]}
								value={value}
								onChangeText={(value) => onChange(value)}
								onBlur={() => {
									setFocused(false);
									onBlur();
								}}
								onFocus={() => setFocused(true)}
								secureTextEntry={isPassword && !showPassword}
							/>

							{isPassword && (
								<Pressable
									onPress={() => {
										setShowPassword((prevPassword) => !prevPassword);
									}}
								>
									<FontAwesome6
										name={showPassword ? "eye" : "eye-slash"}
										size={24}
										color={
											focused &&
											!errors[inputKey as keyof FieldErrors<FormData>]
												? currentTheme.colors.primary
												: currentTheme.colors.gray
										}
										style={styles.searchIcon}
									/>
								</Pressable>
							)}
						</>
					)}
					name={inputKey as any}
					rules={rules}
				/>
			</View>
			{errors[inputKey as keyof FieldErrors<FormData>] && (
				// @ts-ignore
				<RestyleText color='error'>{errors[inputKey].message}</RestyleText>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		paddingRight: theme.spacing.m,
		paddingLeft: theme.spacing.m,

		height: "100%",
		flex: 1,
	},
	searchSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderColor: theme.colors.gray,
		alignItems: "center",

		height: 50,
	},
	searchIcon: {
		// paddingLeft: theme.spacing.l,
	},
});

export default AppTextInput;
