import {
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import React from "react";

import RestyleBox from "../layout/RestyleBox";

import Wrapper from "../layout/Wrapper";
import RestyleText from "../layout/RestyleText";
import { theme } from "@/theme";

import { router } from "expo-router";
import { AppUser } from "@/constants/types";
import Avatar from "../misc/Avatar";

type UserConversationType = {
	conversations: AppUser[];
	onSelect: (username: string) => void;
};

const UserConversation = ({
	conversations,
	onSelect,
}: UserConversationType) => {
	const newMessages = true;

	const renderItem = ({ item: user }: { item: AppUser }) => (
		<TouchableOpacity
			onPress={() => {
				router.push({
					pathname: `/(tabs)/(settings)/${user.username}`,
					params: {
						id: user.id,
						firstName: user.firstName,
						lastName: user.lastName,
						profileImage: user.profileImage,
					},
				});
			}}
		>
			<RestyleBox style={styles.c1} backgroundColor='cardBackground'>
				<View style={styles.c2}>
					<Avatar
						uri={user.profileImage}
						firstName={user.firstName}
						lastName={user.lastName}
						status={"online"}
					/>

					<View>
						<RestyleText fontWeight='bold' color='text'>
							{user.firstName} {user.lastName}
						</RestyleText>
						<RestyleText style={styles.lastMessage} color='text'>
							{user.messages[user.messages.length - 1].text}
						</RestyleText>
					</View>
				</View>
				<RestyleBox alignItems='flex-end'>
					<RestyleText color='text'>
						{(
							user.messages[user.messages.length - 1].createdAt as Date
						).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
					</RestyleText>
					{newMessages && (
						<RestyleBox
							backgroundColor='primary'
							borderRadius={90}
							aspectRatio={1}
							width={25}
							justifyContent='center'
							alignItems='center'
						>
							<RestyleText color='oppositeText' fontWeight='bold'>
								12
							</RestyleText>
						</RestyleBox>
					)}
				</RestyleBox>
			</RestyleBox>
		</TouchableOpacity>
	);

	return (
		<Wrapper>
			<FlatList
				data={conversations}
				renderItem={renderItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	c1: {
		flexDirection: "row",
		padding: 10,
		alignItems: "flex-start",
		justifyContent: "space-between",
		overflow: "visible",
	},

	c2: { flexDirection: "row", alignItems: "center", gap: theme.spacing.s },

	lastMessage: {
		color: "gray",
	},
});

export default UserConversation;
