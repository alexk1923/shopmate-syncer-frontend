import { View, Text, Image, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import AppEditInput from "../Form/AppEditInput";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import AppButton from "../misc/AppButton";
import AppFab from "../misc/AppFab";
import AppModal from "./AppModal";
import ImageBottomModal from "./ImageBottomModal";
import LoadingOverlay from "./LoadingOverlay";
import { useWishlist } from "@/app/hooks/useWishlist";
import { useAuthStore } from "@/app/store/useUserStore";
import { useDarkLightTheme } from "../ThemeContext";

type QuickAddProps = {
	showQuickAddModal: boolean;
	setShowQuickAddModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const QuickAddModal = ({
	showQuickAddModal,
	setShowQuickAddModal,
}: QuickAddProps) => {
	const { currentTheme } = useDarkLightTheme();
	const [showImageBottomSheet, setShowImageBottomSheet] = useState(false);
	const { user } = useAuthStore();
	const { addToWishlistMutation } = useWishlist(user?.id!);
	const [quickAdd, setQuickAdd] = useState<{
		name: string;
		description: string;
		image: string | null;
	}>({
		name: "",
		description: "",
		image: null,
	});

	useEffect(() => {
		Keyboard.dismiss();
	}, [showImageBottomSheet]);

	const handleQuickAdd = () => {
		addToWishlistMutation.mutate({
			userId: user?.id!,
			wishlistItem: { ...quickAdd, originalId: null },
		});
		setShowQuickAddModal(false);
	};

	return (
		<AppModal
			modalVisible={showQuickAddModal}
			onModalClose={() => setShowQuickAddModal(false)}
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
			{<LoadingOverlay isVisible={addToWishlistMutation.isPending} />}

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
				<AppButton title={"Add"} onPress={handleQuickAdd} variant={"filled"} />
			</>
		</AppModal>
	);
};

export default QuickAddModal;
