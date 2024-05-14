import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import React from "react";
import {
	Calendar,
	CalendarProvider,
	ExpandableCalendar,
	WeekCalendar,
} from "react-native-calendars";
import RestyleBox from "@/components/RestyleBox";
import { backgroundColor } from "@shopify/restyle";
import { theme } from "@/theme";

const CalendarComponent = () => {
	return (
		<>
			<CalendarProvider
				// date={ITEMS[1]?.title}
				// onDateChanged={onDateChanged}
				// onMonthChange={onMonthChange}
				date={new Date().toISOString().split("T")[0]}
				// showTodayButton={true}
				style={styles.calendar}
			>
				<View style={{ flex: 1 }}>
					<WeekCalendar
						hideArrows={false}
						// hideDayNames
						minDate='2023-01-01'
						animateScroll
						enableSwipeMonths
						scrollEnabled
						horizontal
						firstDay={1}
						allowShadow
						markedDates={{
							"2024-05-17": {
								// selected: true,
								marked: true,
								selectedColor: theme.colors.primary,
							},
						}}
						theme={{
							// arrows
							arrowColor: "black",
							arrowStyle: { padding: 0 },
							// month
							monthTextColor: "black",
							textMonthFontWeight: "bold" as const,
							// day names
							textSectionTitleColor: "black",
							textDayHeaderFontWeight: "normal" as const,
							// dates
							dayTextColor: theme.colors.darkText,
							todayTextColor: theme.colors.primary,
							textDayFontWeight: "500" as const,
							textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
							// selected date
							selectedDayBackgroundColor: theme.colors.primary,
							selectedDayTextColor: theme.colors.lightText,
							// disabled date
							textDisabledColor: theme.colors.lightText,
							// dot (marked date)
							dotColor: theme.colors.primary,
							selectedDotColor: theme.colors.primary,
							disabledDotColor: theme.colors.lightText,
							dotStyle: { marginTop: -2 },
							backgroundColor: theme.colors.mainBackground,
							calendarBackground: theme.colors.mainBackground,
						}}
					/>
				</View>
			</CalendarProvider>
		</>
	);
};

const styles = StyleSheet.create({
	calendar: {
		minHeight: 100,
	},
});

export default CalendarComponent;
