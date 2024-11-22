import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { API_URL } from "../api/config";
import { getToken, removeToken } from "./asyncStorage";
import { router } from "expo-router";
import { Subscription } from "expo-notifications";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

interface AuthState {
	user: User | null;
	token: string | null;
	userId: number | null;
	notificationToken: string | null;
	notificationSubscription: Subscription | null;
	firstLaunch: boolean;
	preferedThemeDark: boolean;
	setPreferredThemeDark: (dark: boolean) => void;
	setUserId: (userId: number) => void;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	setNotificationSubscription: (subscription: Subscription) => void;
	setNotificationToken: (notificationToken: string | null) => void;
	setFirstLaunch: () => void;
	removeUser: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set, get) => ({
				user: null,
				token: null,
				userId: null,
				notificationSubscription: null,
				firstLaunch: true,
				notificationToken: null,
				preferedThemeDark: false,
				setPreferredThemeDark: (dark) => set({ preferedThemeDark: dark }),
				setUserId: (userId: number) => set({ userId: userId }),
				setUser: (fetchedUser: User) => set({ user: fetchedUser }),
				removeUser: () => {
					set({ user: null, token: null, userId: null });
					removeToken();
				},
				setFirstLaunch: () => set({ firstLaunch: false }),
				setToken: (token: string) => {
					set({ token });
				},
				setNotificationSubscription: (subscription: Subscription) => {
					set({ notificationSubscription: subscription });
				},
				setNotificationToken: (notificationToken) => {
					set({ notificationToken });
				},
				initializeAuth: async () => {
					if (!get().user) {
						return;
					}
					const token = await getToken();

					if (token) {
						try {
							const response = await axios.get<User>(
								`${API_URL}/verify-token`,
								{
									headers: { Authorization: `Bearer ${token}` },
								}
							);

							if (
								get().user?.firstName === null ||
								get().user?.lastName === null ||
								get().firstLaunch
							) {
								router.navigate("introduction/AccountSetup");
							} else if (!get().user?.houseId) {
								router.navigate("pages/NoHomeJoined");
							} else {
								router.navigate("(tabs)/Home");
							}
						} catch (error) {
							console.error("Token verification failed", error);
							if (axios.isAxiosError(error)) {
								if (!error.response) {
									throw new Error("Network error");
								}

								console.error(error.response);
								// Remove token only if it is unauthorized
								if (error.response.status === 401) {
									set({ user: null, token: null });
									await AsyncStorage.removeItem("userToken");
								}

								throw error.response.data;
							}
						}
					} else {
						console.error("No token in the async storage");
					}
				},
			}),
			{
				name: "user-storage",
				storage: createJSONStorage(() => AsyncStorage),
			}
		)
	)
);
