import {
	View,
	Text,
	Image,
	TextInput,
	StyleSheet,
	FlatList,
	ListRenderItemInfo,
	useWindowDimensions,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import RestyleText from "./RestyleText";
import ScrollPage from "./ScrollPage";
import { FontAwesome6 } from "@expo/vector-icons";

import RestyleBox from "./RestyleBox";
import AppButton from "./AppButton";
import { theme } from "@/theme";
import AppInput from "./Form/AppEditInput";
import { useDarkLightTheme } from "./ThemeContext";
import Toggle from "react-native-toggle-element/lib/toggle";

import AppFab from "./AppFab";
import FoodTag from "./FoodTag";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Modal from "./AppModal";
import AppModal from "./AppModal";
import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import {
	GestureHandlerRootView,
	TouchableOpacity,
} from "react-native-gesture-handler";
import AppBottomSheetModal from "./AppBottomSheetModal";
import TagPickerItem from "./TagPickerItem";
import { Product } from "@/constants/types/ProductTypes";
import AppEditInput from "./Form/AppEditInput";
import ToggleButton from "./ToggleButton";

type EditFields = {
	name: string;
	tags: string[];
	expiryDate: null | Date;
	isFood: boolean;
};

const ProductCardEdit = (props: {
	foundProduct: Product;
	onSubmit: () => void;
}) => {
	const { foundProduct, onSubmit } = props;
	const { currentTheme } = useDarkLightTheme();
	const [isFood, setIsFood] = useState(false);
	const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
	const [expiryDate, setExpiryDate] = useState<Date>();
	const [hasExpiryDate, setHasExpiryDate] = useState(false);
	const [showTagPicker, setShowTagPicker] = useState(false);
	const { width, height } = useWindowDimensions();

	const [editFields, setEditFields] = useState<EditFields>({
		name: "",
		tags: [],
		expiryDate: null,
		isFood: false,
	});

	useEffect(() => {
		console.log(editFields);
	}, [editFields]);

	useEffect(() => {
		console.log("====================================");
		console.log("My product is");
		console.log(foundProduct);

		console.log("====================================");

		setEditFields({
			name: foundProduct.name,
			tags: foundProduct.tags,
			expiryDate: foundProduct.expiryDate,
			isFood: foundProduct.isFood ?? false,
		});
		if (foundProduct.expiryDate) {
			setHasExpiryDate(true);
		}
	}, [foundProduct]);

	const updateTags = (tagKey: string) => {
		if (editFields.tags.includes(tagKey)) {
			const newTags = editFields.tags.filter((t) => t !== tagKey);
			setEditFields((prevFields) => {
				return { ...prevFields, tags: newTags };
			});
			return;
		}

		setEditFields((prevFields) => {
			return { ...prevFields, tags: [...prevFields.tags, tagKey] };
		});
	};

	const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
		// const currentDate = selectedDate;
		setIsDatePickerOpen(false);
		setHasExpiryDate(true);
		setEditFields((prevFields) => {
			return { ...prevFields, expiryDate: selectedDate };
		});
		// setExpiryDate(currentDate);
	};

	const openTagPicker = () => {
		setShowTagPicker(true);
	};

	const getFoodItemKey = (tagName: string) => {
		for (let key in FOOD_TAG_INFO) {
			if (FOOD_TAG_INFO[key].name === tagName) {
				return key;
			}
		}
		return "";
	};

	const handleToggleIsFood = () =>
		setEditFields((prevFields) => {
			return { ...prevFields, isFood: !prevFields.isFood };
		});

	return (
		<>
			<RestyleBox
				backgroundColor='cardBackground'
				flex={1}
				borderRadius={15}
				gap='s'
				elevation={4}
			>
				{isDatePickerOpen && (
					<DateTimePicker
						value={foundProduct.expiryDate}
						mode={"date"}
						is24Hour={true}
						onChange={onChange}
					/>
				)}
				<Image
					source={
						foundProduct.image
							? { uri: foundProduct.image }
							: require("@/assets/images/unknown-food-image.webp")
					}
					style={{
						width: "100%",
						height: "25%",
						aspectRatio: "3/2",
						objectFit: "cover",
						alignSelf: "center",
						// flex: 1,
					}}
				/>

				<RestyleBox padding='m' gap='m'>
					<AppEditInput
						label={"Product Name"}
						placeholder={"e.g. Banana"}
						iconName={"pencil"}
						iconColor={"red"}
						iconSize={24}
						defaultValue={foundProduct.name}
						value={editFields.name}
						onChangeText={(val) => {
							setEditFields((prevFields) => {
								return { ...prevFields, name: val };
							});
						}}
					/>

					<RestyleBox flexDirection='row' justifyContent='space-between'>
						<RestyleBox flexDirection='row' gap='s' alignItems='center'>
							<RestyleText variant='label'>
								{!editFields.isFood ? `Non-Food ` : `Food 🍔 `}
							</RestyleText>

							<ToggleButton
								value={editFields.isFood}
								onPress={handleToggleIsFood}
							/>
						</RestyleBox>

						{editFields.isFood && (
							<RestyleBox>
								<RestyleBox flexDirection='row' gap='s' alignItems='center'>
									<RestyleText variant='label'>Expiry date</RestyleText>
									<AppFab
										size={40}
										onPress={() => setIsDatePickerOpen(true)}
										backgroundColor='primary'
										iconName={"calendar-days"}
										iconColor='white'
									/>
								</RestyleBox>
								{hasExpiryDate && (
									<RestyleText>
										{new Date(editFields.expiryDate).toISOString()}
									</RestyleText>
								)}
							</RestyleBox>
						)}
					</RestyleBox>

					{editFields.isFood && (
						<RestyleBox
							flexDirection='row'
							gap='s'
							alignItems='center'
							flexWrap='wrap'
						>
							<RestyleText variant='label'>Tags</RestyleText>
							{editFields.tags.map((tag) => (
								<FoodTag name={tag} key={tag} />
							))}
							<AppFab
								size={30}
								onPress={openTagPicker}
								backgroundColor='primary'
								iconName={"add"}
								iconColor='white'
							/>
						</RestyleBox>
					)}
				</RestyleBox>

				<RestyleBox flexDirection='row' gap='m' justifyContent='center'>
					{/* <AppButton title='Cancel' variant='outline' onPress={() => {}} /> */}
					<AppButton
						title='Save'
						variant='filled'
						onPress={() => {
							console.log("Submitted:");

							console.log(editFields);
							onSubmit();
						}}
					/>
				</RestyleBox>
				{
					showTagPicker && (
						<GestureHandlerRootView
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								right: 0,
								bottom: 0,
								backgroundColor: "transparent",
								height,
								margin: 0,
							}}
						>
							<AppBottomSheetModal onClose={() => setShowTagPicker(false)}>
								<RestyleBox
									backgroundColor='mainBackground'
									width={"100%"}
									justifyContent='center'
									alignItems='center'
									gap='l'
									padding='m'
								>
									<RestyleText variant='subheader' color='text'>
										Tag selector
									</RestyleText>
									<FlatList
										numColumns={3}
										data={Object.values(FOOD_TAG_INFO)}
										renderItem={(item) => (
											<TagPickerItem
												item={item}
												itemKey={getFoodItemKey(item.item.name)}
												initialTags={editFields.tags}
												updateTags={updateTags}
											/>
										)}
										contentContainerStyle={{
											justifyContent: "center",
											gap: currentTheme.spacing.m,
										}}
										columnWrapperStyle={{
											gap: currentTheme.spacing.s,
										}}
									/>
								</RestyleBox>
							</AppBottomSheetModal>
						</GestureHandlerRootView>
					)
					// <ScrollPage data={foundProduct.tags} />
				}
			</RestyleBox>
		</>
	);
};

const styles = StyleSheet.create({});

export default ProductCardEdit;
