import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import AppButton from "./AppButton";
import AppEditInput from "./Form/AppEditInput";
import AppModal from "./AppModal";
import RestyleBox from "./RestyleBox";
import RestyleText from "./RestyleText";

import AppFab from "./AppFab";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useDarkLightTheme } from "./ThemeContext";
import {
	ShoppingDayType,
	ShoppingSchedule,
} from "@/constants/types/ShoppingSchedule";

import { router } from "expo-router";

type ScheduleModalProps = {
	open: boolean;
	setOpen: (isOpen: boolean) => void;
	handleSubmit: () => void;
	shoppingSchedule: Omit<ShoppingDayType, "shoppingDate"> & {
		shoppingDate: Date | null;
	};
	setShoppingSchedule: React.Dispatch<
		React.SetStateAction<
			Omit<ShoppingDayType, "shoppingDate"> & { shoppingDate: Date | null }
		>
	>;
	isError: boolean;
	isPending: boolean;
	errorMessage?: string;
	existingSchedule: ShoppingSchedule | null;
};

const ScheduleModal = ({
	open,
	setOpen,
	shoppingSchedule,
	setShoppingSchedule,
	handleSubmit,
	isError,
	isPending,
	errorMessage,
	existingSchedule,
}: ScheduleModalProps) => {
	const { currentTheme } = useDarkLightTheme();
	const [datePickerOpen, setDatePickerOpen] = useState(false);

	const onChange = (event: DateTimePickerEvent, date?: Date) => {
		if (date) {
			const localDate = date?.toLocaleDateString("en-GB");
			const [day, month, year] = localDate.split("/");

			console.log("my local date is:");
			console.log(localDate);
			const generalDate = new Date(
				Number(year),
				Number(month) - 1,
				Number(day),
				0,
				0,
				0,
				0
			);

			console.log("general date:");
			console.log(generalDate);
			setDatePickerOpen(false);
			setShoppingSchedule({ ...shoppingSchedule, shoppingDate: generalDate });
		}
	};

	return (
		<AppModal
			modalVisible={open}
			onModalClose={() => setOpen(false)}
			title={"Schedule shopping"}
		>
			{datePickerOpen && (
				<DateTimePicker
					value={shoppingSchedule.shoppingDate ?? new Date()}
					mode={"date"}
					onChange={onChange}
				/>
			)}
			<RestyleBox gap='m'>
				<AppEditInput
					label='Title'
					placeholder='e.g. Regular shopping'
					value={shoppingSchedule.title}
					onChangeText={(val) =>
						setShoppingSchedule({ ...shoppingSchedule, title: val })
					}
				/>

				<RestyleBox>
					<RestyleBox flexDirection='row' gap='s' alignItems='center'>
						<RestyleText variant='label'>Selected date:</RestyleText>
						<AppFab
							size={35}
							onPress={() => setDatePickerOpen(true)}
							backgroundColor={currentTheme.colors.primary}
							iconName={"calendar-days"}
							iconColor='white'
						/>
					</RestyleBox>
					{shoppingSchedule.shoppingDate &&
						(existingSchedule ? (
							<RestyleText color='error'>{`A shopping event has already been scheduled on ${new Date(
								existingSchedule.shoppingDate
							).toLocaleDateString()}`}</RestyleText>
						) : (
							<RestyleText color='primary'>
								{shoppingSchedule.shoppingDate.toLocaleDateString()}
							</RestyleText>
						))}
				</RestyleBox>
			</RestyleBox>

			{isPending && <ActivityIndicator />}
			{isError && errorMessage && (
				<RestyleText color='error'>{errorMessage}</RestyleText>
			)}
			{shoppingSchedule.title === "" && (
				<RestyleText color='error'>Title cannot be empty</RestyleText>
			)}
			{existingSchedule ? (
				<AppButton
					title='View details'
					onPress={() => {
						router.navigate("/ScheduleHistory");
					}}
					variant={"outline"}
				/>
			) : (
				<AppButton title={"Add"} onPress={handleSubmit} variant={"outline"} />
			)}
		</AppModal>
	);
};

export default ScheduleModal;
