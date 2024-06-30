import { StyleSheet, Image, ActivityIndicator } from "react-native";
import React from "react";

import { useDarkLightTheme } from "@/components/ThemeContext";

import { FontAwesome6 } from "@expo/vector-icons";
import { theme } from "@/theme";
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "./services/authService";
import { LoginInput } from "@/constants/types/AuthTypes";

import { useAuthStore } from "./store/useUserStore";
import { setToken } from "./store/asyncStorage";
import AppTextInput from "@/components/Form/AppTextInput";
import { UserService } from "./services/userService";
import RestyleBox from "@/components/layout/RestyleBox";
import RestyleText from "@/components/layout/RestyleText";
import AppButton from "@/components/misc/AppButton";

import { HouseService } from "./services/houseService";
import { useHouseStore } from "./store/useHouseStore";
import { NotificationService } from "./services/notificationService";
type FormData = {
	username: string;
	password: string;
};

const Login = () => {
	const { currentTheme } = useDarkLightTheme();

	const {
		control,
		handleSubmit,
		formState: { errors },
		resetField,
	} = useForm<FormData>();
	const handleFormSubmit = handleSubmit(onSubmit);

	const user = useAuthStore((state) => state.user);
	const notificationToken = useAuthStore((state) => state.notificationToken);
	const setNotificationToken = useAuthStore(
		(state) => state.setNotificationToken
	);

	const setUser = useAuthStore((state) => state.setUser);
	const setUserId = useAuthStore((state) => state.setUserId);
	const setHouse = useHouseStore((state) => state.setHouse);
	const firstLaunch = useAuthStore((state) => state.firstLaunch);

	const queryClient = useQueryClient();

	const loginMutation = useMutation({
		mutationFn: ({ username, password }: LoginInput) =>
			login(username, password),
		onSuccess: async (data) => {
			// Set token and user id
			setToken(data.token);
			setUserId(data.id);

			// Ask for notifications permission
			if (!notificationToken) {
				const newNotificationToken =
					await NotificationService.registerForPushNotificationsAsync(
						data.id,
						data.token
					);

				if (newNotificationToken) {
					setNotificationToken(newNotificationToken);
				}
			}

			// Prefetch user before redirecting
			queryClient.prefetchQuery({
				queryKey: ["user", data.id],
				queryFn: async () => {
					if (data.id) {
						// Set user
						const user = await UserService.getUserById(data.id);
						setUser(user);

						// Set house
						if (user.houseId) {
							const house = await HouseService.getHouseById(user.houseId);
							setHouse(house);
						}

						// Redirect to specific screen
						if (firstLaunch || !user.firstName || !user.lastName) {
							console.log("redirecting to account setup");

							router.push("introduction/AccountSetup");
						} else {
							console.log("redirecting to home...");

							router.push("(tabs)/Home");
						}
						return user;
					}
				},
			});
		},
		onError: (err) => {
			console.error("Login mutation has returned an error:");
			console.error(err);
			resetField("password");
		},
	});

	function onSubmit(data: FormData) {
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
