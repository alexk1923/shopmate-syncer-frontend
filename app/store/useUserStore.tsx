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
	notificationSubscription: Subscription | null;
	setUserId: (userId: number) => void;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	setNotificationSubscription: (subscription: Subscription) => void;
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
				setUserId: (userId: number) => set({ userId: userId }),
				setUser: (fetchedUser: User) => set({ user: fetchedUser }),
				removeUser: () => {
					set((state) => {
						return { user: null, token: null, userId: null };
					});
					removeToken();
				},
				setToken: (token: string) => {
					set({ token });
				},
				setNotificationSubscription: (subscription: Subscription) => {
					set({ notificationSubscription: subscription });
				},
				initializeAuth: async () => {
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
								get().user?.lastName === null
							) {
								router.replace("introduction/");
							} else {
								router.replace("(tabs)/Home");
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
