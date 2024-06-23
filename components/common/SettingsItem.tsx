import { View, Text } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import ToggleButton from "../misc/ToggleButton";
import { useDarkLightTheme } from "../ThemeContext";

export type SettingsType = {
	id: number;
	title: string;
	icon: string;
	url?: string;
	toggle?: boolean;
	showOption?: boolean;
	value?: boolean;
	onPress?: () => void;
};

const SettingsItem = ({ item }: { item: SettingsType }) => {
	const { currentTheme } = useDarkLightTheme();

	return (
		<RestyleBox
			backgroundColor='cardBackground'
			padding='s'
			borderRadius={5}
			flexDirection='row'
			alignItems='center'
			justifyContent='space-between'
		>
			<RestyleBox flexDirection='row' alignItems='center' gap='s'>
				<RestyleBox
					width={32}
					height={32}
					justifyContent='center'
					alignItems='center'
					borderRadius={90}
					style={{
						backgroundColor: currentTheme.colors.mainBackground,
					}}
				>
					<FontAwesome6
						name={item.icon}
						size={16}
						color={currentTheme.colors.primary}
					/>
				</RestyleBox>
				<RestyleText color='primary' variant='bodyBold'>
					{item.title}
				</RestyleText>
			</RestyleBox>

			{item.toggle && Object.hasOwn(item, "value") && item.onPress && (
				<ToggleButton value={item.value ?? false} onPress={item.onPress} />
			)}

			{item.showOption ? (
				<RestyleBox flexDirection='row' alignItems='center'>
					<RestyleText variant='label'>English</RestyleText>
					<FontAwesome6
						name='chevron-right'
						size={24}
						color={currentTheme.colors.gray}
					/>
				</RestyleBox>
			) : (
				!item.toggle && (
					<FontAwesome6
						name='chevron-right'
						size={24}
						color={currentTheme.colors.gray}
					/>
				)
			)}
		</RestyleBox>
	);
};

export default SettingsItem;
