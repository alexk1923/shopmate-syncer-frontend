import AppEditInput from "@/components/Form/AppEditInput";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isLoading } from "expo-font";
import React, { useEffect, useState } from "react";
import {
	Alert,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	useWindowDimensions,
} from "react-native";

import { UserService } from "../services/userService";
import { distance, closest } from "fastest-levenshtein";

import { useDarkLightTheme } from "@/components/ThemeContext";
import { theme } from "@/theme";

import { LinearGradient } from "expo-linear-gradient";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { backgroundColor } from "@shopify/restyle";
import { HouseService } from "../services/houseService";
import { router } from "expo-router";

import { useAuthStore } from "../store/useUserStore";
import SuccessScreen from "@/components/common/SuccessScreen";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import AppButton from "@/components/misc/AppButton";
import AppFab from "@/components/misc/AppFab";
import Chip from "@/components/misc/Chip";
import AppBottomSheetModal from "@/components/modals/AppBottomSheetModal";
import LoadingOverlay from "@/components/modals/LoadingOverlay";

import Wrapper from "@/components/layout/Wrapper";
import ImagePickerWidget from "@/components/widgets/ImagePickerWidget";
import Avatar from "@/components/misc/Avatar";

const HouseCreate = () => {
	const [houseName, setHouseName] = useState("");

	const [searchTerm, setSearchTerm] = useState("");
	const [openSearch, setOpenSearch] = useState(false);
	const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
	const [users, setUsers] = useState<User[]>([]);
	const { currentTheme } = useDarkLightTheme();
	const { width, height } = useWindowDimensions();
	const [success, setSuccess] = useState(false);
	const { data, isLoading, error } = useQuery<User[]>({
		queryKey: ["users", searchTerm],
		queryFn: () => UserService.fetchUsers(),
	});
	const user = useAuthStore((state) => state.user);
	const queryClient = useQueryClient();

	const createHouseMutation = useMutation({
		mutationFn: ({
			name,
			defaultMembers,
		}: {
			name: string;
			defaultMembers: string[];
		}) => HouseService.createHouse(name, defaultMembers),
		onSuccess: () => {
			setSuccess(true);
			queryClient.invalidateQueries({ queryKey: ["user", user?.id] });
			setTimeout(() => {
				router.back();
			}, 4000);
		},
	});

	useEffect(() => {
		if (data) {
			setUsers(data);
		}
	}, [data]);

	const handleToggleUserSelection = (user: User) => {
		if (user.houseId !== null) {
			Alert.alert(
				"Member could not be added",
				`${user.username} is already in a house. Exit it before joining a new one`
			);
			return;
		}

		if (selectedUsers.includes(user)) {
			setSelectedUsers((prevUsers) =>
				prevUsers.filter((prevUser) => prevUser.id !== user.id)
			);
			return;
		}

		setSelectedUsers((prevUsers) => [...prevUsers, user]);
	};

	const handleRemoveUser = (userId: number) => {
		setSelectedUsers((prevUsers) =>
			prevUsers.filter((user) => user.id !== userId)
		);
	};

	const handleCreateHouse = () => {
		let mutate = true;
		console.log(user);

		if (user?.houseId !== null) {
			Alert.alert(
				"Error",
				"You cannot create another house. You must leave the current one first!"
			);
			return;
		}

		if (selectedUsers.length === 0) {
			Alert.alert(
				"No Members Added",
				"You did not add any other members. You can add them later by generating a QR code. Continue?",
				[
					{
						text: "Cancel",
						onPress: () => {
							mutate = false;
						},
						style: "cancel",
					},
					{ text: "OK", onPress: () => console.log("OK Pressed") },
				]
			);
		}

		if (mutate) {
			let defaultMembers = [...selectedUsers.map((user) => user.username)];
			defaultMembers.push(user?.username);
			createHouseMutation.mutate({
				name: houseName,
				defaultMembers: defaultMembers,
			});
		}
	};

	if (success) {
		return <SuccessScreen text='House created successfully!' />;
	}

	return (
		<Wrapper>
			<LoadingOverlay isVisible={createHouseMutation.isPending} />
			<ImagePickerWidget
				onPress={() => {
					console.log("TODO UPLOAD IMAGE");
				}}
				uploadedImageUri={null}
			/>
			<AppEditInput
				label={"House name"}
				placeholder={"e.g. My House"}
				iconName={""}
				iconColor={""}
				iconSize={0}
				value={houseName}
				onChangeText={(val) => {
					setHouseName(val);
				}}
			/>

			<View style={styles.container}>
				<RestyleBox
					flexDirection='row'
					gap='s'
					alignItems='center'
					flexWrap='wrap'
				>
					<RestyleText variant='label'>Add Users</RestyleText>

					<AppFab
						size={30}
						onPress={() => setOpenSearch(true)}
						iconName={"add"}
						iconColor='white'
						backgroundColor={currentTheme.colors.primary}
					/>
				</RestyleBox>
				<RestyleBox flexDirection='row'>
					{selectedUsers.map((selectedUser) => (
						<Chip
							text={selectedUser.username}
							handleRemove={handleRemoveUser}
							id={selectedUser.id}
							key={selectedUser.id}
							photo={selectedUser.profilePicture}
						/>
					))}
				</RestyleBox>
				<AppButton
					title={"Create"}
					onPress={handleCreateHouse}
					variant={"filled"}
				/>
			</View>

			{openSearch && (
				<GestureHandlerRootView
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "transparent",
						height,
						width,
						margin: 0,
					}}
				>
					<BottomSheetModalProvider>
						<AppBottomSheetModal
							onClose={() => {
								setOpenSearch(false);
								console.log("opensearch fakse");
							}}
						>
							<AppEditInput
								label={"Search for users"}
								placeholder={"Search for users"}
								iconName={"magnifying-glass"}
								iconColor={currentTheme.colors.text}
								iconSize={16}
								value={searchTerm}
								onChangeText={setSearchTerm}
							/>
							{isLoading && <Text>Loading...</Text>}
							{error && <Text>Error: {error.message}</Text>}
							<ScrollView
								style={[{ maxHeight: height * 0.5 }]}
								contentContainerStyle={{
									rowGap: currentTheme.spacing.s,
								}}
							>
								{users
									.filter(
										(user) =>
											searchTerm.length > 0 &&
											distance(
												user.username
													.toLowerCase()
													.substring(0, searchTerm.length),
												searchTerm.toLowerCase()
											) < 1
									)
									.map((user) => (
										<TouchableOpacity
											key={user.id}
											onPress={() => handleToggleUserSelection(user)}
										>
											<RestyleBox
												flexDirection='row'
												alignItems='center'
												style={[
													{
														borderBottomColor: "gray",
														borderBottomWidth: 1,
														padding: currentTheme.spacing.s,
													},
													selectedUsers.some(
														(selectedUser) => selectedUser.id === user.id
													) && {
														backgroundColor: currentTheme.colors.lightPrimary,
													},
												]}
											>
												<Avatar
													uri={user.profilePicture}
													firstName={user.firstName}
													lastName={user.lastName}
												/>
												<RestyleText style={styles.userItem}>
													{user.username}
												</RestyleText>
											</RestyleBox>
										</TouchableOpacity>
									))}
							</ScrollView>
						</AppBottomSheetModal>
					</BottomSheetModalProvider>
				</GestureHandlerRootView>
			)}
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	searchBar: {
		height: 40,
		borderColor: "gray",
		borderWidth: 1,
		marginBottom: 8,
		paddingHorizontal: 8,
	},

	userItem: {
		padding: theme.spacing.s,
		flex: 1,
	},
	chipsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 16,
	},
	chip: {
		marginRight: 8,
		marginBottom: 8,
	},
});
export default HouseCreate;
