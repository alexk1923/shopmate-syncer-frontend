import { View, Text, ViewStyle, StyleProp } from "react-native";
import React from "react";
import RestyleBox from "./RestyleBox";
import RestyleText from "./RestyleText";
import SelectionChip from "./SelectionChip";

type ChipType = {
	id: number;
	text: string;
	isSelected: boolean;
	onSelect: () => void;
};

type FilterGroupType = {
	id: number;
	groupName: string;
	chips: ChipType[];
};

type FilterGroupProps = {
	group: FilterGroupType;
	style?: StyleProp<ViewStyle>;
};

const FilterGroup = ({ group, style }: FilterGroupProps) => {
	return (
		<RestyleBox style={style}>
			<RestyleText variant='label' key={group.id}>
				{group.groupName}
			</RestyleText>

			<RestyleBox flexDirection='row' flexWrap='wrap' gap='s'>
				{group.chips.map((chip) => (
					<SelectionChip
						key={chip.id}
						text={chip.text}
						isSelected={chip.isSelected}
						onSelect={chip.onSelect}
					/>
				))}
			</RestyleBox>
		</RestyleBox>
	);
};

export default FilterGroup;
