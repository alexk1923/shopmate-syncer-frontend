import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/theme";
import RestyleBox from "../layout/RestyleBox";
import RestyleText from "../layout/RestyleText";

import { Food } from "@/constants/types/FoodTypes";

import FoodTag from "../misc/FoodTag";
import { Item } from "@/constants/types/ItemTypes";
import { differenceInDays, startOfToday } from "date-fns";

const timeColors = {
	darkRed: "#510202",
	red: "#bd0303",
	yellow: "#cfbe02",
	green: "#06b820",
};

const ProductExpiryItem = ({ product }: { product: Item }) => {
	const { name, quantity, image } = product;

	const [expiryColor, setExpiryColor] = useState(timeColors.green);
	const [diffDays, setDiffDays] = useState(0);

	useEffect(() => {
		if (product.food) {
			console.log(product.name + " expira in urmatorul nr de zile:");
			const diffDays = differenceInDays(
				product.food.expiryDate,
				startOfToday()
			);
			if (diffDays < 0) {
				setExpiryColor(timeColors.darkRed);
				setDiffDays(diffDays);
			} else {
				setDiffDays(diffDays);
			}
		}
	}, [product.food]);

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
			padding='s'
		>
			<RestyleBox
				style={{
					flexDirection: "row",
					alignItems: "center",
					gap: theme.spacing.s,
				}}
				maxWidth={"60%"}
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
						// style={{ maxWidth: "100%" }}
						numberOfLines={1}
					>
						{name} (x {quantity})
					</RestyleText>

					{product.food && product.food.tags && (
						<RestyleBox flexDirection='row'>
							{product.food.tags.map((tag) => (
								// <Text>{tag.name}</Text>
								<FoodTag name={tag.name} key={tag.name} />
							))}
						</RestyleBox>
					)}
				</RestyleBox>
			</RestyleBox>
			{product.food && product.food.expiryDate && (
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
							{diffDays < 0
								? `${-1 * diffDays} days ago`
								: `in ${diffDays} days`}
						</RestyleText>
					</RestyleBox>
				</RestyleBox>
			)}
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
