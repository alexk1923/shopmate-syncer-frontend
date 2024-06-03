import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import RestyleBox from "./RestyleBox";
import RestyleText from "./RestyleText";
import { FontAwesome } from "@expo/vector-icons";

type ChipProps = {
	text: string;
	photo: string;
	handleRemove: (id: number) => void;
	id: number;
};

const Chip = ({ photo, text, handleRemove, id }: ChipProps) => {
	return (
		<View style={styles.selectedUsersContainer}>
			<View style={styles.chip}>
				{photo && <Image source={{ uri: photo }} style={styles.profilePic} />}
				<Text style={styles.chipText}>{text}</Text>
				<TouchableOpacity onPress={() => handleRemove(id)}>
					<FontAwesome name='close' size={20} color='red' />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	selectedUsersContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 10,
	},
	chip: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#e0e0e0",
		borderRadius: 20,
		padding: 10,
		margin: 5,
	},
	chipText: {
		marginRight: 10,
	},

	profilePic: {
		width: 50,
		height: 50,
		borderRadius: 25,
		position: "relative",
		borderWidth: 2,
		borderColor: "white",
		overflow: "visible",
	},
});

export default Chip;
