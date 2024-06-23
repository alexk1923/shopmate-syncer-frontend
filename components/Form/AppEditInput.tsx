import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TextInputProps,
} from "react-native";
import React, { useState } from "react";
import { theme } from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import { useDarkLightTheme } from "../ThemeContext";

type InputProps = {
	label: string;
	placeholder: string;
	iconName?: string;
	iconColor?: string;
	iconSize?: number;
	autocomplete?: TextInputProps["autoComplete"];
	defaultValue?: string;
	value: string;
	editable?: boolean;
	onChangeText: (val: any) => void;
};

const AppEditInput = (props: InputProps) => {
	const {
		label,
		placeholder,
		autocomplete,
		iconName = "pencil",
		iconColor,
		iconSize = 24,
		defaultValue,
		value,
		editable,
		onChangeText,
	} = props;
	const { currentTheme } = useDarkLightTheme();
	const [isFocused, setIsFocused] = useState(false);

	return (
		<View>
			<RestyleText variant='label'>{label}</RestyleText>
			<RestyleBox
				style={styles.searchSection}
				backgroundColor='mainBackground'
				borderColor={isFocused ? "primary" : "gray"}
			>
				<TextInput
					placeholder={placeholder}
					style={[
						styles.input,
						{
							color: isFocused
								? currentTheme.colors.primary
								: currentTheme.colors.text,
						},
					]}
					editable={editable ?? true}
					autoComplete={autocomplete}
					defaultValue={defaultValue}
					value={value}
					onChangeText={onChangeText}
					onFocus={() => setIsFocused(true)}
					numberOfLines={5}
				></TextInput>
				<FontAwesome6
					name={iconName}
					size={iconSize}
					color={
						isFocused ? currentTheme.colors.primary : currentTheme.colors.gray
					}
					style={[styles.searchIcon]}
				/>
			</RestyleBox>
		</View>
	);
};

const styles = StyleSheet.create({
	searchSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderWidth: 1,
		alignItems: "center",
		// backgroundColor: currentTheme.colors.mainBackground,
		borderRadius: 5,
		height: 50,
	},
	input: {
		paddingRight: theme.spacing.m,
		paddingLeft: theme.spacing.m,
		fontWeight: "bold",
		height: "100%",
		width: "100%",
		flex: 1,
	},

	searchIcon: {
		paddingRight: theme.spacing.m,
	},
});
export default AppEditInput;
