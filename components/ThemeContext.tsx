import { darkTheme, theme } from "@/theme";
import React, {
	createContext,
	useState,
	useContext,
	ReactNode,
	useEffect,
} from "react";

const ThemeContext = createContext(
	{} as {
		darkMode: boolean;
		setDarkMode: (value: boolean) => void;
		currentTheme: typeof theme;
	}
);
// Create a provider component
export const DarkLightThemeProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	const [darkMode, setDarkMode] = useState<boolean>(false);
	const [currentTheme, setCurrentTheme] = useState(theme);
	// Create a context

	useEffect(() => {
		setCurrentTheme(darkMode ? darkTheme : theme);
	}, [darkMode]);

	return (
		<ThemeContext.Provider value={{ darkMode, setDarkMode, currentTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

// Create a custom hook for accessing the theme
export const useDarkLightTheme = () => useContext(ThemeContext);
