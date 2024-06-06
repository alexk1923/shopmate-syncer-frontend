import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/theme";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";

import { Food } from "@/constants/types/FoodTypes";
import { getExpiryDays } from "@/app/utils/getExpiryDays";
import FoodTag from "../misc/FoodTag";
import { Item } from "@/constants/types/ItemTypes";

const timeColors = {
	darkRed: "#510202",
	red: "#bd0303",
	yellow: "#cfbe02",
	green: "#06b820",
};

const ProductExpiryItem = ({ product }: { product: Item }) => {
	if (!product.food) {
		const { name, quantity, image } = product as Item;
		return (
			<RestyleBox
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
				}}
				backgroundColor='cardBackground'
				paddingHorizontal='m'
			>
				<RestyleBox
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: theme.spacing.s,
					}}
				>
					<Image
						source={
							image
								? { uri: image }
								: require("@/assets/images/unknown-food-image.webp")
						}
						style={styles.foodImage}
					/>
					<RestyleBox style={{ alignItems: "flex-start" }}>
						<RestyleText variant='body' fontWeight='bold' color={"text"}>
							{name} (x {quantity})
						</RestyleText>
					</RestyleBox>
				</RestyleBox>
			</RestyleBox>
			// <></>
		);
	}

	const { tags } = product.food;
	const { name, quantity } = product;

	// const { name, quantity } = item;
	const { expiryDate } = product.food;
	const image = null;

	const [expiryColor, setExpiryColor] = useState(timeColors.green);
	const [diffDays, setDiffDays] = useState(0);

	useEffect(() => {
		const diffDays = getExpiryDays(expiryDate);
		if (diffDays < 0) {
			setExpiryColor(timeColors.darkRed);
			setDiffDays(diffDays * -1);
		} else {
			setDiffDays(diffDays);
		}
	}, [expiryDate]);

	useEffect(() => {
		if (diffDays < 5) {
			setExpiryColor(timeColors.red);
		} else if (diffDays < 25) {
			setExpiryColor(timeColors.yellow);
		} else {
			setExpiryColor(timeColors.green);
		}
	}, [diffDays]);

	return (
		<RestyleBox
			style={{
				flexDirection: "row",
				justifyContent: "space-between",
				// borderRadius: 15,
			}}
			backgroundColor='cardBackground'
			paddingHorizontal='m'
		>
			<RestyleBox
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: theme.spacing.s,
				}}
			>
				<Image
					source={
						image
							? { uri: image }
							: require("@/assets/images/unknown-food-image.webp")
					}
					style={styles.foodImage}
				/>
				<RestyleBox style={{ alignItems: "flex-start" }}>
					<RestyleText
						variant='body'
						fontWeight='bold'
						color={diffDays < 0 ? "error" : "text"}
					>
						{name} (x {quantity})
					</RestyleText>
					<RestyleBox flexDirection='row'>
						{tags.map((tag) => (
							<FoodTag name={tag.name.toLowerCase()} key={tag.name} />
						))}
					</RestyleBox>
				</RestyleBox>
			</RestyleBox>
			<RestyleBox alignItems='flex-end'>
				<RestyleText
					fontWeight='bold'
					variant='body'
					color={diffDays < 0 ? "error" : "text"}
					style={diffDays < 0 ? { color: expiryColor } : {}}
					textAlign='right'
				>
					{diffDays < 0 ? "Expired" : "Expiring"}
				</RestyleText>
				<RestyleBox>
					<RestyleText style={{ color: expiryColor }}>
						{diffDays < 0 ? `${-1 * diffDays} days ago` : `in ${diffDays} days`}
					</RestyleText>
				</RestyleBox>
			</RestyleBox>
		</RestyleBox>
		// <></>
	);
};

const styles = StyleSheet.create({
	foodImage: {
		width: 40,
		height: 40,
		borderRadius: 90,
	},
});

export default ProductExpiryItem;
