import { View, Text } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

import { useLocalSearchParams } from "expo-router";
import Wrapper from "@/components/layout/Wrapper";

const ChatConversation = () => {
	const { username } = useLocalSearchParams();
	const [messages, setMessages] = useState<IMessage[]>([]);

	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: "alo",
				createdAt: new Date(),
				user: {
					_id: 3,
					name: "pisatel",
					avatar: "https://randomuser.me/api/portraits/men/24.jpg",
				},
				image:
					"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ8K97xRVQEe4jSpZNQhiHN5WpAf3YXW-GakjTBcvlDA&s",
				// video:
				// 	"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
				sent: true,
			},
			{
				_id: 2,
				text: "da bai nesimttiule",
				createdAt: new Date("2024-05-16T05:15"),
				user: {
					_id: 1,
					name: "pisatel",
					avatar: "https://randomuser.me/api/portraits/men/24.jpg",
				},
			},
		]);
	}, []);

	const onSend = useCallback((messages = []) => {
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);
	return (
		<>
			<Wrapper>
				<GiftedChat
					messages={messages}
					// @ts-ignore
					onSend={(messages) => onSend(messages)}
					user={{
						_id: 1,
					}}
					loadEarlier
					// isLoadingEarlier

					// isTyping
					// renderMessageVideo={}
				/>
			</Wrapper>
		</>
	);
};

export default ChatConversation;
