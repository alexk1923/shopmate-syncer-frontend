import { createTheme } from "@shopify/restyle";

const palette = {
	light: {
		background: "#f8f8f8",
		cardBackground: "#ffffff",
		lightPrimary: "#0098eb",
		primary: "#008dda",
		darkPrimary: "#026da8",
		secondary: "#ace2e1",
		accent: "#41c9e2",
		text: "#333333",
		oppositeText: "#f0f0f0",
		error: "#bd0303",
	},
	dark: {
		background: "#111111",
		cardBackground: "#141b25",
		primary: "#0098eb",
		secondary: "#08044f",
		accent: "#0600c2",
		text: "#f0f0f0",
		oppositeText: "#333333",
		error: "#bd0303",
	},

	lightText: "#eae9fc",
	darkText: "#050316",
	transparent: "transparent",
	gray: "#a6abb7",
};

export const theme = createTheme({
	colors: {
		mainBackground: palette.light.background,
		cardBackground: palette.light.cardBackground,
		lightText: palette.lightText,
		darkText: palette.darkText,
		text: palette.light.text,
		oppositeText: palette.light.oppositeText,

		primary: palette.light.primary,
		lightPrimary: palette.light.lightPrimary,
		darkPrimary: palette.light.darkPrimary,

		secondary: palette.light.secondary,
		lightSecondary: palette.light.secondary,
		darkSecondary: palette.light.secondary,

		accent: palette.light.accent,
		lightAccent: palette.light.accent,
		darkAccent: palette.light.accent,
		error: palette.light.error,

		transparent: palette.transparent,
		gray: palette.gray,
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

		subheader: {
			fontSize: 24,
			fontWeight: "bold",
		},

		body: {
			fontSize: 16,
			lineHeight: 24,
		},

		buttonSmall: {
			fontSize: 16,
			lineHeight: 24,
		},
		buttonMedium: {
			fontSize: 18,
			lineHeight: 27,
		},

		label: {
			fontSize: 16,
			lineHeight: 24,
			color: "gray",
		},

		defaults: {},
	},
	buttonVariants: {
		filled: {
			backgroundColor: "primary",
			color: "lightText",
		},
		outline: {
			backgroundColor: "transparent",
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
		cardBackground: palette.dark.cardBackground,

		lightText: palette.lightText,
		darkText: palette.darkText,
		text: palette.dark.text,
		oppositeText: palette.dark.oppositeText,

		primary: palette.dark.primary,
		lightPrimary: palette.dark.primary,
		darkPrimary: palette.dark.primary,

		secondary: palette.dark.primary,
		lightSecondary: palette.dark.primary,
		darkSecondary: palette.dark.primary,

		accent: palette.dark.accent,
		lightAccent: palette.dark.accent,
		darkAccent: palette.dark.accent,
		error: palette.dark.error,

		gray: palette.gray,
	},
};
