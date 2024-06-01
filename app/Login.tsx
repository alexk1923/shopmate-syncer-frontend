import {
	View,
	StyleSheet,
	Image,
	TextInput,
	Pressable,
	Keyboard,
	ActivityIndicator,
	Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import RestyleBox from "@/components/RestyleBox";
import RestyleText from "@/components/RestyleText";
import { useDarkLightTheme } from "@/components/ThemeContext";
import AppButton from "@/components/AppButton";
import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "@/theme";
import { useForm, Controller } from "react-hook-form";
import { Link, router } from "expo-router";

import { useKeyboardVisible } from "./hooks/useKeyboardVisible";
import { useMutation } from "@tanstack/react-query";
import { login } from "./services/authService";
import { LoginInput } from "@/constants/types/AuthTypes";
import { getUserById } from "./services/userService";
import { useAuthStore } from "./store/useUserStore";
import { setToken } from "./store/asyncStorage";
type FormData = {
	username: string;
	password: string;
};

const Login = () => {
	const { currentTheme } = useDarkLightTheme();
	const [showPassword, setShowPassword] = useState(false);
	const { isKeyboardVisible } = useKeyboardVisible();
	const setUser = useAuthStore((state) => state.setUser);
	// const token = useAuthStore((state) => state.token);

	const loginMutation = useMutation({
		mutationFn: ({ username, password }: LoginInput) =>
			login(username, password),
		onSuccess: async (data) => {
			console.log(data);
			console.log("Success");
			setToken(data.token);
			const user = await getUserById(data.id);
			setUser(user);

			router.navigate("/(introduction)/introduction");
		},
		onError: (err) => {
			console.log("Error login");
			console.log(err);
		},
	});

	const {
		control,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm<FormData>();
	const handleFormSubmit = handleSubmit(onSubmit);

	function onSubmit(data: FormData) {
		console.log(data);

		loginMutation.mutate({ username: data.username, password: data.password });
		resetField("password");
	}

	return (
		<RestyleBox backgroundColor='primary' style={styles.c1}>
			<RestyleBox style={styles.c2}>
				<Image
					style={styles.logo}
					source={require("@/assets/images/logo-white.png")}
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
						<RestyleText variant='header' style={styles.text} color='text'>
							Let's get started!
						</RestyleText>
						<RestyleText variant='body' style={styles.text} color='text'>
							Login to start improve your shopping experience and collaboration
							with your mate
						</RestyleText>
					</>
				)}

				<View
					style={[
						styles.searchSection,
						{ backgroundColor: currentTheme.colors.mainBackground },
					]}
				>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								<TextInput
									placeholder='Username'
									style={[styles.input, { color: currentTheme.colors.text }]}
									autoComplete='username'
									value={value}
									onChangeText={(value) => onChange(value)}
								></TextInput>
								<FontAwesome6
									name='user-large'
									size={24}
									color={currentTheme.colors.text}
									style={styles.searchIcon}
								/>
							</>
						)}
						name='username'
						rules={{ required: true }}
					/>
				</View>
				<View style={styles.searchSection}>
					<Controller
						control={control}
						render={({ field: { onChange, onBlur, value } }) => (
							<>
								<TextInput
									placeholder='Password'
									style={styles.input}
									autoComplete='password'
									secureTextEntry={!showPassword}
									onBlur={onBlur}
									value={value}
									onChangeText={(value) => onChange(value)}
								></TextInput>
								<Pressable
									onPress={() => {
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
							</>
						)}
						name='password'
						rules={{ required: true }}
					/>
				</View>
				{loginMutation.isPending && <ActivityIndicator />}
				{loginMutation.isError && (
					<RestyleText color='error' fontWeight='bold'>
						{loginMutation.error.message}
					</RestyleText>
				)}
				<RestyleBox style={styles.checkboxContainer}>
					<RestyleText color='primary'>Forgot password</RestyleText>
				</RestyleBox>
				<AppButton
					variant='outline'
					title='Login'
					onPress={() => {
						handleFormSubmit();
					}}
				/>

				<RestyleText textAlign='center' color='text'>
					No account yet? Register{" "}
					<Link href='/Register'>
						<RestyleText color='primary'>here</RestyleText>
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
	},
	input: {
		paddingRight: theme.spacing.m,
		paddingLeft: theme.spacing.m,

		height: "100%",
		flex: 1,
	},
	searchSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#424242",
		alignItems: "center",

		borderRadius: 5,
		height: 50,
	},
	searchIcon: {
		paddingRight: theme.spacing.m,
	},
	checkboxContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 0,
		alignItems: "center",
	},
});

export default Login;
