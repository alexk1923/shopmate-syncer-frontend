import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { API_URL } from "../api/config";
import { getToken, removeToken } from "./asyncStorage";
import { router } from "expo-router";
// import type {} from "@redux-devtools/extension"; // required for devtools typing

interface AuthState {
	user: User | null;
	token: string | null;
	userId: number | null;
	setUserId: (userId: number) => void;
	setUser: (user: User) => void;
	setToken: (token: string) => void;
	removeUser: () => void;
	initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
	devtools(
		persist(
			(set) => ({
				user: null,
				token: null,
				userId: null,
				setUserId: (userId: number) => set({ userId: userId }),
				setUser: (fetchedUser: User) => set({ user: fetchedUser }),
				removeUser: () => {
					set((state) => {
						return { user: null, token: null };
					});
					removeToken();
				},
				setToken: (token: string) => {
					set({ token });
				},
				initializeAuth: async () => {
					const token = await getToken();
					console.log("token is here");
					console.log(token);

					if (token) {
						console.log("am intrat pe token");

						try {
							const response = await axios.get<User>(
								`${API_URL}/verify-token`,
								{
									headers: { Authorization: `Bearer ${token}` },
								}
							);
							router.replace("(tabs)/Home");
						} catch (error) {
							console.error("Token verification failed", error);

							set({ user: null, token: null });
							await AsyncStorage.removeItem("userToken");
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
