import { View, Text, StyleSheet, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
	Calendar,
	CalendarProvider,
	ExpandableCalendar,
	WeekCalendar,
} from "react-native-calendars";
import RestyleBox from "@/components/RestyleBox";
import { ThemeProvider, backgroundColor } from "@shopify/restyle";
import { theme } from "@/theme";
import { useDarkLightTheme } from "@/components/ThemeContext";

const CalendarComponent = () => {
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
	const { currentTheme } = useDarkLightTheme();
	const [triggerRerender, setTriggerRerender] = useState(false);

	useEffect(() => {
		console.log("Changed current theme");

		setDate(new Date().toISOString().split("T")[0]);
	}, [currentTheme]);

	return (
		<ThemeProvider theme={currentTheme}>
			<CalendarProvider
				// date={ITEMS[1]?.title}
				date={date}
				style={{
					...styles.calendar,
					borderColor: currentTheme.colors.text,
				}}
			>
				<RestyleBox style={{ flex: 1 }}>
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
								selectedColor: currentTheme.colors.primary,
							},
						}}
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
							dayTextColor: currentTheme.colors.text,
							todayTextColor: currentTheme.colors.primary,
							textDayFontWeight: "500" as const,
							textDayStyle: { marginTop: Platform.OS === "android" ? 2 : 4 },
							// selected date
							selectedDayBackgroundColor: currentTheme.colors.primary,
							selectedDayTextColor: currentTheme.colors.text,
							// disabled date
							textDisabledColor: currentTheme.colors.text,
							// dot (marked date)
							dotColor: currentTheme.colors.primary,
							selectedDotColor: currentTheme.colors.primary,
							disabledDotColor: currentTheme.colors.text,
							dotStyle: { marginTop: -2 },
							// backgroundColor: "yellow",
							calendarBackground: currentTheme.colors.mainBackground,
						}}
					/>
				</RestyleBox>
			</CalendarProvider>
		</ThemeProvider>
	);
};

const styles = StyleSheet.create({
	calendar: {
		minHeight: 80,
		flex: 1,
	},
});

export default CalendarComponent;
