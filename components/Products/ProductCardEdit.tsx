import {
	View,
	Text,
	StyleSheet,
	FlatList,
	useWindowDimensions,
	KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";

import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

import { FOOD_TAG_INFO } from "@/constants/FoodTagsInfo";
import {
	GestureHandlerRootView,
	ScrollView,
	TouchableOpacity,
} from "react-native-gesture-handler";

import { Product } from "@/constants/types/ProductTypes";
import AppEditInput from "../Form/AppEditInput";
import { useDarkLightTheme } from "../ThemeContext";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import AppButton from "../misc/AppButton";
import AppFab from "../misc/AppFab";
import FoodTag from "../misc/FoodTag";
import TagPickerItem from "../misc/TagPickerItem";
import ToggleButton from "../misc/ToggleButton";
import AppBottomSheetModal from "../modals/AppBottomSheetModal";

import { FoodCategory } from "@/constants/types/FoodCategoryTypes";
import ImagePickerWidget from "../widgets/ImagePickerWidget";
import { convertDateToLocaleISO } from "@/app/utils/convertDateToLocaleISO";

import { useItems } from "@/app/hooks/useItems";
import { useAuthStore } from "@/app/store/useUserStore";

import { useMarket } from "@/app/hooks/useMarket";
import { distance } from "fastest-levenshtein";
import Toast from "react-native-root-toast";
import LoadingOverlay from "../modals/LoadingOverlay";
import { visible } from "@shopify/restyle";
import { FontAwesome6 } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import Wrapper from "../layout/Wrapper";

type ItemEditType = {
	name: string;
	image: string | null;
	tags?: FoodCategory[];
	isFood?: boolean;
	barcode: string;
	store: {
		id: number | null;
		name: string | null;
		address: string | null;
	};
};

type EditableFields = {
	name: string;
	barcode: string;
	tags: string[];
	expiryDate: null | Date;
	isFood: boolean;
	image: string | null;
	quantity: number;
	store: { id: number | null; name: string; address: string };
};

type ErrorsType = {
	[key: string]: string;
	productName: string;
	expiryDate: string;
	tags: string;
};

const ProductCardEdit = (props: {
	editProduct: ItemEditType;
	onSubmit: () => void;
	onCancel: () => void;
}) => {
	const { editProduct, onSubmit, onCancel } = props;
	const { currentTheme } = useDarkLightTheme();
	// const [isFood, setIsFood] = useState(false);
	const [showDatePicker, setShowDatePicker] = useState(false);

	const [hasExpiryDate, setHasExpiryDate] = useState(false);
	const [showTagPicker, setShowTagPicker] = useState(false);
	const [showStorePicker, setShowStorePicker] = useState(false);
	const [isCustomStore, setIsCustomStore] = useState(false);

	const [customStore, setCustomStore] = useState(false);
	const { width, height } = useWindowDimensions();
	const [searchTerm, setSearchTerm] = useState("");

	const { user } = useAuthStore();
	const { addItemMutation } = useItems(user?.id!);
	const { getMarketsQuery } = useMarket();

	const [errors, setErrors] = useState<ErrorsType>({
		productName: "",
		expiryDate: "",
		tags: "",
	});

	const [showToast, setShowToast] = useState(false);

	const [editFields, setEditFields] = useState<EditableFields>({
		name: editProduct.name,
		barcode: editProduct.barcode,
		tags: editProduct.tags ? editProduct.tags.map((tag) => tag.name) : [],
		expiryDate: null,
		isFood: editProduct.isFood ?? false,
		quantity: 1,
		image: editProduct.image,
		store: {
			id: editProduct.store.id ?? null,
			name: editProduct.store.name ?? "",
			address: editProduct.store.address ?? "",
		},
	});

	const toast = useToast();

	const handleAddNewItem = () => {
		let errors = false;
		if (editFields.name.length === 0) {
			setErrors((prev) => {
				return { ...prev, productName: "Product name cannot be empty" };
			});
			errors = true;
		} else {
			setErrors((prev) => {
				return { ...prev, productName: "" };
			});
		}

		if (editFields.isFood && !editFields.expiryDate) {
			setErrors((prev) => {
				return { ...prev, expiryDate: "An expiry date has not been set." };
			});
			errors = true;
		} else {
			setErrors((prev) => {
				return { ...prev, expiryDate: "" };
			});
		}

		if (editFields.isFood && editFields.tags.length === 0) {
			setErrors((prev) => {
				return { ...prev, tags: "You need to select at least one tag" };
			});
			errors = true;
		} else {
			setErrors((prev) => {
				return { ...prev, tags: "" };
			});
		}

		if (errors) {
			return;
		}

		console.log(editFields);

		if (user && user?.houseId) {
			addItemMutation.mutate({
				...editFields,
				houseId: user?.houseId,
				boughtById: user.id,
			});
		}
	};

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

	const onChange = (
		event: DateTimePickerEvent,
		selectedDate: Date | undefined
	) => {
		if (selectedDate) {
			// const currentDate = selectedDate;
			setShowDatePicker(false);
			setHasExpiryDate(true);
			const convertedDate = convertDateToLocaleISO(selectedDate);

			setEditFields((prevFields) => {
				return { ...prevFields, expiryDate: convertedDate };
			});
		}

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

	useEffect(() => {
		if (addItemMutation.isSuccess) {
			toast.show("Product added to house inventory", {
				type: "custom_toast",
				animationDuration: 100,
				data: {
					title: "Success",
				},
			});
			onSubmit();
		}
	}, [addItemMutation.status]);

	return (
		<Wrapper>
			<LoadingOverlay isVisible={addItemMutation.isPending} />

			<RestyleBox
				backgroundColor='cardBackground'
				flex={1}
				borderRadius={15}
				gap='s'
				elevation={4}
			>
				{showDatePicker && (
					<DateTimePicker
						value={editFields.expiryDate ?? new Date()}
						mode={"date"}
						is24Hour={true}
						onChange={onChange}
					/>
				)}

				<ImagePickerWidget
					setImage={(newImageBase64) =>
						setEditFields((prev) => {
							return { ...prev, image: newImageBase64 };
						})
					}
					uploadedImageUri={editFields.image ?? null}
					containerStyle={{ flex: 1 }}
				/>

				<RestyleBox padding='m' gap='s' flex={2}>
					<AppEditInput
						label={"Product Name"}
						placeholder={"e.g. Banana"}
						iconName={"pencil"}
						iconColor={"red"}
						iconSize={24}
						defaultValue={editProduct.name}
						value={editFields.name}
						onChangeText={(val) => {
							setEditFields((prevFields) => {
								return { ...prevFields, name: val };
							});
						}}
					/>

					<AppEditInput
						label={"Barcode"}
						placeholder={"e.g. enter scannable barcode of the product"}
						iconName={"barcode"}
						iconColor={"red"}
						iconSize={24}
						defaultValue={editProduct.barcode}
						value={editFields.barcode}
						onChangeText={(val) => {
							setEditFields((prevFields) => {
								return { ...prevFields, barcode: val };
							});
						}}
						editable={false}
					/>

					<RestyleBox
						flexDirection='row'
						alignItems='center'
						gap='s'
						maxWidth={"90%"}
					>
						<RestyleText variant='label' color='gray'>
							Store:
						</RestyleText>
						<RestyleText
							color='primary'
							numberOfLines={1}
						>{`${editFields.store.name}, ${editFields.store.address}`}</RestyleText>
						<AppFab
							size={30}
							onPress={() => {
								setShowStorePicker(true);
							}}
							backgroundColor={currentTheme.colors.primary}
							iconName={"store"}
							iconColor='white'
						/>
					</RestyleBox>

					<RestyleBox
						flexDirection='row'
						justifyContent='space-between'
						alignItems='center'
					>
						<RestyleBox flexDirection='row' gap='s' alignItems='center'>
							<RestyleText variant='label'>
								{!editFields.isFood ? `Food` : `Food 🍔 `}
							</RestyleText>

							<ToggleButton
								value={editFields.isFood}
								onPress={handleToggleIsFood}
							/>
						</RestyleBox>

						<RestyleBox gap='s'>
							{/* <RestyleBox flexDirection='row' alignItems='center' gap='m'> */}
							<RestyleBox flexDirection='row' alignItems='center' gap='m'>
								<RestyleText variant='label'>Quantity</RestyleText>
								<RestyleBox flexDirection='row' alignItems='center' gap='s'>
									<AppFab
										size={30}
										onPress={() => {
											setEditFields((prev) => {
												return {
													...prev,
													quantity: Math.max(prev.quantity - 1, 1),
												};
											});
										}}
										iconName={"minus"}
										iconColor={"white"}
										backgroundColor={currentTheme.colors.primary}
									/>
									<RestyleText
										color='primary'
										// padding='s'
										style={{
											width: 25,
											borderWidth: 1,
											borderRadius: 10,
											borderColor: currentTheme.colors.primary,
											aspectRatio: "1/1",
											textAlignVertical: "center",
										}}
										variant='bodyBold'
										textAlign='center'
									>
										{editFields.quantity}
									</RestyleText>
									<AppFab
										size={30}
										onPress={() => {
											setEditFields((prev) => {
												return { ...prev, quantity: prev.quantity + 1 };
											});
										}}
										iconName={"add"}
										iconColor={"white"}
										backgroundColor={currentTheme.colors.primary}
									/>
								</RestyleBox>
							</RestyleBox>

							{/* <AppFab
                size={30}
                onPress={() => {}}
                iconName={"pencil"}
                iconColor={"white"}
                backgroundColor={currentTheme.colors.primary}
            /> */}
							{/* </RestyleBox> */}
						</RestyleBox>
					</RestyleBox>

					<RestyleBox
						flexDirection='row'
						justifyContent='space-between'
						alignItems='flex-start'
					>
						{editFields.isFood && (
							<RestyleBox
								flexDirection='row'
								gap='s'
								alignItems='center'
								flexWrap='wrap'
								flex={1}
								maxWidth={"50%"}
								justifyContent='flex-start'
							>
								<RestyleText variant='label'>Tags</RestyleText>
								{editFields.tags.map((tag) => (
									<FoodTag name={tag} key={tag.toUpperCase()} />
								))}
								<AppFab
									size={30}
									onPress={openTagPicker}
									backgroundColor={currentTheme.colors.primary}
									iconName={"add"}
									iconColor='white'
								/>
							</RestyleBox>
						)}

						{editFields.isFood && (
							<RestyleBox>
								<RestyleBox flexDirection='row' gap='s' alignItems='flex-start'>
									<RestyleText variant='label'>Expiry date</RestyleText>

									<AppFab
										size={30}
										onPress={() => setShowDatePicker(true)}
										backgroundColor={currentTheme.colors.primary}
										iconName={"calendar-days"}
										iconColor='white'
									/>
								</RestyleBox>
								{hasExpiryDate && editFields.expiryDate && (
									<RestyleText color='text'>
										{new Date(editFields.expiryDate).toLocaleDateString()}
									</RestyleText>
								)}
							</RestyleBox>
						)}
					</RestyleBox>

					{Object.keys(errors).map(
						(key) =>
							errors[key].length > 0 && (
								<RestyleText key={key} color='error' variant='bodyBold'>
									{errors[key]}
								</RestyleText>
							)
					)}
					{/*
    {errors.productName.length > 0 && (
        <RestyleText color='error'>{errors.productName}</RestyleText>
    )}

    {errors.expiryDate.length > 0 && (
        <RestyleText color='error'>{errors.expiryDate}</RestyleText>
    )}

    {errors.expiryDate.tags > 0 && (
        <RestyleText color='error'>{errors.expiryDate}</RestyleText>
    )} */}

					<RestyleBox
						flexDirection='row'
						alignItems='center'
						gap='m'
						justifyContent='center'
					>
						<AppButton
							title='Save'
							variant='filled'
							loading={addItemMutation.isPending}
							onPress={handleAddNewItem}
						/>
						<AppButton title='Cancel' variant='outline' onPress={onCancel} />
					</RestyleBox>
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
					// <ScrollPage data={editProduct.tags} />
				}

				{showStorePicker && (
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
						<AppBottomSheetModal onClose={() => setShowStorePicker(false)}>
							<RestyleBox
								backgroundColor='mainBackground'
								width={"100%"}
								justifyContent='center'
								// alignItems='center'
								gap='s'
								padding='m'
							>
								<RestyleText variant='subheader' color='text'>
									Store selector
								</RestyleText>

								<RestyleBox flexDirection='row' alignItems='center'>
									<RestyleText variant='label'>Custom store</RestyleText>
									<AppFab
										size={40}
										onPress={() => {
											setIsCustomStore((prev) => !prev);
										}}
										iconName={isCustomStore ? "check-circle" : "circle"}
										iconColor={"green"}
										backgroundColor={"transparent"}
									/>
								</RestyleBox>

								{isCustomStore ? (
									<>
										<AppEditInput
											label={"Store name"}
											placeholder={"Where you have bought the product from?"}
											value={editFields.store.name}
											onChangeText={(newStoreName) =>
												setEditFields((prev) => {
													return {
														...prev,
														store: { ...prev.store, name: newStoreName },
													};
												})
											}
										/>
										<AppEditInput
											label={"Store address"}
											placeholder={"e.g. Street, City"}
											value={editFields.store.address}
											onChangeText={(newStoreAddress) =>
												setEditFields((prev) => {
													return {
														...prev,
														store: {
															...prev.store,
															address: newStoreAddress,
														},
													};
												})
											}
										/>
									</>
								) : (
									<>
										<AppEditInput
											label={"Search for stores"}
											placeholder={"Search for stores"}
											iconName={"magnifying-glass"}
											iconColor={currentTheme.colors.text}
											iconSize={16}
											value={searchTerm}
											onChangeText={setSearchTerm}
										/>
										{getMarketsQuery.isLoading && <Text>Loading...</Text>}
										{getMarketsQuery.error && (
											<Text>Error: {getMarketsQuery.error.message}</Text>
										)}
										<ScrollView style={[{ maxHeight: height * 0.5 }]}>
											{getMarketsQuery.data &&
												getMarketsQuery.data
													.filter(
														(store) =>
															searchTerm.length === 0 ||
															distance(
																store.name
																	.toLowerCase()
																	.substring(0, searchTerm.length),
																searchTerm.toLowerCase()
															) < 1
													)
													.map((store) => (
														<TouchableOpacity
															key={store.id}
															onPress={() => {
																setEditFields((prev) => {
																	return {
																		...prev,
																		store: {
																			id: store.id,
																			name: store.name,
																			address: store.address,
																		},
																	};
																});
															}}
														>
															<RestyleBox
																flexDirection='row'
																alignItems='center'
																borderRadius={5}
																style={[
																	{
																		borderBottomColor: "gray",
																		borderBottomWidth: 1,

																		padding: currentTheme.spacing.s,
																	},
																	editFields.store.name === store.name &&
																		(!store.address ||
																			editFields.store.address ===
																				store.address) && {
																			backgroundColor:
																				currentTheme.colors.lightPrimary,
																		},
																]}
															>
																<RestyleText color='text'>
																	<RestyleText
																		color='text'
																		variant='bodyBold'
																	>{`${store.name}, `}</RestyleText>
																	{store.address}
																</RestyleText>
															</RestyleBox>
														</TouchableOpacity>
													))}
										</ScrollView>
									</>
								)}
							</RestyleBox>
						</AppBottomSheetModal>
					</GestureHandlerRootView>
				)}
			</RestyleBox>
		</Wrapper>
	);
};

const styles = StyleSheet.create({});

export default ProductCardEdit;
