import { createTheme } from "@shopify/restyle";

const palette = {
	light: {
		text: "#305050",
		background: "#ffffff",
		primary: "#89cfeb",
		secondary: "#a590e9",
		accent: "#ad5ce0",
	},
	dark: {
		text: "#afcfcf",
		background: "#000000",
		primary: "#145a76",
		secondary: "#2b166f",
		accent: "#701fa3",
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
