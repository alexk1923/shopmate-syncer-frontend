import { createTheme } from "@shopify/restyle";

const palette = {
	light: {
		text: "#f0f0f0",
		background: "#f3fcfc",
		primary: "#007f80",
		secondary: "#ffbf00",
		accent: "#ffa600",
	},
	dark: {
		text: "#eefbfc",
		background: "#030c0c",
		primary: "#80ffff",
		secondary: "#ffbf00",
		accent: "#ffa600",
	},
};

export const theme = createTheme({
	colors: {
		mainBackground: palette.light.background,
		mainText: palette.light.text,
		lightText: palette.light.text,
		darkText: palette.light.text,

		primary: palette.light.primary,
		lightPrimary: palette.light.primary,
		darkPrimary: palette.light.primary,

		secondary: palette.light.primary,
		lightSecondary: palette.light.primary,
		darkSecondary: palette.light.primary,

		accent: palette.light.accent,
		lightAccent: palette.light.accent,
		darkAccent: palette.light.accent,
	},
	spacing: {
		s: 8,
		m: 16,
		l: 24,
		xl: 40,
	},
	textVariants: {
		header: {
			fontWeight: "bold",
			fontSize: 34,
		},
		body: {
			fontSize: 16,
			lineHeight: 24,
		},
		defaults: {},
	},
	buttonVariants: {
		filled: {
			backgroundColor: "primary",
			color: "mainText",
		},
		outline: {
			backgroundColor: "mainBackground",
			color: "lightPrimary",
			borderColor: "primary",
			borderWidth: 1,
		},
	},
});

export type Theme = typeof theme;

export const darkTheme: Theme = {
	...theme,
	colors: {
		...theme.colors,
		mainBackground: palette.dark.background,
		mainText: palette.dark.text,
		lightText: palette.dark.text,
		darkText: palette.dark.text,

		primary: palette.dark.primary,
		lightPrimary: palette.dark.primary,
		darkPrimary: palette.dark.primary,

		secondary: palette.dark.primary,
		lightSecondary: palette.dark.primary,
		darkSecondary: palette.dark.primary,

		accent: palette.dark.accent,
		lightAccent: palette.dark.accent,
		darkAccent: palette.dark.accent,
	},
};
