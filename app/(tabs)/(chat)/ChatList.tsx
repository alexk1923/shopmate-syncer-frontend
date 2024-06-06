import UserConversation from "@/components/chat/UserConversation";
import RestyleBox from "@/components/layout/RestyleBox";
import { router, useNavigation } from "expo-router";
import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

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

	return (
		<RestyleBox backgroundColor='mainBackground'>
			<UserConversation
				conversations={conversations}
				onSelect={(username: string) => {}}
			/>
		</RestyleBox>
	);
};

export default ChatList;
