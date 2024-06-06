import { View, Text, StyleSheet, Modal, Alert, Pressable } from "react-native";
import React, { useState } from "react";
import RestyleBox from "./RestyleBox";
import { StatusBar } from "expo-status-bar";
import RestyleText from "./RestyleText";
import { FontAwesome6 } from "@expo/vector-icons";
import { useDarkLightTheme } from "./ThemeContext";

type AppModalProps = {
	children: React.ReactNode;
	modalVisible: boolean;
	onModalClose: () => void;
	title: string;
};

const AppModal = (props: AppModalProps) => {
	const { children, modalVisible, onModalClose, title } = props;
	const { currentTheme } = useDarkLightTheme();
	return (
		<Modal
			animationType='fade'
			transparent
			onRequestClose={onModalClose}
			visible={modalVisible}
		>
			<View style={styles.flexContainer}>
				<RestyleBox
					style={styles.childrenContainer}
					backgroundColor='cardBackground'
					padding='m'
					gap='m'
				>
					<View style={styles.titleBar}>
						<RestyleText color='primary' variant='subheader'>
							{title}
						</RestyleText>
						<Pressable onPress={onModalClose}>
							<FontAwesome6
								name='xmark'
								size={24}
								color={currentTheme.colors.error}
							/>
						</Pressable>
					</View>

					{children}
				</RestyleBox>
			</View>
			<StatusBar style='auto' />
		</Modal>
	);
};

const styles = StyleSheet.create({
	flexContainer: {
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0,0,0,0.4)",
		height: "100%",
		width: "100%",
	},

	childrenContainer: {
		width: "85%",

		borderRadius: 15,
	},

	titleBar: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});

export default AppModal;
