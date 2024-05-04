import { createTheme } from "@shopify/restyle";

const palette = {
	light: {
		background: "#f3fcfc",
		primary: "#008dda",
		secondary: "#ace2e1",
		accent: "#41c9e2",
	},
	dark: {
		background: "#030c0c",
		primary: "#3a31d8",
		secondary: "#08044f",
		accent: "#0600c2",
	},

	lightText: "#eae9fc",
	darkText: "#050316",
};

export const theme = createTheme({
	colors: {
		mainBackground: palette.light.background,
		lightText: palette.lightText,
		darkText: palette.darkText,

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
			color: "lightText",
		},
		outline: {
			backgroundColor: "mainBackground",
			color: "secondary",
			borderColor: "secondary",
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

		lightText: palette.lightText,
		darkText: palette.darkText,

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
