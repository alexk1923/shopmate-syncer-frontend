import {
	View,
	Text,
	StyleSheet,
	ScrollView,
	Platform,
	SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	CalendarProvider,
	DateData,
	WeekCalendar,
} from "react-native-calendars";

import { useDarkLightTheme } from "@/components/ThemeContext";
import { useShoppingSchedule } from "@/app/hooks/useShoppingSchedule";
import { useFocusEffect } from "expo-router";
import RestyleBox from "../layout/RestyleBox";
import { convertDateToLocaleISO } from "@/app/utils/convertDateToLocaleISO";

type CalendarComponentProps = {
	onDayLongPress: (date: DateData) => void;
};

const CalendarComponent = ({ onDayLongPress }: CalendarComponentProps) => {
	const [date, setDate] = useState<Date | string>(new Date());
	const { currentTheme } = useDarkLightTheme();

	const [markedDays, setMarkedDays] = useState({});
	const { shoppingScheduleQuery } = useShoppingSchedule();

	useEffect(() => {
		if (shoppingScheduleQuery.data) {
			let newMarkedDates = {};

			shoppingScheduleQuery.data?.map(
				(schedule) => {
					const localDateString = new Date(
						schedule.shoppingDate
					).toLocaleDateString("en-GB");
					const [day, month, year] = localDateString.split("/");
					newMarkedDates = {
						...newMarkedDates,
						[`${year}-${month}-${day}`]: {
							marked: true,
							selectedColor: currentTheme.colors.primary,
							selectedTextColor: "white",
						},
					};
					setMarkedDays(newMarkedDates);
				}

				// setMarkedDays((prev) => {
				// 	const localDateString = new Date(
				// 		schedule.shoppingDate
				// 	).toLocaleDateString("en-GB");
				// 	const [day, month, year] = localDateString.split("/");

				// 	return {
				// 		...prev,
				// 		[`${year}-${month}-${day}`]: {
				// 			marked: true,
				// 			selectedColor: currentTheme.colors.primary,
				// 			selectedTextColor: "white",
				// 		},
				// 	};
				// })
			);
		}
	}, [shoppingScheduleQuery.data]);

	useEffect(() => {
		const localDate = new Date().toLocaleDateString("en-GB");
		const [day, month, year] = localDate.split("/");

		setDate(`${year}-${month}-${day}`);
	}, [currentTheme]);

	useFocusEffect(
		React.useCallback(() => {
			shoppingScheduleQuery.refetch();
		}, [shoppingScheduleQuery.refetch])
	);

	return (
		<SafeAreaView style={styles.calendar}>
			<View key={currentTheme.colors.mainBackground}>
				<CalendarProvider
					// date={ITEMS[1]?.title}
					// date={date}
					date={date}
					style={{
						...styles.calendar,
						borderColor: currentTheme.colors.text,
					}}
				>
					<RestyleBox style={{ flex: 1 }}>
						<WeekCalendar
							hideArrows={false}
							// monthFormat='mm'
							// hideDayNames
							minDate='2023-01-01'
							animateScroll
							enableSwipeMonths
							scrollEnabled
							horizontal
							firstDay={1}
							allowShadow
							onDayLongPress={onDayLongPress}
							markedDates={markedDays}
							theme={{
								// arrows
								arrowColor: currentTheme.colors.text,
								arrowStyle: { padding: 0 },
								// month
								monthTextColor: currentTheme.colors.text,
								textMonthFontWeight: "bold" as const,
								// day names
								textSectionTitleColor: currentTheme.colors.text,
								textDayHeaderFontWeight: "normal" as const,
								// dates
								dayTextColor: currentTheme.colors.primary,
								todayTextColor: currentTheme.colors.primary,
								textDayFontWeight: "500" as const,
								textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
								// selected date
								selectedDayBackgroundColor: currentTheme.colors.primary,
								selectedDayTextColor: "white",
								// disabled date
								textDisabledColor: currentTheme.colors.text,
								// dot (marked date)
								dotColor: currentTheme.colors.primary,
								selectedDotColor: "white",
								disabledDotColor: currentTheme.colors.text,
								dotStyle: { marginTop: -2 },
								// backgroundColor: "yellow",
								calendarBackground: currentTheme.colors.mainBackground,
							}}
						/>
					</RestyleBox>
				</CalendarProvider>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	calendar: {
		minHeight: 80,
		// flex: 1,
	},
});

export default CalendarComponent;
