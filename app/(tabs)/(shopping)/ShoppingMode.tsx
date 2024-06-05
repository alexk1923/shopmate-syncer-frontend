import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import AutoGenerate from "@/components/AutoGenerate";
import RestyleText from "@/components/RestyleText";
import Wrapper from "@/components/Wrapper";
import AppFab from "@/components/AppFab";
import AppButton from "@/components/AppButton";
import { LinearGradient } from "expo-linear-gradient";

const ShoppingMode = () => {
	const [shoppingMode, setShoppingMode] = useState(false);

	const handleGoShopping = () => {
		setShoppingMode(true);
	};

	const handleDisableShopping = () => {
		setShoppingMode(false);
	};

	return (
		<>
			<Wrapper>
				<RestyleText variant='header' color='primary'>
					Shopping Mode
				</RestyleText>

				{shoppingMode ? (
					<>
						<AutoGenerate />
						<AppButton
							variant='outline'
							title='Disable Shopping Mode'
							onPress={handleDisableShopping}
						/>
					</>
				) : (
					<>
						<RestyleText variant='body'>
							Activate this mode if you are in a store and want to efficiently
							choose your products based on recommendation and auto-generated
							lists. Your wishlist would be considered too !
						</RestyleText>

						<RestyleText>
							Shopping mode is currently {shoppingMode ? "enabled" : "disabled"}
						</RestyleText>

						<AppButton
							onPress={handleGoShopping}
							title='GO SHOPPING'
							variant='filled'
						/>
					</>
				)}
			</Wrapper>
		</>
	);
};

const styles = StyleSheet.create({
	gradient: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
});

export default ShoppingMode;
