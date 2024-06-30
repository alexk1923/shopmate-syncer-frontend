import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { Fragment, useEffect, useState } from "react";

import { useDarkLightTheme } from "@/components/ThemeContext";

import { useShoppingSchedule } from "@/app/hooks/useShoppingSchedule";

import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import { ShoppingSchedule } from "@/constants/types/ShoppingSchedule";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import Separator from "@/components/layout/Separator";
import Wrapper from "@/components/layout/Wrapper";
import LoadingOverlay from "@/components/modals/LoadingOverlay";

type GroupType = {
	[key: string]: ShoppingSchedule[];
};

const ScheduleHistory = () => {
	const { currentTheme } = useDarkLightTheme();
	const { shoppingScheduleQuery, deleteScheduleMutation } =
		useShoppingSchedule();
	const [eventDays, setEventDays] = useState<Date[]>([]);
	const [groupedSchedules, setGroupedSchedules] = useState<GroupType>(
		{} as GroupType
	);

	useEffect(() => {
		if (shoppingScheduleQuery.data) {
			const grouped = groupByDate(shoppingScheduleQuery.data);

			setGroupedSchedules(grouped);
		}
	}, [shoppingScheduleQuery.data]);

	const groupByDate = (data: ShoppingSchedule[]) => {
		return data.reduce((acc, item) => {
			const date = new Date(item.shoppingDate).toLocaleDateString();
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(item);
			return acc;
		}, {} as GroupType);
	};

	const handleRemove = (scheduleId: number) => {
		Alert.alert(
			"Delete Schedule",
			"Are you sure you want to delete this schedule?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "Delete",
					onPress: () => {
						deleteScheduleMutation.mutate({ scheduleId });
					},
					style: "destructive",
				},
			],
			{ cancelable: false }
		);
	};

	return (
		<Wrapper>
			<RestyleText variant='header' color='primary'>
				Schedule
			</RestyleText>
			<Separator color={currentTheme.colors.primary} />

			<ScrollView contentContainerStyle={{ gap: currentTheme.spacing.m }}>
				<LoadingOverlay isVisible={deleteScheduleMutation.isPending} />
				{Object.entries(groupedSchedules).map(([date, scheduleList]) => (
					<RestyleBox key={date} gap='m'>
						<RestyleBox flexDirection='row' alignItems='center' gap='m'>
							<FontAwesome6
								name='calendar-days'
								size={24}
								color={currentTheme.colors.primary}
							/>
							<RestyleText variant='subheader' color='text'>
								{date}
							</RestyleText>
						</RestyleBox>

						{scheduleList.map((schedule) => (
							<RestyleBox
								flexDirection='row'
								key={schedule.id}
								justifyContent='space-between'
								alignItems='center'
							>
								<RestyleBox flexDirection='row' gap='m'>
									<RestyleBox>
										<RestyleText variant='body' fontWeight='bold' color='text'>
											{schedule.title}
										</RestyleText>
										<RestyleText color='text'>{`Added by ${schedule.createdBy.firstName} ${schedule.createdBy.lastName}`}</RestyleText>
									</RestyleBox>
								</RestyleBox>
								<TouchableOpacity onPress={() => handleRemove(schedule.id)}>
									<FontAwesome name='close' size={24} color='red' />
								</TouchableOpacity>
							</RestyleBox>
						))}
					</RestyleBox>
				))}
			</ScrollView>
		</Wrapper>
	);
};

export default ScheduleHistory;
