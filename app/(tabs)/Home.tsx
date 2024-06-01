import React, { useEffect } from "react";
import { useAuthStore } from "../store/useUserStore";
import HomePage from "../pages/HomePage";
import NoHomeScreen from "../pages/NoHomeJoined";
import { router } from "expo-router";
import { BackHandler } from "react-native";

const Home = () => {
	useEffect(() => {
		const backAction = () => {
			// Prevent going back to another screen
			return true;
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	const user = useAuthStore().user;

	return user?.houseId ? <HomePage /> : <NoHomeScreen />;
};

export default Home;
