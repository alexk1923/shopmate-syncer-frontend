import {
	FlatList,
	ActivityIndicator,
	StatusBar,
	Image,
	Text,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDarkLightTheme } from "@/components/ThemeContext";
import RestyleText from "@/components/layout/RestyleText";
import Separator from "@/components/layout/Separator";
import Wrapper from "@/components/layout/Wrapper";
import SelectionChip from "@/components/misc/SelectionChip";
import RestyleBox from "@/components/layout/RestyleBox";
import { useItems } from "@/app/hooks/useItems";
import { Item } from "@/constants/types/ItemTypes";
import GeneralItemCard, { VIEW_MODE } from "@/components/cards/GeneralItemCard";
import { useAuthStore } from "@/app/store/useUserStore";
import { useWishlist } from "@/app/hooks/useWishlist";
import { WishlistItem } from "@/constants/types/WishlistTypes";
import AppButton from "@/components/misc/AppButton";
import AppFab from "@/components/misc/AppFab";
import AppEditInput from "@/components/Form/AppEditInput";
import { TextInput } from "react-native-gesture-handler";
import AppModal from "@/components/modals/AppModal";
import ImagePickerWidget from "@/components/widgets/ImagePickerWidget";
import ImageBottomModal from "@/components/modals/ImageBottomModal";
import { FontAwesome6 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

enum MENU {
	DISCOVER,
	WISHLIST,
}

const WishlistPage = () => {
	const { currentTheme } = useDarkLightTheme();
	const [selected, setSelected] = useState(MENU.DISCOVER);
	const renderItem = (item: WishlistItem, viewMode: VIEW_MODE) => (
		<GeneralItemCard item={item} viewMode={viewMode} />
	);
	const { user } = useAuthStore();
	const { infiniteScrollItems } = useItems(user?.id ?? null);
	const { wishlistQuery, addToWishlistMutation, removeFromWishlistMutation } =
		useWishlist(user?.id!);
	const [quickAdd, setQuickAdd] = useState<{
		name: string;
		description: string;
		image: string | null;
	}>({
		name: "",
		description: "",
		image: null,
	});
	const [showQuickAddModal, setShowQuickModal] = useState(false);
	const [showImageBottomSheet, setShowImageBottomSheet] = useState(false);

	useEffect(() => {
		if (infiniteScrollItems.data) {
			console.log(infiniteScrollItems.data.pages.flat());
		}
	}, [infiniteScrollItems.data]);

	useEffect(() => {
		if (wishlistQuery.data) {
			console.log("wishlist query:");
			console.log(wishlistQuery.data);
		}
	}, [wishlistQuery.data]);

	return (
		<>
			<Wrapper>
				<RestyleBox flexDirection='row' gap='s'>
					<SelectionChip
						text={"Discover items"}
						isSelected={selected === MENU.DISCOVER}
						onSelect={() => setSelected(MENU.DISCOVER)}
					/>
					<SelectionChip
						text={"Wishlist"}
						isSelected={selected === MENU.WISHLIST}
						onSelect={() => setSelected(MENU.WISHLIST)}
					/>
				</RestyleBox>

				{selected === MENU.DISCOVER && (
					<>
						<RestyleText variant='label'>Discover</RestyleText>

						{infiniteScrollItems.data && (
							<FlatList
								data={infiniteScrollItems.data.pages.flat() as Item[]}
								keyExtractor={(item: Item) => String(item.id)}
								renderItem={({ item }: { item: Item }) =>
									renderItem(
										{
											originalId: item.id,
											id: item.id,
											name: item.name,
											description: "Added from recommendations",
											image: item.image,
										},
										VIEW_MODE.DISCOVER
									)
								}
								// onEndReached={() => infiniteScrollItems.fetchNextPage()}
								ListFooterComponent={
									infiniteScrollItems.isFetchingNextPage ? (
										<ActivityIndicator size='large' color='#0000ff' />
									) : null
								}
								ItemSeparatorComponent={() => Separator({ color: "gray" })}
							/>
						)}
					</>
				)}

				{selected === MENU.WISHLIST && (
					<>
						<RestyleBox flex={4}>
							<RestyleText variant='label'>Wishlist</RestyleText>

							{wishlistQuery.data && (
								<>
									<FlatList
										data={wishlistQuery.data}
										keyExtractor={(item: WishlistItem) => String(item.id)}
										renderItem={({ item }: { item: WishlistItem }) =>
											renderItem(
												{
													originalId: item.id,
													id: item.id,
													name: item.name,
													description: item.description,
													image: item.image,
												},
												VIEW_MODE.WISHLIST
											)
										}
										// onEndReached={() => infiniteScrollItems.fetchNextPage()}
										ListFooterComponent={
											wishlistQuery.isFetching ? (
												<ActivityIndicator size='large' color='#0000ff' />
											) : null
										}
										ItemSeparatorComponent={() => Separator({ color: "gray" })}
										ListEmptyComponent={
											<RestyleText>
												There are no items to be displayed
											</RestyleText>
										}
										persistentScrollbar
									/>
								</>
							)}
						</RestyleBox>
						<RestyleBox
							flexDirection='row'
							gap='s'
							alignSelf='flex-end'
							flex={1}
							alignItems='center'
						>
							<RestyleText variant='label'>Quick add</RestyleText>
							<AppFab
								size={48}
								onPress={() => {
									setShowQuickModal(true);
								}}
								iconName={"add"}
								iconColor={"white"}
								backgroundColor={currentTheme.colors.primary}
							/>
						</RestyleBox>

						<AppModal
							modalVisible={showQuickAddModal}
							onModalClose={() => setShowQuickModal(false)}
							title={"Quick add"}
							ImageBottomModal={
								showImageBottomSheet && (
									<ImageBottomModal
										setOpenActionModal={setShowImageBottomSheet}
										setImage={(image) =>
											setQuickAdd((prev) => {
												return { ...prev, image };
											})
										}
									/>
								)
							}
						>
							<>
								{quickAdd.image && (
									<Image
										source={{ uri: quickAdd.image }}
										style={{
											width: "50%",
											aspectRatio: 1,
											alignSelf: "center",
										}}
										borderRadius={90}
									/>
								)}
								<AppEditInput
									label={"Name"}
									placeholder={"Wished Product"}
									value={quickAdd.name}
									onChangeText={(val) =>
										setQuickAdd((prev) => {
											return {
												...prev,
												name: val,
											};
										})
									}
								/>
								<AppEditInput
									label={"Description"}
									placeholder={"Description..."}
									value={quickAdd.description}
									onChangeText={(val) =>
										setQuickAdd((prev) => {
											return {
												...prev,
												description: val,
											};
										})
									}
								/>
								<RestyleBox flexDirection='row' alignItems='center' gap='s'>
									<RestyleText variant='label'>Image</RestyleText>
									<AppFab
										size={32}
										onPress={() => {
											setShowImageBottomSheet(true);
										}}
										iconName={"image"}
										iconColor={"white"}
										backgroundColor={currentTheme.colors.primary}
									/>
								</RestyleBox>
								<AppButton
									title={"Add"}
									onPress={() =>
										addToWishlistMutation.mutate({
											userId: user?.id!,
											wishlistItem: { ...quickAdd, originalId: null },
										})
									}
									variant={"filled"}
								/>
							</>
						</AppModal>
					</>
				)}
			</Wrapper>
		</>
	);
};

export default WishlistPage;
