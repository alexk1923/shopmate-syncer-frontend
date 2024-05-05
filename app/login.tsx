import {
	View,
	Text,
	StyleSheet,
	Image,
	TextInput,
	Pressable,
	Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import { useDarkLightTheme } from "@/components/ThemeContext";
import AppButton from "@/components/AppButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "@/theme";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Link } from "expo-router";

const login = () => {
	const { darkMode } = useDarkLightTheme();
	const [showPassword, setShowPassword] = useState(false);

	const [isKeyboardVisible, setKeyboardVisible] = useState(false);

	useEffect(() => {
		const keyboardDidShowListener = Keyboard.addListener(
			"keyboardDidShow",
			() => {
				setKeyboardVisible(true); // or some other action
			}
		);
		const keyboardDidHideListener = Keyboard.addListener(
			"keyboardDidHide",
			() => {
				setKeyboardVisible(false); // or some other action
			}
		);

		return () => {
			keyboardDidHideListener.remove();
			keyboardDidShowListener.remove();
		};
	}, []);

	return (
		<RestyleBox backgroundColor='primary' style={styles.c1}>
			<RestyleBox style={styles.c2}>
				<Image
					style={styles.logo}
					source={
						darkMode
							? require("@/assets/images/logo-teal.png")
							: require("@/assets/images/logo-white.png")
					}
				/>
			</RestyleBox>
			<RestyleBox
				style={styles.c3}
				backgroundColor='mainBackground'
				paddingHorizontal='xl'
				gap='m'
			>
				{!isKeyboardVisible && (
					<>
						<RestyleText variant='header' style={styles.text}>
							Let's get started!
						</RestyleText>
						<RestyleText variant='body' style={styles.text}>
							Login to start improve your shopping experience and collaboration
							with your mate
						</RestyleText>
					</>
				)}

				<View style={styles.searchSection}>
					<TextInput
						placeholder='Username'
						style={styles.input}
						autoComplete='username'
					></TextInput>
					<FontAwesome6
						name='user-large'
						size={24}
						color='black'
						style={styles.searchIcon}
					/>
				</View>
				<View style={styles.searchSection}>
					<TextInput
						placeholder='Password'
						style={styles.input}
						autoComplete='password'
						secureTextEntry={!showPassword}
					></TextInput>
					<Pressable
						onPress={() => {
							console.log(showPassword);
							setShowPassword((prevPassword) => !prevPassword);
						}}
					>
						<FontAwesome6
							name={showPassword ? "eye" : "eye-slash"}
							size={24}
							color='black'
							style={styles.searchIcon}
						/>
					</Pressable>
				</View>
				<RestyleBox style={styles.checkboxContainer}>
					<RestyleText color='secondary'>Forgot password</RestyleText>
				</RestyleBox>
				<AppButton
					variant='filled'
					title='Login'
					onPress={() => {
						console.log("TODO FETCH LOGIN");
					}}
				></AppButton>
				<RestyleText textAlign='center'>
					No account yet? Register{" "}
					<Link href='/register'>
						<RestyleText color='secondary'>here</RestyleText>
					</Link>
				</RestyleText>
			</RestyleBox>
		</RestyleBox>
	);
};

const styles = StyleSheet.create({
	test: {
		backgroundColor: "green",
		borderColor: "red",
		borderWidth: 5,
	},

	c1: {
		width: "100%",
		height: "100%",
	},
	c2: {
		display: "flex",
		justifyContent: "center",
		flex: 1,
	},
	c3: {
		flex: 3,
		display: "flex",
		justifyContent: "center",

		borderTopLeftRadius: 45,
		borderTopRightRadius: 45,
	},
	logo: {
		width: "100%",
		height: "100%",
		alignSelf: "center",
		objectFit: "contain",
	},
	text: {
		textAlign: "center",
		color: theme.colors.darkText,
	},
	input: {
		paddingRight: theme.spacing.m,
		paddingLeft: theme.spacing.m,
		color: theme.colors.darkText,

		height: "100%",
		flex: 1,
	},
	searchSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#424242",
		alignItems: "center",
		backgroundColor: theme.colors.mainBackground,
		borderRadius: 5,
		height: 50,
	},
	searchIcon: {
		paddingRight: theme.spacing.m,
		color: theme.colors.darkText,
	},
	checkboxContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 0,
		alignItems: "center",
	},
});

export default login;
