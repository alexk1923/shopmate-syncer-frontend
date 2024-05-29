import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ImageSourcePropType,
	ListRenderItemInfo,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import RestyleBox from "./RestyleBox";
import RestyleText from "./RestyleText";
import { useDarkLightTheme } from "./ThemeContext";

type TagPickerProps = {
	item: ListRenderItemInfo<{ name: string; uri: ImageSourcePropType }>;
	updateTags: (newTag: string) => void;
	initialTags: string[];
	itemKey: string;
};

const TagPickerItem = ({
	item,
	updateTags,
	initialTags,
	itemKey,
}: TagPickerProps) => {
	const [selected, setSelected] = useState(false);
	const { currentTheme } = useDarkLightTheme();

	useEffect(() => {
		if (initialTags.includes(itemKey)) {
			setSelected(true);
		}
	}, []);

	return (
		<TouchableOpacity
			onPress={() => {
				setSelected((prev) => !prev);
				updateTags(itemKey);
			}}
		>
			<RestyleBox
				backgroundColor={selected ? "primary" : "mainBackground"}
				style={{ borderWidth: 1, borderColor: currentTheme.colors.primary }}
				alignItems='center'
				justifyContent='center'
				flex={1}
				aspectRatio={"5/4"}
				// borderRadius={15}
			>
				<Image
					source={item.item.uri}
					style={{
						width: 32,
						height: 32,
					}}
				/>

				<RestyleText
					numberOfLines={1}
					color={selected ? "oppositeText" : "primary"}
				>
					{item.item.name}
				</RestyleText>
			</RestyleBox>
		</TouchableOpacity>
	);
};

export default TagPickerItem;
