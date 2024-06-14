import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import * as Device from "expo-device";
import Constants from "expo-constants";
import { addNotificationsToken } from "./authService";

export const NotificationService = {
	registerForPushNotificationsAsync: async function (
		userId: number,
		token: string
	) {
		console.info("registering for push notifications");
		let projectId;
		try {
			projectId =
				Constants?.expoConfig?.extra?.eas?.projectId ??
				Constants?.easConfig?.projectId;
			if (!projectId) {
				throw new Error("Project ID not found");
			}
			console.info("projectId is:" + projectId);
		} catch (error) {
			console.error(error);
		}

		let notificationToken;
		if (Device.isDevice) {
			console.info("Is device !");
			try {
				const { status: existingStatus } =
					await Notifications.getPermissionsAsync();
				console.info("exsting status is: " + existingStatus);
				let finalStatus = existingStatus;
				if (existingStatus !== "granted") {
					const { status } = await Notifications.requestPermissionsAsync();
					finalStatus = status;
				}
				if (finalStatus !== "granted") {
					console.error("Failed to get push token for push notification!");
					return;
				}
				console.info("Generating token...");

				notificationToken = (
					await Notifications.getExpoPushTokenAsync({ projectId })
				).data;
				console.log("expo push token is: " + notificationToken);
			} catch (error) {
				console.error("my error from notifications: ");
				console.error(error);
			}
		} else {
			console.error("Must use physical device for Push Notifications");
		}

		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		// Assuming you have a method to update the user's push token in your database
		if (notificationToken) {
			try {
				await addNotificationsToken(userId, token, notificationToken);
			} catch (err) {
				console.error(err);
			}
		}
	},
};
