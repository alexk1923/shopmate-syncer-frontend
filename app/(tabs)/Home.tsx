import React, { useEffect } from "react";
import { useAuthStore } from "../store/useUserStore";
import HomePage from "../pages/HomePage";
import NoHomeScreen from "../pages/NoHomeJoined";
import { router, useNavigation } from "expo-router";
import { Alert, BackHandler } from "react-native";

import { useUser } from "../hooks/useUser";
import LoadingOverlay from "@/components/modals/LoadingOverlay";

const Home = () => {
	const navigation = useNavigation();
	const user = useAuthStore((state) => state.user);

	const { userQuery } = useUser(user?.id ?? null);

	useEffect(() => {
		console.log("userQuery made!");

		if (userQuery.data) {
			if (!userQuery.data.firstName || !userQuery.data.lastName) {
				console.log("nu am first name sau last name, e naspa");
				router.push("/introduction");
			}
		}
	}, [userQuery.data]);

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

	if (!userQuery.data || userQuery.isLoading) {
		return <LoadingOverlay isVisible={userQuery.isLoading} />;
	}

	return userQuery.data.houseId ? <HomePage /> : <NoHomeScreen />;
};

export default Home;
