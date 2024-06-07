import UserConversation from "@/components/chat/UserConversation";
import RestyleBox from "@/components/layout/RestyleBox";
import AppButton from "@/components/misc/AppButton";
import { router, useNavigation } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import {
	ActivityIndicator,
	Button,
	Image,
	StyleSheet,
	Text,
	View,
} from "react-native";

import { GiftedChat, IMessage } from "react-native-gifted-chat";
import * as ImagePicker from "expo-image-picker";
import Wrapper from "@/components/layout/Wrapper";

import { useUpload } from "@/app/hooks/useUpload";

const ChatList = () => {
	const [messages, setMessages] = useState<IMessage[]>([]);

	useEffect(() => {
		setMessages([
			{
				_id: 2,
				text: "alo",
				createdAt: new Date(),
				user: {
					_id: 3,
					name: "pisatel",
					avatar: "https://placeimg.com/140/140/any",
				},
			},
		]);
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	const conversations = [
		{
			id: 1,
			username: "andreidragomir",
			firstName: "Andrei",
			lastName: "Dragomir",
			profileImage: "https://randomuser.me/api/portraits/men/76.jpg",
			messages: [
				{
					_id: 1,
					text: "Am luat paine ",

					createdAt: new Date("2024-05-21T16:10:25"),
					user: {
						_id: 4,
					},
				},
			],
		},
		{
			id: 2,
			username: "claudiububatu",
			firstName: "Claudiu",
			lastName: "Bubatu",
			profileImage: null,
			messages: [
				{
					_id: 2,
					text: "Hai la FIFA",
					createdAt: new Date("2024-05-21T16:10:25"),
					user: {
						_id: 3,
					},
				},
			],
		},
	];

	const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);

	const pickImage = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1], // Set aspect ratio for circular crop
			quality: 1,
			base64: true,
		});

		console.log("my upload result is:");

		if (!result.canceled) {
			console.log(result.assets[0].base64);
			setImage(result.assets[0]);
		}
	};

	const { uploadMutation } = useUpload();

	const handleUpload = () => {
		if (image) {
			uploadMutation.mutate({
				image: "data:image/jpeg;base64," + image.base64,
				successCallback: (uploadDetails) => {
					console.log(uploadDetails);
				},
			});
		}
	};

	return (
		<Wrapper>
			<Text>user chat</Text>
			<View style={styles.container}>
				<Button title='Pick an image from camera roll' onPress={pickImage} />
				{image && (
					<Image
						source={{ uri: "data:image/jpeg;base64," + image.base64 }}
						style={styles.image}
					/>
				)}

				<AppButton
					title={"upload file"}
					onPress={handleUpload}
					variant={"filled"}
				/>
				{/* <Text>Image base64 i : {image?.base64}</Text> */}
				{uploadMutation.isPending && <ActivityIndicator />}
				{uploadMutation.isError && <Text>{uploadMutation.error.message}</Text>}
			</View>
			{/* <UserConversation
				conversations={conversations}
				onSelect={(username: string) => {}}
			/> */}
			<AppButton
				title={"Go to invite"}
				onPress={() => router.navigate("/pages/HouseInvite")}
				variant={"filled"}
			/>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	image: {
		width: 200,
		height: 200,
		borderRadius: 100,
	},
});

export default ChatList;
