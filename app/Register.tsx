import {
	View,
	StyleSheet,
	Image,
	TextInput,
	Pressable,
	Keyboard,
	ActivityIndicator,
	Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";

import { useDarkLightTheme } from "@/components/ThemeContext";

import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "@/theme";
import { Link, router } from "expo-router";
import { useKeyboardVisible } from "./hooks/useKeyboardVisible";
import { Controller, useForm } from "react-hook-form";
import AppTextInput from "@/components/Form/AppTextInput";
import { useMutation } from "@tanstack/react-query";
import { register } from "./services/authService";
import { RegisterInput } from "@/constants/types/AuthTypes";
import LottieAnimation from "@/components/common/LottieAnimation";
import { ANIMATIONS } from "@/constants/assets";
import SuccessScreen from "@/components/common/SuccessScreen";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import AppButton from "@/components/misc/AppButton";
import LoadingOverlay from "@/components/modals/LoadingOverlay";

const Register = () => {
	const { darkMode } = useDarkLightTheme();
	const [successRegistration, setSuccessRegistration] = useState(false);
	const registerMutation = useMutation({
		mutationFn: ({
			email,
			username,
			password,
		}: Omit<RegisterInput, "confirmPassword">) =>
			register(email, username, password),
		onSuccess: async (data) => {
			console.log("success");
			setSuccessRegistration(true);
			setTimeout(() => {
				router.navigate("/Login");
			}, 3000);
		},
		onError: (err) => {
			console.log("Error register");
			console.log(err);
			console.log(err.message);

			resetField("password");
			resetField("confirmPassword");
		},
	});

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
		resetField,
	} = useForm<RegisterInput>();

	const { currentTheme } = useDarkLightTheme();

	const inputs = [
		// {
		// 	id: 1,
		// 	placeholder: "First Name",
		// 	inputKey: "firstName",
		// 	rules: { required: "First Name is required" },
		// 	iconName: "user-pen",
		// },
		// {
		// 	id: 2,
		// 	placeholder: "Last Name",
		// 	inputKey: "lastName",
		// 	rules: { required: "Last Name is required" },
		// 	iconName: "user-pen",
		// },
		{
			id: 3,
			placeholder: "Username",
			inputKey: "username",
			rules: { required: "Username is required" },
			iconName: "user-large",
		},
		{
			id: 4,
			placeholder: "Email",
			inputKey: "email",
			rules: {
				required: "Email is required",
				pattern: {
					value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
					message: "Invalid email address",
				},
			},
			iconName: "envelope",
		},
		{
			id: 5,
			placeholder: "Password",
			inputKey: "password",
			rules: {
				required: "Password is required",
				minLength: {
					value: 6,
					message: "Password must be at least 6 characters",
				},
			},
			iconName: "lock",
			isPassword: true,
		},
		{
			id: 6,
			placeholder: "Confirm password",
			inputKey: "confirmPassword",
			rules: {
				required: "Password confirmation is required",
				validate: (value: string) =>
					value === password || "Passwords do not match!",
			},
			iconName: "lock",
			isPassword: true,
		},
	];

	function onSubmit(data: RegisterInput) {
		console.log("onsubmit");
		console.log(data);

		registerMutation.mutate({
			email: data.email,
			username: data.username,
			password: data.password,
		});
	}

	useEffect(() => {
		console.log(errors);
	}, [errors.username, errors.confirmPassword, errors.password, errors.email]);

	// Watching the value of password
	const password = watch("password");
	const handleFormSubmit = handleSubmit(onSubmit);

	const fadeAnim = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 2000, // 2 seconds
			useNativeDriver: true,
		}).start();
	}, [fadeAnim]);

	return !successRegistration ? (
		<RestyleBox backgroundColor='primary' style={styles.c1}>
			<RestyleBox style={styles.c2}>
				<Image
					style={styles.logo}
					source={require("@/assets/images/logo-white.png")}
				/>
			</RestyleBox>
			<RestyleBox
				style={styles.c3}
				padding='xl'
				gap='m'
				backgroundColor='mainBackground'
			>
				<RestyleText variant='header' style={styles.text} color='text'>
					Create Account
				</RestyleText>

				{inputs.map((input) => (
					<AppTextInput
						key={input.id}
						// @ts-ignore
						control={control}
						placeholder={input.placeholder}
						errors={errors}
						inputKey={input.inputKey}
						iconName={input.iconName}
						isPassword={input.isPassword}
						rules={input.rules}
					/>
				))}
				{<LoadingOverlay isVisible={registerMutation.isPending} />}
				{registerMutation.isError && (
					<RestyleText color='error' fontWeight='bold'>
						{registerMutation.error.message}
					</RestyleText>
				)}

				<AppButton
					variant='filled'
					title='Register'
					onPress={() => {
						handleFormSubmit();
					}}
				></AppButton>
				<RestyleText textAlign='center' color='text'>
					Already have an account?{" "}
					<Link href='/Login'>
						<RestyleText color='primary' marginLeft='m'>
							Sign in
						</RestyleText>
					</Link>
				</RestyleText>
			</RestyleBox>
		</RestyleBox>
	) : (
		<SuccessScreen text={"Registration complete"} />
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
		// justifyContent: "center",

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
		color: theme.colors.text,
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
		color: theme.colors.text,
	},
	checkboxContainer: {
		display: "flex",
		flexDirection: "row",
		gap: 0,
		alignItems: "center",
	},
});

export default Register;
