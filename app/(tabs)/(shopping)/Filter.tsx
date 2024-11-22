import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";

import { useFilterStore } from "@/app/store/useFilterStore";

import {
	ADDED_BY_FILTER,
	EXPIRY_STATUS,
	SORTING_TYPE,
} from "@/constants/types/ItemTypes";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { router } from "expo-router";
import FilterGroup from "@/components/Products/FilterGroup";
import RestyleText from "@/components/layout/RestyleText";
import Wrapper from "@/components/layout/Wrapper";
import AppButton from "@/components/misc/AppButton";

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
		{
			id: 4,
			groupName: "Added by",
			chips: [
				{
					id: 1,
					text: "Any member",
					isSelected: filter.addedBy === ADDED_BY_FILTER.ALL,
					onSelect: () => {
						setFilter({ ...filter, addedBy: ADDED_BY_FILTER.ALL });
					},
				},
				{
					id: 2,
					text: "Me",
					isSelected: filter.addedBy === ADDED_BY_FILTER.ME,
					onSelect: () => {
						setFilter({ ...filter, addedBy: ADDED_BY_FILTER.ME });
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
				<FilterGroup key={group.id} group={group} />
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
