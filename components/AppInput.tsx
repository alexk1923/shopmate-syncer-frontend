import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TextInputProps,
} from "react-native";
import React from "react";
import { theme } from "@/theme";
import { FontAwesome6 } from "@expo/vector-icons";
import RestyleText from "./RestyleText";
import { useDarkLightTheme } from "./ThemeContext";
import RestyleBox from "./RestyleBox";

type InputProps = {
	label: string;
	placeholder: string;
	iconName: string;
	iconColor: string;
	iconSize: number;
	autocomplete?: TextInputProps["autoComplete"];
	defaultValue?: string;
	value: string;
	onChangeText: (val: any) => void;
};

const AppInput = (props: InputProps) => {
	const {
		label,
		placeholder,
		autocomplete,
		iconName,
		iconColor,
		iconSize,
		defaultValue,
		value,
		onChangeText,
	} = props;
	const { currentTheme } = useDarkLightTheme();

	return (
		<View>
			<RestyleText variant='label'>{label}</RestyleText>
			<RestyleBox style={styles.searchSection} backgroundColor='mainBackground'>
				<TextInput
					placeholder={placeholder}
					style={styles.input}
					autoComplete={autocomplete}
					defaultValue={defaultValue}
					value={value}
					onChangeText={onChangeText}
				></TextInput>
				<FontAwesome6
					name={iconName}
					size={iconSize}
					color={currentTheme.colors.gray}
					style={[styles.searchIcon]}
				/>
			</RestyleBox>
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		paddingRight: theme.spacing.m,
		paddingLeft: theme.spacing.m,
		color: theme.colors.text,
		height: "100%",
		width: "100%",
		flex: 1,
	},
	searchSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#424242",
		alignItems: "center",
		// backgroundColor: currentTheme.colors.mainBackground,
		borderRadius: 5,
		height: 50,
	},
	searchIcon: {
		paddingRight: theme.spacing.m,
	},
});
export default AppInput;
