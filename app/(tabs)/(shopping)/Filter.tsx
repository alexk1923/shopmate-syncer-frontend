import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import RestyleText from "@/components/RestyleText";
import ToggleButton from "@/components/ToggleButton";

import { useFilterStore } from "@/app/store/useFilterStore";
import Chip from "@/components/Chip";
import SelectionChip from "@/components/SelectionChip";
import Wrapper from "@/components/Wrapper";
import RestyleBox from "@/components/RestyleBox";
import { EXPIRY_STATUS, SORTING_TYPE } from "@/constants/types/ItemTypes";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import FilterGroup from "@/components/FilterGroup";
import AppButton from "@/components/AppButton";
import { router } from "expo-router";

const Filter = () => {
	const currentFilters = useFilterStore((state) => state.filter);
	const setCurrentFilters = useFilterStore((state) => state.setFilter);
	const [filter, setFilter] = useState(currentFilters);

	const filterGroups = [
		{
			id: 1,
			groupName: "Item type",
			chips: [
				{
					id: 1,
					text: "All",
					isSelected: !filter.isFood,
					onSelect: () => {
						setFilter((prev) => {
							return { ...prev, isFood: false };
						});
					},
				},
				{
					id: 2,
					text: "Food",
					isSelected: filter.isFood,
					onSelect: () => {
						setFilter((prev) => {
							return { ...prev, isFood: true };
						});
					},
				},
			],
		},
		{
			id: 2,
			groupName: "Expiry status",
			chips: [
				{
					id: 1,
					text: "All",
					isSelected: filter.expiredStatus === EXPIRY_STATUS.ALL,
					onSelect: () => {
						setFilter((prev) => {
							return { ...prev, expiredStatus: EXPIRY_STATUS.ALL };
						});
					},
				},
				{
					id: 2,
					text: "Expired",
					isSelected: filter.expiredStatus === EXPIRY_STATUS.EXPIRED,
					onSelect: () => {
						setFilter((prev) => {
							return { ...prev, expiredStatus: EXPIRY_STATUS.EXPIRED };
						});
					},
				},
				{
					id: 3,
					text: "Non-Expired",
					isSelected: filter.expiredStatus === EXPIRY_STATUS.NON_EXPIRED,
					onSelect: () => {
						setFilter((prev) => {
							return { ...prev, expiredStatus: EXPIRY_STATUS.NON_EXPIRED };
						});
					},
				},
			],
		},
		{
			id: 3,
			groupName: "Sort by",
			chips: [
				{
					id: 1,
					text: "Alphabetical",
					isSelected: filter.sortBy === SORTING_TYPE.ALPHABETICALLY,
					onSelect: () => {
						setFilter({ ...filter, sortBy: SORTING_TYPE.ALPHABETICALLY });
					},
				},
				{
					id: 2,
					text: "Expiry date",
					isSelected: filter.sortBy === SORTING_TYPE.EXPIRY_DATE,
					onSelect: () => {
						setFilter({ ...filter, sortBy: SORTING_TYPE.EXPIRY_DATE });
					},
				},
			],
		},
	];

	return (
		<Wrapper>
			<RestyleText color='primary' variant='subheader'>
				Filter items
			</RestyleText>

			{filterGroups.map((group) => (
				<FilterGroup group={group} />
			))}
			<AppButton
				variant='outline'
				title='Confirm'
				onPress={() => {
					setCurrentFilters(filter);
					router.back();
				}}
			/>
		</Wrapper>
	);
};

export default Filter;
