import {
	View,
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
import { Link, router } from "expo-router";
import { useKeyboardVisible } from "./hooks/useKeyboardVisible";
import { Controller, useForm } from "react-hook-form";
import AppTextInput from "@/components/Form/AppTextInput";
import { useMutation } from "@tanstack/react-query";
import { register } from "./services/authService";

type FormData = {
	username: string;
	password: string;
	email: string;
	confirmPassword: string;
};

type RegisterInput = {
	firstName: string;
	lastName: string;
	email: string;
	username: string;
	password: string;
};

const Register = () => {
	const { darkMode } = useDarkLightTheme();
	const registerMutation = useMutation({
		mutationFn: ({
			firstName,
			lastName,
			email,
			username,
			password,
		}: RegisterInput) =>
			register(firstName, lastName, email, username, password),
		onSuccess: async (data) => {
			router.navigate("/login");
		},
		onError: (err) => {
			console.log("Error login");
			console.log(err);
		},
	});

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
		resetField,
	} = useForm<FormData>();

	const inputs = [
		// {
		// 	id: 1,
		// 	placeholder: "First Name",
		// 	inputKey: "firstname",
		// 	rules: { required: "First Name is required" },
		// 	iconName: "",
		// },
		// {
		// 	id: 2,
		// 	placeholder: "Last Name",
		// 	inputKey: "lastname",
		// 	rules: { required: "Last Name is required" },
		// 	iconName: "",
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

	function onSubmit(data: FormData) {
		console.log("onsubmit");
		console.log(data);

		// registrerMutation.mutate({
		// 	username: data.username,
		// 	password: data.password,
		// });

		resetField("password");
		resetField("confirmPassword");
	}

	useEffect(() => {
		console.log(errors);
	}, [errors.username, errors.confirmPassword, errors.password, errors.email]);

	// Watching the value of password
	const password = watch("password");

	const handleFormSubmit = handleSubmit(onSubmit);

	return (
		<RestyleBox backgroundColor='primary' style={styles.c1}>
			<RestyleBox style={styles.c2}>
				<Image
					style={styles.logo}
					source={
						darkMode
							? require("@/assets/images/logo-white.png")
							: require("@/assets/images/shopmate-logo-primary.png")
					}
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
						control={control}
						placeholder={input.placeholder}
						errors={errors}
						inputKey={input.inputKey}
						iconName={input.iconName}
						isPassword={input.isPassword}
						rules={input.rules}
					/>
				))}

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
						<RestyleText color='secondary' marginLeft='m'>
							Sign in
						</RestyleText>
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
