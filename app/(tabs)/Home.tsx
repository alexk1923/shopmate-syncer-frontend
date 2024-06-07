import React, { useEffect } from "react";
import { useAuthStore } from "../store/useUserStore";
import HomePage from "../pages/HomePage";
import NoHomeScreen from "../pages/NoHomeJoined";
import { router, useNavigation } from "expo-router";
import { Alert, BackHandler } from "react-native";
import { CommonActions } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { UserService } from "../services/userService";

const Home = () => {
	const navigation = useNavigation();
	const userId = useAuthStore((state) => state.userId);
	const setUser = useAuthStore((state) => state.setUser);

	const { data, isLoading, error } = useQuery<User | null>({
		queryKey: ["user", userId],
		queryFn: async () => {
			const user = await UserService.getUserById(userId as number);
			setUser(user);
			return user;
		},
		enabled: userId !== null,
	});

	useEffect(() => {
		console.log("====================================");
		console.log("Trying to get");
		console.log(data?.firstName);
		console.log("si");

		console.log(data?.lastName);

		console.log("====================================");
		if (data) {
			if (!data?.firstName || !data?.lastName) {
				router.push("/introduction/Introduction");
			}
		}
	}, [data]);

	useEffect(() => {
		const backAction = () => {
			if (!navigation.canGoBack()) {
				// Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
				// 	{ text: "Cancel", onPress: () => null, style: "cancel" },
				// 	{ text: "YES", onPress: () => BackHandler.exitApp() },
				// ]);

				return true;
			}
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	console.log("data is" + data);

	return data?.houseId ? <HomePage /> : <NoHomeScreen />;
};

export default Home;
