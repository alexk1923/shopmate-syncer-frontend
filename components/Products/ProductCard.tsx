import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";

import { Product } from "@/constants/types/ProductTypes";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";
import AppButton from "../misc/AppButton";
import { ExternalItem, Item } from "@/constants/types/ItemTypes";

const ProductCard = (props: {
	foundProduct: { name: string; image: string; barcode: string };
	onConfirm: () => void;
	onCancel: () => void;
}) => {
	const { foundProduct, onConfirm, onCancel } = props;
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
						Product found! 😁
					</RestyleText>

					<RestyleText textAlign='center' color='text' variant='body'>
						Scanned barcode:{" "}
						<RestyleText color='primary' variant='bodyBold'>
							{foundProduct.barcode}
						</RestyleText>
					</RestyleText>

					<RestyleBox flexDirection='row' gap='m' justifyContent='center'>
						<AppButton title='Cancel' variant='outline' onPress={onCancel} />
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
