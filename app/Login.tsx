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
import { Link, router, useNavigation } from "expo-router";

import { useKeyboardVisible } from "./hooks/useKeyboardVisible";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login } from "./services/authService";
import { LoginInput } from "@/constants/types/AuthTypes";

import { useAuthStore } from "./store/useUserStore";
import { setToken } from "./store/asyncStorage";
import AppTextInput from "@/components/Form/AppTextInput";
import { UserService } from "./services/userService";
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
	const navigation = useNavigation();
	const {
		control,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm<FormData>();
	const handleFormSubmit = handleSubmit(onSubmit);
	const setUserId = useAuthStore((state) => state.setUserId);
	const queryClient = useQueryClient();
	// const getUserQuery = useQuery({
	// 	queryKey: ["user", userId],
	// 	queryFn: async () => {
	// 		if (userId) {
	// 			const user = await UserService.getUserById(userId);
	// 			setUser(user);
	// 		}
	// 	},
	// 	enabled: userId !== null,
	// });

	const loginMutation = useMutation({
		mutationFn: ({ username, password }: LoginInput) =>
			login(username, password),
		onSuccess: async (data) => {
			console.log(data);
			console.log("Success");

			setToken(data.token);
			setUserId(data.id);
			// const user = await UserService.getUserById(data.id);
			// setUser(user);
			queryClient.prefetchQuery({
				queryKey: ["user", data.id],
				queryFn: async () => {
					if (data.id) {
						const user = await UserService.getUserById(data.id);
						setUser(user);
						return user;
					}
				},
			});
			// setUserId(data.id);
			router.push("introduction/Introduction");
		},
		onError: (err) => {
			console.log("Error login");
			console.log(err);
			resetField("password");
		},
	});

	function onSubmit(data: FormData) {
		console.log(data);
		loginMutation.mutate({ username: data.username, password: data.password });
	}

	const inputs = [
		{
			id: 1,
			placeholder: "Username",
			inputKey: "username",
			rules: { required: "Username is required" },
			iconName: "user-large",
		},

		{
			id: 2,
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
	];

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
				<RestyleText variant='header' style={styles.text} color='text'>
					Let's get started!
				</RestyleText>
				<RestyleText variant='body' style={styles.text} color='text'>
					Login to start improve your shopping experience and collaboration with
					your mate
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
