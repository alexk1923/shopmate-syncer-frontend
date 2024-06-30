import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { FontAwesome6 } from "@expo/vector-icons";

import RestyleBox from "../layout/RestyleBox";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";

// @ts-ignore
const SwipeListMenu = (props) => {
	const { rightActionActivated, onDelete } = props;

	return (
		<RestyleBox
			backgroundColor={rightActionActivated && "mainBackground"}
			style={[
				styles.rowBack,
				rightActionActivated && { backgroundColor: "red" },
			]}
		>
			{!rightActionActivated && (
				<TouchableOpacity
					onPress={() => router.navigate("(tabs)/(shopping)/Inventory")}
				>
					<RestyleBox
						backgroundColor='primary'
						width={50}
						justifyContent='center'
						alignItems='center'
						height='100%'
					>
						<FontAwesome6 name='info' size={24} color='white' />
					</RestyleBox>
				</TouchableOpacity>
			)}

			<Pressable onPress={onDelete}>
				<RestyleBox
					style={{ backgroundColor: "red" }}
					width={50}
					justifyContent='center'
					alignItems='center'
					height='100%'
				>
					<FontAwesome6 name='trash-alt' size={24} color='white' />
				</RestyleBox>
			</Pressable>
		</RestyleBox>
	);
};

const styles = StyleSheet.create({
	rowBack: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "flex-end",
	},
});

export default SwipeListMenu;
