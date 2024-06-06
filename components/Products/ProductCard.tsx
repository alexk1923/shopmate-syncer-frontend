import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";

import { Product } from "@/constants/types/ProductTypes";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import AppButton from "../misc/AppButton";

const ProductCard = (props: {
	foundProduct: Product;
	onConfirm: () => void;
}) => {
	const { foundProduct, onConfirm } = props;
	const [pickDate, setPickDate] = useState(false);

	return (
		<>
			<RestyleBox
				backgroundColor='cardBackground'
				flex={1}
				borderRadius={15}
				gap='s'
				elevation={4}
			>
				<Image
					source={
						foundProduct.image
							? { uri: foundProduct.image }
							: require("@/assets/images/unknown-food-image.webp")
					}
					style={{
						width: "100%",
						height: "100%",
						objectFit: "cover",
						flex: 1,
					}}
				/>

				<RestyleBox
					flex={1}
					backgroundColor='cardBackground'
					borderRadius={15}
					top={-20}
					padding='m'
					justifyContent='space-between'
				>
					<RestyleText variant='header' color='primary' textAlign='center'>
						{foundProduct.name}
					</RestyleText>
					<RestyleText variant='subheader' color='primary' textAlign='center'>
						Product is already in the database. Edit or confirm it to save entry
					</RestyleText>

					<RestyleBox flexDirection='row' gap='m' justifyContent='center'>
						<AppButton title='Cancel' variant='outline' onPress={() => {}} />
						<AppButton
							title='Next'
							variant='filled'
							onPress={() => onConfirm()}
						/>
					</RestyleBox>
				</RestyleBox>
			</RestyleBox>
		</>
	);
};

export default ProductCard;
