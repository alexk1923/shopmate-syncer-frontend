import React, { useEffect } from "react";
import { useAuthStore } from "../store/useUserStore";
import HomePage from "../pages/HomePage";
import NoHomeScreen from "../pages/NoHomeJoined";
import { router, useNavigation } from "expo-router";
import { Alert, BackHandler } from "react-native";
import { CommonActions } from "@react-navigation/native";

const Home = () => {
	const navigation = useNavigation();

	useEffect(() => {
		const backAction = () => {
			console.log("router can go back");
			console.log(navigation.getState().history);

			if (!navigation.canGoBack()) {
				Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
					{ text: "Cancel", onPress: () => null, style: "cancel" },
					{ text: "YES", onPress: () => BackHandler.exitApp() },
				]);

				return true;
			}
		};

		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);

		return () => backHandler.remove();
	}, []);

	useEffect(() => {
		// Log the current navigation state
		// navigation.dispatch(
		// 	CommonActions.reset({
		// 		index: 0,
		// 		routes: [{ name: "(tabs)" }],
		// 	})
		// );

		console.log("router can go back");
		console.log(router.canGoBack());
		console.log("parent is");

		console.log(navigation.getState().history);
	}, [navigation.getState().history]);

	const user = useAuthStore().user;

	return user?.houseId ? <HomePage /> : <NoHomeScreen />;
};

export default Home;
