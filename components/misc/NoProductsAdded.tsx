import { View, Text } from "react-native";
import React from "react";
import RestyleText from "../layout/RestyleText";
import HorizontalCard from "../cards/HorizontalCard";

const NoProductsAdded = () => {
	return (
		<HorizontalCard title={""}>
			<RestyleText variant='subheader' color='primary'>
				No products added yet
			</RestyleText>
			<RestyleText variant='body' color='text'>
				Use the scanner button to add items by barcode
			</RestyleText>
		</HorizontalCard>
	);
};

export default NoProductsAdded;
