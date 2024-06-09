import { View, Text, StyleSheet } from "react-native";
import React from "react";

type SelectDropdownType = {
	data: any[];
};

const SelectDropdown = ({ data }: SelectDropdownType) => {
	return (
		<SelectDropdown
			data={data}
			onSelect={(selectedItem: any, index: any) => {
				console.log(selectedItem, index);
			}}
			renderButton={(selectedItem: { title: any }, isOpened: any) => {
				return (
					<View style={styles.dropdownButtonStyle}>
						<Text style={styles.dropdownButtonTxtStyle}>
							{(selectedItem && selectedItem.title) || "Select your mood"}
						</Text>
					</View>
				);
			}}
			renderItem={(
				item: {
					title:
						| string
						| number
						| boolean
						| React.ReactElement<any, string | React.JSXElementConstructor<any>>
						| Iterable<React.ReactNode>
						| React.ReactPortal
						| null
						| undefined;
				},
				index: any,
				isSelected: any
			) => {
				return (
					<View
						style={{
							...styles.dropdownItemStyle,
							...(isSelected && { backgroundColor: "#D2D9DF" }),
						}}
					>
						<Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
					</View>
				);
			}}
			showsVerticalScrollIndicator={false}
			dropdownStyle={styles.dropdownMenuStyle}
		/>
	);
};

const styles = StyleSheet.create({
	dropdownButtonStyle: {
		width: 200,
		height: 50,
		backgroundColor: "#E9ECEF",
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 12,
	},
	dropdownButtonTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "500",
		color: "#151E26",
	},
	dropdownButtonArrowStyle: {
		fontSize: 28,
	},
	dropdownButtonIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
	dropdownMenuStyle: {
		backgroundColor: "#E9ECEF",
		borderRadius: 8,
	},
	dropdownItemStyle: {
		width: "100%",
		flexDirection: "row",
		paddingHorizontal: 12,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 8,
	},
	dropdownItemTxtStyle: {
		flex: 1,
		fontSize: 18,
		fontWeight: "500",
		color: "#151E26",
	},
	dropdownItemIconStyle: {
		fontSize: 28,
		marginRight: 8,
	},
});

export default SelectDropdown;
