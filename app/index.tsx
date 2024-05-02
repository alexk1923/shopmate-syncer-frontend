// index.tsx
import AppButton from "@/components/AppButton";
import { Theme, theme } from "@/theme";
import { createBox, createText } from "@shopify/restyle";
import { router } from "expo-router";
import { Button, Image, StyleSheet, Text, View } from "react-native";
const Index = () => {
	const Text = createText<Theme>();
	const Box = createBox<Theme>();

	return (
		<Box style={styles.c1} gap='m'>
			<Box style={styles.c2} gap='m' margin='xl' marginBottom='s'>
				<Image
					style={styles.logo}
					source={require("@/assets/images/logo-teal.png")}
				/>
				<AppButton
					title='LOGIN'
					onPress={() => {
						router.navigate("/(tabs)/landing");
					}}
					variant={"filled"}
				></AppButton>
				<AppButton
					title='REGISTER'
					onPress={() => console.log("REGISTER")}
					variant={"outline"}
				></AppButton>

				<Text variant='body' textAlign='center'>
					Shopmate Syncer
				</Text>
			</Box>
		</Box>
	);
};

const styles = StyleSheet.create({
	c1: {
		backgroundColor: "mainBackground",
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	c2: {
		display: "flex",
	},

	logo: {
		width: 200,
		height: 200,
		alignSelf: "center",
		objectFit: "contain",
	},

	btn: {
		backgroundColor: "transparent",
	},
});
export default Index;
