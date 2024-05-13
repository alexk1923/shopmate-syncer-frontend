// index.tsx
import AppButton from "@/components/AppButton";
import RestyleBox from "@/components/RestyleBox";
import { useDarkLightTheme } from "@/components/ThemeContext";
import Wrapper from "@/components/Wrapper";
import { Theme, theme } from "@/theme";
import { createBox, createText } from "@shopify/restyle";
import { router } from "expo-router";
import { Button, Image, StyleSheet } from "react-native";
const Index = () => {
	const RestyleText = createText<Theme>();
	const { darkMode } = useDarkLightTheme();

	return (
		<Wrapper style={{ justifyContent: "flex-end" }}>
			<RestyleBox style={styles.c2} gap='m' margin='xl' marginBottom='s'>
				<Image
					style={styles.logo}
					source={
						darkMode
							? require("@/assets/images/logo-teal.png")
							: require("@/assets/images/logo-teal.png")
					}
				/>
				<AppButton
					title='LOGIN'
					onPress={() => {
						router.navigate("/Login");
					}}
					variant={"filled"}
					fullWidth
				></AppButton>
				<AppButton
					title='REGISTER'
					variant={"outline"}
					onPress={() => {
						router.navigate("/Register");
					}}
					fullWidth
				></AppButton>

				<RestyleText variant='buttonMedium' color='darkText' textAlign='center'>
					Shopmate Syncer
				</RestyleText>
			</RestyleBox>
		</Wrapper>
	);
};

const styles = StyleSheet.create({
	c1: {
		width: "100%",
		height: "100%",
		display: "flex",
		justifyContent: "flex-end",
	},

	c2: {
		display: "flex",
	},

	logo: {
		width: "100%",
		height: 200,
		alignSelf: "center",
		objectFit: "contain",
	},

	btn: {
		backgroundColor: "transparent",
	},
});
export default Index;
