import React, { createContext, useState, useContext, ReactNode } from "react";

const ThemeContext = createContext(
	{} as {
		darkMode: boolean;
		setDarkMode: (value: boolean) => void;
	}
);
// Create a provider component
export const DarkLightThemeProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [darkMode, setDarkMode] = useState<boolean>(false);
	// Create a context

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};

// Create a custom hook for accessing the theme
export const useTheme = () => useContext(ThemeContext);
