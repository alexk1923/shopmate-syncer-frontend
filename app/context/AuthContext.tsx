// context/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as AuthService from "../services/authService";
import { getToken, setToken, removeToken } from "../store/asyncStorage";

type AuthContextType = {
	user: any;
	login: (email: string, password: string) => Promise<void>;
	register: (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => Promise<void>;
	logout: () => void;
	isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<{ token: string } | null>(null);

	useEffect(() => {
		const loadUser = async () => {
			const token = await getToken();
			if (token) {
				// Assuming the token is a JWT and contains the user info
				setUser({ token });
			}
		};
		loadUser();
	}, []);

	const login = async (email: string, password: string) => {
		const data = await AuthService.login(email, password);
		setUser(data.user);
		await setToken(data.token);
	};

	const register = async (
		firstName: string,
		lastName: string,
		username: string,
		email: string,
		password: string
	) => {
		const data = await AuthService.register(
			firstName,
			lastName,
			username,
			email,
			password
		);
		setUser(data.user);
		await setToken(data.token);
	};

	const logout = async () => {
		setUser(null);
		await removeToken();
	};

	return (
		<AuthContext.Provider
			value={{ user, login, register, logout, isAuthenticated: !!user }}
		>
			{children}
		</AuthContext.Provider>
	);
};
