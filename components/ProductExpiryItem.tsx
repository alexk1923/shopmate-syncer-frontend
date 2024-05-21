import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { theme } from "@/theme";
import RestyleBox from "./RestyleBox";
import RestyleText from "./RestyleText";
import FoodTag from "./FoodTag";
import { Product } from "@/constants/types";

const timeColors = {
	darkRed: "#510202",
	red: "#bd0303",
	yellow: "#cfbe02",
	green: "#06b820",
};

const ProductExpiryItem = (props: { product: Product }) => {
	const { name, expiryDate, quantity, image, tags } = props.product;
	const [expiryColor, setExpiryColor] = useState(timeColors.green);
	const [diffDays, setDiffDays] = useState(0);

	useEffect(() => {
		const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
		const today = new Date();

		if (expiryDate < today) {
			setExpiryColor(timeColors.darkRed);
			setDiffDays(
				-1 * (Math.round(Math.abs((+expiryDate - +new Date()) / oneDay)) + 1)
			);
			return;
		}

		const diffDays =
			Math.round(Math.abs((+new Date() - +expiryDate) / oneDay)) + 1;
		console.log(diffDays);

		setDiffDays(diffDays);
	}, [expiryDate]);

	useEffect(() => {
		if (diffDays < 3) {
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
							<FoodTag name={tag} key={tag} />
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
